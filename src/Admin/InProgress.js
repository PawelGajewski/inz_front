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


const API = 'http://localhost:8000/inprogress/';
export default class Home extends Component {
    state = {
        loading: true,
        services: [],
      };
    
      async componentDidMount() {
        const response = await fetch(API);
        const data = await response.json();
        this.setState({ services: data.services, loading: false });
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
            <h1 className="title">W trakcie napraw:</h1>
            <div className="table-container">
              <table className="user_list">
                {this.state.services.map(service => (
                  <div key={service.start_date} className="div-list">
                    <tr className="kid_info">
                      <td>Data: {service.start_date}</td>
                      <td><a class="link" href={"/InProgressDetail?service_id=" + service.id}><button className="details">Szczegóły</button></a></td>
                    </tr>
                  </div>
                ))}
              </table>
            </div>
              <br></br>
              <a className="back_button" href="/AdminPanel"> Powrót </a>

            </div>
          </div>
          <Footer />
        </div>
  );
}
}

