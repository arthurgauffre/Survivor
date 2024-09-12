import { UserCircleIcon } from "@heroicons/react/24/solid";
import SpawnHeadband from "@/app/components/SpawnHeadband";
import { customFetch } from "@/app/components/customFetch";
import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function ClientProfilPage() {
  const session: {
    isAuth: boolean;
    userId: number;
    role: string;
    accessToken: string;
  } = await verifySession();
  const userRole = session?.role;
  const accessToken: string = session?.accessToken;

  let data;

  switch (userRole) {
    case "admin":
      data = await customFetch("http://fastapi:8000/api/employees/" + session.userId, accessToken);
      break;
    case "customer":
      data = await customFetch("http://fastapi:8000/api/customers/" + session.userId, accessToken);
      break;
    case "coach":
      data = await customFetch("http://fastapi:8000/api/employees/" + session.userId, accessToken);
      break;
    default:
      redirect("/login");
  }

  let self = await data.json();
  return (
    <SpawnHeadband title="Your Profile">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    value={self.name}
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <br />

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Surname
                </label>
                <div className="mt-2">
                  <input
                    value={self.surname}
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender
              </label>
              <div className="mt-2">
                <input
                  value={self.gender}
                  id="gender"
                  name="gender"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="birth_date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Birth Date
              </label>
              <div className="mt-2">
                <input
                  value={self.birthdate}
                  id="birth_date"
                  name="birth_date"
                  type="date"
                  autoComplete="given-name"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  value={self.email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="given-name"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </SpawnHeadband>
  );
}
