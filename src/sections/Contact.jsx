import React, { useState, useEffect } from 'react';
import { Mail, Smartphone, ChevronRight, Briefcase, ExternalLink, Loader2 } from 'lucide-react';
import { getServices, getContactInfo } from '../services/dataService';

const Contact = () => {
  const { email, phone } = getContactInfo();
  const [state, setState] = useState({
    services: [],
    loading: true,
  });

  const { services, loading } = state;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setState({
          services: data,
          loading: false,
        });
      } catch (err) {
        console.error('Error fetching services:', err);
        setState(prev => ({ ...prev, loading: false }));
      }
    };
    fetchServices();
  }, []);

  const getWhatsAppServiceUrl = (serviceName) => {
    const message = encodeURIComponent(`Hola Francis, me interesa tu servicio de ${serviceName}. ¿Podemos conversar?`);
    // Usamos el número base de contactData y le añadimos el mensaje
    const baseUrl = phone.whatsappUrl.split('?')[0];
    const phoneNum = baseUrl.split('/').pop();
    return `https://wa.me/${phoneNum}?text=${message}`;
  };

  return (
    <section id="contact" className="flex flex-col gap-12 scroll-mt-24">
      <div className="flex flex-col gap-4">
        <h3 className="text-xs uppercase tracking-widest text-tech-orange font-bold">Contacto & Servicios</h3>
        <h2 className="text-4xl font-bold text-negative">¿Cómo puedo ayudarte?</h2>
        <p className="text-negative/60 text-lg max-w-xl">
          Ofrezco soluciones personalizadas para tus necesidades tecnológicas. Hablemos y hagámoslo realidad.
        </p>
      </div>

      {/* Direct Contact Buttons */}
      <div className="flex flex-col gap-6 pt-8 border-t border-negative/5">
        <h4 className="text-sm font-bold uppercase tracking-widest text-negative/30 flex items-center gap-2">
          <Mail size={16} className="text-tech-orange" />
          Contacto Directo
        </h4>

        <div className="flex flex-wrap gap-4">
          <a
            href={email.mailtoUrl}
            className="flex items-center gap-4 px-6 py-4 rounded-xl bg-negative/5 border border-negative/10 hover:border-tech-orange/40 transition-all group lg:hover:bg-negative/10"
          >
            <div className="p-2.5 rounded-lg bg-tech-orange/10 text-tech-orange group-hover:bg-tech-orange group-hover:text-white transition-all">
              <Mail size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-negative/60 group-hover:text-negative transition-colors">
              Enviar Correo
            </span>
          </a>

          <a
            href={phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-6 py-4 rounded-xl bg-negative/5 border border-negative/10 hover:border-tech-orange/40 transition-all group lg:hover:bg-negative/10"
          >
            <div className="p-2.5 rounded-lg bg-tech-orange/10 text-tech-orange group-hover:bg-tech-orange group-hover:text-white transition-all">
              <Smartphone size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-negative/60 group-hover:text-negative transition-colors">
              WhatsApp
            </span>
          </a>
        </div>
      </div>
      {/* Services List */}
      <div className="flex flex-col gap-6">
        <h4 className="text-sm font-bold uppercase tracking-widest text-negative/30 flex items-center gap-2">
          <Briefcase size={16} className="text-tech-orange" />
          Mis Servicios
        </h4>

        {loading ? (
          <div className="flex py-8">
            <Loader2 className="animate-spin text-tech-orange" size={24} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <a
                key={service.id}
                href={getWhatsAppServiceUrl(service.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-3 p-6 rounded-2xl bg-negative/5 border border-negative/10 hover:border-tech-orange/30 transition-all lg:hover:bg-negative/[0.08]"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-negative group-hover:text-tech-orange transition-colors">
                    {service.name}
                  </h5>
                  <ExternalLink size={14} className="text-negative/20 group-hover:text-tech-orange group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                {service.description && (
                  <p className="text-sm text-negative/50 leading-relaxed">
                    {service.description}
                  </p>
                )}
                <div className="mt-2 text-xs font-bold text-tech-orange uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Consultar por WhatsApp
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};

export default Contact;
