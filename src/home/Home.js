import React, {Component} from 'react';
import './Home.css'
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
import {Redirect, Route} from 'react-router-dom'


const API = 'http://localhost:8000/user/';
export default class Home extends Component {
    componentDidMount() {
        fetch(API + localStorage.getItem('ID') + "/")
            .then(response => response.json())
            .then(response => {
                    sessionStorage.setItem('user_name', response.name);
                    console.log(response.name)
                    sessionStorage.setItem('user_surname', response.surname);
                    this.props.history.push('/Home')
                }
            )
    }  
            
    render () {
      if (localStorage.getItem('ID' === 'undefined')) {
        return <Redirect to='/Logownaie' />
      }
     return (        
        <div>
          <Navbar />
          <div className="parent">
            <div className = "sidebar">
              <Sidebar />
            </div>
            <div className = "main">
              <br></br>
              <a href="/ChooseCar" className="button button1"> <TodayIcon style={{fontSize: "5em"}}/><br></br>Zarezerwuj wizytę </a>
              <a href="/HistoriaWizyt" className="button button2"> <HistoryIcon style={{fontSize: "5em"}}/><br></br>Historia Wizyt </a>
              <a href="Invoice" className="button button3"> <ReceiptIcon style={{fontSize: "5em"}} /> <br></br> Rachunki</a>
              <a href="/MyCars" className="button button1"> <DriveEtaIcon style={{fontSize: "5em"}} /><br></br> Moje Pojazdy </a>
              <a href="/Spalanie" className="button button2"> <LocalGasStationIcon style={{fontSize: "5em"}} /> <br></br> Koszty spalania</a>
              <a href="/chooseoc" className="button button1"> <AccessAlarmIcon style={{fontSize: "5em"}} /><br></br> Przeglądy oraz OC</a>
            </div>
          </div>
          <Footer />
        </div>
  );
}
}

