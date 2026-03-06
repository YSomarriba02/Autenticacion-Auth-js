import FormNuevaPassword from "./FormNuevaPassword";

export default function Paso3() {
  return (
    <section className="min-w-full">
      <section className="flex flex-col gap-6 items-center">
        <h2 className="text-3xl sm-mini:text-lg font-semibold md:text-4xl text-center">
          Restablece tu contraseña
        </h2>
        <p className="text-center sm-mini:text-sm md:text-lg">
          Completa los campos para recuperar tu cuenta.{" "}
        </p>
        <FormNuevaPassword />
      </section>
    </section>
  );
}
