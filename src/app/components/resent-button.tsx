import { signIn } from "@/auth"

export function ResendInput() {
    return (
        <form
            action={async (formData) => {
                "use server"
                await signIn('nodemailer', formData,  {  callbackUrl: "/" })
            }}
        >
            <input type="text" name="email" placeholder="Email" />
            <button type="submit">Signin with Resend</button>
        </form>
    )
}