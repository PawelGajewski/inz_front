//import React from 'react';
import './logowanie.css';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import React, { Component } from 'react';
// import Nav from '../components/Nav';


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: false,
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000/login/', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("ID", 'null')
                if (res.ID !== null) {
                    //alert("Zostałeś zalogowany")
                    localStorage.setItem("ID", res.ID)
                    localStorage.setItem('is_admin', res.Is_Admin)
                    if(localStorage.getItem('is_admin') === 'true') this.props.history.push('/AdminPanel')
                    else this.props.history.push('/Home')
                } else {
                    alert("Blad logowania, spróbuj ponownie później")
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
            <div className="main">
                <div class="login-page">
                    <div class="form">
                        <h2>Logowanie</h2>
                        <form onSubmit={this.onSubmit} class="login-form" >
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                            <AccountBoxIcon style={{ position: "absolute", marginLeft: "-1.1em", marginTop: "0.2em", fontSize: "2em" }} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Hasło"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                            <LockIcon style={{ position: "absolute", marginLeft: "-1.1em", marginTop: "0.2em", fontSize: "2em" }} />
                            <button>Zaloguj</button>
                            <p class="message">Zapomniałeś hasła? <a href="#">Przypomnij hasło</a></p>
                            <p class="message">Nie jesteś zarejestrowany? <a href="/Rejestracja">Zarejestruj się!</a></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
