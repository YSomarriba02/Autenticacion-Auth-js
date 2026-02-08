type props = {
  htmlFor: string;
  text: string;
  state: string;
};

export default function Label({ text, htmlFor, state }: props) {
  console.log(state);
  return (
    <label
      htmlFor={htmlFor}
      onClick={(e: React.MouseEvent) => {}}
      className={`${state == "" ? "-translate-y-1/2" : "-translate-y-[165%] text-sm"} peer-focus:text-sm px-2 text-base pointer-events-none bg-zinc-700 absolute top-1/2  translate-x-2 text-gray-200 peer-focus:-translate-y-[165%]  peer-focus:text-blue-400 transition-transform ease-in duration-150`}
    >
      {text}
    </label>
  );
}
