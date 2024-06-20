import { auth } from "@/auth"
import { ResendInput } from '../components/resent-button';
import { SignIn } from '../components/signin-button';
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();
    if (session) {
        redirect('/')
    }
    return (
        <div>
            <h1>Login</h1>
            <SignIn />
            <ResendInput />
        </div>
    );
}