import { useEffect } from "react";

type RefType = React.RefObject<HTMLElement>;
type HandlerType = (event: MouseEvent | TouchEvent) => void;

const useOnClickOutside = (ref: RefType, handler: HandlerType) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
