"use client";

import { useRef, useState, useEffect } from "react";
import Manequin from "./manequin";
import { customFetch } from "@/app/components/customFetch";

export default function SearchBar({
  accessToken,
  customers,
}: {
  readonly customers: {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthdate: string;
    gender: string;
    description: string;
    astrologicalSign: string;
    phone_number: string;
    address: string;
  }[];
  readonly accessToken: string;
}) {
  type Image = {
    id: number;
    customer_id: number;
    type: string;
    img_content: string;
  };

  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [query, setQuery] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>(1);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const [hat, setHat] = useState<Image[]>([]);
  const [top, setTop] = useState<Image[]>([]);
  const [bottom, setBottom] = useState<Image[]>([]);
  const [shoes, setShoes] = useState<Image[]>([]);

  const  updateHat = (hat: Image[]) => {
    setHat(hat);
  }

  const  updateTop = (top: Image[]) => {
    setTop(top);
  }

  const  updateBottom = (bottom: Image[]) => {
    setBottom(bottom);
  }

  const  updateShoes = (shoes: Image[]) => {
    setShoes(shoes);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredCustomers([]);
    } else {
      const filtered = customers.filter((customer) =>
        (
          customer.name.toLowerCase() +
          " " +
          customer.surname.toLowerCase()
        ).includes(searchTerm)
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
        setQuery(
          (selectedCustomer.name + " " + selectedCustomer.surname).trim()
        );
        setFilteredCustomers([]);
        setSelectedCustomerId(selectedCustomer.id);
      }
    }
  };

  useEffect(() => {
    if (ulRef.current && selectedIndex >= 0) {
      const selectedLi = ulRef.current.children[selectedIndex] as HTMLLIElement;
      selectedLi.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  useEffect(() => {
    async function fetchHat() {
      if (selectedCustomerId) {
        try {
          const hatData = await customFetch(
            `http://localhost:8000/api/customers/${selectedCustomerId}/clothes/hat`,
            accessToken
          );
          const hat = await hatData.json();
          updateHat(hat);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchHat();
  }, [selectedCustomerId, accessToken]);

  useEffect(() => {
    async function fetchTop() {
      if (selectedCustomerId) {
        try {
          const topData = await customFetch(
            `http://localhost:8000/api/customers/${selectedCustomerId}/clothes/top`,
            accessToken
          );
          const top = await topData.json();
          updateTop(top);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchTop();
  }, [selectedCustomerId, accessToken]);

  useEffect(() => {
    async function fetchBottom() {
      if (selectedCustomerId) {
        try {
          const bottomData = await customFetch(
            `http://localhost:8000/api/customers/${selectedCustomerId}/clothes/bottom`,
            accessToken
          );
          const bottom = await bottomData.json();
          updateBottom(bottom);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchBottom();
  }, [selectedCustomerId, accessToken]);

  useEffect(() => {
    async function fetchShoes() {
      if (selectedCustomerId) {
        try {
          const shoesData = await customFetch(
            `http://localhost:8000/api/customers/${selectedCustomerId}/clothes/shoes`,
            accessToken
          );
          const shoes = await shoesData.json();
          updateShoes(shoes);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchShoes();
  }, [selectedCustomerId, accessToken]);

  return (
    <div>
      <div className="justify-center border-2">
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
                  onClick={() => setSelectedCustomerId(customer.id)}
                >
                  <a href="#">
                    {customer.name} {customer.surname}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Manequin hat={hat} top={top} bottom={bottom} shoes={shoes} />
    </div>
  );
}
