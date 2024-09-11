import { RegisterForm } from "./form";

export default function Page() {
  return (
    <div className="flex flex-col p-4 mb-6 lg:w-1/3 rounded-lg bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex lg:flex-1 justify-center">
          <h1 className="text-4xl -m-1.5 p-1.5 font-bold">Soul Connection</h1>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold pb-4 pt-3">Register</h1>
        <p className="text-gray-500">
          complete the form below to create your account
        </p>
      </div>
      <div className="mt-6">
        <RegisterForm />
      </div>
    </div>
  );
}
