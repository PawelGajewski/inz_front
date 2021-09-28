import React, {Component} from 'react';
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
import queryString from 'query-string';
import '../mycars/MyCars.css';



const API = 'http://localhost:8000/car/';

export default class CarEdit extends Component {
    state = {
        userID: localStorage.getItem('ID')
       };

    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        fetch(API + sessionStorage.getItem('car_id') + "/", {
            method: 'PATCH',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.Info === "Edit ok!") {
                    alert("Pomyślnie dodano auto!")
                    this.props.history.push('/MyCarShow?car_id=' + sessionStorage.getItem('car_id')
                    )
                } else {
                   alert("Blad edycji auta, spróbuj ponownie później")
                }
            })
            
    }    

    render () {
      return (        
        <div>
          <Navbar />
          <div className="parent">
            <div className = "sidebar">
              <Sidebar />
            </div>
            <div className = "main">
            <form onSubmit={this.onSubmit} class="edit-car-form" >
                <input 
                type="text" 
                name="brand"
                placeholder="Marka" 
                value={this.state.brand}
                onChange={this.handleInputChange}
                /><br />
                <input 
                type="text" 
                name="model"
                placeholder="Model" 
                value={this.state.model}
                onChange={this.handleInputChange}
                /><br />
                <input 
                type="text" 
                name="VIN"
                placeholder="VIN" 
                value={this.state.VIN}
                onChange={this.handleInputChange}
                /><br />
                <input 
                type="text" 
                name="color"
                placeholder="Kolor" 
                value={this.state.color}
                onChange={this.handleInputChange}
                /><br />
                <input 
                type="text" 
                name="production_date"
                placeholder="Data produkcji (RRRR-MM-DD)" 
                value={this.state.production_date}
                onChange={this.handleInputChange}
                /><br />
                <input 
                type="text" 
                name="engine_capacity"
                placeholder="Pojemność silnika" 
                value={this.state.engine_capacity}
                onChange={this.handleInputChange}
                /><br />
                <input 
                type="text" 
                name="fuel_type"
                placeholder="Rodzaj paliwa" 
                value={this.state.fuel_type}
                onChange={this.handleInputChange}
                /><br />
                <input 
                type="text" 
                name="mileage"
                placeholder="Przebieg w km" 
                value={this.state.mileage}
                onChange={this.handleInputChange}
                /><br />
                <button className="addbutton">Edytuj Dane</button>
                </form>
            <div>
            <button className="backbutton"><a href="/MyCars"> Powrót </a></button>
            </div>
            </div>
          </div>
          <Footer />
        </div>
  );
}
}

