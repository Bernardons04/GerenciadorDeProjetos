import {Link} from 'react-router-dom'
import Container from './Container'
import './Navbar.css'
import logo from '../../img/costs_logo.png'

function Navbar() {
    return (
        <nav className='navbar'>
            <Container>
                <Link to="/">
                    <img src={logo} alt="Costs" />
                </Link>
                <ul className='list'>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/projects">Projetos</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contato</Link>
                    </li>
                    <li className="button">
                        <Link to="/">Login</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar