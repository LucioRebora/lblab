/**
 * Genera el HTML para los correos electrónicos.
 * Adaptado del diseño premium solicitado, con los colores de la marca.
 */
export function getEmailTemplate({
  title,
  preheader,
  data,
  customBody,
}: {
  title: string;
  preheader: string;
  data: Record<string, string>;
  customBody?: string;
}) {
  const rows = Object.entries(data)
    .map(([key, value], index) => {
      const isEven = index % 2 === 0;
      const bgColor = isEven ? "#ffffff" : "#f8fafc";

      // Manejar links para emails
      const displayValue = key.toLowerCase().includes("email")
        ? `<a href="mailto:${value}" style="color:#a13242; text-decoration:none; font-weight:600;">${value}</a>`
        : value;

      return `
        <tr style="background:${bgColor};">
          <td style="padding:12px 16px; width:180px; color:#64748b; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">
            ${key}
          </td>
          <td style="padding:12px 16px; color:#1e293b; font-size:14px; font-weight:500;">
            ${displayValue}
          </td>
        </tr>
      `;
    })
    .join("");

  return `
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <style>
    :root {
      color-scheme: light;
      supported-color-schemes: light;
    }
    @media (prefers-color-scheme: dark) {
      body, .body-bg { background-color: #f8fafc !important; color: #1e293b !important; }
      .content-bg { background-color: #ffffff !important; color: #1e293b !important; }
      .text-dark, p, td, h1 { color: #1e293b !important; }
      .text-muted { color: #64748b !important; }
      .header-dark { background-color: #1a1a1a !important; color: #ffffff !important; }
    }
    /* Selectores específicos para Gmail y Outlook */
    [data-ogsc] .body-bg { background-color: #f8fafc !important; }
    [data-ogsc] .content-bg { background-color: #ffffff !important; }
    [data-ogsc] .text-dark { color: #1e293b !important; }
  </style>
  <title>${title}</title>
</head>
<body class="body-bg" style="margin:0; padding:0; background-color:#f8fafc; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <!-- Preheader -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    ${preheader}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="body-bg" style="background-color:#f8fafc; padding:40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="content-bg" style="max-width:600px; background-color:#ffffff; border-radius:24px; overflow:hidden; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header -->
          <tr>
            <td style="padding:32px; background-color:#ffffff; border-bottom:1px solid #f1f5f9;">
              <table role="presentation" width="100%">
                <tr>
                  <td align="center">
                    <img src="https://lblab.com.ar/img/logo-lblab.png" alt="LB Lab" width="180" style="display:block; border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title Bar -->
          <tr>
            <td class="header-dark" style="padding:24px 32px; background-color:#1a1a1a;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <h1 style="margin:0; color:#ffffff; font-size:18px; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; line-height:1.4;">
                      ${title}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Decoration Border -->
          <tr>
            <td style="height:6px; background-color:#a13242;"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;">
              <p class="text-dark" style="margin:0 0 24px 0; font-size:16px; color:#1e293b; font-weight:700;">
                ${customBody || "Se ha recibido una nueva notificación con los siguientes detalles:"}
              </p>

              <!-- Data Table Card -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e2e8f0; border-radius:16px; overflow:hidden; border-collapse: separate;">
                ${rows}
              </table>


            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px; background-color:#f1f5f9; border-top:1px solid #e2e8f0;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <p style="margin:0; color:#94a3b8; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">
                      Laboratorio LB Lab
                    </p>
                    <p style="margin:4px 0 0 0; color:#cbd5e1; font-size:11px;">
                      © ${new Date().getFullYear()} Todos los derechos reservados.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        

      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
