import LoginForm from "@/components/containers/login/form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
