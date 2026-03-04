import ReestablecerPasswordLayaout from "@/Components/auth/ReestablecerPasswordLayaout";
import { FormProvider } from "@/Components/auth/Provider";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <section className="w-full self-center flex flex-col items-center md:w-3/5 lg:w-1/2">
        <FormProvider>
          <ReestablecerPasswordLayaout />
        </FormProvider>
      </section>
    </div>
  );
}
