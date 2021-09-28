import React, { Component } from 'react';
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


const API = 'http://localhost:8000/service/';
const API2 = 'http://localhost:8000/getparts/';
export default class MyCarShow extends Component {
  state = {
    start_date: '',
    end_date: '',
    total_prize: '',
    opis: '',
    suma: 0
  };

  async componentDidMount() {
    const filters = queryString.parse(this.props.location.search)
    var service = filters.service_id.toString()
    fetch(API + service + "/")
      .then(response => response.json())
      .then(response => {
        this.setState({ start_date: response.astart_date })
        this.setState({ end_date: response.end_date })
        this.setState({ opis: response.additional_info })
        this.setState({status: response.is_finished})
      }
      )
    const response = await fetch(API2 + service + "/");
    const data2 = await response.json();
    this.setState({ services: data2.jobs, loading: false });
    var len = this.state.services.length;
    var sum = 0;
    for (var i = 0; i < len; i++) {
      sum += this.state.suma + this.state.services[i].job_prize * this.state.services[i].job_amount
    }
    sum = parseFloat(sum)
    this.setState({ suma: sum })
    if (this.state.status === false) this.setState({postep: "Do tej pory: "})
    else this.setState({postep: "Całkowita kwota: "})
  }
  render() {
    if (this.state.opis === "") this.setState({ opis: "Brak usługi!" })
    return (
      <div>
        <Navbar />
        <img src="../logo.png" alt="logo" height="55em" />
        <div className="parent">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main">
            <p> Wizyta wykonana w dniach od: <b>{this.state.start_date}</b> do: <b>{this.state.end_date}</b></p>
            <p>{this.state.postep} <b>{this.state.suma} zł</b></p>
            <a className="back_button" href="/HistoriaWizyt"> Powrót </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

