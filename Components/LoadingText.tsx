import { useEffect, useRef, useState } from "react";

interface props {
  isPending: boolean;
  text: string;
  loadingText: string;
}

export default function LoadingText({ isPending, loadingText, text }: props) {
  const refSpan = useRef<HTMLSpanElement | null>(null);
  const reftext = useRef<HTMLParagraphElement | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPending) {
      setShowLoader(true);
    } else {
      timer = setTimeout(() => setShowLoader(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isPending]);

  return (
    <div className="relative overflow-hidden text-sm flex justify-center items-center">
      <span
        className={`${showLoader ? "scale-100 -translate-x-1/2" : "scale-0 translate-x-full"} text-[12px] transition-transform ease-in duration-300 flex items-center justify-center absolute left-1/2`}
      >
        {loadingText}
        <div className="absolute right-[-30%] size-4 rounded-full border-2 border-black border-t-white animate-spin" />
      </span>
      <p
        className={`${showLoader ? "-translate-x-full scale-0" : "translate-x-0 scale-100"} transition-transform ease-in duration-300`}
      >
        {text}
      </p>
    </div>
  );
}
