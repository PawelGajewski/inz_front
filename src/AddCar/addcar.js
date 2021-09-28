import React, {Component} from 'react';
// import './Home.css'
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


const API = 'http://localhost:8000/addcar/';
export default class FetchRandomUser extends React.Component {
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
        fetch(API, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.Info === "Car added successfully!") {
                    alert("Pomyślnie dodano auto!")
                    this.props.history.push('/MyCars')
                } else {
                   alert("Blad oddawania auta, spróbuj ponownie później")
                }
            })
            
            
            .catch(err => {
              console.error(err);
              alert(this.state.VIN);
          });
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
            <h2>Dodaj auto</h2>
                <form onSubmit={this.onSubmit} class="add-car-form" >
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
                <button className="confirm">Dodaj</button>
                </form>
          </div>
          <Footer />
        </div>
        </div>
  );
}
}

