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
import './oc.css'

const API = 'http://localhost:8000/car/';
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: false,
            brand: '',
            model: "",
            vin: "",
            oc_date: "",
            value: { min: 2, max: 10 },
            new_date : ""
        };
    }

    async componentDidMount() {
        const filters = queryString.parse(this.props.location.search)
        var selected_car = filters.car_id.toString()
        this.setState({ carID: selected_car })
        this.setState({ userID: localStorage.getItem('ID') })
        this.setState({selected_car: selected_car})
        const response = await fetch(API + selected_car + "/");
        const data = await response.json();
        this.setState({ brand: data.brand })
        this.setState({ model: data.model })
        this.setState({ vin: data.vin })
        this.setState({ oc_date: data.OC_date })
    }

    Extend = (event) => {
        event.preventDefault();
        fetch(API + this.state.selected_car + "/", {
            method: 'PATCH',
            body: JSON.stringify({'OC_date': this.state.new_date}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.Info === "Edit ok!") {
                    alert("Pomyślnie przedłużono polisę OC!")
                    window.location.reload();
                } else {
                    alert("Blad przedłużenia OC, sprawdź dane i spróbuj ponownie!")
                    //alert(this.state.email)
                }
            })
        }


    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }


    onSubmit = (event) => {
        event.preventDefault();    
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
                        <h3>Informacje dotyczące OC twojego auta: </h3>
                        <h4>Ubezpieczenie auta: {this.state.brand} {this.state.model} {this.state.vin} wygasa:</h4>
                        <h2>{this.state.oc_date}</h2>
                            <div className="button_box">
                                <h3>Przedłuż swoje OC, podaj nową datę końca polisy OC</h3>
                                <form onSubmit={this.Extend}>
                            <input 
                                classname="oc_input"
                                name="new_date" 
                                type="date" 
                                value={this.state.new_date}
                                onChange={this.handleInputChange}
                                required="true"
                            /><br></br>   
                            <button className="extend">Przedłuż</button>     <br></br>  
                            </form>
                                          
                            <button className="backbutton"><a href="/chooseoc"> Powrót </a></button>
                            </div>

                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

