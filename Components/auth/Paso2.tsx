"use client";
import FormOtp from "../Profile/FormOtp";
import { useFormContext } from "./Provider";
import { useEmailContext } from "./ProviderEmail";

export default function Paso2() {
  const provider = useFormContext();
  const { indice, arrPasos } = provider!;
  const emailContext = useEmailContext();
  const { email } = emailContext!;
  const show = arrPasos[indice] == "p2";
  return (
    <section className="min-w-full flex flex-col gap-6">
      <h2 className="text-3xl sm-mini:text-lg font-semibold md:text-4xl text-center">
        Revisa tu correo electronico
      </h2>
      <p className="text-center sm-mini:text-sm md:text-lg">
        Verifica que eres tu ingresando el codigo de un solo uso que te enviamos
        a:
      </p>
      <FormOtp show={show} email={email} />
    </section>
  );
}
