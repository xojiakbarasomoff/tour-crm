import { useState } from 'react'
import { Plus, Search, TrendingUp, TrendingDown, CreditCard, Clock } from 'lucide-react'

const initialPayments = [
    { id: 'P001', order: '#1042', client: 'Alisher Karimov', amount: 8400000, paid: 8400000, date: '2026-02-20', method: "Naqd", status: "To'liq" },
    { id: 'P002', order: '#1041', client: 'Malika Yusupova', amount: 20400000, paid: 10000000, date: '2026-02-18', method: "Karta", status: "Qisman" },
    { id: 'P003', order: '#1040', client: 'Jasur Toshmatov', amount: 3900000, paid: 0, date: '2026-02-15', method: "-", status: "Qarzdor" },
    { id: 'P004', order: '#1039', client: 'Nodira Rahimova', amount: 14400000, paid: 14400000, date: '2026-02-12', method: "Transfer", status: "To'liq" },
    { id: 'P005', order: '#1038', client: 'Bobur Nazarov', amount: 4200000, paid: 2000000, date: '2026-02-10', method: "Naqd", status: "Qisman" },
    { id: 'P006', order: '#1037', client: 'Zulfiya Hasanova', amount: 3400000, paid: 3400000, date: '2026-02-08', method: "Karta", status: "To'liq" },
]

const statusColor = {
    "To'liq": 'bg-green-100 text-green-700',
    "Qisman": 'bg-yellow-100 text-yellow-700',
    "Qarzdor": 'bg-red-100 text-red-700',
}

const methodColor = {
    "Naqd": 'bg-blue-50 text-blue-600',
    "Karta": 'bg-purple-50 text-purple-600',
    "Transfer": 'bg-teal-50 text-teal-600',
    "-": 'bg-gray-50 text-gray-400',
}

function Payments() {
    const [payments, setPayments] = useState(initialPayments)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('Barchasi')
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({ order: '', client: '', amount: '', paid: '', method: 'Naqd', date: '' })

    const filtered = payments.filter(p => {
        const matchSearch = p.client.toLowerCase().includes(search.toLowerCase()) || p.order.includes(search) || p.id.includes(search)
        const matchStatus = statusFilter === 'Barchasi' || p.status === statusFilter
        return matchSearch && matchStatus
    })

    const totalAmount = payments.reduce((s, p) => s + p.amount, 0)
    const totalPaid = payments.reduce((s, p) => s + p.paid, 0)
    const totalDebt = totalAmount - totalPaid

    const handleAdd = () => {
        if (!form.client || !form.amount) return
        const paid = +form.paid
        const amount = +form.amount
        const status = paid >= amount ? "To'liq" : paid > 0 ? "Qisman" : "Qarzdor"
        setPayments([{
            id: `P00${payments.length + 1}`,
            ...form,
            amount,
            paid,
            status
        }, ...payments])
        setForm({ order: '', client: '', amount: '', paid: '', method: 'Naqd', date: '' })
        setShowModal(false)
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">To'lovlar</h1>
                    <p className="text-gray-500 text-sm mt-1">Moliyaviy hisobot</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={18} />
                    To'lov qo'shish
                </button>
            </div>

            {/* Stat kartalar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                            <CreditCard size={18} className="text-white" />
                        </div>
                        <TrendingUp size={16} className="text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{totalAmount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 mt-1">Jami hisoblangan (so'm)</div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                            <TrendingUp size={18} className="text-white" />
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            {Math.round(totalPaid / totalAmount * 100)}%
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{totalPaid.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 mt-1">To'langan (so'm)</div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                            <Clock size={18} className="text-white" />
                        </div>
                        <TrendingDown size={16} className="text-red-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{totalDebt.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 mt-1">Qarz (so'm)</div>
                </div>
            </div>

            {/* Filter + Search */}
            <div className="flex gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Mijoz, buyurtma ID..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                </div>
                {['Barchasi', "To'liq", 'Qisman', 'Qarzdor'].map(s => (
                    <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {['ID', 'Buyurtma', 'Mijoz', 'Jami', "To'langan", 'Qarz', 'Usul', 'Sana', 'Status'].map(h => (
                                    <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5 uppercase">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(p => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4 text-sm font-medium text-blue-600">{p.id}</td>
                                    <td className="px-5 py-4 text-sm text-gray-600">{p.order}</td>
                                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{p.client}</td>
                                    <td className="px-5 py-4 text-sm text-gray-900">{p.amount.toLocaleString()}</td>
                                    <td className="px-5 py-4 text-sm font-semibold text-green-600">{p.paid.toLocaleString()}</td>
                                    <td className="px-5 py-4 text-sm font-semibold text-red-500">{(p.amount - p.paid).toLocaleString()}</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${methodColor[p.method]}`}>
                                            {p.method}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-gray-500">{p.date}</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[p.status]}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-gray-400">To'lov topilmadi</div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                        <h2 className="text-lg font-bold text-gray-900 mb-5">To'lov qo'shish</h2>
                        <div className="space-y-4">
                            {[
                                { label: 'Buyurtma ID', key: 'order', placeholder: '#1042' },
                                { label: 'Mijoz ismi *', key: 'client', placeholder: 'Alisher Karimov' },
                                { label: 'Jami summa *', key: 'amount', placeholder: '8400000' },
                                { label: "To'langan summa", key: 'paid', placeholder: '8400000' },
                                { label: 'Sana', key: 'date', placeholder: '2026-02-20', type: 'date' },
                            ].map(({ label, key, placeholder, type }) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input
                                        type={type || 'text'}
                                        value={form[key]}
                                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                                        placeholder={placeholder}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">To'lov usuli</label>
                                <select
                                    value={form.method}
                                    onChange={e => setForm({ ...form, method: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {['Naqd', 'Karta', 'Transfer'].map(m => <option key={m}>{m}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50">
                                Bekor qilish
                            </button>
                            <button onClick={handleAdd} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium">
                                Qo'shish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Payments