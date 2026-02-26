import { useState } from 'react'
import { Plus, MapPin, Clock, Users, DollarSign, Edit, Trash2, Search } from 'lucide-react'

const initialTours = [
    { id: 1, name: 'Dubai — Luxe 7 kun', country: 'BAA', days: 7, price: 4200000, seats: 20, booked: 15, image: '🇦🇪', type: 'Tashqi', status: 'Faol' },
    { id: 2, name: 'Turiya — All Inclusive', country: 'Turiya', days: 10, price: 6800000, seats: 30, booked: 28, image: '🇹🇷', type: 'Tashqi', status: 'Faol' },
    { id: 3, name: 'Misr — Qadimiy sayyohat', country: 'Misr', days: 8, price: 3900000, seats: 25, booked: 10, image: '🇪🇬', type: 'Tashqi', status: 'Faol' },
    { id: 4, name: 'Tailand — Tropik dam', country: 'Tailand', days: 12, price: 7200000, seats: 15, booked: 15, image: '🇹🇭', type: 'Tashqi', status: 'To\'ldi' },
    { id: 5, name: 'Samarqand tури', country: "O'zbekiston", days: 3, price: 850000, seats: 40, booked: 12, image: '🇺🇿', type: 'Ichki', status: 'Faol' },
    { id: 6, name: 'Moskva — Qizil maydon', country: 'Rossiya', days: 5, price: 3100000, seats: 20, booked: 8, image: '🇷🇺', type: 'Tashqi', status: 'Faol' },
]

function Tours() {
    const [tours, setTours] = useState(initialTours)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('Barchasi')
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({ name: '', country: '', days: '', price: '', seats: '', type: 'Tashqi' })

    const filtered = tours.filter(t => {
        const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.country.toLowerCase().includes(search.toLowerCase())
        const matchFilter = filter === 'Barchasi' || t.type === filter
        return matchSearch && matchFilter
    })

    const handleAdd = () => {
        if (!form.name || !form.country || !form.price) return
        setTours([{ id: tours.length + 1, ...form, days: +form.days, price: +form.price, seats: +form.seats, booked: 0, image: '🌍', status: 'Faol' }, ...tours])
        setForm({ name: '', country: '', days: '', price: '', seats: '', type: 'Tashqi' })
        setShowModal(false)
    }

    const handleDelete = (id) => {
        if (confirm("Turni o'chirishni tasdiqlaysizmi?")) setTours(tours.filter(t => t.id !== id))
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Turlar</h1>
                    <p className="text-gray-500 text-sm mt-1">Jami: {tours.length} ta tur</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={18} />
                    Yangi tur
                </button>
            </div>

            {/* Filter + Search */}
            <div className="flex gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tur nomi yoki mamlakat..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                </div>
                {['Barchasi', 'Tashqi', 'Ichki'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(t => {
                    const percent = Math.round((t.booked / t.seats) * 100)
                    return (
                        <div key={t.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

                            {/* Card header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 flex items-center justify-between">
                                <span className="text-5xl">{t.image}</span>
                                <div className="text-right">
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${t.status === 'Faol' ? 'bg-green-400/20 text-green-100' : 'bg-red-400/20 text-red-100'
                                        }`}>
                                        {t.status}
                                    </span>
                                    <div className="text-xs text-blue-200 mt-1">{t.type}</div>
                                </div>
                            </div>

                            {/* Card body */}
                            <div className="p-5">
                                <h3 className="font-semibold text-gray-900 mb-1">{t.name}</h3>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <span className="flex items-center gap-1"><MapPin size={13} />{t.country}</span>
                                    <span className="flex items-center gap-1"><Clock size={13} />{t.days} kun</span>
                                </div>

                                {/* Progress */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span className="flex items-center gap-1"><Users size={12} />{t.booked}/{t.seats} o'rin</span>
                                        <span>{percent}%</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-100 rounded-full">
                                        <div
                                            className={`h-1.5 rounded-full ${percent >= 100 ? 'bg-red-500' : percent >= 70 ? 'bg-orange-400' : 'bg-blue-500'}`}
                                            style={{ width: `${Math.min(percent, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                                        <DollarSign size={16} className="text-gray-400" />
                                        {t.price.toLocaleString()} so'm
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                            <Edit size={15} />
                                        </button>
                                        <button onClick={() => handleDelete(t.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                        <h2 className="text-lg font-bold text-gray-900 mb-5">Yangi tur qo'shish</h2>
                        <div className="space-y-4">
                            {[
                                { label: 'Tur nomi *', key: 'name', placeholder: 'Dubai — Luxe 7 kun' },
                                { label: 'Mamlakat *', key: 'country', placeholder: 'BAA' },
                                { label: 'Kunlar soni', key: 'days', placeholder: '7' },
                                { label: 'Narxi (so\'m) *', key: 'price', placeholder: '4200000' },
                                { label: 'O\'rinlar soni', key: 'seats', placeholder: '20' },
                            ].map(({ label, key, placeholder }) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input
                                        type="text"
                                        value={form[key]}
                                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                                        placeholder={placeholder}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tur turi</label>
                                <select
                                    value={form.type}
                                    onChange={e => setForm({ ...form, type: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>Tashqi</option>
                                    <option>Ichki</option>
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

export default Tours