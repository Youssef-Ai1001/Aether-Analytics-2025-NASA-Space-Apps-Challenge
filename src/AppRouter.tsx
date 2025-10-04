import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Alerts } from './pages/Alerts';
import { HealthAdvisor } from './pages/HealthAdvisor';
import { EducationHub } from './pages/EducationHub';
import { Community } from './pages/Community';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="health-advisor" element={<HealthAdvisor />} />
          <Route path="education" element={<EducationHub />} />
          <Route path="community" element={<Community />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>;
}