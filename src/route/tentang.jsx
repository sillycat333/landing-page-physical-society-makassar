import { useState } from 'react';
import { Info, Target, Users } from 'lucide-react';
import SekilasContent from "../components/sekilas"
import VisiMisiContent from "../components/visimisi"
import PengurusContent from "../components/pengurus"

export default function Tentang() {
    const [activeTab, setActiveTab] = useState('sekilas');

    const menuItems = [
        { id: 'sekilas', label: 'Sekilas PSI', icon: Info },
        { id: 'visi', label: 'Visi & Misi', icon: Target },
        { id: 'pengurus', label: 'Pengurus Cab. Makassar', icon: Users },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'sekilas':
                return <SekilasContent />;
            case 'visi':
                return <VisiMisiContent />;
            case 'pengurus':
                return <PengurusContent />;
            default:
                return <SekilasContent />;
        }
    };

    const NavItem = ({ item }) => {
        const { id, label, icon: Icon } = item;
        const isActive = activeTab === id;

        return (
            <button
                onClick={() => setActiveTab(id)}
                className={`
                    group flex flex-col md:flex-row items-center w-full
                    px-4 md:px-3.5 py-3 md:py-2.5
                    text-center md:text-left text-xs md:text-sm font-medium
                    rounded-xl
                    transition-all duration-200 ease-in-out
                    ${isActive
                        ? 'bg-white text-blue-900 shadow-sm'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }
                `}
            >
                <span
                    className={`
                        inline-flex items-center justify-center
                        mb-1.5 md:mb-0 md:mr-3
                        h-8 w-8 md:h-9 md:w-9 
                        shrink-0 rounded-xl border
                        transition-all duration-200
                        ${isActive
                            ? 'bg-blue-100 border-blue-200'
                            : 'bg-blue-900/40 border-blue-500/40 group-hover:border-blue-200'
                        }
                    `}
                >
                    <Icon
                        size={16}
                        className={`
                           transition-colors duration-200
                            ${isActive ? 'text-blue-900' : 'text-blue-100 group-hover:text-white'}
                       `}
                    />
                </span>
                <span className="font-medium tracking-tight">
                    {label}
                </span>
            </button>
        );
    };

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(80vh)] border border-gray-200 overflow-hidden shadow-md bg-white">
            <aside className="w-full md:w-64 lg:w-72 p-4 md:p-6 md:border-r border-gray-200 bg-blue-950">
                <h2 className="hidden md:block text-xs font-semibold text-blue-100 uppercase tracking-[0.2em] mb-4">
                    Tentang
                </h2>
                <nav>
                    <ul className="flex flex-row md:flex-col gap-2 -mx-1 md:mx-0 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                        {menuItems.map((item) => (
                            <li key={item.id} className="px-1 md:px-0 shrink-0">
                                <NavItem item={item} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-6 md:p-10 bg-gray-50">
                {renderContent()}
            </main>
        </div>
    );
}
