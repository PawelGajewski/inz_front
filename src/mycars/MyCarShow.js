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



const API = 'http://localhost:8000/car/';
export default class MyCarShow extends Component {
  state = {
    loading: true,
    car_image: '',
    model: "",
    brand: "",
    id: "",
};
    componentDidMount() {
        const filters = queryString.parse(this.props.location.search)
        var car = filters.car_id.toString()
        sessionStorage.setItem('car_search', car);
        fetch(API + car + "/")
            .then(response => response.json())
            .then(response => {
                    this.setState({car_model: response.model})
                    this.setState({car_brand: response.brand})
                    this.setState({car_prod_date: response.production_date})
                    this.setState({car_fuel: response.fuel_type})
                    this.setState({car_engine: response.engine_capacity})
                    this.setState({car_color: response.color})
                    this.setState({car_mileage: response.mileage})
                    this.setState({car_version: response.version})
                    this.setState({car_vin: response.VIN})
                    this.setState({car_id: response.id})
                }
            )
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
            <h2> Pojazd:</h2>
              <h3> {this.state.car_brand} {this.state.car_model} {this.state.car_version} </h3>
              <h4>Data produkcji: {this.state.car_prod_date}</h4>
              <h4>Numer VIN: {this.state.car_vin}</h4>
              <h4>Silnik: {this.state.car_fuel} {this.state.car_engine} cm<sup>3</sup></h4>
              <h4>Przebieg: {this.state.car_mileage} km</h4>
              <h4>Kolor: {this.state.car_color}</h4>
            <div className="button_box">
            <a href={"/CarEdit?car_id=" + sessionStorage.getItem('car_id')}><button className="addbutton"> Edytuj Dane Pojazdu </button></a><br></br>
            <a href="/MyCars"><button className="backbutton"> Powrót </button></a>
            </div>
            </div>
          </div>
          <Footer />
        </div>
  );
}
}

