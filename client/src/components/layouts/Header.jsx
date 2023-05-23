import React, { Fragment, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthContext from '../../context/AuthContext';
import CartDropdown from './CartDropdown';
import apiCall from '../../apis/axios';

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  let token = '';

  // to avoid getting cookies when not exists
  if (auth) {
    token = Cookies.get('token');
  }
  const url = !token ? '/login' : '/';

  // logout
  const handleLogout = async (e) => {
    e.preventDefault();

    if (token) {
      await apiCall('/logout', 'get');
      Cookies.remove('token', {
        sameSite: 'none',
        secure: true
      });
      setAuth(false);
      navigate('/');
    }
  };

  return (
    <Fragment>
      <div>
        <div className='position-relative mb-5 div-header'>
          <a href="/">
            <img className='position-absolute image-logo' src={require("../../image/Head-Logo.jpg")} alt="Logo" />
          </a>
          <Nav className='justify-content-end mt-3'>
            <Nav.Item>
              {!token ? (
                <Nav.Link className='nav-link' href={url}>
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link className='nav-link' href={url} onClick={(e) => handleLogout(e)}>
                  Logout
                </Nav.Link>
              )}
            </Nav.Item>
            <Nav.Item>
              <CartDropdown />
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;