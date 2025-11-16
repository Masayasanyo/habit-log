import { Suspense } from "react";
import RegisterForm from "@/components/containers/register/form";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
