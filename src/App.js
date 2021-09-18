import './App.css';
import Displaybatches from './components/home/Displaybatches';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Batch from './components/batch/Batch';
import Slider from './components/home/Slider';
import Result from './components/result/Result';
import Subscription from './components/subscription/Subscription';
import Login from './components/Login/Login';
import SignUp from './components/Login/Signup';
import axios from 'axios';
import Accountdetail from './components/accountInfo/Accountdetail';
import Demodetail from './components/Demodetail/Demodetail';
import Question from './components/Test/Question';
import Welcome from './components/Test/Welcome';
import ResultDetail from './components/result/ResultDetail';
import Rank from './components/result/Rank';
import ReviewAnswer from './components/result/ReviewAnswer';

axios.defaults.baseURL = "http://localhost:5003/"


function App() {



  return (
    <div className="main" >
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/testlogin" component={Welcome} />
          <Route path="/test" component={Question} />

          <Route path="/" >
            <Navbar />
            <Switch>
              <Route path="/demo" component={Demodetail} />
              <Route path="/subscription" component={Subscription} />
              <Route path="/results" component={Result} />
              <Route path="/batch" component={Batch} />
              <Route path="/accountInfo" component={Accountdetail} />
              <Route path="/resultdetail" component={ResultDetail} />
              <Route path="/rank" component={Rank} />
              <Route path="/reviewAnswers" component={ReviewAnswer} />
              <Route path="/" >
                <Slider />
                <Displaybatches />
              </Route>

            </Switch>
          </Route>
        </Switch>

      </Router>



    </div>
  );
}

export default App;
