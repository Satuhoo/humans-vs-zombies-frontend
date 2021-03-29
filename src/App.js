import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameList from './components/pages/GameList';
import Header from './components/shared/Header';
import GameDetails from './components/pages/GameDetails';
import AdministratorView from './components/pages/AdministratorView';
import NotFound from './components/pages/NotFound';
import LoginPage from "./components/shared/Login";
import PrivateRoute from './components/routes/PrivateRoute'
import { useKeycloak } from '@react-keycloak/web';
import { useDispatch } from 'react-redux';
import { login } from '../src/store/actions/userActions';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  const { keycloak, initialized } = useKeycloak();
  const dispatch = useDispatch();

  if (!initialized) {
    return <h4>Loading...</h4>; 
  }

  if (keycloak.authenticated){
    dispatch(login(keycloak.subject, keycloak.hasRealmRole('admin')))
  }

  return (    
    <div>      
      <Router>
        <Header />
        <Switch>
          <Route exact path={["/", "/games"]} component={GameList} />
          <PrivateRoute component={GameDetails} path="/games/:id" exact />          
          <Route path="/admin" component={AdministratorView}/>          
          <Route path="/login" component={LoginPage}/>          
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>      
    </div>    
  );
}

export default App;