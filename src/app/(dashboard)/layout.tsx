import { auth } from "@/auth"
import { redirect } from 'next/navigation'

export default async function Dashboard({children}: any) {
    const session = await auth();
    if (!session) {
        redirect('/login')
    }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
      {children}
      {/* Contenu du dashboard */}
    </div>
  );
}