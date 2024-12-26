import { useState } from "react";
import { Header } from "../Header/Header";
import SideMenu from "../SideMenu/SideMenu";

export const Layout = ({ children, isSimpleHeader = false }: { children: React.ReactNode, isSimpleHeader?: boolean }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div>
      <Header toggleMenu={() => setIsSideMenuOpen(!isSideMenuOpen)} isSimpleHeader={isSimpleHeader} />
      <SideMenu isOpen={isSideMenuOpen} />
      {children}
    </div>
  );
};
