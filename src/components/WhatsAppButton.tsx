"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    if (isAdminPage) return null;

    return (
        <motion.a
            href="https://wa.me/5493446330365"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
            }}
            transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
        >
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
            <div className="relative hover:scale-110 transition-transform">
                <Image
                    src="/img/WhatsApp.svg"
                    alt="WhatsApp"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                />
            </div>
        </motion.a>
    );
}
