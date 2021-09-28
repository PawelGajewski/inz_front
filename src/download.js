import React, {Component} from 'react';
// import './Home.css'

import BuildIcon from '@material-ui/icons/Build';
import TodayIcon from '@material-ui/icons/Today';
import HistoryIcon from '@material-ui/icons/History';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import queryString from 'query-string'


const API = 'http://localhost:8000/pdf/';
export default class FetchRandomUser extends React.Component {
    state = {
     xd: "maluszek"
    };

    async componentDidMount() {
        fetch(API, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.Info === "Ok") {
                   window.open(res.file, '_blank', 'fullscreen=yes');
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
          <div className="parent">
            <div className = "sidebar">
            </div>
            <div className = "main">
           
          </div>
        </div>
        </div>
  );
}
}

