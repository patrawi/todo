import { useCallback, useState } from "react";

export const useToggle = (initialState: boolean = false) => {
  const [toggle, setToggle] = useState(initialState);
  const onToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);
  return { toggle, onToggle };
};
