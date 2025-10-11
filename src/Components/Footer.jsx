import { FaInstagram } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

export default function Footer()
{ return(
         <footer>
            <span>Developed By Shukria ❤</span>
            <div className="social-media">
                <a href="https://github.com/shukria-sultani" target='_blank'><FaGithub className='social-icon'></FaGithub></a>
                <a href="https://www.instagram.com/shukria_07?igsh=N3I3b2RtODYwazFu" target='_blank'><FaInstagram className='social-icon'></FaInstagram></a>
                <a href="https://www.linkedin.com/in/shukria-sultani-b65b4b281/" target='_blank'><FaLinkedin className='social-icon'></FaLinkedin></a>
            </div>
         </footer>
     )
}