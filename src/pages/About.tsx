import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CloudIcon, GlobeIcon, AwardIcon, RocketIcon, UsersIcon, BarChart2Icon, ArrowRightIcon, CheckIcon, HeartIcon, BriefcaseIcon, LinkedinIcon, TwitterIcon, MailIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const img = new URL('../../images/mee.jpg', import.meta.url).href;
const img2 = new URL('../../images/mohammed.jpg', import.meta.url).href;
const img3 = new URL('../../images/yossef.jpg', import.meta.url).href;
const img4 = new URL('../../images/shahd.jpg', import.meta.url).href;
const img5 = new URL('../../images/abdo.jpg', import.meta.url).href;
// Mock data for team members
const teamMembers = [{
  id: 1,
  name: 'Hassan Mohamed',
  title: 'Web Front-End Developer',
  image: img,
  bio: 'Former NASA atmospheric scientist with 15+ years of experience in air quality monitoring and analysis.'
}, {
  id: 2,
  name: 'Marcus Chen',
  title: 'CTO',
  image:img2,
  bio: 'Machine learning expert specializing in predictive environmental modeling and sensor networks.'
}, 
{
  id: 3,
  name: 'Dr. James Wilson',
  title: 'Chief Science Officer',
  image: img3,
  bio: 'Environmental health researcher with a focus on the effects of air pollution on respiratory and cardiovascular systems.'
}, {
  id: 4,
  name: 'Aisha Patel',
  title: 'Head of Product',
  image: img4,
  bio: 'Former tech executive passionate about creating intuitive interfaces for complex environmental data.'
},
{
  id: 5,
  name: 'Aisha Patel',
  title: 'Head of Product',
  image: img5,
  bio: 'Former tech executive passionate about creating intuitive interfaces for complex environmental data.'
}];
// Mock data for partners
const partners = [{
  id: 1,
  name: 'NASA',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png'
}, {
  id: 2,
  name: 'NOAA',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/NOAA_logo.svg/200px-NOAA_logo.svg.png'
}, {
  id: 3,
  name: 'EPA',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/EPA_Environmental_Protection_Agency_logo.svg/200px-EPA_Environmental_Protection_Agency_logo.svg.png'
}, {
  id: 4,
  name: 'American Lung Association',
  logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/American_Lung_Association_logo.svg/200px-American_Lung_Association_logo.svg.png'
}, {
  id: 5,
  name: 'World Health Organization',
  logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/WHO_logo.svg/200px-WHO_logo.svg.png'
}, {
  id: 6,
  name: 'Stanford University',
  logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Stanford_University_seal_2003.svg/200px-Stanford_University_seal_2003.svg.png'
}];
export const About = () => {
  return <div className="pt-16 min-h-screen bg-background-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1532299033990-5bcda4141d25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" alt="Earth from space" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>
          </div>
          <div className="relative z-10 py-20 px-6 md:px-12 max-w-3xl">
            <div className="inline-block mb-4 bg-neon-cyan/10 backdrop-blur-sm rounded-full px-4 py-1 border border-neon-cyan/30">
              <span className="text-neon-cyan text-sm font-medium">
                Our Mission
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Empowering Clean Air{' '}
              <span className="text-neon-cyan">Decisions</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Air Guard is dedicated to providing accurate, accessible air
              quality intelligence to help individuals, communities, and
              organizations make informed decisions for healthier lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" glow={true}>
                Our Technology
              </Button>
              <Button variant="outline" size="lg">
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
        {/* Our Story Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 bg-neon-green/10 backdrop-blur-sm rounded-full px-4 py-1 border border-neon-green/30">
                <span className="text-neon-green text-sm font-medium">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                From NASA Technology to{' '}
                <span className="text-neon-green">Global Impact</span>
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  Air Guard began as a NASA research project in 2018 when Dr.
                  Elena Rodriguez, then a senior atmospheric scientist,
                  recognized the potential of combining satellite data with
                  ground sensor networks to create unprecedented air quality
                  monitoring capabilities.
                </p>
                <p>
                  After securing initial funding through NASA's technology
                  transfer program, Dr. Rodriguez assembled a team of experts in
                  environmental science, machine learning, and public health to
                  transform this technology into a solution accessible to
                  everyone.
                </p>
                <p>
                  In 2020, Air Guard was officially launched as an independent
                  company with a mission to democratize access to accurate air
                  quality data and empower individuals and communities to make
                  healthier decisions.
                </p>
                <p>
                  Today, our platform processes data from NASA's TEMPO satellite
                  and over 12,500 ground sensors across 320 cities worldwide,
                  providing real-time air quality intelligence to more than
                  250,000 users.
                </p>
              </div>
              <div className="mt-8 flex items-center space-x-4">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Dr. Elena Rodriguez" className="w-12 h-12 rounded-full object-cover border-2 border-neon-green" />
                <div>
                  <p className="text-text-primary font-medium">
                    Dr. Elena Rodriguez
                  </p>
                  <p className="text-text-secondary text-sm">
                    Founder & CEO, Air Guard
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-neon-cyan rounded-full blur-[80px] opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-neon-green rounded-full blur-[80px] opacity-20"></div>
              <Card glassmorphism className="overflow-hidden shadow-neon-glow border border-neon-cyan/30">
                <img src="https://images.unsplash.com/photo-1541873676-a18131494184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Air Guard office" className="w-full h-auto" />
              </Card>
            </div>
          </div>
        </section>
        {/* Our Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 bg-neon-cyan/10 backdrop-blur-sm rounded-full px-4 py-1 border border-neon-cyan/30">
              <span className="text-neon-cyan text-sm font-medium">
                Our Values
              </span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Principles That Guide{' '}
              <span className="text-neon-cyan">Our Work</span>
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              At Air Guard, our values shape everything we do—from how we
              develop our technology to how we engage with our community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card hoverable className="p-6 relative group border border-neon-cyan/20">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-green/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl"></div>
              <div className="bg-gradient-to-br from-neon-cyan to-neon-green rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-neon-glow relative">
                <AwardIcon className="h-7 w-7 text-background-dark" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 relative">
                Scientific Integrity
              </h3>
              <p className="text-text-secondary relative">
                We are committed to scientific accuracy and transparency in all
                our data. Our methodologies are peer-reviewed and continuously
                improved.
              </p>
            </Card>
            <Card hoverable className="p-6 relative group border border-neon-cyan/20">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-green/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl"></div>
              <div className="bg-gradient-to-br from-neon-cyan to-neon-green rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-neon-glow relative">
                <HeartIcon className="h-7 w-7 text-background-dark" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 relative">
                Health Equity
              </h3>
              <p className="text-text-secondary relative">
                We believe everyone deserves access to clean air and the
                information needed to protect their health, regardless of
                location or socioeconomic status.
              </p>
            </Card>
            <Card hoverable className="p-6 relative group border border-neon-cyan/20">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-green/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl"></div>
              <div className="bg-gradient-to-br from-neon-cyan to-neon-green rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-neon-glow relative">
                <GlobeIcon className="h-7 w-7 text-background-dark" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 relative">
                Environmental Stewardship
              </h3>
              <p className="text-text-secondary relative">
                We are dedicated to providing solutions that help individuals
                and organizations reduce their environmental impact.
              </p>
            </Card>
            <Card hoverable className="p-6 relative group border border-neon-cyan/20">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-green/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl"></div>
              <div className="bg-gradient-to-br from-neon-cyan to-neon-green rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-neon-glow relative">
                <UsersIcon className="h-7 w-7 text-background-dark" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 relative">
                Community Empowerment
              </h3>
              <p className="text-text-secondary relative">
                We support citizen science and community-led initiatives to
                monitor and improve local air quality.
              </p>
            </Card>
            <Card hoverable className="p-6 relative group border border-neon-cyan/20">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-green/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl"></div>
              <div className="bg-gradient-to-br from-neon-cyan to-neon-green rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-neon-glow relative">
                <RocketIcon className="h-7 w-7 text-background-dark" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 relative">
                Innovation
              </h3>
              <p className="text-text-secondary relative">
                We continuously push the boundaries of what's possible in air
                quality monitoring and predictive analytics.
              </p>
            </Card>
            <Card hoverable className="p-6 relative group border border-neon-cyan/20">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-green/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl"></div>
              <div className="bg-gradient-to-br from-neon-cyan to-neon-green rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-neon-glow relative">
                <BarChart2Icon className="h-7 w-7 text-background-dark" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 relative">
                Data Privacy
              </h3>
              <p className="text-text-secondary relative">
                We respect user privacy and are committed to the responsible use
                and protection of personal data.
              </p>
            </Card>
          </div>
        </section>
        {/* Our Technology Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block mb-4 bg-neon-green/10 backdrop-blur-sm rounded-full px-4 py-1 border border-neon-green/30">
                <span className="text-neon-green text-sm font-medium">
                  Our Technology
                </span>
              </div>
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Advanced Air Quality{' '}
                <span className="text-neon-green">Intelligence</span>
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-neon-green rounded-full p-1 mt-1 mr-3">
                    <CheckIcon className="h-4 w-4 text-background-dark" />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-medium mb-1">
                      NASA TEMPO Satellite Integration
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Our platform incorporates data from NASA's TEMPO
                      (Tropospheric Emissions: Monitoring of Pollution)
                      satellite, providing hourly, high-resolution measurements
                      of air pollution across North America.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-neon-green rounded-full p-1 mt-1 mr-3">
                    <CheckIcon className="h-4 w-4 text-background-dark" />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-medium mb-1">
                      Ground Sensor Network
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Our network of over 12,500 ground-based sensors provides
                      hyperlocal air quality data, filling gaps in satellite
                      coverage and enhancing accuracy at the neighborhood level.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-neon-green rounded-full p-1 mt-1 mr-3">
                    <CheckIcon className="h-4 w-4 text-background-dark" />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-medium mb-1">
                      AI-Powered Predictive Analytics
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Our machine learning algorithms analyze historical data
                      patterns, weather conditions, and emissions sources to
                      provide accurate 7-day air quality forecasts with 94%
                      accuracy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-neon-green rounded-full p-1 mt-1 mr-3">
                    <CheckIcon className="h-4 w-4 text-background-dark" />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-medium mb-1">
                      Health Impact Assessment
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Our platform translates complex air quality data into
                      personalized health recommendations based on individual
                      profiles, including respiratory conditions, age, and
                      activity levels.
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/dashboard">
                <Button variant="primary" glow className="flex items-center">
                  Explore Our Dashboard
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-cyan rounded-full blur-[80px] opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-green rounded-full blur-[80px] opacity-20"></div>
              <Card glassmorphism className="overflow-hidden shadow-neon-glow border border-neon-cyan/30">
                <img src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Air Guard technology" className="w-full h-auto" />
              </Card>
            </div>
          </div>
        </section>
        {/* Our Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 bg-neon-cyan/10 backdrop-blur-sm rounded-full px-4 py-1 border border-neon-cyan/30">
              <span className="text-neon-cyan text-sm font-medium">
                Our Team
              </span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Meet the <span className="text-neon-cyan">Experts</span>
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Our diverse team brings together expertise in atmospheric science,
              machine learning, public health, and product development to create
              innovative air quality solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => <Card key={member.id} hoverable className="overflow-hidden border border-neon-cyan/20">
                <div className="h-48 relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-text-primary">
                    {member.name}
                  </h3>
                  <p className="text-neon-cyan text-sm mb-2">{member.title}</p>
                  <p className="text-text-secondary text-sm mb-4">
                    {member.bio}
                  </p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-text-secondary hover:text-neon-cyan transition-colors">
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-text-secondary hover:text-neon-cyan transition-colors">
                      <TwitterIcon className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-text-secondary hover:text-neon-cyan transition-colors">
                      <MailIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </Card>)}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="flex items-center mx-auto">
              <BriefcaseIcon className="h-5 w-5 mr-2" />
              View Open Positions
            </Button>
          </div>
        </section>
        {/* Partners Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 bg-neon-cyan/10 backdrop-blur-sm rounded-full px-4 py-1 border border-neon-cyan/30">
              <span className="text-neon-cyan text-sm font-medium">
                Our Partners
              </span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Trusted <span className="text-neon-cyan">Collaborators</span>
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              We work with leading scientific institutions, government agencies,
              and organizations to advance air quality monitoring and improve
              public health outcomes.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map(partner => <div key={partner.id} className="bg-background-light/20 rounded-lg p-6 flex items-center justify-center border border-neon-cyan/10 hover:border-neon-cyan/30 transition-all hover:bg-background-light/30">
                <img src={partner.logo} alt={partner.name} className="h-12 max-w-full opacity-70 hover:opacity-100 transition-opacity" />
              </div>)}
          </div>
        </section>
        {/* CTA Section */}
        <section className="bg-background-light/10 rounded-2xl p-8 md:p-12 border border-neon-cyan/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Join Us in Building a{' '}
              <span className="text-neon-cyan">Cleaner Future</span>
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Whether you're an individual looking to protect your health, a
              community seeking to improve local air quality, or an organization
              aiming to reduce environmental impact, Air Guard has solutions
              for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard">
                <Button variant="primary" size="lg" glow={true}>
                  Explore Our Platform
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>;
};