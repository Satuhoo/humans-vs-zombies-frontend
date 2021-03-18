import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GameList from './components/pages/GameList';
import Header from './components/shared/Header';
import GameDetails from './components/pages/GameDetails';
import AdministratorView from './components/pages/AdministratorView';
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path={["/", "/games"]} component={GameList} />
          <Route path="/games/:id" component={GameDetails}/>
          <Route path="/admin" component={AdministratorView}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
