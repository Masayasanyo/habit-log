import LoginForm from "@/components/containers/login/form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
