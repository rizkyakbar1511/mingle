import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-full py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image className="w-auto mx-auto" src="/images/app-logo.png" width={72} height={72} alt="logo" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">Sign in to your account</h2>
      </div>
      <AuthForm />
    </div>
  );
}
