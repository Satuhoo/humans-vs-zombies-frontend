import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactKeycloakProvider } from '@react-keycloak/web' 
import keycloak from './keycloak'
import GameList from './components/pages/GameList';
import Header from './components/shared/Header';
import GameDetails from './components/pages/GameDetails';
import AdministratorView from './components/pages/AdministratorView';
import NotFound from './components/pages/NotFound';
import LoginPage from "./components/shared/Login";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
    <div>      
      <Router>
        <Header />
        <Switch>
          <Route exact path={["/", "/games"]} component={GameList} />
          <Route path="/games/:id" component={GameDetails}/>
          <Route path="/admin" component={AdministratorView}/>          
          <Route path="/login" component={LoginPage}/>          
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>      
    </div>
    </ReactKeycloakProvider>
  );
}

export default App;