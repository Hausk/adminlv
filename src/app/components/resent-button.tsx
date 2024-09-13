"use client";

import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";
import { createEmailCookie } from "@/actions/cookies";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";

export function ResendInput() {
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    createEmailCookie(formData.get("email") as string);
    await signIn("nodemailer", {
      email: formData.get("email"),
      callbackUrl: "/login/verify",
    });
  };
  const validateEmail = (emailInput: string) =>
    emailInput.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (emailInput === "") return false;

    return validateEmail(emailInput) ? false : true;
  }, [emailInput]);

  return (
    <form onSubmit={handleSubmit} className="">
      <Input
        color="default"
        type="email"
        label="Email"
        name="email"
        variant="bordered"
        radius="sm"
        isInvalid={isInvalid}
        className="mx-auto my-10 w-full"
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <Button
        type="submit"
        className="mx-auto w-full"
        color="default"
        variant="shadow"
        radius="sm"
      >
        Se connecter
      </Button>
    </form>
  );
}
