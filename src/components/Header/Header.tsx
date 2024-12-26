import { Link } from "react-router";

export const Header = ({
  toggleMenu,
  isSimpleHeader = false,
}: {
  toggleMenu: () => void;
  isSimpleHeader?: boolean;
}) => {
  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Logout initiated");
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img
            src="/assets/images/logo.svg"
            alt="FitTracker logo"
            className="logo"
          />
        </Link>
        {!isSimpleHeader && (
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link text-xl">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/exercises-base" className="nav-link text-xl">
                  Exercises base
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/private-exercises" className="nav-link text-xl">
                  Private exercises
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      {!isSimpleHeader && (
        <>
          <form onSubmit={handleLogout} className="logout-form">
            <button type="submit" className="logout-button text-xl">
              Logout
            </button>
          </form>
          <div
            className="hamburger"
            onClick={toggleMenu}
            id="hamburger"
            role="button"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </>
      )}
    </header>
  );
};
