import { useEffect } from "react";
export const useDetectOutsideClick = (ref, handler) => {
  const listener = (e) => {
    if (!ref.current || ref.current.contains(e.target)) return;
    handler(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  });
};
