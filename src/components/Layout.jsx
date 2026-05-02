import React, { useContext, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Map, Calendar, CheckCircle, Settings, Moon, Sun, Globe, X, PlayCircle, Sparkles } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import SmartAssistant from './SmartAssistant';
import './Layout.css';

const Layout = () => {
  const { theme, toggleTheme, language, toggleLanguage, isFirstTimeVoter, setIsFirstTimeVoter } = useContext(AppContext);
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: { en: 'Home', es: 'Inicio' } },
    { path: '/guide', icon: <Map size={20} />, label: { en: 'Guide', es: 'Guía' } },
    { path: '/timeline', icon: <Calendar size={20} />, label: { en: 'Timeline', es: 'Calendario' } },
    { path: '/eligibility', icon: <CheckCircle size={20} />, label: { en: 'Eligibility', es: 'Elegibilidad' } },
    { path: '/simulator', icon: <PlayCircle size={20} />, label: { en: 'Simulator', es: 'Simulador' } },
  ];

  return (
    <div className="layout">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="navbar-content">
          <Link to="/" className="brand" aria-label="Home - Election Guide">
            <span className="brand-logo" aria-hidden="true">🗳️</span>
            <span className="brand-name">Election Guide</span>
          </Link>
          <div className="nav-actions">
            <button className="icon-btn" onClick={toggleLanguage} title="Toggle Language" aria-label={`Change language, currently ${language}`}>
              <Globe size={20} aria-hidden="true" /> <span className="lang-text">{language.toUpperCase()}</span>
            </button>
            <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
              {theme === 'light' ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
            </button>
            <button className="icon-btn" onClick={() => setIsSettingsOpen(true)} title="Settings" aria-label="Open Settings">
              <Settings size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="page-container">
          {/* First Time Voter Banner */}
          {isFirstTimeVoter && (
            <div className="first-time-banner" role="alert" aria-live="polite">
              <div className="banner-icon" aria-hidden="true"><Sparkles size={24} /></div>
              <div className="banner-content">
                <h4>{language === 'en' ? 'First-Time Voter Mode Active' : 'Modo Votante Primerizo Activo'}</h4>
                <p>{language === 'en' ? 'We are highlighting extra beginner information to help you!' : '¡Estamos destacando información adicional para principiantes para ayudarte!'}</p>
              </div>
            </div>
          )}
          <Outlet />
        </div>
      </main>

      {/* Bottom Mobile Navigation / Sidebar on Desktop */}
      <nav className="bottom-nav" aria-label="Main Navigation">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            aria-current={location.pathname === item.path ? 'page' : undefined}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span className="nav-label">{item.label[language]}</span>
          </Link>
        ))}
      </nav>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <div className="modal card">
            <div className="modal-header">
              <h2 id="settings-title">{language === 'en' ? 'Settings' : 'Configuraciones'}</h2>
              <button className="icon-btn" onClick={() => setIsSettingsOpen(false)} aria-label="Close settings">
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body">
              <div className="setting-group">
                <label>
                  <input
                    type="checkbox"
                    checked={isFirstTimeVoter}
                    onChange={(e) => setIsFirstTimeVoter(e.target.checked)}
                  />
                  {language === 'en' ? ' Enable First-Time Voter Mode' : ' Habilitar Modo de Votante Primerizo'}
                </label>
                <p className="setting-desc">
                  {language === 'en' ? 'Simplifies terms and provides extra guidance.' : 'Simplifica términos y proporciona orientación adicional.'}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setIsSettingsOpen(false)}>
                {language === 'en' ? 'Close' : 'Cerrar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Smart Assistant Widget */}
      <SmartAssistant />
    </div>
  );
};

export default Layout;
