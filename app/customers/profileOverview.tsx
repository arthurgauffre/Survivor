const people = [
  {
    id: 13085,
    name: "Leslie",
    surname: "Alexander",
    email: "leslie.alexander@example.com",
    birth_date: "1990-01-01",
    gender: "female",
  },
  {
    id: 10344,
    name: "Truc",
    surname: "Moose",
    email: "leslie.alexander@example.com",
    birth_date: "1990-01-01",
    gender: "male",
  },
  {
    id: 50933,
    name: "Muche",
    surname: "Moose",
    email: "leslie.alexander@example.com",
    birth_date: "1990-01-01",
    gender: "male",
  },
  {
    id: 24425,
    name: "Koda",
    surname: "Bear",
    email: "leslie.alexander@example.com",
    birth_date: "1990-01-01",
    gender: "male",
  },
  {
    id: 12482,
    name: "Keenai",
    surname: "Bear",
    email: "leslie.alexander@example.com",
    birth_date: "1990-01-01",
    gender: "male",
  },
];

export default function profileOverview() {
  return (
    <div>
      {people.map((person) => (
        <li
          key={person.email}
          className="flex justify-between gap-x-6 py-5 border-y bg-white px-4"
        >
          <div className="flex min-w-0 gap-x-4">
            <img
              alt=""
              src="https://media.tenor.com/6uPPCdKYocAAAAAe/panik-kalm.png"
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {person.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {person.email}
              </p>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}
