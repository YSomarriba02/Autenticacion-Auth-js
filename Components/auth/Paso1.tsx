import FormEmail from "./FormEmail";

export default function Paso1() {
  return (
    <section className="min-w-full flex flex-col gap-6">
      <h2 className="text-center text-3xl sm-mini:text-lg font-semibold md:text-4xl">
        Reestablecer Password
      </h2>
      <p className="text-center sm-mini:text-sm md:text-lg">
        Ingresa la direccion de correo electronico que usas, enviaremos un
        codigo para reestablecer la contraseña
      </p>
      <FormEmail />
    </section>
  );
}
