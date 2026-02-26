import nodemailer from "nodemailer";

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
    data,
    customBody,
}: {
    to: string;
    subject: string;
    title: string;
    preheader: string;
    data: Record<string, string>;
    customBody?: string;
}) {
    try {
        const html = getEmailTemplate({ title, preheader, data, customBody });

        const info = await transporter.sendMail({
            from: `"Laboratorio LB Lab" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            text: `${customBody ? customBody.replace(/<br\s*\/?>/gi, '\n') + '\n\n' : ''}${title}\n\n${Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n")}`,
            html,
        });

        console.log("Email enviado: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error al enviar email:", error);
        throw error;
    }
}
