import ButtonAuth from "./ButtonAuth";
import Field from "./Field";
import Input from "./Input";
import Label from "./Label";

function handler() {}

export default function Autenticacion() {
  return (
    <div className="p-4 flex flex-col gap-6 absolute left-0 right-0 m-auto mt-10 w-5/6 h-[45vh] bg-zinc-700 rounded-md">
      <p className="text-4xl">Login</p>
      <form action="" className="mt-4 flex flex-col gap-4">
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
      <div className="flex h-full">
        <ButtonAuth provider="google" redirect="/profile" />
      </div>
    </div>
  );
}
