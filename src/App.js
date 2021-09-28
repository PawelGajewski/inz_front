import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Logowanie from './logowanie/logowanie';
import Rejestracja from './rejestracja/rejestracja';
import Home from './home/Home';
import MyCars from './mycars/MyCars'
import MyCarShow from './mycars/MyCarShow'
import HistoriaWizyt from './historiaWizyt/HistoriaWizyt';
import ServiceShow from './historiaWizyt/serviceShow';
import AddCar from './AddCar/addcar';
import CarEdit from './caredit/CarEdit';
import ChooseCar from './service/choosecar';
import BookService from './service/BookService';
import Download from './download'
import Invoice from './invoice/invoice';
import InvoiceDetail from './invoice/invoicedetail';
import Spalanie from './spalanie/Spalanie'
import AdminPanel from './Admin/AdminPanel'
import Waiting from './Admin/Waiting'
import AcceptReservation from './Admin/Acceptreservation'
import History from './Admin/History'
import ServiceDetail from './Admin/serviceDetail'
import InProgress from './Admin/InProgress'
import InProgressDetail from './Admin/InProgressDetail'
import Clients from './Admin/Clients'
import OC from './oc/oc'
import chooseoc from './oc/choose_oc'





class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/Logowanie" component={Logowanie} />
          <Route path="/Rejestracja" component={Rejestracja} />
          <Route path="/Home" component={Home} />
          <Route path="/MyCars" component={MyCars} />
          <Route path="/MyCarShow" component={MyCarShow} />
          <Route path="/HistoriaWizyt" component={HistoriaWizyt} />
          <Route path="/ServiceShow" component={ServiceShow} />
          <Route path="/AddCar" component={AddCar} />
          <Route path="/CarEdit" component={CarEdit} />
          <Route path="/ChooseCar" component={ChooseCar} />
          <Route path="/BookService" component={BookService} />
          <Route path="/Spalanie" component={Spalanie} />
          <Route path="/Download" component={Download} />
          <Route path="/Invoice" component={Invoice} />
          <Route path="/InvoiceDetail" component={InvoiceDetail} />
          <Route path="/AdminPanel" component={AdminPanel} />
          <Route path="/Waiting" component={Waiting} />
          <Route path="/AcceptReservation" component={AcceptReservation} />
          <Route path="/History" component={History} />
          <Route path="/ServiceDetail" component={ServiceDetail} />
          <Route path="/InProgress" component={InProgress} />
          <Route path="/InProgressDetail" component={InProgressDetail} />
          <Route path="/Clients" component={Clients} />
          <Route path="/OC" component={OC} />
          <Route path="/chooseoc" component={chooseoc} />
        </div>
      </Router>
    );
  }
}

export default App;