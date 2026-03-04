type props = {
  htmlFor: string;
  text: string;
  state: string;
};

export default function Label({ text, htmlFor, state }: props) {
  return (
    <label
      htmlFor={htmlFor}
      onClick={(e: React.MouseEvent) => {}}
      className={`${state == "" ? "-translate-y-1/2 text-[12px]" : "-translate-y-[185%] text-sm"} peer-focus:text-sm px-2 py-0 pointer-events-none absolute top-1/2  translate-x-2 text-text peer-focus:-translate-y-[185%] text-text bg-base peer-focus:text-blue-400 transition-transform ease-in duration-150`}
    >
      {text}
    </label>
  );
}
