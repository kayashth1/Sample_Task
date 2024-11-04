import React from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

function Nav({ userInfo, setSearchQuery }) {
  const navigate = useNavigate();

  const [searchText, setSearchText] = React.useState('');

  const handleLogout = () => {

    localStorage.clear();
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchQuery('');
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <h1>Sample_Page</h1>
      </div>
      <div className="nav-middle">
        
        <button onClick={clearSearch} className="clear-button">{searchText.length !== 0 && '✖'}</button>
      </div>
      <div className="nav-right">
        <span>
          {userInfo?.fullName}
        </span>
        <button className="nav-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Nav;
