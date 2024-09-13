import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import Nodemailer from "next-auth/providers/nodemailer"
import nodemailer from "nodemailer";

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        Nodemailer({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT as any,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest({
                identifier: email,
                url,
                provider: { server, from },
            }) {
                // Configurer Nodemailer
                const transport = nodemailer.createTransport(server);

                // Définir le contenu HTML de l'email
                const htmlContent =
                `
                    <body>
                        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;margin:0 auto;padding:20px 0 48px">
                            <tbody>
                                <tr style="width:100%">
                                <td><img alt="Linear" height="42" src="https://react-email-demo-48zvx380u-resend.vercel.app/static/linear-logo.png" style="display:block;outline:none;border:none;text-decoration:none;border-radius:21px;width:42px;height:42px" width="42">
                                    <h1 style="font-size:24px;letter-spacing:-0.5px;line-height:1.3;font-weight:400;color:#484848;padding:17px 0 0">Ton lien magique pour te connecter au Dashboard Libre & Vivant</h1>
                                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding:27px 0 27px">
                                    <tbody>
                                        <tr>
                                        <td><a href="${url}" style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-align:center;padding:11px 23px 11px 23px" target="_blank"><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%;mso-text-raise:16.5" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:8.25px">Se connecter à Libre & Vivant</span><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    <p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149">Ce lien n'est valable que 10 minutes.
                                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px"><a href="https://libre-et-vivant.com" style="color:#b4becc;text-decoration:none;font-size:14px" target="_blank">Libre & Vivant</a>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </body>
                `;
                // Définir le contenu texte de l'email
                const textContent = `Cet email contient votre lien de connexion\n\n`;
                // Envoyer l'email
                transport.sendMail({
                    to: email,
                    from,
                    subject: `[Libre & Vivant] Lien de connexion au Dashboard`,
                    text: textContent,
                    html: htmlContent,
                }).then(() => {
                    console.log('Email de vérification envoyé avec succès.');
                }).catch((error: any) => {
                    console.error('Erreur lors de l\'envoi de l\'email de vérification :', error);
                });
            },
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Rediriger vers la page d'accueil après la connexion
            return baseUrl;
        },
    },
    pages: {
        verifyRequest: "/login/verify", // (used for check email message)
    },
})