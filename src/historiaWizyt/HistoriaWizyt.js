import React, { Component } from 'react';
import './HistoriaWizyt.css'
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


const API = 'http://localhost:8000/servicelist/';
const API2 = 'http://localhost:8000/servicelistpresent/';

const KID = '/KidProfileShow';
export default class FetchRandomUser extends React.Component {
  state = {
    loading: true,
    services: [],
    services2: []
  };

  async componentDidMount() {
    const response = await fetch(API + localStorage.getItem("ID") + "/");
    const data = await response.json();
    this.setState({ services: data.services, loading: false });
    const response2 = await fetch(API2 + localStorage.getItem("ID") + "/");
    const data2 = await response2.json();
    this.setState({ services2: data2.services, loading: false });
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
            <h1 className="title">Aktualne wizyty</h1>
            <div className="table-container">
              <table className="car_list">
                {this.state.services2.map(service => (
                  <div key={service.start_date} className="div-list">
                    <tr className="car_info">
                      <td>Data: {service.start_date}</td>
                      <td><a class="link" href={"/ServiceShow?service_id=" + service.id}><button className="details">Szczegóły</button></a></td>
                    </tr>
                  </div>
                ))}
              </table>
            </div>
            <h1 className="title">Historia wizyt w serwisie:</h1>
            <div className="table-container">
              <table className="car_list">
                {this.state.services.map(service => (
                  <div key={service.start_date} className="div-list">
                    <tr className="car_info">
                      <td>Data: {service.start_date}</td>
                      <td><a class="link" href={"/ServiceShow?service_id=" + service.id}><button className="details">Szczegóły</button></a></td>
                    </tr>
                  </div>
                ))}
              </table>
            </div>

            <a className="back_button" href="/Home"> Powrót </a>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

