"use client";
import { useState, useEffect, useRef } from "react";

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
    astrologicalSign: string;
    birth_date: string;
    phone_number: string;
    address: string;
  }[];
}) {
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [query, setQuery] = useState("");
  const ulRef = useRef<HTMLUListElement | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredCustomers([]);
    } else {
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm)
      );
      setFilteredCustomers(filtered);
      setSelectedIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredCustomers.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const selectedCustomer = filteredCustomers[selectedIndex];
      if (selectedCustomer) {
        setQuery(selectedCustomer.name);
        setFilteredCustomers([]);
      }
    }
  };

  useEffect(() => {
    if (ulRef.current && selectedIndex >= 0) {
      const selectedLi = ulRef.current.children[selectedIndex] as HTMLLIElement;
      selectedLi.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <div className="relative">
      <input
        type="text"
        id="mySearch"
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        value={query}
        placeholder="Search.."
        title="Type in a customer name"
        className="w-full p-2 rounded-top-lg"
      />

      {query && filteredCustomers.length > 0 && (
        <ul
          id="myMenu"
          ref={ulRef}
          className="absolute w-full bg-white border border-gray-300 max-h-60 overflow-auto"
        >
          {filteredCustomers.map((customer, index) => (
            <li
              key={customer.id}
              className={`p-2 cursor-pointer ${
                index === selectedIndex ? "bg-blue-500 text-white" : ""
              }`}
            >
              <a href="#">{customer.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
