import {
    Users, Map, ClipboardList, CreditCard,
    TrendingUp, TrendingDown
} from 'lucide-react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts'

const stats = [
    { label: 'Jami mijozlar', value: '248', icon: Users, color: 'bg-blue-500', change: '+12%', up: true },
    { label: 'Faol turlar', value: '34', icon: Map, color: 'bg-emerald-500', change: '+5%', up: true },
    { label: 'Buyurtmalar', value: '127', icon: ClipboardList, color: 'bg-violet-500', change: '+8%', up: true },
    { label: "Bu oy daromad", value: "24.5M", icon: CreditCard, color: 'bg-orange-500', change: '-3%', up: false },
]

const areaData = [
    { month: 'Sen', daromad: 12 },
    { month: 'Okt', daromad: 18 },
    { month: 'Noy', daromad: 15 },
    { month: 'Dek', daromad: 22 },
    { month: 'Yan', daromad: 20 },
    { month: 'Fev', daromad: 24.5 },
]

const barData = [
    { name: 'Dubai', buyurtma: 32 },
    { name: 'Turiya', buyurtma: 28 },
    { name: 'Misr', buyurtma: 21 },
    { name: 'Tailand', buyurtma: 18 },
    { name: 'Rossiya', buyurtma: 15 },
]

const lastOrders = [
    { id: '#1042', client: 'Alisher Karimov', tour: 'Dubai 7 kun', sum: '4,200,000', status: 'Tasdiqlangan' },
    { id: '#1041', client: 'Malika Yusupova', tour: 'Turiya 10 kun', sum: '6,800,000', status: "To'langan" },
    { id: '#1040', client: 'Jasur Toshmatov', tour: 'Misr 8 kun', sum: '3,900,000', status: 'Kutilmoqda' },
    { id: '#1039', client: 'Nodira Rahimova', tour: 'Tailand 12 kun', sum: '7,200,000', status: "To'langan" },
    { id: '#1038', client: 'Bobur Nazarov', tour: 'Dubai 5 kun', sum: '3,100,000', status: 'Bekor qilindi' },
]

const statusColor = {
    "Tasdiqlangan": 'bg-blue-100 text-blue-700',
    "To'langan": 'bg-green-100 text-green-700',
    "Kutilmoqda": 'bg-yellow-100 text-yellow-700',
    "Bekor qilindi": 'bg-red-100 text-red-700',
}

function Dashboard() {
    return (
        <div className="space-y-6">

            {/* Sarlavha */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Fevral 2026 — umumiy ko'rinish</p>
            </div>

            {/* Stat kartalar */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map(({ label, value, icon: Icon, color, change, up }) => (
                    <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center`}>
                                <Icon size={20} className="text-white" />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-semibold ${up ? 'text-green-600' : 'text-red-500'}`}>
                                {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                {change}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{value}</div>
                        <div className="text-sm text-gray-500 mt-1">{label}</div>
                    </div>
                ))}
            </div>

            {/* Grafiklar */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                {/* Area chart */}
                <div className="xl:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4">Oylik daromad (mln so'm)</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={areaData}>
                            <defs>
                                <linearGradient id="colorD" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="daromad" stroke="#3b82f6" strokeWidth={2} fill="url(#colorD)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar chart */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4">Top yo'nalishlar</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={barData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis type="number" tick={{ fontSize: 12 }} />
                            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={55} />
                            <Tooltip />
                            <Bar dataKey="buyurtma" fill="#6366f1" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Oxirgi buyurtmalar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-5 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Oxirgi buyurtmalar</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {['#ID', 'Mijoz', 'Tur', 'Summa', 'Status'].map(h => (
                                    <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {lastOrders.map(o => (
                                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-3.5 text-sm font-medium text-blue-600">{o.id}</td>
                                    <td className="px-5 py-3.5 text-sm text-gray-800">{o.client}</td>
                                    <td className="px-5 py-3.5 text-sm text-gray-600">{o.tour}</td>
                                    <td className="px-5 py-3.5 text-sm font-medium text-gray-800">{o.sum} so'm</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[o.status]}`}>
                                            {o.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Dashboard