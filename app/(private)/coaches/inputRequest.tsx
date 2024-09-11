export default function InputRequest({
  title,
  placeholderString,
}: {
  readonly title: string;
  readonly placeholderString: string;
}) {
  return (
    <div className="rounded-md">
      <input
        id={title}
        name={title}
        type="text"
        placeholder={placeholderString}
        className="block w-full rounded-md py-1.5 pl-4 pr-24 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />
    </div>
  );
}
