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
import './addservice.css'


const API = 'http://localhost:8000/carlist/';
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cars: []
        };
    }

    async componentDidMount() {
        const response = await fetch(API + localStorage.getItem("ID") + "/");
        const data = await response.json();
        this.setState({ cars: data.cars, loading: false });
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
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
                        <h4>Wybierz auto, którego będzie dotyczyć serwis:</h4>
                        <table className="user_list">
                            {this.state.cars.map(car => (
                                <a href={"/BookService?car_id=" + car.id}>
                                    <div key={car.name} className="car_list">
                                    <h2 className="car">{car.brand} {car.model} {car.VIN}</h2>            

                                    </div>
                                </a>
                            ))}
                        </table>
                        <div className="button_box">
                        <button className="backbutton"><a href="/Home"> Powrót </a></button>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

