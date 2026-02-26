import { Bell, User } from 'lucide-react'

function Navbar() {
    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

            {/* Chap tomon */}
            <div>
                <h2 className="text-lg font-semibold text-gray-800">Xush kelibsiz! 👋</h2>
            </div>

            {/* O'ng tomon */}
            <div className="flex items-center gap-4">

                {/* Bildirishnoma */}
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profil */}
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Admin</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar