'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function WhatsAppCTA() {
    return (
        <Link
            href="https://wa.me/sua_numero_aqui"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8 py-4 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-lg flex items-center justify-center gap-3 w-fit mx-auto"
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                <MessageCircle size={24} className="animate-pulse" />
                Solicitar Orçamento Personalizado
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
        </Link>
    );
}
