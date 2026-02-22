import { motion } from 'motion/react';
import {
  ShieldCheck,
  HeartHandshake,
  PiggyBank,
  Zap,
  CheckCircle2,
  PhoneCall,
  Star,
  Menu,
  X,
  MessageCircle,
  MapPin,
  Mail,
  Globe,
  Gift,
  Send,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';
import { translations } from './i18n';

// Logo component using the original image
const Logo = ({ isDarkBg = false }) => (
  <div className={`flex items-center select-none ${isDarkBg ? 'bg-white/90 p-3 rounded-2xl shadow-sm' : ''}`}>
    <img
      src="/logo.png"
      alt="Jade Insurance"
      className="h-14 md:h-16 w-auto object-contain"
    />
  </div>
);

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const t = isEnglish ? translations.en : translations.es;

  const handleLanguageToggle = () => setIsEnglish(!isEnglish);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Web3Forms Integration
    // To make this work, create a free access key at https://web3forms.com 
    // and set it in a .env file as VITE_WEB3FORMS_ACCESS_KEY
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "Nuevo Lead de Jade Insurance",
          from_name: formData.nombre,
          Nombre: formData.nombre,
          Email: formData.email,
          Teléfono: formData.telefono,
          Mensaje: formData.mensaje || "Sin mensaje adicional",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsAppAlternative = () => {
    const text = `Hola Jade Insurance, me gustaría obtener una cotización.`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/17865781797?text=${encodedText}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <Logo />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#servicios" className="text-sm font-medium text-slate-600 hover:text-jade-primary transition-colors">{t.nav.services}</a>
              <a href="#como-funciona" className="text-sm font-medium text-slate-600 hover:text-jade-primary transition-colors">{t.nav.howItWorks}</a>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLanguageToggle}
                  className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  {isEnglish ? 'ES' : 'EN'}
                </button>
                <a href="tel:17865781797" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-jade-primary">
                  <PhoneCall className="w-4 h-4" />
                  (786) 578-1797
                </a>
                <a href="#cotizacion" className="bg-jade-primary hover:bg-jade-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:shadow-lg active:scale-95">
                  {t.nav.freeQuote}
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={handleLanguageToggle}
                className="flex items-center justify-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-full text-xs font-bold"
              >
                <Globe className="w-3.5 h-3.5" />
                {isEnglish ? 'ES' : 'EN'}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-jade-primary p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full"
          >
            <a href="#servicios" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-jade-primary hover:bg-slate-50">{t.nav.services}</a>
            <a href="#como-funciona" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-jade-primary hover:bg-slate-50">{t.nav.howItWorks}</a>
            <a href="tel:17865781797" className="block px-3 py-2 rounded-md text-base font-medium text-jade-primary hover:bg-slate-50 flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              (786) 578-1797
            </a>
            <div className="mt-4 px-3">
              <a href="#cotizacion" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-jade-primary text-white px-5 py-3 rounded-xl font-bold shadow-md">
                {t.nav.freeQuote}
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-b from-jade-secondary/5 to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jade-secondary/10 text-jade-primary text-sm font-semibold mb-6 border border-jade-secondary/20">
                  <span className="w-2 h-2 rounded-full bg-jade-secondary animate-pulse" />
                  {t.hero.badge}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 font-serif">
                  {t.hero.title1} <span className="text-jade-secondary">{t.hero.title2}</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                  {t.hero.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <a href="#cotizacion" className="bg-jade-accent hover:bg-jade-accent-hover text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-jade-accent/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                    {t.hero.ctaQuote}
                    <Zap className="w-5 h-5" />
                  </a>
                  <a href="https://wa.me/17865781797" target="_blank" rel="noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    {t.hero.ctaWhatsapp}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-jade-secondary" />
                    {t.hero.check1}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-jade-secondary" />
                    {t.hero.check2}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-jade-secondary" />
                    {t.hero.check3}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative lg:ml-auto w-full max-w-md"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-jade-primary/20 to-jade-secondary/20 rounded-[2.5rem] transform rotate-3 scale-105 blur-lg" />
                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl border border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop"
                    alt="Familia feliz"
                    className="rounded-[2rem] w-full h-auto object-cover aspect-[4/5]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Floating Trust Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs" >FL</div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs" >US</div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-xs" >+</div>
                    </div>
                    <div>
                      <div className="flex text-jade-accent">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-xs font-bold text-slate-700 mt-1">{t.hero.clientsBadge}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="py-12 border-y border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold text-jade-primary uppercase tracking-widest">{t.logos.title}</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 opacity-80 hover:opacity-100 transition-all duration-300">
              {/* Medical Providers */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">{t.logos.medical}</span>
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                  <div className="text-xl font-bold text-blue-600 flex items-center">Florida Blue</div>
                  <div className="text-xl font-bold text-indigo-900 flex items-center">Oscar</div>
                  <div className="text-xl font-bold text-pink-600 flex items-center">Ambetter</div>
                  <div className="text-xl font-bold text-blue-800 flex items-center">UnitedHealthcare</div>
                  <div className="text-xl font-bold text-teal-600 flex items-center">Molina Healthcare</div>
                </div>
              </div>

              {/* Dental Providers */}
              <div className="flex flex-col items-center border-t md:border-t-0 md:border-l border-slate-200 pt-8 md:pt-0 md:pl-24">
                <span className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">{t.logos.dental}</span>
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                  <div className="text-xl font-bold text-blue-900 flex items-center">Ameritas</div>
                  <div className="text-xl font-bold text-green-700 flex items-center">Cigna Dental</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios / Beneficios Section */}
        <section id="servicios" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-serif">{t.services.title}</h2>
              <p className="text-lg text-slate-600">{t.services.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <ShieldCheck className="w-8 h-8 text-jade-primary" /> },
                { icon: <HeartHandshake className="w-8 h-8 text-jade-secondary" /> },
                { icon: <CheckCircle2 className="w-8 h-8 text-jade-accent" /> },
                { icon: <PiggyBank className="w-8 h-8 text-jade-primary" /> }
              ].map((iconData, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 border border-slate-100">
                    {iconData.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{t.services.items[idx].title}</h3>
                  <p className="text-slate-600 leading-relaxed">{t.services.items[idx].desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works & Referrals */}
        <section id="como-funciona" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-jade-primary-dark/50 mix-blend-multiply" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">{t.howItWorks.title}</h2>
              <p className="text-lg text-slate-300">{t.howItWorks.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative mb-24">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-700" />

              {t.howItWorks.steps.map((item, idx) => (
                <div key={idx} className="relative text-center">
                  <div className="w-24 h-24 mx-auto bg-jade-primary rounded-full flex items-center justify-center text-3xl font-bold border-8 border-slate-900 relative z-10 shadow-xl">
                    {idx + 1}
                  </div>
                  <h3 className="text-2xl font-bold mt-8 mb-4">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Referral Feature Box */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-jade-primary to-jade-secondary rounded-3xl p-1 shadow-2xl">
              <div className="bg-slate-900 rounded-[1.4rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-20 h-20 bg-jade-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gift className="w-10 h-10 text-jade-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t.referrals.title}</h3>
                  <p className="text-slate-300 text-lg">{t.referrals.subtitle}</p>
                </div>
                <div className="md:ml-auto md:w-auto w-full">
                  <a href="#cotizacion" className="block w-full text-center bg-jade-accent hover:bg-jade-accent-hover text-slate-900 px-6 py-3 rounded-xl font-bold transition-all shadow-lg">
                    {t.nav.freeQuote}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Capture Form & Testimonials */}
        <section id="cotizacion" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="grid lg:grid-cols-5">

                {/* Form Side */}
                <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16">
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 font-serif">{t.form.title}</h2>
                    <p className="text-slate-600">{t.form.subtitle}</p>
                  </div>

                  {submitStatus === 'success' ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-emerald-800 mb-2">{t.form.successTitle}</h3>
                      <p className="text-emerald-700 leading-relaxed max-w-sm mx-auto mb-6">
                        {t.form.successDesc}
                      </p>
                      <button
                        onClick={() => setSubmitStatus('idle')}
                        className="text-emerald-600 font-bold hover:text-emerald-800 transition-colors"
                      >
                        Enviar otro mensaje
                      </button>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                      {submitStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-red-700 text-sm">
                          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <p>{t.form.errorDesc}</p>
                        </div>
                      )}

                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-2">{t.form.nameLabel}</label>
                        <input
                          type="text"
                          id="nombre"
                          required
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-jade-primary focus:border-jade-primary outline-none transition-all"
                          placeholder={t.form.namePlaceholder}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">{t.form.emailLabel}</label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-jade-primary focus:border-jade-primary outline-none transition-all"
                            placeholder={t.form.emailPlaceholder}
                          />
                        </div>
                        <div>
                          <label htmlFor="telefono" className="block text-sm font-medium text-slate-700 mb-2">{t.form.phoneLabel}</label>
                          <input
                            type="tel"
                            id="telefono"
                            required
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-jade-primary focus:border-jade-primary outline-none transition-all"
                            placeholder={t.form.phonePlaceholder}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="mensaje" className="block text-sm font-medium text-slate-700 mb-2">{t.form.messageLabel}</label>
                        <textarea
                          id="mensaje"
                          rows={3}
                          value={formData.mensaje}
                          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-jade-primary focus:border-jade-primary outline-none transition-all resize-none"
                          placeholder={t.form.messagePlaceholder}
                        ></textarea>
                      </div>

                      <div className="flex items-start gap-3">
                        <input type="checkbox" id="consent" required className="mt-1 w-4 h-4 text-jade-primary rounded border-slate-300 focus:ring-jade-primary flex-shrink-0" />
                        <label htmlFor="consent" className="text-sm text-slate-500 leading-relaxed">
                          {t.form.consent}
                        </label>
                      </div>

                      <div className="pt-2 space-y-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-jade-primary hover:bg-jade-primary-dark text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-jade-primary/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              {t.form.submitting}
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              {t.form.submit}
                            </>
                          )}
                        </button>

                        <div className="relative flex items-center py-2">
                          <div className="flex-grow border-t border-slate-200"></div>
                          <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">O</span>
                          <div className="flex-grow border-t border-slate-200"></div>
                        </div>

                        <button
                          type="button"
                          onClick={openWhatsAppAlternative}
                          className="w-full bg-white hover:bg-green-50 text-green-600 border border-green-200 font-bold text-base py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-5 h-5 text-[#25D366]" />
                          {t.form.whatsappAlternative}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Testimonial Side */}
                <div id="testimonios" className="lg:col-span-2 bg-jade-primary text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-jade-secondary/20 rounded-full blur-3xl" />

                  <div className="relative z-10">
                    <div className="flex text-jade-accent mb-6">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                      {t.testimonials.quote}
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full border-2 border-white/20 bg-emerald-600 flex items-center justify-center text-xl font-bold">C</div>
                      <div>
                        <div className="font-bold text-lg">{t.testimonials.author}</div>
                        <div className="text-jade-secondary">{t.testimonials.location}</div>
                      </div>
                    </div>

                    <div className="mt-12 pt-12 border-t border-white/20">
                      <div className="text-sm text-white/80 mb-2">{t.testimonials.support}</div>
                      <a href="tel:17865781797" className="text-2xl font-bold hover:text-jade-accent transition-colors flex items-center gap-3">
                        <PhoneCall className="w-6 h-6" />
                        (786) 578-1797
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6 inline-block">
                <Logo isDarkBg={true} />
              </div>
              <p className="mb-6 max-w-md text-slate-300 leading-relaxed">{t.footer.description}</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t.footer.contact}</h4>
              <ul className="space-y-4">
                <li>
                  <a href="tel:17865781797" className="flex items-center gap-3 hover:text-white transition-colors">
                    <PhoneCall className="w-5 h-5 text-jade-secondary" /> (786) 578-1797
                  </a>
                </li>
                <li>
                  <a href="mailto:info@jadeinsurance.com" className="flex items-center gap-3 hover:text-white transition-colors">
                    <Mail className="w-5 h-5 text-jade-secondary" /> info@jadeinsurance.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-jade-secondary mt-1 flex-shrink-0" />
                  <span>{t.footer.addressFull}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t.footer.legal}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.notice}</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
            <p className="max-w-xl text-xs text-slate-600">
              {t.footer.disclaimer}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
