import "server-only";

import { customFetch } from "@/app/components/customFetch";

export const getCustomersImage = async (
  accessToken: string
): Promise<string[]> => {
  try {
    const customersData = await customFetch(
      "http://fastapi:8000/api/customers",
      accessToken
    );
    const customers = await customersData.json();

    let jsonPromiseTable: Promise<any>[] = [];

    for (let customer of customers) {
      jsonPromiseTable.push(
        (await customFetch(
          "http://fastapi:8000/api/customers/" + customer.id + "/image",
          accessToken
        )).json()
      );
    }

    return await Promise.all(jsonPromiseTable);
  } catch (e) {
    return [];
  }
};
