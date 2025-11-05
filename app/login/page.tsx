import { Suspense } from "react";
import LoginForm from "@/components/containers/login/form";

export default function Page() {
  return (
    <div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
