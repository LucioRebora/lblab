import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

import { getEmailTemplate } from "./mail-templates";

/**
 * Función base para envío de correos.
 * Soporta plantillas dinámicas basadas en los datos proporcionados.
 */
export async function sendMail({
    to,
    subject,
    title,
    preheader,
    data
}: {
    to: string;
    subject: string;
    title: string;
    preheader: string;
    data: Record<string, string>;
}) {
    try {
        const html = getEmailTemplate({ title, preheader, data });

        // Ruta absoluta al logo para adjuntarlo
        const logoPath = path.join(process.cwd(), "public", "img", "logo-lblab.png");

        const info = await transporter.sendMail({
            from: `"Laboratorio LB Lab" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            text: `${title}\n\n${Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n")}`,
            html,
            attachments: [
                {
                    filename: 'logo-lblab.png',
                    path: logoPath,
                    cid: 'logo', // mismo ID que usamos en el template <img src="cid:logo">
                }
            ]
        });

        console.log("Email enviado: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error al enviar email:", error);
        throw error;
    }
}
