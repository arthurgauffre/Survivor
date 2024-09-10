import { LoginForm } from "./form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col p-4 lg:w-1/3 rounded-lg bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex lg:flex-1 justify-center">
          <a href="/" className="-m-1.5 p-1.5 text-2xl">
            <h1 className="font-bold">Soul Connection</h1>
          </a>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold pb-4 pt-3">Login</h1>
        <p className="text-gray-500">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="mt-6">
        <LoginForm />
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline" href="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
