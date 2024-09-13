"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import { MailCheck } from "lucide-react";
import { getEmailCookie } from "@/actions/cookies";

export default function VerifyCard() {
  const [emailCookie, setEmailCookie] = useState("");
  useEffect(() => {
    const fetchCookies = async () => {
      const cookie = await getEmailCookie();
      setEmailCookie(cookie); // Met à jour l'état uniquement si le cookie n'est pas undefined
    };
    fetchCookies();
  }, []);
  return (
    <Card className="max-w-[400px] m-auto p-8">
      <CardHeader className="flex flex-col gap-3">
        <MailCheck size={52} className="text-violet-400" />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Regardes tes emails</h1>
        </div>
      </CardHeader>
      <CardBody className="mb-5">
        <p className="text-center">
          Un email de vérification à été envoyé à <br />
          {emailCookie ? (
            <span className="font-bold">{emailCookie}</span>
          ) : (
            <span className="font-bold blur-sm">xx.xx@gmail.com</span>
          )}
        </p>
        <p className="text-center">
          Clique sur le lien reçu par email pour accéder au dashboard.
        </p>
      </CardBody>
      <Divider />
      <CardFooter className="pb-0 mb-0 mt-3">
        <Link
          isExternal
          showAnchorIcon
          href="https://libre-et-vivant.com"
          className="text-foreground/80"
        >
          Libre & Vivant.
        </Link>
      </CardFooter>
    </Card>
  );
}
