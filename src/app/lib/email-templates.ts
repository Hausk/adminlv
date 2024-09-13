export function html({
  url,
  host,
  email,
}: {
  url: string;
  host: any;
  email: string;
}) {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;
  return `
        <body>
            <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background-color: #f9f9f9; text-align: center;">
                <tr>
                    <td align="center">
                        <h1 style="color: #333;">Welcome to ${escapedHost}!</h1>
                        <p style="color: #333;">Click the button below to sign in:</p>
                        <a href="${url}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Sign in</a>
                        <p style="color: #333;">Or copy and paste this URL into your browser: ${url}</p>
                        <p style="color: #999;">If you did not request this email, you can safely ignore it.</p>
                    </td>
                </tr>
            </table>
        </body>
    `;
}

export function text({ url, host }: { url: string; host: any }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
