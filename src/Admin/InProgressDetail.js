import React, { Component } from 'react';
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
import queryString from 'query-string'
import './admin.css'
import Popup from "reactjs-popup";


const API = 'http://localhost:8000/getparts/';
const API2 = 'http://localhost:8000/car/';
const API3 = 'http://localhost:8000/user/';

export default class FetchRandomUser extends React.Component {
    state = {
        loading: true,
        services: [],
        suma: 0,
        car: [],
        brak: false,
        name:"",
        surname:"",
        email:""
    };

    async componentDidMount() {
        const filters = queryString.parse(this.props.location.search)
        var service = filters.service_id.toString()
        this.setState({serviceID: service})
        const response = await fetch(API + service + "/");
        const data = await response.json();
        this.setState({ services: data.jobs, loading: false });
        // this.state.services.map(this.state.suma += service.job_prize)
        var len = this.state.services.length;
        var sum = 0;
        for (var i = 0; i < len; i++) {
            sum += this.state.suma + this.state.services[i].job_prize * this.state.services[i].job_amount
        }
        this.setState({ suma: sum })
        if (len === 0) this.setState({ brak: true });
        else {
            const response2 = await fetch(API2 + this.state.services[0].carID + "/");
            const data2 = await response2.json();
            this.setState({carID: data2.id});
            this.setState({ brand: data2.brand });
            this.setState({ model: data2.model });
            this.setState({ version: data2.ver });
            this.setState({ VIN: data2.VIN });
            this.setState({ engine_cap: data2.engine_capacity });
            this.setState({ petrol: data2.fuel_type });
            this.setState({ car_user: data2.userID });

          
        }
        const response3 = await fetch(API3 + this.state.car_user + "/");
        const data3 = await response3.json();
        this.setState({user_name: data3.name})
        this.setState({user_surname: data3.surname})
        this.setState({user_email: data3.email})


    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000/addpart/', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.Info === "OK") {
                    alert("Dodano element pomyślnie!")
                    window.location.reload(); 
                } else {
                    alert("Blad dodawania elementu!")
                    //alert(this.state.email)
                }
            })
        }

        EndService = (event) => {
            event.preventDefault();
            let today = new Date();
            this.setState({end_date:today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate()})
            fetch('http://localhost:8000/service/' + this.state.serviceID + "/", {
                method: 'PATCH',
                body: JSON.stringify({'is_finished': "true"}, {'end_date': this.state.end_date}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.Info === "OK") {
                        alert("Zakończono naprawę!")
                        this.props.history.push('/InProgress')
                    } else {
                        alert("Blad zakończenia naprawy!")
                        //alert(this.state.email)
                    }
                })
            }

    render() {
        if (this.state.loading === true) return (
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
        
        return (
            <div>
                <Navbar />
                <div className="parent">
                    <div className="sidebar">
                        <Sidebar2 />
                    </div>
                    <div className="main">
                        <div className="functions">
                            <button className="end_job" onClick={this.EndService}>Zakończ naprawę</button>
                        </div>
                        <p>Samochód: {this.state.brand} {this.state.model} {this.state.version} {this.state.VIN} {this.state.engine_cap} {this.state.petrol}</p>
                        <p>Klient: {this.state.user_name} {this.state.user_surname} {this.state.user_email}  </p>
                        <div className="table-container">
                            <table className="titles">
                                <tr>
                                    <td className="job_main">
                                        <b>Czynność / Część</b>
                                    </td>
                                    <td className="amount_main">
                                        <b>Ilość </b>
                                    </td>
                                    <td className="prize_main">
                                        <b>Kwota za sztukę:</b>
                                    </td>
                                </tr>
                            </table>
                            <table className="job_list">
                                {this.state.services.map(service => (
                                    <tr className="faktura">
                                        <td className="job"> {service.job_name}</td>
                                        <td className="amount"> {service.job_amount}</td>
                                        <td className="prize"> {service.job_prize} zł</td>
                                    </tr>
                                ))}
                            </table>
                            <table className="summary">
                                <tr>
                                    <td>
                                        <h2>Wartość napraw: {this.state.suma} zł</h2>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <a className="back_button" href="/InProgress"> Powrót </a>
                    </div>
                    <form onSubmit={this.onSubmit} class="addform" >
                        <p className="add">Dodaj element: </p>
                        <input
                            type="text"
                            name="job_name"
                            placeholder="Nazwa części/czynności"
                            value={this.state.job_name}
                            onChange={this.handleInputChange}
                            required="true"
                        />
                         <input
                            type="text"
                            name="job_amount"
                            placeholder="Ilość"
                            value={this.state.job_amount}
                            onChange={this.handleInputChange}
                            required="true"
                        />
                         <input
                            type="text"
                            name="job_prize"
                            placeholder="Kwota za szt"
                            value={this.state.job_prize}
                            onChange={this.handleInputChange}
                            required="true"
                        />
                        <button className="details">Dodaj</button>
                    </form>
                    <Footer />
                </div>
            </div>
        );
    }
}

