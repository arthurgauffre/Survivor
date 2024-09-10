export async function customFetch(url: string, accessToken: string) {
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
