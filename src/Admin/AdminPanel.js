import React, {Component} from 'react';
import './admin.css'
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
import {Redirect, Route} from 'react-router-dom'


const API = 'http://localhost:8000/user/';
const API2 = 'http://localhost:8000/reservation/';
const API3 = 'http://localhost:8000/inprogress/';
const API4 = 'http://localhost:8000/users/';
const API5 = 'http://localhost:8000/history/';


export default class Home extends Component {
  state = {
    loading: true,
    services: [],
    count_reservations: "",
    count_in_progress: "",
    count_users: "",
  };
    componentDidMount() {
        fetch(API + localStorage.getItem('ID') + "/")
            .then(response => response.json())
            .then(response => {
                    sessionStorage.setItem('user_name', response.name);
                    console.log(response.name)
                    sessionStorage.setItem('user_surname', response.surname);
                    this.props.history.push('/AdminPanel')
                }
            )
            fetch(API2)
            .then(response => response.json())
            .then(response => {
              this.setState({count_reservations: response.services.length})
                }
            )
            fetch(API3)
            .then(response => response.json())
            .then(response => {
              this.setState({count_in_progress: response.services.length})
                }
            )
            fetch(API4)
            .then(response => response.json())
            .then(response => {
              this.setState({count_users: response.users.length})
                }
            )
    }  
            
    render () {
      return (        
        <div>
          <Navbar />
          <div className="parent">
            <div className = "sidebar">

              <Sidebar2 />
            </div>
            <div className = "main">
              <br></br>
              <a href="/Waiting" className="button button1"><h2 className="mini">{this.state.count_reservations}</h2><TodayIcon style={{fontSize: "5em"}}/><br></br>Rezerwacje oczekujące </a>
              <a href="/History" className="button button2"> <HistoryIcon style={{fontSize: "5em"}}/><br></br>Historia Rezerwacji </a>
              <a href="/InProgress" className="button button3"><h2 className="mini">{this.state.count_in_progress}</h2><ReceiptIcon style={{fontSize: "5em"}} /> <br></br> W trakcie napraw</a>
              <a href="/Clients" className="button button1"> <h2 className="mini">{this.state.count_users}</h2><ReceiptIcon style={{fontSize: "5em"}} /> <br></br>Klienci</a>
            </div>
          </div>
          <Footer />
        </div>
  );
}
}

