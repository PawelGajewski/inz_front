import React from 'react';
import './Sidebar.css'
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import GroupIcon from '@material-ui/icons/Group';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DashboardIcon from '@material-ui/icons/Dashboard';

class Sidebar extends React.Component {
    render () {
      return (
        <div> 
            <ul class="ulsidebar">
              <img className="logo" src="https://images91.fotosik.pl/278/ed66ab8cb859dff2med.png"  alt="logo" />
              <li class="lisidebar"><a href="/Home"><DashboardIcon /> Dashboard</a></li>
              <li class="lisidebar"><a href="/MyCars"><DriveEtaIcon /> Moje Auta </a></li>
              <li class="lisidebar"><a href="/HistoriaWizyt"><GroupIcon /> Historia </a></li>
              <li class="lisidebar"><a href="/Invoice"><AssignmentTurnedInIcon /> Rachunki</a></li>
              <li class="lisidebar"><a href="/ChooseCar"><EventNoteIcon /> Rezerwacja</a></li>
              <li class="lisidebar"><a href="/chooseoc"><AssignmentTurnedInIcon /> Przeglądy</a></li>
            </ul>
        </div>
  );
}
}
export default Sidebar;