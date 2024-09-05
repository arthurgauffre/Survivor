export default function PaymentMethod({ payment }: { payment: string }): JSX.Element {
    switch (payment) {
      case "PayPal":
        return (
          <div className="flex items-center ">
            <img
              alt="Paypal"
              src="https://cdn.simpleicons.org/paypal/white"
              className="h-4 w-4 bg-[#003087]"
            />
          </div>
        );
      case "Bank Transfer":
        return (
          <div className="flex items-center">
            <img
              alt="Bank Transfer"
              src="https://cdn.simpleicons.org/visa/white"
              className="h-4 w-4 bg-[#1A1F71]"
            />
          </div>
        );
      case "Credit Card":
        return (
          <div className="flex items-center ">
            <img
              alt="Credit Card"
              src="https://cdn.simpleicons.org/mastercard/white"
              className="h-4 w-4 bg-[#EB001B]"
            />
          </div>
        );
      default:
        return (
          <div className="flex items-center ">
            <img
              alt="Paypal"
              src="https://cdn.simpleicons.org/visa/white"
              className="h-4 w-4 bg-[#1A1F71]"
            />
          </div>
        );
    }
  }