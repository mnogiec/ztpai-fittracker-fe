import { useState } from 'react';
import { Header } from '../Header/Header';
import SideMenu from '../SideMenu/SideMenu';

export const Layout = ({
  children,
  isSimpleHeader = false,
  isUtils = false,
}: {
  children: React.ReactNode;
  isSimpleHeader?: boolean;
  isUtils?: boolean;
}) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div>
      <Header
        toggleMenu={() => setIsSideMenuOpen(!isSideMenuOpen)}
        isSimpleHeader={isSimpleHeader}
      />
      <SideMenu isOpen={isSideMenuOpen} />
      {isUtils ? (
        <div className='utils-main'>{children}</div>
      ) : (
        <div className='main'>{children}</div>
      )}
    </div>
  );
};
