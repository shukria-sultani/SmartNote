import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslationContext";

export default function Footer() {
    const {t} = useTranslation()
  return (
    <footer>
      <span>{t("footer")}</span>
      <div className="social-media">
        <a href="https://github.com/shukria-sultani" target="_blank">
          <FaGithub className="social-icon"></FaGithub>
        </a>
        <a
          href="https://www.instagram.com/shukria_07?igsh=N3I3b2RtODYwazFu"
          target="_blank"
        >
          <FaInstagram className="social-icon"></FaInstagram>
        </a>
        <a
          href="https://www.linkedin.com/in/shukria-sultani-b65b4b281/"
          target="_blank"
        >
          <FaLinkedin className="social-icon"></FaLinkedin>
        </a>
      </div>
    </footer>
  );
}
