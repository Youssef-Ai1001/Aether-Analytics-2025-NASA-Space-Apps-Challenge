import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Outlet } from 'react-router-dom';
import { ParticlesBackground } from './components/effects/ParticlesBackground';
export function App() {
  return <div className="flex flex-col min-h-screen bg-background-dark text-text-primary relative">
      <ParticlesBackground />
      <Navbar />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>;
}