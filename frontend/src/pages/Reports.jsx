import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { TrendingUp, Users, CreditCard, Map } from 'lucide-react'

const monthlyData = [
    { month: 'Sen', daromad: 12000000, buyurtma: 18 },
    { month: 'Okt', daromad: 18500000, buyurtma: 24 },
    { month: 'Noy', daromad: 15200000, buyurtma: 20 },
    { month: 'Dek', daromad: 22800000, buyurtma: 31 },
    { month: 'Yan', daromad: 19600000, buyurtma: 27 },
    { month: 'Fev', daromad: 24500000, buyurtma: 34 },
]

const tourData = [
    { name: 'Dubai', value: 32 },
    { name: 'Turiya', value: 28 },
    { name: 'Misr', value: 21 },
    { name: 'Tailand', value: 18 },
    { name: 'Rossiya', value: 15 },
    { name: 'Boshqa', value: 10 },
]

const COLORS = ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

const paymentData = [
    { month: 'Sen', tolangan: 10000000, qarz: 2000000 },
    { month: 'Okt', tolangan: 16000000, qarz: 2500000 },
    { month: 'Noy', tolangan: 13000000, qarz: 2200000 },
    { month: 'Dek', tolangan: 20000000, qarz: 2800000 },
    { month: 'Yan', tolangan: 17000000, qarz: 2600000 },
    { month: 'Fev', tolangan: 22000000, qarz: 2500000 },
]

const stats = [
    { label: 'Jami daromad', value: '112.6M', sub: 'so\'m', icon: CreditCard, color: 'bg-blue-500', change: '+18%' },
    { label: 'Jami buyurtma', value: '154', sub: 'ta', icon: Map, color: 'bg-violet-500', change: '+12%' },
    { label: 'Yangi mijozlar', value: '48', sub: 'kishi', icon: Users, color: 'bg-emerald-500', change: '+9%' },
    { label: "O'rtacha chek", value: '731K', sub: 'so\'m', icon: TrendingUp, color: 'bg-orange-500', change: '+5%' },
]

function Reports() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Hisobotlar</h1>
                <p className="text-gray-500 text-sm mt-1">Sentyabr 2025 — Fevral 2026</p>
            </div>

            {/* Stat kartalar */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map(({ label, value, sub, icon: Icon, color, change }) => (
                    <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center`}>
                                <Icon size={20} className="text-white" />
                            </div>
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{change}</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{value} <span className="text-sm font-normal text-gray-400">{sub}</span></div>
                        <div className="text-sm text-gray-500 mt-1">{label}</div>
                    </div>
                ))}
            </div>

            {/* Area chart */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Oylik daromad va buyurtmalar</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={monthlyData}>
                        <defs>
                            <linearGradient id="gD" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(v, n) => [v.toLocaleString(), n === 'daromad' ? "Daromad (so'm)" : 'Buyurtmalar']} />
                        <Legend />
                        <Area type="monotone" dataKey="daromad" stroke="#3b82f6" strokeWidth={2} fill="url(#gD)" name="Daromad" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Bar + Pie */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                {/* Bar chart */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4">To'lov holati (oylik)</h3>
                    <ResponsiveContainer width="100%" height={230}>
                        <BarChart data={paymentData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={v => v.toLocaleString()} />
                            <Legend />
                            <Bar dataKey="tolangan" name="To'langan" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="qarz" name="Qarz" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie chart */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4">Yo'nalishlar bo'yicha taqsimot</h3>
                    <div className="flex items-center gap-4">
                        <ResponsiveContainer width="60%" height={230}>
                            <PieChart>
                                <Pie data={tourData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value">
                                    {tourData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2 flex-1">
                            {tourData.map((t, i) => (
                                <div key={t.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                                        <span className="text-gray-600">{t.name}</span>
                                    </div>
                                    <span className="font-medium text-gray-900">{t.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Reports