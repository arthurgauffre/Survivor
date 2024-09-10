import { ChatUi } from "@/app/(private)/chat/chat-ui";
import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { customFetch } from "@/app/components/customFetch";

export default async function Page() {
  const session: {
    isAuth: boolean;
    userId: number;
    role: string;
    accessToken: string;
  } = await verifySession();
  const userRole = session?.role;
  const accessToken: string = session?.accessToken;

  const contactData = await customFetch(
    "http://fastapi:8000/api/chat",
    accessToken
  );
  const contactsReceive: {
    customer_id: number;
    employee_id: number;
    message: string;
    date: string;
    senderId: number;
  }[] = await contactData.json();

  const contactsTMP: {
    contact_id: number;
    message: string;
    date: string;
    senderId: number;
  }[] = contactsReceive.map((contact) => ({
    contact_id:
      userRole === "customer" ? contact.employee_id : contact.customer_id,
    message: contact.message,
    date: contact.date,
    senderId: contact.senderId,
  }));

  let personalData: {
    id: number;
    name: string;
    image: string;
  }[] = [];
  for (const contact of contactsTMP) {
    let contactSum: {
      id: number;
      name: string;
      image: string;
    };
    if (userRole == "customer") {
      const contactData = await customFetch(
        `http://fastapi:8000/api/employees/${contact.contact_id}`,
        accessToken
      );
      const contactInfo = await contactData.json();
      const imageData = await customFetch(
        `http://fastapi:8000/api/employees/${contact.contact_id}/image`,
        accessToken
      );
      const image = await imageData.json();

      contactSum = {
        id: contact.contact_id,
        name: contactInfo.name,
        image: image,
      };
    } else {
      const contactData = await customFetch(
        `http://fastapi:8000/api/employees/${contact.contact_id}`,
        accessToken
      );
      const contactInfo = await contactData.json();
      const imageData = await customFetch(
        `http://fastapi:8000/api/employees/${contact.contact_id}/image`,
        accessToken
      );
      const image = await imageData.json();

      contactSum = {
        id: contact.contact_id,
        name: contactInfo.name,
        image: image,
      };
    }
    personalData.push(contactSum);
  }

  const contacts: {
    contact_id: number;
    message: string;
    date: string;
    senderId: number;
    name: string;
    image: string;
  }[] = contactsTMP.map((contact) => ({
    contact_id: contact.contact_id,
    message: contact.message,
    date: contact.date,
    senderId: contact.senderId,
    name:
      personalData.find((personal) => personal.id === contact.contact_id)
        ?.name || "",
    image:
      personalData.find((personal) => personal.id === contact.contact_id)
        ?.image || "",
  }));

  switch (userRole) {
    case "admin":
      return <ChatUi contacts={contacts} />;
    case "user":
      redirect("/dashboard");
    case "coach":
      return <ChatUi contacts={contacts} />;
    default:
      redirect("/login");
  }
}
