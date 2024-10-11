import { useState } from "react";

export const useDialog = (initialState: boolean = false) => {
  const [open, setOpen] = useState(initialState);
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  return { open, openDialog, closeDialog };
};
