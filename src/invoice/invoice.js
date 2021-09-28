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


const API = 'http://localhost:8000/servicelist/';

export default class FetchRandomUser extends React.Component {
    state = {
        loading: true,
        services: []
    };

    async componentDidMount() {
        const response = await fetch(API + localStorage.getItem("ID") + "/");
        const data = await response.json();
        this.setState({ services: data.services, loading: false });
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
                        <h1 className="title">Podsumowanie wizyt:</h1>
                        <div className="table-container">
                            <table className="user_list">
                                {this.state.services.map(service => (
                                    <div key={service.start_date} className="div-list">
                                        <tr className="kid_info">
                                            <td><b>Data:</b> {service.start_date}</td>
                                            <td><a class="link" href={"/InvoiceDetail?service_id=" + service.id}><button className="details">Szczegóły</button></a></td>
                                        </tr>
                                    </div>
                                ))}
                            </table>
                        </div>
                        <button className="backbutton"><a href="/Home"> Powrót </a></button>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

