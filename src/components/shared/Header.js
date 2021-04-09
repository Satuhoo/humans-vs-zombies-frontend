import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { useKeycloak } from '@react-keycloak/web';

function Header() {
    const {keycloak} = useKeycloak();
    
    return (
        <div className="header-container">
            <h1 id="app-title">Humans vs. Zombies</h1>            
                <div>
                </div>
            <div>
                <Link className="link" to="/games">Games</Link>
                {/* Checks if the user is logged in and shows the login or logout button depending on that */}
                {keycloak.authenticated ? 
                    <button className="header-btn" onClick={() => keycloak.logout()}>
                        Logout
                    </button>:
                    <Link to="/login">
                        <button  className="header-btn">
                        Login
                        </button>  
                    </Link>             
                }
            </div>
        </div>
    )
}

export default Header;