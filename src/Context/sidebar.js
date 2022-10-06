import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const SidebarNav = createContext({});


export function SideBarProvider({ children }) {
  const disclose = useDisclosure()

  return (
    <SidebarNav.Provider value={disclose}>
      {children}
    </SidebarNav.Provider>
  )
}


export const useSidebar = () => useContext(SidebarNav)
