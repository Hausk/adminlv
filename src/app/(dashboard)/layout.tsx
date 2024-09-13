import { auth } from "@/auth"
import { redirect } from 'next/navigation'
import { Providers } from "../providers";

export default async function Dashboard({children}: any) {
    const session = await auth();
    if (!session) {
        redirect('/login')
    }
  return (
    <div className="text-foreground">
      <Providers>
       {children}
      </Providers>
    </div>
  );
}