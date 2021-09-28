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
import queryString from 'query-string'
import './invoice.css'


const API = 'http://localhost:8000/getparts/';
const API2 = 'http://localhost:8000/car/';
export default class FetchRandomUser extends React.Component {
    state = {
        loading: true,
        services: [],
        suma: 0,
        car: []
    };

    async componentDidMount() {
        const filters = queryString.parse(this.props.location.search)
        var service = filters.service_id.toString()
        const response = await fetch(API + localStorage.getItem("ID") + "/");
        const data = await response.json();
        this.setState({ services: data.jobs, loading: false });
        // this.state.services.map(this.state.suma += service.job_prize)
        var len = this.state.services.length;
        var sum = 0;
        for (var i = 0; i < len; i++) {
            sum += this.state.suma + this.state.services[i].job_prize * this.state.services[i].job_amount
        }
        this.setState({suma: sum})
        const response2 = await fetch(API2 + this.state.services[0].carID+ "/");
        const data2 = await response2.json();
        this.setState({brand: data2.brand});
        this.setState({model: data2.model});
        this.setState({version: data2.ver});
        this.setState({VIN: data2.VIN});
        this.setState({engine_cap: data2.engine_capacity});
        this.setState({petrol: data2.fuel_type});

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
                        <Sidebar />
                    </div>
                    <div className="main">
                        <p>Samochód: {this.state.brand} {this.state.model} {this.state.version} {this.state.VIN} {this.state.engine_cap} {this.state.petrol}</p>
                        <div className="table-container">
                            <table className="titles">
                                <tr>
                                    <td className="job_main">
                                        <b>Czynność / Część</b>
                                    </td>
                                    <td className="amount_main">
                                        <b>Liczba</b>
                                    </td>
                                    <td className="prize_main">
                                        <b>Kwota:</b>
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
                        <a className="back_button" href="/Home"> Powrót </a>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

