//import React from 'react';
//import './rejestracja.css';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import React, {Component} from 'react';
// import Nav from '../components/Nav';


export default class Rejestracja extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: false,
        };
    }

    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000/register/', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    alert("Zostałeś zarejestrowany")
                    this.props.history.push('/Logowanie')
                } else {
                   alert("Błąd podczas rejestracji!")
                   //alert(this.state.email)
                }
            })
            .catch(err => {
                console.error(err);
                alert(err);
            });
    }

    render() {
      return (
        <div className="App">
          <div class="login-page">
             <div class="form">
             <h2>Rejestracja</h2>
                <form onSubmit={this.onSubmit} class="login-form" >
                <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={this.state.email}
                onChange={this.handleInputChange}
                />
                <AccountBoxIcon  style={{position: "absolute", marginLeft: "-1.1em", marginTop:"0.2em", fontSize:"2em"}}/>
                <input 
                type="password" 
                name="password"
                placeholder="Hasło"
                value={this.state.password}
                onChange={this.handleInputChange}
                />
                <LockIcon style={{position: "absolute", marginLeft: "-1.1em", marginTop:"0.2em", fontSize: "2em"}} />
                <input 
                type="name" 
                name="name"
                placeholder="Imię"
                value={this.state.name}
                onChange={this.handleInputChange}
                />
                <input 
                type="surname" 
                name="surname"
                placeholder="Nazwisko"
                value={this.state.surname}
                onChange={this.handleInputChange}
                />
                <button>Zarejestruj się</button>
                <p class="message">Zapomniałeś hasła? <a href="#">Przypomnij hasło</a></p>
                <p class="message">Jesteś już zarejestrowany? <a href="/Logowanie">Zaloguj się!</a></p>
                </form>
            </div>
        </div>
        </div>
      );
    }
}
