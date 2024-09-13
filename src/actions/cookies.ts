'use server'
import { cookies } from "next/headers";


export async function getEmailCookie(): Promise<string> {
  const cookie = cookies().get('email');
  return cookie?.value ?? '';
}

export async function createEmailCookie(data: string) {
  cookies().set('email', data);
}
export async function deleteEmailCookie() {
    cookies().delete('email')
}