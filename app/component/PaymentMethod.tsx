import Image from "next/image";

export default function PaymentMethod({
  payment,
}: {
  payment: string;
}): JSX.Element {
  switch (payment) {
    case "PayPal":
      return (
        <div className="flex items-center ">
          <Image
            alt="Paypal"
            src="https://cdn.simpleicons.org/paypal/white"
            width={16}
            height={16}
            style={{
              backgroundColor: "#003087",
            }}
          />
        </div>
      );
    case "Bank Transfer":
      return (
        <div className="flex items-center">
          <Image
            alt="Visa"
            src="https://cdn.simpleicons.org/visa/white"
            width={16}
            height={16}
            style={{
              backgroundColor: "#1A1F71",
            }}
          />
        </div>
      );
    case "Credit Card":
      return (
        <div className="flex items-center">
          <Image
            alt="Credit Card"
            src="https://cdn.simpleicons.org/mastercard/white"
            width={16}
            height={16}
            style={{
              backgroundColor: "#FF5F00",
            }}
          />
        </div>
      );
    default:
      return (
        <div className="flex items-center ">
          <Image
            alt="Visa"
            src="https://cdn.simpleicons.org/visa/white"
            width={16}
            height={16}
            style={{
              backgroundColor: "#1A1F71",
            }}
          />
        </div>
      );
  }
}
