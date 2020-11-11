import React, { useState, createContext } from "react";

type ContextProps = {
  dropMenu: boolean;
  setDropMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuContext = createContext<ContextProps>({
  dropMenu: false,
  setDropMenu: () => {},
});

type Props = {
  children: React.ReactNode;
};
export const MenuProvider = ({ children }: Props) => {
  const [dropMenu, setDropMenu] = useState<boolean>(false);
  return (
    <MenuContext.Provider value={{ dropMenu, setDropMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
