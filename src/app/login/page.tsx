import { auth } from "@/auth";
import { ResendInput } from "../components/resent-button";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Login() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex w-screen h-screen bg-gradient-to-br from-gray-600 to-gray-950">
      <div className="m-auto w-1/3">
        <Image
          src={"/logo.png"}
          width={150}
          height={150}
          alt="logo"
          className="mx-auto"
        />
        <h1 className="text-white font-bold text-3xl text-center">
          Panel d&apos;Administration <br />
          Libre &amp; Vivant
        </h1>
        <ResendInput />
      </div>
    </div>
  );
}
