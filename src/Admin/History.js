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


const API = 'http://localhost:8000/history/';
export default class Home extends Component {
    state = {
        loading: true,
        services: [],
        count_history: "",

      };
    
      async componentDidMount() {
        const response = await fetch(API);
        const data = await response.json();
        this.setState({ services: data.services, loading: false });
        this.setState({count_history: data.services.length})
        this.setState({count_history: data.services.length})

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
            <h3 className="right_info">Ilość elementów: {this.state.count_history}</h3>
            <h1 className="title">Historia:</h1>
            <div className="table-container">
              <table className="user_list">
                {this.state.services.map(service => (
                  <div key={service.start_date} className="div-list">
                    <tr className="kid_info">
                      <td>Data: {service.start_date}</td>
                      <td><a class="link" href={"/ServiceDetail?service_id=" + service.id}><button className="details">Szczegóły</button></a></td>
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

