import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MailIcon, PhoneIcon, MapPinIcon, MessageSquareIcon, BriefcaseIcon, HelpCircleIcon, UsersIcon, CheckIcon, SendIcon, LinkedinIcon, TwitterIcon, FacebookIcon, InstagramIcon, GithubIcon } from 'lucide-react';
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real app, you would send data to your backend
      console.log('Form submitted:', formData);
      // Show success message
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
      }, 5000);
    } catch (err) {
      setError('There was an error submitting your form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="pt-16 min-h-screen bg-background-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 bg-neon-cyan/10 backdrop-blur-sm rounded-full px-4 py-1 border border-neon-cyan/30">
            <span className="text-neon-cyan text-sm font-medium">
              Get In Touch
            </span>
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Contact <span className="text-neon-cyan">Air Guard</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Have questions about our technology, partnership opportunities, or
            need support? Our team is here to help.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <Card className="lg:col-span-2 p-8 border border-neon-cyan/30">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Send Us a Message
            </h2>
            {isSubmitted ? <div className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckIcon className="h-8 w-8 text-neon-green" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-text-secondary">
                  Thank you for reaching out. Our team will get back to you as
                  soon as possible.
                </p>
              </div> : <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-text-secondary text-sm mb-2">
                      Your Name
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan bg-background-light/30 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-text-secondary text-sm mb-2">
                      Email Address
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan bg-background-light/30 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50" placeholder="your.email@example.com" />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="inquiryType" className="block text-text-secondary text-sm mb-2">
                    Inquiry Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border transition-all ${formData.inquiryType === 'general' ? 'border-neon-cyan bg-neon-cyan/10 text-text-primary' : 'border-background-light/30 text-text-secondary hover:border-neon-cyan/30'}`}>
                      <input type="radio" name="inquiryType" value="general" checked={formData.inquiryType === 'general'} onChange={handleChange} className="sr-only" />
                      <MessageSquareIcon className="h-5 w-5 mr-2" />
                      <span>General</span>
                    </label>
                    <label className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border transition-all ${formData.inquiryType === 'support' ? 'border-neon-cyan bg-neon-cyan/10 text-text-primary' : 'border-background-light/30 text-text-secondary hover:border-neon-cyan/30'}`}>
                      <input type="radio" name="inquiryType" value="support" checked={formData.inquiryType === 'support'} onChange={handleChange} className="sr-only" />
                      <HelpCircleIcon className="h-5 w-5 mr-2" />
                      <span>Support</span>
                    </label>
                    <label className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border transition-all ${formData.inquiryType === 'partnership' ? 'border-neon-cyan bg-neon-cyan/10 text-text-primary' : 'border-background-light/30 text-text-secondary hover:border-neon-cyan/30'}`}>
                      <input type="radio" name="inquiryType" value="partnership" checked={formData.inquiryType === 'partnership'} onChange={handleChange} className="sr-only" />
                      <UsersIcon className="h-5 w-5 mr-2" />
                      <span>Partnership</span>
                    </label>
                    <label className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border transition-all ${formData.inquiryType === 'careers' ? 'border-neon-cyan bg-neon-cyan/10 text-text-primary' : 'border-background-light/30 text-text-secondary hover:border-neon-cyan/30'}`}>
                      <input type="radio" name="inquiryType" value="careers" checked={formData.inquiryType === 'careers'} onChange={handleChange} className="sr-only" />
                      <BriefcaseIcon className="h-5 w-5 mr-2" />
                      <span>Careers</span>
                    </label>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-text-secondary text-sm mb-2">
                    Subject
                  </label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan bg-background-light/30 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50" placeholder="How can we help you?" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-text-secondary text-sm mb-2">
                    Message
                  </label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan bg-background-light/30 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50 resize-none" placeholder="Please provide details about your inquiry..."></textarea>
                </div>
                <Button type="submit" variant="primary" size="lg" glow={true} className="flex items-center" disabled={isLoading}>
                  {isLoading ? <>
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                      Sending...
                    </> : <>
                      <SendIcon className="h-5 w-5 mr-2" />
                      Send Message
                    </>}
                </Button>
              </form>}
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-neon-cyan/10 rounded-full p-2 mr-3">
                    <MailIcon className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-medium text-sm">
                      Email
                    </h4>
                    <a href="mailto:contact@Air Guard.com" className="text-neon-cyan hover:underline">
                      contact@Air Guard.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-neon-cyan/10 rounded-full p-2 mr-3">
                    <PhoneIcon className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-medium text-sm">
                      Phone
                    </h4>
                    <a href="tel:+18001234567" className="text-neon-cyan hover:underline">
                      +1 (800) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-neon-cyan/10 rounded-full p-2 mr-3">
                    <MapPinIcon className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-medium text-sm">
                      Headquarters
                    </h4>
                    <p className="text-text-secondary">
                      1234 Clean Air Way
                      <br />
                      Atmosphere City, AC 98765
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Office Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Monday - Friday</span>
                  <span className="text-text-primary">
                    9:00 AM - 6:00 PM EST
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Saturday</span>
                  <span className="text-text-primary">
                    10:00 AM - 2:00 PM EST
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Sunday</span>
                  <span className="text-text-primary">Closed</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neon-cyan/20">
                <p className="text-text-secondary text-sm">
                  Support inquiries are monitored 24/7. For urgent matters,
                  please use our emergency support line.
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-background-light/30 flex items-center justify-center hover:bg-neon-cyan/20 transition-colors border border-neon-cyan/30" aria-label="LinkedIn">
                  <LinkedinIcon className="h-5 w-5 text-neon-cyan" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background-light/30 flex items-center justify-center hover:bg-neon-cyan/20 transition-colors border border-neon-cyan/30" aria-label="Twitter">
                  <TwitterIcon className="h-5 w-5 text-neon-cyan" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background-light/30 flex items-center justify-center hover:bg-neon-cyan/20 transition-colors border border-neon-cyan/30" aria-label="Facebook">
                  <FacebookIcon className="h-5 w-5 text-neon-cyan" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background-light/30 flex items-center justify-center hover:bg-neon-cyan/20 transition-colors border border-neon-cyan/30" aria-label="Instagram">
                  <InstagramIcon className="h-5 w-5 text-neon-cyan" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background-light/30 flex items-center justify-center hover:bg-neon-cyan/20 transition-colors border border-neon-cyan/30" aria-label="GitHub">
                  <GithubIcon className="h-5 w-5 text-neon-cyan" />
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Frequently Asked <span className="text-neon-cyan">Questions</span>
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Find answers to common questions about Air Guard's technology,
              data sources, and services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-lg font-medium text-text-primary mb-2">
                How accurate is Air Guard's air quality data?
              </h3>
              <p className="text-text-secondary">
                Our air quality data achieves 94% accuracy when compared to
                regulatory-grade monitors. We combine NASA TEMPO satellite data
                with our network of ground sensors and apply advanced
                calibration algorithms to ensure high precision at both regional
                and local levels.
              </p>
            </Card>
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-lg font-medium text-text-primary mb-2">
                How often is the air quality data updated?
              </h3>
              <p className="text-text-secondary">
                Our platform provides real-time updates from ground sensors
                every 15 minutes. Satellite data is updated hourly during
                daylight hours. Our forecasts are recalculated every 6 hours to
                incorporate the latest atmospheric conditions.
              </p>
            </Card>
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Can I contribute data from my own air quality sensor?
              </h3>
              <p className="text-text-secondary">
                Yes! We support community science through our Open Sensor
                Network program. Compatible sensors can be integrated into our
                platform, allowing you to contribute to hyperlocal air quality
                monitoring while gaining access to our advanced analytics.
              </p>
            </Card>
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Do you offer API access to your air quality data?
              </h3>
              <p className="text-text-secondary">
                Yes, we provide API access for developers, researchers, and
                organizations. Our API offers current conditions, historical
                data, and forecasts with flexible query parameters. Contact our
                partnership team for documentation and pricing options.
              </p>
            </Card>
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-lg font-medium text-text-primary mb-2">
                How does Air Guard protect user privacy?
              </h3>
              <p className="text-text-secondary">
                We take privacy seriously. Personal health information is
                encrypted and never shared without explicit consent. Location
                data is anonymized for aggregate analysis. Users have full
                control over their data through our privacy dashboard.
              </p>
            </Card>
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-lg font-medium text-text-primary mb-2">
                What pollutants does Air Guard monitor?
              </h3>
              <p className="text-text-secondary">
                Our platform monitors key criteria pollutants including PM2.5,
                PM10, ozone (O₃), nitrogen dioxide (NO₂), sulfur dioxide (SO₂),
                and carbon monoxide (CO). In select regions, we also track
                volatile organic compounds (VOCs) and pollen levels.
              </p>
            </Card>
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-16">
          <Card className="overflow-hidden border border-neon-cyan/30 h-[400px] relative">
            {/* This would be a real map in production */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="bg-background-dark/80 backdrop-blur-md rounded-lg p-6 border border-neon-cyan/30 max-w-lg">
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Visit Our Headquarters
                </h3>
                <p className="text-text-secondary mb-4">
                  Our main office is located in the heart of Atmosphere City.
                  Stop by to learn more about our technology and meet our team.
                </p>
                <Button variant="outline" className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>;
};