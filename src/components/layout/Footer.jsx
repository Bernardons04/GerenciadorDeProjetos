import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

import './Footer.css'

function Footer() {
    return (
        <footer className='footer'>
            <ul>
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <FaLinkedin />
                </li>
            </ul>
            <p>
                <span>Tech Costs</span> &copy; 2023
            </p>
        </footer>
    )
}

export default Footer