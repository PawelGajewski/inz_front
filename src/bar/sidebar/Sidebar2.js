import React from 'react';
import './Sidebar.css'
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import GroupIcon from '@material-ui/icons/Group';
import HistoryIcon from '@material-ui/icons/History';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { ListItemIcon } from '@material-ui/core';

class Sidebar2 extends React.Component {
    render () {
      return (
        <div> 
            <ul class="ulsidebar">
              <img className="logo" src="https://images91.fotosik.pl/278/ed66ab8cb859dff2med.png"  alt="logo" />
              <li class="lisidebar"><a href="/AdminPanel"><DashboardIcon /> Dashboard</a></li>
              <li class="lisidebar"><a href="/History"><HistoryIcon /> Historia </a></li>
              <li class="lisidebar"><a href="/InProgress"><ReceiptIcon /> Rachunki</a></li>
              <li class="lisidebar"><a href="/Clients"><GroupIcon /> Klienci</a></li>
            </ul>
        </div>
  );
}
}
export default Sidebar2;