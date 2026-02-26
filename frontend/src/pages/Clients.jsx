import { useState } from 'react'
import { Search, Plus, Phone, Mail, Edit, Trash2 } from 'lucide-react'

const initialClients = [
    { id: 1, name: 'Alisher Karimov', phone: '+998 90 123 45 67', email: 'alisher@gmail.com', passport: 'AA1234567', orders: 3, status: 'Faol' },
    { id: 2, name: 'Malika Yusupova', phone: '+998 91 234 56 78', email: 'malika@gmail.com', passport: 'AB2345678', orders: 5, status: 'Faol' },
    { id: 3, name: 'Jasur Toshmatov', phone: '+998 93 345 67 89', email: 'jasur@gmail.com', passport: 'AC3456789', orders: 1, status: 'Faol' },
    { id: 4, name: 'Nodira Rahimova', phone: '+998 94 456 78 90', email: 'nodira@gmail.com', passport: 'AD4567890', orders: 7, status: 'Faol' },
    { id: 5, name: 'Bobur Nazarov', phone: '+998 95 567 89 01', email: 'bobur@gmail.com', passport: 'AE5678901', orders: 2, status: 'Nofaol' },
    { id: 6, name: 'Zulfiya Hasanova', phone: '+998 97 678 90 12', email: 'zulfiya@gmail.com', passport: 'AF6789012', orders: 4, status: 'Faol' },
]

function Clients() {
    const [clients, setClients] = useState(initialClients)
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({ name: '', phone: '', email: '', passport: '' })

    const filtered = clients.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )

    const handleAdd = () => {
        if (!form.name || !form.phone) return
        const newClient = {
            id: clients.length + 1,
            ...form,
            orders: 0,
            status: 'Faol'
        }
        setClients([newClient, ...clients])
        setForm({ name: '', phone: '', email: '', passport: '' })
        setShowModal(false)
    }

    const handleDelete = (id) => {
        if (confirm("Mijozni o'chirishni tasdiqlaysizmi?")) {
            setClients(clients.filter(c => c.id !== id))
        }
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mijozlar</h1>
                    <p className="text-gray-500 text-sm mt-1">Jami: {clients.length} ta mijoz</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={18} />
                    Yangi mijoz
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Ism, telefon yoki email bo'yicha qidirish..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {['Mijoz', 'Telefon', 'Email', 'Pasport', 'Buyurtmalar', 'Status', 'Amallar'].map(h => (
                                    <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-3.5 uppercase">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(c => (
                                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                                                {c.name.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{c.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                            <Phone size={14} className="text-gray-400" />
                                            {c.phone}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                            <Mail size={14} className="text-gray-400" />
                                            {c.email}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-gray-600">{c.passport}</td>
                                    <td className="px-5 py-4">
                                        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                            {c.orders} ta
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.status === 'Faol'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                                <Edit size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(c.id)}
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
                        <div className="text-center py-12 text-gray-400">
                            Mijoz topilmadi
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                        <h2 className="text-lg font-bold text-gray-900 mb-5">Yangi mijoz qo'shish</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ism Familiya *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="Alisher Karimov"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                                <input
                                    type="text"
                                    value={form.phone}
                                    onChange={e => setForm({ ...form, phone: e.target.value })}
                                    placeholder="+998 90 000 00 00"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    placeholder="email@gmail.com"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pasport raqami</label>
                                <input
                                    type="text"
                                    value={form.passport}
                                    onChange={e => setForm({ ...form, passport: e.target.value })}
                                    placeholder="AA1234567"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleAdd}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                            >
                                Qo'shish
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Clients