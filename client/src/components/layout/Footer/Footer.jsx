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
                <div className='copyrights'>&copy; 2023 V-Clinic</div>
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
