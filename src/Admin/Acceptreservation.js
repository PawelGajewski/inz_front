import React, { Component } from 'react';
import './admin.css'
import Navbar from '../bar/navbar/Navbar'
import Sidebar2 from '../bar/sidebar/Sidebar2';
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



const API = 'http://localhost:8000/service/';
const API2 = 'http://localhost:8000/car/';
const API3 = 'http://localhost:8000/emailaccept/';
const API4 = 'http://localhost:8000/emailreject/';

export default class Home extends Component {
    state = {
        loading: true,
        services: [],
    };

    async componentDidMount() {
        const filters = queryString.parse(this.props.location.search)
        var service = filters.service_id.toString()
        this.setState({ service_id: service});
        const response = await fetch(API + service + "/");
        const data = await response.json();
        this.setState({ car: data.carID});
        this.setState({ cli_date: data.cli_date });
        this.setState({ cli_desc: data.cli_desc });
        this.setState({ cli_info: data.cli_info });

        const response2 = await fetch(API2 + this.state.car + "/");
        const data2 = await response2.json();
        this.setState({ car_brand: data2.brand });
        this.setState({ car_model: data2.model });
        this.setState({ car_version: data2.version });
        this.setState({ is_accepted: true });
    }

    Accept = (event) => {
        event.preventDefault();
        fetch(API3 + this.state.service_id + "/", {
            method: 'PATCH',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.Info === "OK") {
                    alert("Pomyślnie zaakceptowano wizyte!")
                    this.props.history.push('/AdminPanel')
                } else {
                    alert("Blad edycji auta, spróbuj ponownie później")
                }
            })
    }

    Reject = (event) => {
        event.preventDefault();
        fetch(API4 + this.state.service_id + "/", {
            method: 'PATCH',
            body: JSON.stringify({'is_rejected': "true"}, {"is_finished:" : "true"}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.Info === "OK") {
                    alert("Wizyta została odrzucona pomyślnie!")
                    this.props.history.push('/AdminPanel')
                } else {
                    alert("Blad odrzucenia wizyty!")
                    //alert(this.state.email)
                }
            })
        }


    render() {
        return (
            <div>
                <Navbar />
                <div className="parent">
                    <div className="sidebar">
                        <Sidebar2 />
                    </div>
                    <div className="main">
                        <h1 className="title">Szczegóły</h1>
                        <p>{this.state.car_brand} {this.state.car_model} {this.state.car_version} </p>
                        <h3>Informacje dotyczące serwisu:</h3>
                        <p>{this.state.cli_date} {this.state.cli_desc} {this.state.cli_info}</p>
                        <form onSubmit={this.Accept}>
                            <button className="details">Akceptuj</button>
                        </form>        
                        <button className="reject" onClick={this.Reject}>Odrzuć</button>
                        <a href="/AdminPanel"><button className="back">Powrót</button></a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

