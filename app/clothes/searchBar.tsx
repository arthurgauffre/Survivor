"use client";

export default function SearchBar({
  customers,
}: {
  customers: {
    id: number;
    email: string;
    password: string;
    name: string;
    surname: string;
    birthdate: string;
    gender: string;
    description: string;
    astrologicalSign:string;
    birth_date:string;
    phone_number:string;
    address:string
  }[];
}) {
  function KeyUp() {
    let a, i;
    let input = document.getElementById("mySearch");
    let filter = input.value.toUpperCase();
    let ul = document.getElementById("myMenu");
    let li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  return (
    <div>
      <input
        type="text"
        id="mySearch"
        onKeyUp={KeyUp}
        placeholder="Search.."
        title="Type in an customer name"
        className="w-full p-2 rounded-top-lg"
      />

      <ul id="myMenu">
        {customers.map((customer) => (
          <li key={customer.id}>
            <a href='#'>{customer.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
