import "./Header.css";
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
            <div className="title-image-container">
                <img src="./foto.jpg" alt="Foto de perfil" className="profile-pic" />
                <h1 className="portfolio-title">
                    {renderAnimatedText(title)}
                </h1>
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
