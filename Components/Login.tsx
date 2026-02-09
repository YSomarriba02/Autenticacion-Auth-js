import ButtonAuth from "./ButtonAuth";
import Field from "./Field";
import Link from "next/link";

function handler() {}

export default function Login() {
  return (
    <div className="p-4 flex flex-col gap-6 absolute left-0 right-0 m-auto w-5/6 bg-zinc-700 rounded-2xl sm:w-3/5 top-[15vh] md:pt-8 lg:w-2/6">
      <p className="text-4xl">Login</p>
      <form action="" className="mt-4 flex flex-col gap-4 md:gap-6">
        <Field max={30} min={4} name="usuario" required={true} text="usuario" />
        <Field
          max={30}
          min={4}
          name="password"
          required={true}
          text="contraseña"
          typeInput={"password"}
        />
      </form>
      <div className="relative ">
        <hr />
        <Link
          className="px-2 bg-zinc-700 text-blue-400 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 md:text-lg"
          href={"/auth/signup"}
        >
          registrarse
        </Link>
      </div>
      <div className="flex h-full mt-8">
        <ButtonAuth provider="google" redirect="/profile" />
      </div>
    </div>
  );
}
