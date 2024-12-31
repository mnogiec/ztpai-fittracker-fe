import { Link, useNavigate } from 'react-router';
import { ACCESS_TOKEN_KEY, USER_KEY } from '../../pages/Login/LoginPage';
import { useQueryClient } from '@tanstack/react-query';

const SideMenu = ({ isOpen }: { isOpen: boolean }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    queryClient.clear();
    navigate('/login', { replace: true });
  };

  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`} id='side-menu'>
      <ul className='side-menu-list'>
        <li className='side-menu-item'>
          <Link to='/' className='side-menu-link text-xl'>
            Home
          </Link>
        </li>
        <li className='side-menu-item'>
          <Link to='/exercises-base' className='side-menu-link text-xl'>
            Exercises base
          </Link>
        </li>
        <li className='side-menu-item'>
          <Link to='/private-exercises' className='side-menu-link text-xl'>
            Private exercises
          </Link>
        </li>
        <li className='side-menu-item'>
          <form onSubmit={handleLogout}>
            <button
              type='submit'
              className='side-menu-link text-xl side-menu-logout'>
              Logout
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
