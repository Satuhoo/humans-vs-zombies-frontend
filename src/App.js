import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameList from './components/pages/GameList';
import Header from './components/shared/Header';
import GameDetails from './components/pages/GameDetails';
import NotFound from './components/pages/NotFound';
import LoginPage from "./components/shared/Login";
import PrivateRoute from './components/routes/PrivateRoute'
import { useKeycloak } from '@react-keycloak/web';
import { useDispatch } from 'react-redux';
import { login } from '../src/store/actions/userActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

const App = () => {
  const { keycloak, initialized } = useKeycloak();
  const dispatch = useDispatch();

  if (!initialized) {
    return (
      <div className="spinner">
          <p>Loading the keycloak server</p>
          <Spinner  animation="border" variant="warning" />
        </div>
    )
  }

  // Checks if the user is logged in, fetchs the user data from the keycloak and send it to the redux
  if (keycloak.authenticated){
    (dispatch(login(keycloak.subject, keycloak.hasRealmRole('admin'))))
  }

  return (    
    <div>      
      <Router>
        <Header />
        <Switch>
          <Route exact path={["/", "/games"]} component={GameList} />
          <PrivateRoute component={GameDetails} path="/games/:id" exact />          
          <Route path="/login" component={LoginPage}/>          
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>      
    </div>    
  );
}

export default App;