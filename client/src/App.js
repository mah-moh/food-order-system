import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp';
import ManagerReg from './components/ManagerReg';
import { SignIn, data } from './components/SignIn';
import Home from './components/Home';
import Manage from './components/Manage';
import Menu from './components/Menu';
import Checkout from './components/Checkout';


function App() {
  return (
    <div className='App'>
      <Router>
          <Route path='/admin' component = {ManagerReg}/>
          <Route path="/" exact component={SignUp}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/home" component={Home}/>
          <Route path="/manage" component={Manage}/>
          <Route path="/menu" component={Menu}/>
          <Route path="/checkout" component={Checkout}/>
      </Router>
    </div>
  );
}

export default App;
