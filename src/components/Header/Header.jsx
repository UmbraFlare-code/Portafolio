import "./Header.css";
import Aurora from '../common/Aurora/Aurora.jsx';
import { SiLinkedin, SiGithub, SiGmail, SiReaddotcv } from "react-icons/si";

export default function Header() {
    const title = "Portafolio";
    const name = "Urquizo Oré, Francis M.";
    const socialLinks = [
        { href: "https://www.linkedin.com/in/urquizo-oré-francis/", icon: SiLinkedin },
        { href: "https://github.com/UmbraFlare-code", icon: SiGithub },
        { href: "https://mail.google.com/mail/?view=cm&fs=1&to=umaxuel@gmail.com", icon: SiGmail },
        { href: "https://rxresu.me/umbraflare-code/cv", icon: SiReaddotcv }
    ];

    const renderAnimatedText = (text, delayStart = 0) => (
        text.split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${delayStart + 0.1 * index}s` }}>
                {char}
            </span>
        ))
    );

    return (
        <div className="header-container">
            <Aurora/>
            <div className="title-image-container">
                <h1 className="portfolio-title" style={{ 
                    background: "none", 
                    WebkitTextFillColor: "#00ffff", 
                    textShadow: "0 0 10px rgba(0, 255, 255, 0.5)" 
                }}>
                    {renderAnimatedText(title)}
                </h1>
                <div className="profile-container">
                    <div className="initials-overlay"></div>
                    <img src="/foto-c.png" alt="imagen de presentacion" className="profile-pic" />
                </div>
            </div>
            <div className="info-container-h">
                <p className="name-text">
                    {renderAnimatedText(name, 1)}
                </p>
                <div className="social-links">
                    {socialLinks.map(({ href, icon: Icon }, index) => (
                        <a href={href} className="social-icon" key={index}>
                            <Icon size={22} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
