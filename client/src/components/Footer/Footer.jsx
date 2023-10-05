import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import './Footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <div className='footer-description'>
                    <h2>About Us</h2>
                    <p>
                        Your Health Clinic is dedicated to providing
                        high-quality healthcare services to our patients.
                    </p>
                </div>
                <div className='social-icons'>
                    <FontAwesomeIcon icon={faFacebook} className='icon' />
                    <FontAwesomeIcon icon={faTwitter} className='icon' />
                    <FontAwesomeIcon icon={faInstagram} className='icon' />
                    <FontAwesomeIcon icon={faLinkedin} className='icon' />
                </div>
            </div>
        </footer>
    )
}
export default Footer
