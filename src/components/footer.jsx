import logoPSI from '../assets/logo-psi.png';
import { Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-blue-950 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
                <div className="flex flex-col md:flex-row md:justify-between gap-10">
                    <div className="shrink-0">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={logoPSI}
                                alt="PSI Logo"
                                className="h-12 w-auto"
                            />
                            <span className="font-semibold text-xl text-white">
                                Physical Society of Indonesia
                            </span>
                        </div>
                        <p className="text-sm max-w-md">
                            PSI - Physical Society of Indonesia
                        </p>
                    </div>

                    <div className="text-sm md:text-right">
                        <p className="font-semibold text-base text-white mb-2">
                            Contact Us
                        </p>
                        <address className="not-italic">
                            <p>Sarijadi Blok 2 No 22 RT 008, RW 002</p>
                            <p>Kel. Sarijadi, Kec. Sukasari</p>
                            <p>Bandung, Jawa Barat, Indonesia 40151</p>
                        </address>
                        <a
                            href="mailto:psi@fisika.or.id"
                            className="mt-4 inline-flex items-center gap-2 text-blue-300 hover:text-white hover:underline transition-colors"
                        >
                            <Mail size={16} />
                            psi@fisika.or.id
                        </a>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-blue-800 text-center text-sm">
                    &copy; {new Date().getFullYear()} Physical Society of Indonesia. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
