import styles from '../styles/Footer.module.css'
import {faGithub,faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul>
        <li><a href="https://github.com/gateniomer" aria-label="Github" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub}/></a></li>
        <li><a href="https://linkedin.com/in/omer-gatenio-949482174" aria-label="Linkedin" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin}/></a></li>
        <li><a href="mailto:gateniomer@gmail.com" aria-label="Gmail" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faEnvelope}/></a></li>
      </ul>
      <span>Desgined & created by Omer Gatenio | Web development learning project</span>
    </div>
  )
}

export default Footer;