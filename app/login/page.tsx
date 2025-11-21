import { Suspense } from "react";
import LoginForm from "@/components/containers/login/LoginForm";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
