import React, { useEffect, useState, useRef } from 'react';
import { ArrowRightIcon, CloudIcon, ActivityIcon, BellIcon, BarChart2Icon, UsersIcon, GlobeIcon, ShieldIcon, AirplayIcon, ChevronDownIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { InteractiveEarth } from '../components/effects/InteractiveEarth';
export const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    sensors: 0,
    users: 0,
    cities: 0,
    accuracy: 0
  });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsAnimated = useRef(false);
  const targetStats = {
    sensors: 12500,
    users: 250000,
    cities: 320,
    accuracy: 99
  };
  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Animate stats when scrolled into view
      if (statsRef.current && !statsAnimated.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          animateStats();
          statsAnimated.current = true;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const animateStats = () => {
    const duration = 2000; // 2 seconds
    const frames = 60;
    const interval = duration / frames;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / frames;
      setAnimatedStats({
        sensors: Math.round(targetStats.sensors * progress),
        users: Math.round(targetStats.users * progress),
        cities: Math.round(targetStats.cities * progress),
        accuracy: Math.round(targetStats.accuracy * progress)
      });
      if (frame === frames) clearInterval(timer);
    }, interval);
  };
  return <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Interactive Earth Background */}
        <InteractiveEarth />
        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-20">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block mb-4 bg-neon-cyan/10 backdrop-blur-sm rounded-full px-4 py-1 border border-neon-cyan/30">
              <span className="text-neon-cyan text-sm font-medium">
                Powered by NASA TEMPO Satellite Data
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-green animate-gradient-shift bg-300%">
                Air Guard
              </span>{' '}
              –
              <br className="hidden sm:block" /> Smarter Decisions for Cleaner
              Air
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Advanced air quality intelligence combining satellite data, ground
              sensors, and predictive analytics for unprecedented accuracy
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="primary" size="lg" className="group" glow={true}>
                Check Live AQI
                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10">
                Subscribe for Alerts
              </Button>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      })}>
          <div className="w-8 h-12 rounded-full border-2 border-neon-cyan flex justify-center shadow-neon-glow">
            <div className="w-1 h-3 bg-neon-cyan rounded-full mt-2 animate-pulse"></div>
          </div>
          <div className="text-neon-cyan text-xs mt-2 text-center">SCROLL</div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-background-dark border-y border-neon-cyan/20" style={{
      background: 'linear-gradient(to bottom, rgba(11, 29, 42, 0.8), rgba(11, 29, 42, 0.95))'
    }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-cyan mb-2">
                {animatedStats.sensors.toLocaleString()}+
              </div>
              <p className="text-text-secondary text-sm">Ground Sensors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-green mb-2">
                {animatedStats.users.toLocaleString()}+
              </div>
              <p className="text-text-secondary text-sm">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-cyan mb-2">
                {animatedStats.cities}
              </div>
              <p className="text-text-secondary text-sm">Cities Covered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-green mb-2">
                {animatedStats.accuracy}%
              </div>
              <p className="text-text-secondary text-sm">Forecast Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Advanced Air Quality{' '}
              <span className="text-neon-cyan">Intelligence</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Air Guard combines satellite data, ground sensors, and
              predictive analytics to provide the most accurate air quality
              insights available.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <Card hoverable className="p-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-green/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl"></div>
              <div className="bg-gradient-to-br from-neon-cyan to-neon-green rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-neon-glow relative">
                <CloudIcon className="h-7 w-7 text-background-dark" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 relative">
                Real-time Monitoring
              </h3>
              <p className="text-text-secondary mb-4 relative">
                Track air quality in real-time with data from NASA TEMPO
                satellite and thousands of ground sensors.
              </p>
              <Link to="/dashboard" className="text-neon-cyan font-medium inline-flex items-center hover:underline relative">
                View Live Map{' '}
                <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
            {/* Feature 2 */}
            <Card hoverable className="p-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-green/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl"></div>
              <div className="bg-gradient-to-br from-neon-cyan to-neon-green rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-neon-glow relative">
                <ActivityIcon className="h-7 w-7 text-background-dark" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 relative">
                Predictive Forecasting
              </h3>
              <p className="text-text-secondary mb-4 relative">
                AI-powered 7-day air quality forecasts to help you plan outdoor
                activities with confidence.
              </p>
              <Link to="/dashboard" className="text-neon-cyan font-medium inline-flex items-center hover:underline relative">
                Check Forecast{' '}
                <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
            {/* Feature 3 */}
            <Card hoverable className="p-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-green/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl"></div>
              <div className="bg-gradient-to-br from-neon-cyan to-neon-green rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-neon-glow relative">
                <BellIcon className="h-7 w-7 text-background-dark" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 relative">
                Personalized Alerts
              </h3>
              <p className="text-text-secondary mb-4 relative">
                Receive customized notifications when air quality reaches levels
                that may affect your health.
              </p>
              <Link to="/alerts" className="text-neon-cyan font-medium inline-flex items-center hover:underline relative">
                Set Up Alerts{' '}
                <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
            {/* Feature 4 */}
            <Card hoverable className="p-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-green/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl"></div>
              <div className="bg-gradient-to-br from-neon-cyan to-neon-green rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-neon-glow relative">
                <BarChart2Icon className="h-7 w-7 text-background-dark" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 relative">
                Health Insights
              </h3>
              <p className="text-text-secondary mb-4 relative">
                Get tailored health recommendations based on current air quality
                and your personal profile.
              </p>
              <Link to="/health-advisor" className="text-neon-cyan font-medium inline-flex items-center hover:underline relative">
                View Health Tips{' '}
                <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-20 relative" style={{
      background: 'linear-gradient(to bottom, rgba(11, 29, 42, 0.95), rgba(7, 21, 32, 0.95))'
    }}>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 bg-neon-green/10 backdrop-blur-sm rounded-full px-4 py-1 border border-neon-green/30">
                <span className="text-neon-green text-sm font-medium">
                  Advanced Visualization
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Interactive Air Quality{' '}
                <span className="text-neon-green">Mapping</span>
              </h2>
              <p className="text-lg text-text-secondary mb-6">
                Our advanced mapping technology visualizes air quality data
                across North America with unprecedented detail and accuracy.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="bg-neon-green rounded-full p-1 mt-1 mr-3">
                    <svg className="h-4 w-4 text-background-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-text-secondary">
                    High-resolution heatmaps showing PM2.5, O3, NO2, and CO
                    levels
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-neon-green rounded-full p-1 mt-1 mr-3">
                    <svg className="h-4 w-4 text-background-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-text-secondary">
                    Real-time updates from over 10,000 ground monitoring
                    stations
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-neon-green rounded-full p-1 mt-1 mr-3">
                    <svg className="h-4 w-4 text-background-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-text-secondary">
                    Historical data tracking to identify patterns and trends
                  </span>
                </li>
              </ul>
              <Button variant="primary" size="lg" glow={true}>
                Explore the Dashboard
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-neon-cyan rounded-full blur-[80px] opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-neon-green rounded-full blur-[80px] opacity-20"></div>
              <Card glassmorphism className="overflow-hidden shadow-neon-glow border border-neon-cyan/30">
                <div className="aspect-[4/3] bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan/40 to-transparent"></div>
                  {/* Interactive map overlay elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-4 left-4 bg-background-dark/70 backdrop-blur-md rounded-lg px-3 py-2 border border-neon-cyan/30">
                      <div className="flex items-center space-x-2">
                        <GlobeIcon className="h-4 w-4 text-neon-cyan" />
                        <span className="text-xs font-medium text-text-primary">
                          North America
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-background-dark/70 backdrop-blur-md rounded-lg flex overflow-hidden border border-neon-cyan/30">
                      <button className="px-3 py-1 text-xs text-neon-cyan border-r border-neon-cyan/30">
                        PM2.5
                      </button>
                      <button className="px-3 py-1 text-xs text-text-secondary">
                        O3
                      </button>
                      <button className="px-3 py-1 text-xs text-text-secondary">
                        NO2
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-background-dark/70 backdrop-blur-md rounded-lg p-2 border border-neon-cyan/30">
                      <div className="h-2 bg-gradient-to-r from-neon-green via-alert-yellow to-alert-red rounded-full"></div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[10px] text-text-secondary">
                          Good
                        </span>
                        <span className="text-[10px] text-text-secondary">
                          Hazardous
                        </span>
                      </div>
                    </div>
                    {/* Sample data points */}
                    <div className="absolute top-1/3 left-1/4 h-3 w-3 bg-neon-green rounded-full animate-pulse shadow-neon-glow"></div>
                    <div className="absolute top-1/4 right-1/3 h-3 w-3 bg-alert-yellow rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 h-3 w-3 bg-alert-orange rounded-full animate-pulse"></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background-darker to-background-dark"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Stay Informed About Your{' '}
            <span className="text-neon-cyan">Air Quality</span>
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Join thousands of users who rely on Air Guard for daily air
            quality updates and health recommendations.
          </p>
          <div className="max-w-md mx-auto bg-background-light/10 backdrop-blur-md rounded-lg p-6 shadow-neon-glow border border-neon-cyan/20">
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Enter your email" className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan bg-background-dark/50 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50" />
              <Button variant="primary" className="whitespace-nowrap" glow={true}>
                Get Started
              </Button>
            </div>
            <p className="text-xs text-text-secondary mt-3">
              By subscribing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-neon-cyan rounded-full blur-[100px] opacity-10"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-neon-green rounded-full blur-[100px] opacity-10"></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background-darker relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 bg-neon-cyan/10 backdrop-blur-sm rounded-full px-4 py-1 border border-neon-cyan/30">
              <span className="text-neon-cyan text-sm font-medium">
                Testimonials
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Trusted by Health Professionals &{' '}
              <span className="text-neon-cyan">Communities</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              See what experts and users are saying about Air Guard's impact
              on public health and environmental awareness.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card glassmorphism hoverable className="p-6 border border-neon-cyan/20">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Dr. Sarah Johnson" className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-neon-cyan" />
                <div>
                  <h4 className="font-semibold text-text-primary">
                    Dr. Sarah Johnson
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Pulmonologist, Mayo Clinic
                  </p>
                </div>
              </div>
              <p className="text-text-secondary italic">
                "Air Guard has revolutionized how I advise patients with
                respiratory conditions. The predictive forecasts allow us to
                plan treatments and activities proactively."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-5 h-5 text-neon-cyan" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>)}
              </div>
            </Card>
            {/* Testimonial 2 */}
            <Card glassmorphism hoverable className="p-6 border border-neon-cyan/20">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Michael Chen" className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-neon-green" />
                <div>
                  <h4 className="font-semibold text-text-primary">
                    Michael Chen
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Environmental Engineer
                  </p>
                </div>
              </div>
              <p className="text-text-secondary italic">
                "The data visualization capabilities of Air Guard are
                unmatched. It's transformed how we communicate air quality
                concerns to local governments and communities."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-5 h-5 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>)}
              </div>
            </Card>
            {/* Testimonial 3 */}
            <Card glassmorphism hoverable className="p-6 border border-neon-cyan/20">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Emily Rodriguez" className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-neon-cyan" />
                <div>
                  <h4 className="font-semibold text-text-primary">
                    Emily Rodriguez
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Parent & Community Advocate
                  </p>
                </div>
              </div>
              <p className="text-text-secondary italic">
                "As a mother of a child with asthma, Air Guard's alerts have
                been life-changing. I can now confidently plan outdoor
                activities knowing when air quality will be safe."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-5 h-5 text-neon-cyan" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>)}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-background-dark border-t border-neon-cyan/20">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center text-text-primary mb-4">
            Trusted Partners &{' '}
            <span className="text-neon-cyan">Data Sources</span>
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
            Air Guard collaborates with leading scientific and environmental
            organizations to deliver the most accurate air quality data
            available.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png" alt="NASA" className="h-12 opacity-70 hover:opacity-100" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/NOAA_logo.svg/200px-NOAA_logo.svg.png" alt="NOAA" className="h-12 opacity-70 hover:opacity-100" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/EPA_Environmental_Protection_Agency_logo.svg/200px-EPA_Environmental_Protection_Agency_logo.svg.png" alt="EPA" className="h-12 opacity-70 hover:opacity-100" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/American_Lung_Association_logo.svg/200px-American_Lung_Association_logo.svg.png" alt="American Lung Association" className="h-12 opacity-70 hover:opacity-100" />
            </div>
          </div>
        </div>
      </section>
    </div>;
};