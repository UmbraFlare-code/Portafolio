import "./Header.css";
import Aurora from '../common/Aurora/Aurora.jsx';
import { SiLinkedin, SiGithub, SiGmail, SiReaddotcv } from "react-icons/si";
import data from '../../data/portfolio-data.json';

export default function Header() {
    const title = "Portafolio";
    // Use data from portfolio-data.json
    const name = data.name;
    
    // Get social links from the imported JSON data
    const socialLinks = data.footer.socialLinks;

    // Map icon strings to actual components
    const getIconComponent = (iconName) => {
        const icons = {
            SiLinkedin,
            SiGithub,
            SiGmail,
            SiReaddotcv
        };
        return icons[iconName];
    };

    const renderAnimatedText = (text, delayStart = 0) => (
        text.split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${delayStart + 0.1 * index}s` }}>
                {char}
            </span>
        ))
    );

    return (
        <div className="header-container" id="home">
            <Aurora/>
            <div className="title-image-container">
                <h1 className="portfolio-title">
                    {renderAnimatedText(title)}
                </h1>
                <div className="profile-container">
                    <div className="initials-overlay"></div>
                    {/* Use image path from portfolio-data.json */}
                    <img src={data.img} alt="imagen de presentacion" className="profile-pic" />
                </div>

                <div className="info-container-h">
                    <p className="name-text">
                        {renderAnimatedText(name, 1)}
                    </p>
                    <div className="social-links">
                        {socialLinks.map(({ name, url, icon }, index) => {
                            const Icon = getIconComponent(icon);
                            return (
                                <a 
                                    href={url} 
                                    className="social-icon" 
                                    key={index} 
                                    title={name}
                                    aria-label={`Visitar perfil de ${name}`}
                                >
                                    <Icon size={22} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}