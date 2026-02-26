import { useState } from 'react'
import { User, Lock, Building, Bell, Save } from 'lucide-react'

function Settings() {
    const [activeTab, setActiveTab] = useState('profil')
    const [saved, setSaved] = useState(false)

    const [profil, setProfil] = useState({
        name: 'Admin',
        email: 'admin@tourcrm.uz',
        phone: '+998 90 000 00 00',
        role: 'Administrator'
    })

    const [firma, setFirma] = useState({
        name: 'Silk Road Travel',
        address: 'Toshkent, Chilonzor tumani',
        phone: '+998 71 000 00 00',
        email: 'info@silkroad.uz',
        license: 'TF-2024-001'
    })

    const [notif, setNotif] = useState({
        newOrder: true,
        payment: true,
        reminder: false,
        report: true,
    })

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    const tabs = [
        { key: 'profil', label: 'Profil', icon: User },
        { key: 'firma', label: 'Firma', icon: Building },
        { key: 'xavfsiz', label: 'Xavfsizlik', icon: Lock },
        { key: 'bildir', label: 'Bildirishnomalar', icon: Bell },
    ]

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Sozlamalar</h1>
                <p className="text-gray-500 text-sm mt-1">Tizim va profil sozlamalari</p>
            </div>

            <div className="flex gap-6">

                {/* Sidebar tabs */}
                <div className="w-52 shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 space-y-1">
                        {tabs.map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${activeTab === key
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={17} />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">

                    {/* Profil */}
                    {activeTab === 'profil' && (
                        <div className="space-y-5">
                            <h2 className="text-lg font-semibold text-gray-900">Profil ma'lumotlari</h2>

                            {/* Avatar */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    A
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{profil.name}</p>
                                    <p className="text-xs text-gray-500">{profil.role}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Ism Familiya', key: 'name' },
                                    { label: 'Email', key: 'email' },
                                    { label: 'Telefon', key: 'phone' },
                                    { label: 'Lavozim', key: 'role' },
                                ].map(({ label, key }) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                        <input
                                            type="text"
                                            value={profil[key]}
                                            onChange={e => setProfil({ ...profil, [key]: e.target.value })}
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Firma */}
                    {activeTab === 'firma' && (
                        <div className="space-y-5">
                            <h2 className="text-lg font-semibold text-gray-900">Firma ma'lumotlari</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Firma nomi', key: 'name' },
                                    { label: 'Manzil', key: 'address' },
                                    { label: 'Telefon', key: 'phone' },
                                    { label: 'Email', key: 'email' },
                                    { label: 'Litsenziya raqami', key: 'license' },
                                ].map(({ label, key }) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                        <input
                                            type="text"
                                            value={firma[key]}
                                            onChange={e => setFirma({ ...firma, [key]: e.target.value })}
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Xavfsizlik */}
                    {activeTab === 'xavfsiz' && (
                        <div className="space-y-5">
                            <h2 className="text-lg font-semibold text-gray-900">Parolni o'zgartirish</h2>
                            <div className="max-w-md space-y-4">
                                {[
                                    { label: 'Joriy parol', placeholder: '••••••••' },
                                    { label: 'Yangi parol', placeholder: '••••••••' },
                                    { label: 'Yangi parolni takrorlang', placeholder: '••••••••' },
                                ].map(({ label, placeholder }) => (
                                    <div key={label}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                        <input
                                            type="password"
                                            placeholder={placeholder}
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bildirishnomalar */}
                    {activeTab === 'bildir' && (
                        <div className="space-y-5">
                            <h2 className="text-lg font-semibold text-gray-900">Bildirishnoma sozlamalari</h2>
                            <div className="space-y-4 max-w-md">
                                {[
                                    { key: 'newOrder', label: 'Yangi buyurtma kelganda' },
                                    { key: 'payment', label: "To'lov qabul qilinganda" },
                                    { key: 'reminder', label: 'Eslatmalar (pasport, sana)' },
                                    { key: 'report', label: 'Oylik hisobot tayyor bo\'lganda' },
                                ].map(({ key, label }) => (
                                    <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <span className="text-sm text-gray-700">{label}</span>
                                        <button
                                            onClick={() => setNotif({ ...notif, [key]: !notif[key] })}
                                            className={`w-11 h-6 rounded-full transition-colors ${notif[key] ? 'bg-blue-600' : 'bg-gray-200'}`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${notif[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Save button */}
                    <div className="mt-6 pt-5 border-t border-gray-100">
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            <Save size={16} />
                            {saved ? 'Saqlandi! ✓' : 'Saqlash'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings