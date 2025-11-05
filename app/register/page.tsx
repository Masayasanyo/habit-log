import { Suspense } from "react";
import RegisterForm from "@/components/containers/register/form";

export default function Page() {
  return (
    <div className="">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
