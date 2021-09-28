import React from 'react';
import './Spalanie.css'
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


class Spalanie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: '',
          value2: '',
          value3: '',
          wynik: '0'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);

        // this.handleSubmit = this.handleSubmit.bind(this);
        this.spalanie = this.spalanie.bind(this); 
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }
      handleChange2(event) {
        this.setState({value2: event.target.value});
      }
      handleChange3(event) {
        this.setState({value3: event.target.value});
      }

      spalanie() {
        const wynik = (this.state.value+this.state.value2)*100;
        return wynik;
    }

    handleEntailmentRequest(e){
        e.preventDefault();
        var a = this.state.value
        var b = this.state.value2
        var paliwo = this.state.value3
        var c = (parseInt(a)/ parseInt(b)) * 100
        this.setState({wynik: Math.round(c * 100) / 100})
        this.setState({koszt: (this.state.value * paliwo) / (this.state.value2 / 100)})
        return this.state.wynik;
    }
    render () {
      return (
        
        <div>
          <Navbar />
          <div className="parent">
            <div className = "sidebar">
              <Sidebar />
            </div>
            <div className = "main">  
                <div>
                <h2>Kalkulator średniego spalania na 100km</h2> 
                <form>
                    Spalone paliwo w litrach:<br></br>
                    <input type="text" value = {this.state.value} onChange = {this.handleChange} />
                    <br></br>
                    Ilość przejechanych kilometrów:<br></br>
                    <input type="text" value = {this.state.value2} onChange = {this.handleChange2} />
                    <br></br>
                    Cena litra paliwa:<br></br>
                    <input type="text" value = {this.state.value3} onChange = {this.handleChange3} />
                    <br></br>
                    {/* <p>Wynik: {this.spalanie}</p>
                    <p>Value1: {this.state.value}</p>
                    <p>Value2: {this.state.value2}</p> */}
                    <p>Spalanie wynosi: {this.state.wynik} L/100km</p>
                    <p>Koszt przejechania 100km:  {Math.round(this.state.koszt)} zł</p>
                    <button  className="function1" onClick={(e) => {this.handleEntailmentRequest(e)}}>Oblicz</button>
                    <button  className="function2">Reset</button>
                </form> 
                </div>
                <br></br>
           
                {/* <div>
                <h2>Kalkulator kosztu przejechania trasy</h2> 
                <form>
                    Długość planowanej trasy w km:<br></br>
                    <input type="text" name="" />
                    <br></br>
                    Średnie spalanie w litrach na 100km:<br></br>
                    <input type="text" name="" />
                    <br></br>
                    Cena litra paliwa:<br></br>
                    <input type="text" name="" />
                    <br></br>
                    <input type="submit" value="Oblicz" />
                    <input type="reset" />
                </form> 
                </div> */}
            </div>
          </div>
          <Footer />
        </div>
  );
}
}

export default Spalanie;