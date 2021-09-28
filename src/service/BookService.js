import React, { Component } from 'react';
import Navbar from '../bar/navbar/Navbar'
import Sidebar from '../bar/sidebar/Sidebar';
import Footer from '../bar/footer/Footer';
import BuildIcon from '@material-ui/icons/Build';
import TodayIcon from '@material-ui/icons/Today';
import HistoryIcon from '@material-ui/icons/History';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { Redirect, Route } from 'react-router-dom'
import queryString from 'query-string'
import './addservice.css'


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: false,
        };
    }

    componentDidMount() {
        const filters = queryString.parse(this.props.location.search)
        var selected_car = filters.car_id.toString()
        this.setState({ carID: selected_car })
        this.setState({ userID: localStorage.getItem('ID') })
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000/service/', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.Info === "Ok") {
                    alert(this.state.cli_date)
                    alert("Zarejestrowałeś wizytę! Czekaj na maila zwrotnego z akceptacją.")
                    // localStorage.setItem("ID", res.ID)
                    this.props.history.push('/Home')
                } else {
                    alert("Nie udało się zarejestrować wizyty, spróbuj ponownie później")
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
            <div>
                <Navbar />
                <div className="parent">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="main">
                        <h3>Uzupełnij informacje potrzebne do złożenia rezerwacji: </h3>
                        <form onSubmit={this.onSubmit}>
                            <h5>Wybierz datę serwisu:</h5>
                            <input
                                type="date"
                                name="cli_date"
                                value={this.state.cli_date}
                                required="True"
                                onChange={this.handleInputChange}
                            /><br />
                            <h5>Opisz zwięźle usterkę</h5>
                            <textarea
                                className="description"
                                type="text"
                                name="cli_desc"
                                required="True"
                                placeholder="Krótki opis usterki"
                                value={this.state.cli_desc}
                                onChange={this.handleInputChange}
                            /><br />
                            <h5>Podaj dodatkowe informację dotyczącą pojazdu/usterki/etc</h5>
                            <textarea
                                type="text"
                                name="cli_info"
                                placeholder="Dodatkowe informacje"
                                value={this.state.cli_info}
                                onChange={this.handleInputChange}
                            /><br />
                            <button className="confirm">Złóż rezerwację</button>
                            <div className="button_box">
                                <button className="backbutton"><a href="/ChooseCar"> Powrót </a></button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

