import React from 'react';
import './Navbar.css'
import { textAlign } from '@material-ui/system';

function logout() {
  localStorage.clear();
  sessionStorage.clear();
}

class Navbar extends React.Component {
    render () {
      return (
        <div>
            <ul>
                <li><a href="/Onas">O nas</a></li>
                <li><a href="/Kontakt">Kontakt</a></li>
                <li style={{float: "right"}} onClick={logout}><a href="/Logowanie">Wyloguj się</a></li>
                <li></li>
                <p> Witaj {sessionStorage.getItem('user_name')} {sessionStorage.getItem('user_surname')}</p>
            </ul>
        </div>
  );
}
}

export default Navbar;
