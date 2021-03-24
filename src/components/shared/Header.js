import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    return (
        <div className="header-container">
            <h1>Humans vs. Zombies</h1>
            <div>
                <Link className="link" to="/games">Games</Link>
                <Link className="link" to="/admin">Admin view</Link>
                <Link className="link" to="/login">Login</Link>
            </div>
        </div>
    )
}

export default Header;