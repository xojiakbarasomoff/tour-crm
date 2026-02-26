import { NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, Users, Map, ClipboardList,
    CreditCard, BarChart2, Settings, LogOut
} from 'lucide-react'

const menu = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/clients', icon: Users, label: 'Mijozlar' },
    { path: '/tours', icon: Map, label: 'Turlar' },
    { path: '/orders', icon: ClipboardList, label: 'Buyurtmalar' },
    { path: '/payments', icon: CreditCard, label: "To'lovlar" },
    { path: '/reports', icon: BarChart2, label: 'Hisobotlar' },
    { path: '/settings', icon: Settings, label: 'Sozlamalar' },
]

function Sidebar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="w-64 min-h-screen bg-blue-950 text-white flex flex-col">

            {/* Logo */}
            <div className="p-6 border-b border-blue-800">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">
                        T
                    </div>
                    <span className="font-bold text-lg">Tour CRM</span>
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-1">
                {menu.map(({ path, icon: Icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                            }`
                        }
                    >
                        <Icon size={18} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-blue-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-blue-200 hover:bg-blue-800 hover:text-white transition-colors w-full"
                >
                    <LogOut size={18} />
                    Chiqish
                </button>
            </div>
        </div>
    )
}

export default Sidebar