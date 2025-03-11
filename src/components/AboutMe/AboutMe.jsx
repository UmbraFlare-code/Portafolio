import { useEffect, useRef } from "react";
import SectionTitle from "../common/SectionTitle";
import {
  SiJavascript,
  SiCss3,
  SiReact,
  SiMysql,
  SiPython,
  SiCplusplus,
  SiLinux,
  SiFigma,
} from "react-icons/si";
import "./AboutMe.css";

export default function AboutMe() {
  const infoRef = useRef(null);

  const skills = [
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "CSS", icon: SiCss3, color: "#1572B6" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "C++", icon: SiCplusplus, color: "#00599C" },
    { name: "Linux", icon: SiLinux, color: "#FCC624" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  ];

  useEffect(() => {
    const observerOptions = { threshold: 0.3 };
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.disconnect();
        }
      },
      observerOptions
    );
    
    if (infoRef.current) observer.observe(infoRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="about-me-section" id="skills">
      <SectionTitle title="Sobre mí" />
      
      <div className="info-container" ref={infoRef}>
        <img src="/foto-c.png" alt="Foto de perfil" className="profile-pic-c" />
        <div className="info">
          <p className="descripcion">
            Estudiante de 7° ciclo de Ingeniería en Sistemas e Informática. Busco contribuir al desarrollo de sistemas innovadores y eficientes en el ámbito tecnológico.
          </p>
          <h3 className="subtitulo">Herramientas</h3>
          <div className="carrusel-wrapper">
            <div className="carrusel-content">
              {skills.concat(skills).map((skill, index) => (
                <div className="icon-container" key={index}>
                  <skill.icon size={30} color={skill.color} />
                  <p className="icon-text">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}