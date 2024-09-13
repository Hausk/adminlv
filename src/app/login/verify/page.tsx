import { auth } from "@/auth"
import { redirect } from "next/navigation";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import VerifyCard from "@/app/components/ui/verify-card";

export default async function Login() {
    const session = await auth();
    if (session) {
        redirect('/')
    }
    return (
        <div className="w-screen h-screen overflow-hidden flex">
            <VerifyCard />
        </div>
    );
}