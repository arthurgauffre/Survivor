import Image from "next/image";

export default function AstralSign({
  astralSign,
}: {
  astralSign: string;
}): JSX.Element {
  switch (astralSign) {
    case "Aquarius":
      return (
        <div className="flex items-center">
          <Image
            alt="Aquarius"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126255.png"
            width={16}
            height={16}
          />
        </div>
      );
    case "Aries":
      return (
        <div className="flex items-center ">
          <Image
            alt="Aries"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126265.pnge"
            width={16}
            height={16}
          />
        </div>
      );
    case "Cancer":
      return (
        <div className="flex items-center">
          <Image
            alt="Cancer"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126277.png"
            width={16}
            height={16}
          />
        </div>
      );
    case "Capricorn":
      return (
        <div className="flex items-center">
          <Image
            alt="Capricorn"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126286.png"
            width={16}
            height={16}
          />
        </div>
      );
    case "Gemini":
      return (
        <div className="flex items-center">
          <Image
            alt="Gemini"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126299.png"
            width={16}
            height={16}
          />
        </div>
      );
    case "Leo":
      return (
        <div className="flex items-center">
          <Image
            alt="Leo"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126307.png"
            width={16}
            height={16}
          />
        </div>
      );
    case "Libra":
      return (
        <div className="flex items-center">
          <Image
            alt="Libra"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126316.png"
            width={16}
            height={16}
          />
        </div>
      );
    case "Pisces":
      return (
        <div className="flex items-center">
          <Image
            alt="Pisces"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126324.png"
            width={16}
            height={16}
          />
        </div>
      );
    case "Sagittarius":
      return (
        <div className="flex items-center">
          <Image
            alt="Sagittarius"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126332.png"
            width={16}
            height={16}
          />
        </div>
      );
    case "Scorpio":
      return (
        <div className="flex items-center">
          <Image
            alt="Scorpio"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126340.png"
            width={16}
            height={16}
          />
        </div>
      );
    case "Taurus":
      return (
        <div className="flex items-center">
          <Image
            alt="Taurus"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126347.png"
            width={16}
            height={16}
          />
        </div>
      );
    case "Virgo":
      return (
        <div className="flex items-center">
          <Image
            alt="Virgo"
            src="https://cdn-icons-png.flaticon.com/512/13126/13126359.png"
            width={16}
            height={16}
          />
        </div>
      );
    default:
      return <div></div>;
  }
}
