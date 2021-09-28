import React, {Component} from 'react';
import './MyCars.css'
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


const API = 'http://localhost:8000/carlist/';
export default class FetchRandomUser extends React.Component {
    state = {
        loading: true,
        cars: []
    };

    async componentDidMount() {
        const response = await fetch(API + localStorage.getItem("ID") + "/");
        const data = await response.json();
        this.setState({cars: data.cars, loading: false});
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
                <p className="kids-title">Lista twoich samochodów:</p>
                    <div className="car_list">
                        <table className="user_list">   
                            {this.state.cars.map(car => (
                            <a href={"/MyCarShow?car_id=" + car.id}>
                                <div key={car.brand} className="car_list">
                                    <h2 className="car">{car.brand} {car.model}</h2>            
                                </div>
                                </a>
                            ))}
                        </table>
            </div>
            <div className="button_box">
            <a href="/Home"><button className="backbutton"> Powrót </button> </a>
            <a href="/AddCar"><button className="addbutton"> Dodaj </button> </a>
            </div>
          </div>
          <Footer />
        </div>
        </div>
  );
}
}

