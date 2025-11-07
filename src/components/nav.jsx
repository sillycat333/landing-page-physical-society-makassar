import { useState } from 'react';
import logoPSI from '../assets/logo-psi.png';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Kegiatan', href: '/kegiatan' },
    { label: 'Buku', href: '/buku' },
    { label: 'AD ART', href: '/art' },
    { label: 'Tentang', href: '/tentang' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50 bg-blue-950 backdrop-blur border-b border-blue-900 shadow-md">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src={logoPSI}
                        alt="Logo PSI"
                        className="h-10 w-auto drop-shadow-sm"
                    />
                    <div className="leading-tight">
                        <span className="font-semibold text-sm sm:text-base md:text-lg text-white block">
                            Physical Society of Indonesia
                        </span>
                        <span className="text-xs sm:text-sm text-blue-300 tracking-wide">
                            Cabang Makassar
                        </span>
                    </div>
                </Link>

                {/* Desktop nav */}
                <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm tracking-[0.18em] uppercase">
                    {navItems.map((item) => {
                        const isActive =
                            location.pathname === item.href ||
                            (item.href !== '/' &&
                                location.pathname.startsWith(item.href));

                        return (
                            <li key={item.label}>
                                <Link
                                    to={item.href}
                                    className={`
                                        relative inline-flex flex-col items-center
                                        font-semibold transition-colors duration-150
                                        ${isActive
                                            ? 'text-blue-200'
                                            : 'text-gray-300 hover:text-white'}
                                    `}
                                >
                                    <span className="pb-1">
                                        {item.label}
                                    </span>
                                    <span
                                        className={`
                                            h-[2px] w-7 rounded-full bg-blue-400
                                            transition-opacity duration-150
                                            ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}
                                        `}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 focus:ring-offset-blue-950"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile nav */}
            <div
                className={`
                    md:hidden overflow-hidden bg-blue-950/98 border-t border-blue-900
                    transition-all duration-250 ease-out
                    ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <ul className="flex flex-col px-4 py-3 gap-1">
                    {navItems.map((item) => {
                        const isActive =
                            location.pathname === item.href ||
                            (item.href !== '/' &&
                                location.pathname.startsWith(item.href));

                        return (
                            <li key={item.label}>
                                <Link
                                    to={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                        block py-2.5 px-3 rounded-lg text-sm font-semibold uppercase tracking-[0.16em]
                                        transition-colors duration-150
                                        ${isActive
                                            ? 'bg-blue-900 text-blue-100'
                                            : 'text-gray-200 hover:bg-blue-900 hover:text-white'}
                                    `}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </header>
    );
}
