import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { MainPage } from './pages/main/MainPage';
import { ChangelogsPage } from './pages/changelogs/ChangelogsPage';
import { RulesPage } from './pages/rules/RulesPage';
import { TechPage } from './pages/tech/TechPage';
import { WikiPage } from './pages/wiki/WikiPage';
import { ImprintPage } from './pages/imprint/ImprintPage';
import { categoryBlacklist } from './config/nav.blacklist.config';
import { navConfig } from './config/nav.config';
import { SiteFooter } from './shared/components/SiteFooter';

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const navItem = navConfig.items.find(item => item.path === currentPath) 
      || navConfig.items.find(item => item.id === 'main');
    
    // For routes not in nav like /imprint
    let categoryName = navItem ? navItem.label : 'Main';
    if (currentPath === '/imprint') categoryName = 'Imprint';
    
    document.title = `CrayonSMP — ${categoryName}`;
  }, [location.pathname]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div 
      className="min-h-screen bg-black font-sans text-white grid" 
      style={{ gridTemplateRows: '1fr auto' }}
    >
      <ScrollToTop />
      <TitleUpdater />
      <NavBar />
      <div className="w-full">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/changelogs" element={categoryBlacklist.includes('changelogs') ? <Navigate to="/" replace /> : <ChangelogsPage />} />
          <Route path="/rules" element={categoryBlacklist.includes('rules') ? <Navigate to="/" replace /> : <RulesPage />} />
          <Route path="/tech" element={categoryBlacklist.includes('tech') ? <Navigate to="/" replace /> : <TechPage />} />
          <Route path="/wiki" element={categoryBlacklist.includes('wiki') ? <Navigate to="/" replace /> : <WikiPage />} />
          <Route path="/imprint" element={<ImprintPage />} />
        </Routes>
      </div>
      <SiteFooter />
    </div>
  );
}

export default App;
