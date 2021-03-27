import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { useKeycloak } from '@react-keycloak/web'

function Header() {
    const {keycloak} = useKeycloak();
    return (
        <div className="header-container">
            <h1 id="app-title">Humans vs. Zombies</h1>            
                <div>
                {keycloak.authenticated &&
                <div> 
                <button type="button" onClick={() => keycloak.logout()}>
                    Logout
                </button>            
                </div>                
                }</div>
            <div>
                <Link className="link" to="/games">Games</Link>
                <Link className="link" to="/admin">Admin view</Link>
                <Link className="link" to="/login">Login</Link>
            </div>
        </div>
    )
}

export default Header;