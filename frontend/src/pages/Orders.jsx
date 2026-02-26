import { useState } from 'react'
import { Plus, Search, Eye, Trash2, ChevronDown } from 'lucide-react'

const statusList = ['Barchasi', 'Kutilmoqda', 'Tasdiqlangan', "To'langan", 'Bekor qilindi', 'Yakunlandi']

const statusColor = {
    'Kutilmoqda': 'bg-yellow-100 text-yellow-700',
    'Tasdiqlangan': 'bg-blue-100 text-blue-700',
    "To'langan": 'bg-green-100 text-green-700',
    'Bekor qilindi': 'bg-red-100 text-red-700',
    'Yakunlandi': 'bg-gray-100 text-gray-600',
}

const initialOrders = [
    { id: '#1042', client: 'Alisher Karimov', tour: 'Dubai — Luxe 7 kun', date: '2026-02-20', people: 2, sum: 8400000, status: 'Tasdiqlangan' },
    { id: '#1041', client: 'Malika Yusupova', tour: 'Turiya — All Inclusive', date: '2026-02-18', people: 3, sum: 20400000, status: "To'langan" },
    { id: '#1040', client: 'Jasur Toshmatov', tour: 'Misr — Qadimiy sayyohat', date: '2026-02-15', people: 1, sum: 3900000, status: 'Kutilmoqda' },
    { id: '#1039', client: 'Nodira Rahimova', tour: 'Tailand — Tropik dam', date: '2026-02-12', people: 2, sum: 14400000, status: "To'langan" },
    { id: '#1038', client: 'Bobur Nazarov', tour: 'Dubai — Luxe 7 kun', date: '2026-02-10', people: 1, sum: 4200000, status: 'Bekor qilindi' },
    { id: '#1037', client: 'Zulfiya Hasanova', tour: 'Samarqand turi', date: '2026-02-08', people: 4, sum: 3400000, status: 'Yakunlandi' },
    { id: '#1036', client: 'Alisher Karimov', tour: 'Moskva — Qizil maydon', date: '2026-02-05', people: 2, sum: 6200000, status: 'Yakunlandi' },
]

function Orders() {
    const [orders, setOrders] = useState(initialOrders)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('Barchasi')
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({ client: '', tour: '', date: '', people: 1, sum: '', status: 'Kutilmoqda' })

    const filtered = orders.filter(o => {
        const matchSearch = o.client.toLowerCase().includes(search.toLowerCase()) ||
            o.tour.toLowerCase().includes(search.toLowerCase()) ||
            o.id.includes(search)
        const matchStatus = statusFilter === 'Barchasi' || o.status === statusFilter
        return matchSearch && matchStatus
    })

    const handleAdd = () => {
        if (!form.client || !form.tour || !form.sum) return
        const newOrder = {
            id: `#${1043 + orders.length}`,
            ...form,
            people: +form.people,
            sum: +form.sum,
        }
        setOrders([newOrder, ...orders])
        setForm({ client: '', tour: '', date: '', people: 1, sum: '', status: 'Kutilmoqda' })
        setShowModal(false)
    }

    const handleStatusChange = (id, newStatus) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))
    }

    const handleDelete = (id) => {
        if (confirm("Buyurtmani o'chirishni tasdiqlaysizmi?")) {
            setOrders(orders.filter(o => o.id !== id))
        }
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Buyurtmalar</h1>
                    <p className="text-gray-500 text-sm mt-1">Jami: {orders.length} ta buyurtma</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={18} />
                    Yangi buyurtma
                </button>
            </div>

            {/* Filter + Search */}
            <div className="flex gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Mijoz, tur yoki ID..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {statusList.map(s => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {['ID', 'Mijoz', 'Tur', 'Sana', 'Kishilar', 'Summa', 'Status', 'Amallar'].map(h => (
                                    <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5 uppercase">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(o => (
                                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4 text-sm font-medium text-blue-600">{o.id}</td>
                                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{o.client}</td>
                                    <td className="px-5 py-4 text-sm text-gray-600">{o.tour}</td>
                                    <td className="px-5 py-4 text-sm text-gray-500">{o.date}</td>
                                    <td className="px-5 py-4 text-sm text-gray-600">{o.people} kishi</td>
                                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">{o.sum.toLocaleString()} so'm</td>
                                    <td className="px-5 py-4">
                                        <div className="relative group inline-block">
                                            <button className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[o.status]}`}>
                                                {o.status}
                                                <ChevronDown size={12} />
                                            </button>
                                            <div className="absolute left-0 top-7 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px] hidden group-hover:block">
                                                {statusList.slice(1).map(s => (
                                                    <button
                                                        key={s}
                                                        onClick={() => handleStatusChange(o.id, s)}
                                                        className="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50"
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                                <Eye size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(o.id)}
                                                className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-gray-400">Buyurtma topilmadi</div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                        <h2 className="text-lg font-bold text-gray-900 mb-5">Yangi buyurtma</h2>
                        <div className="space-y-4">
                            {[
                                { label: 'Mijoz ismi *', key: 'client', placeholder: 'Alisher Karimov' },
                                { label: 'Tur nomi *', key: 'tour', placeholder: 'Dubai — Luxe 7 kun' },
                                { label: 'Sana', key: 'date', placeholder: '2026-03-01', type: 'date' },
                                { label: 'Kishilar soni', key: 'people', placeholder: '2', type: 'number' },
                                { label: 'Umumiy summa *', key: 'sum', placeholder: '8400000' },
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={form.status}
                                    onChange={e => setForm({ ...form, status: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {statusList.slice(1).map(s => <option key={s}>{s}</option>)}
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

export default Orders