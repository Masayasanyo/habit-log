import RegisterForm from "@/components/containers/register/form";
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
