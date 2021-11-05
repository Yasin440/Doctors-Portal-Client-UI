import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css'
import Appointment from './Components/Pages/Appintment/Appointment/Appointment';
import Home from './Components/Pages/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route path='/appointment'>
            <Appointment></Appointment>
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
