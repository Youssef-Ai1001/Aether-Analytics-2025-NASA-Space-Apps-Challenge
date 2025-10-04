import React, { useState, Children } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BookOpenIcon, SearchIcon, GraduationCapIcon, VideoIcon, FileTextIcon, AwardIcon, ArrowRightIcon, ClockIcon, TagIcon, ThumbsUpIcon, ChevronRightIcon, CloudIcon, HeartIcon, FilterIcon, SlidersIcon, CheckIcon } from 'lucide-react';
// Mock data for educational resources
const educationalResources = [{
  id: 1,
  title: 'Understanding Air Quality Index (AQI)',
  type: 'article',
  category: 'basics',
  imageUrl: 'https://images.unsplash.com/photo-1569398034126-476b0d96e2d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  duration: '5 min read',
  featured: true,
  description: 'Learn how to interpret air quality measurements and what they mean for your health.'
}, {
  id: 2,
  title: 'The Impact of PM2.5 on Respiratory Health',
  type: 'video',
  category: 'health',
  imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  duration: '12 min video',
  featured: true,
  description: 'Dr. Sarah Johnson explains how fine particulate matter affects your lungs and what you can do to protect yourself.'
}, {
  id: 3,
  title: 'NASA TEMPO Satellite: How It Works',
  type: 'article',
  category: 'technology',
  imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  duration: '8 min read',
  featured: false,
  description: "Discover how NASA's TEMPO satellite monitors air pollution from space with unprecedented detail."
}, {
  id: 4,
  title: 'Air Quality and Climate Change: The Connection',
  type: 'course',
  category: 'environment',
  imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  duration: '5 modules',
  featured: false,
  description: 'Comprehensive course exploring the relationship between air quality and climate change, with expert interviews and case studies.'
}, {
  id: 5,
  title: 'Protecting Children from Air Pollution',
  type: 'guide',
  category: 'health',
  imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  duration: 'Practical Guide',
  featured: true,
  description: "Essential information for parents and caregivers on minimizing children's exposure to air pollution."
}, {
  id: 6,
  title: 'Indoor Air Quality: The Hidden Danger',
  type: 'webinar',
  category: 'health',
  imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  duration: '45 min webinar',
  featured: false,
  description: 'Learn about common indoor pollutants and effective strategies to improve the air quality in your home.'
}];
// Mock data for upcoming events
const upcomingEvents = [{
  id: 1,
  title: 'Clean Air Summit 2023',
  date: 'Nov 15, 2023',
  type: 'Virtual Conference',
  description: 'Join leading experts to discuss the latest in air quality research and policy.'
}, {
  id: 2,
  title: 'Air Quality Monitoring Workshop',
  date: 'Dec 3, 2023',
  type: 'In-person Workshop',
  description: 'Hands-on workshop on setting up and using personal air quality monitors.'
}, {
  id: 3,
  title: 'Health Effects of Air Pollution Webinar',
  date: 'Nov 28, 2023',
  type: 'Live Webinar',
  description: 'Medical professionals discuss the latest research on air pollution health impacts.'
}];
// Helper function for resource type icons
const getResourceIcon = (type: string) => {
  switch (type) {
    case 'article':
      return <FileTextIcon className="h-5 w-5 text-neon-cyan" />;
    case 'video':
      return <VideoIcon className="h-5 w-5 text-neon-cyan" />;
    case 'course':
      return <GraduationCapIcon className="h-5 w-5 text-neon-cyan" />;
    case 'guide':
      return <BookOpenIcon className="h-5 w-5 text-neon-cyan" />;
    case 'webinar':
      return <VideoIcon className="h-5 w-5 text-neon-cyan" />;
    default:
      return <FileTextIcon className="h-5 w-5 text-neon-cyan" />;
  }
};
export const EducationHub = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  // Filter resources based on category and search query
  const filteredResources = educationalResources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const featuredResources = educationalResources.filter(resource => resource.featured);
  return <div className="pt-16 min-h-screen bg-background-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Education <span className="text-neon-cyan">Hub</span>
            </h1>
            <p className="text-text-secondary">
              Learn about air quality, health impacts, and protective measures
            </p>
          </div>
          <div className="relative mt-4 md:mt-0 w-full md:w-auto">
            <input type="text" placeholder="Search resources..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full md:w-64 px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan bg-background-light/30 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50" />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
          </div>
        </div>

        {/* Featured Resources Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-text-primary">
              Featured Resources
            </h2>
            <Button variant="outline" size="sm" className="text-sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map(resource => <Card key={resource.id} hoverable className="overflow-hidden border border-neon-cyan/20">
                <div className="h-48 relative">
                  <img src={resource.imageUrl} alt={resource.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center">
                    <div className="bg-background-dark/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                      {getResourceIcon(resource.type)}
                      <span className="text-xs text-text-primary capitalize">
                        {resource.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded-full capitalize">
                      {resource.category}
                    </span>
                    <div className="flex items-center text-text-secondary text-xs">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      <span>{resource.duration}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </div>
              </Card>)}
          </div>
        </section>

        {/* Category Filter and All Resources */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-text-primary">
              All Resources
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <FilterIcon className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <SlidersIcon className="h-4 w-4" />
                <span>Sort</span>
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-neon-cyan/20 pb-2">
            <button className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeCategory === 'all' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`} onClick={() => setActiveCategory('all')}>
              All
            </button>
            <button className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeCategory === 'basics' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`} onClick={() => setActiveCategory('basics')}>
              Basics
            </button>
            <button className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeCategory === 'health' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`} onClick={() => setActiveCategory('health')}>
              Health
            </button>
            <button className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeCategory === 'technology' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`} onClick={() => setActiveCategory('technology')}>
              Technology
            </button>
            <button className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeCategory === 'environment' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`} onClick={() => setActiveCategory('environment')}>
              Environment
            </button>
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredResources.length > 0 ? filteredResources.map(resource => <Card key={resource.id} hoverable className="flex border border-neon-cyan/20">
                  <div className="w-1/3">
                    <div className="h-full relative">
                      <img src={resource.imageUrl} alt={resource.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background-dark/50"></div>
                    </div>
                  </div>
                  <div className="w-2/3 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded-full capitalize">
                        {resource.category}
                      </span>
                      <div className="flex items-center text-text-secondary text-xs">
                        {getResourceIcon(resource.type)}
                      </div>
                    </div>
                    <h3 className="text-md font-medium text-text-primary mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    <div className="flex items-center text-text-secondary text-xs mb-3">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      <span>{resource.duration}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full text-xs py-1">
                      View
                    </Button>
                  </div>
                </Card>) : <div className="col-span-full text-center py-12">
                <div className="bg-background-light/20 rounded-lg p-8 max-w-md mx-auto">
                  <SearchIcon className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-text-primary mb-2">
                    No resources found
                  </h3>
                  <p className="text-text-secondary mb-4">
                    We couldn't find any resources matching your search
                    criteria.
                  </p>
                  <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}>
                    Clear Filters
                  </Button>
                </div>
              </div>}
          </div>
        </section>

        {/* Two Column Layout for Events and Learning Paths */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Upcoming Events */}
          <Card className="p-6 border border-neon-cyan/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-text-primary">
                Upcoming Events
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map(event => <div key={event.id} className="bg-background-light/20 p-4 rounded-lg border border-neon-cyan/10">
                  <div className="flex items-start">
                    <div className="bg-neon-cyan/10 rounded-lg p-3 mr-4 flex-shrink-0">
                      <CalendarIcon className="h-6 w-6 text-neon-cyan" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-text-secondary text-sm mb-2">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                        <span className="mx-2">•</span>
                        <span>{event.type}</span>
                      </div>
                      <p className="text-text-secondary text-sm">
                        {event.description}
                      </p>
                      <Button variant="outline" size="sm" className="mt-3 text-xs">
                        Register
                      </Button>
                    </div>
                  </div>
                </div>)}
            </div>
          </Card>

          {/* Learning Paths */}
          <Card className="p-6 border border-neon-cyan/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-text-primary">
                Learning Paths
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              <div className="bg-background-light/20 p-4 rounded-lg border border-neon-cyan/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <GraduationCapIcon className="h-5 w-5 text-neon-cyan mr-2" />
                    <h3 className="font-medium text-text-primary">
                      Air Quality Fundamentals
                    </h3>
                  </div>
                  <span className="text-xs bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded-full">
                    Beginner
                  </span>
                </div>
                <div className="mb-3">
                  <div className="h-1.5 bg-background-light/30 rounded-full overflow-hidden">
                    <div className="h-full bg-neon-cyan rounded-full" style={{
                    width: '60%'
                  }}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-text-secondary text-xs">
                      Progress: 60%
                    </span>
                    <span className="text-text-secondary text-xs">
                      3/5 modules
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Continue Learning
                </Button>
              </div>
              <div className="bg-background-light/20 p-4 rounded-lg border border-neon-cyan/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-5 w-5 text-neon-cyan mr-2" />
                    <h3 className="font-medium text-text-primary">
                      Health Effects of Air Pollution
                    </h3>
                  </div>
                  <span className="text-xs bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded-full">
                    Intermediate
                  </span>
                </div>
                <div className="mb-3">
                  <div className="h-1.5 bg-background-light/30 rounded-full overflow-hidden">
                    <div className="h-full bg-neon-cyan rounded-full" style={{
                    width: '25%'
                  }}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-text-secondary text-xs">
                      Progress: 25%
                    </span>
                    <span className="text-text-secondary text-xs">
                      1/4 modules
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Continue Learning
                </Button>
              </div>
              <div className="bg-background-light/20 p-4 rounded-lg border border-neon-cyan/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <CloudIcon className="h-5 w-5 text-neon-cyan mr-2" />
                    <h3 className="font-medium text-text-primary">
                      Advanced Air Quality Analysis
                    </h3>
                  </div>
                  <span className="text-xs bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded-full">
                    Advanced
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Start Learning
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Newsletter Subscription */}
        <Card className="p-8 border border-neon-cyan/30 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <AwardIcon className="h-12 w-12 text-neon-cyan mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-3">
              Stay Informed with Our Newsletter
            </h2>
            <p className="text-text-secondary mb-6">
              Subscribe to receive the latest educational resources, upcoming
              events, and air quality news directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input type="email" placeholder="Your email address" className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan bg-background-dark/50 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50" />
              <Button variant="primary" glow className="whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
            <p className="text-xs text-text-secondary mt-3">
              By subscribing, you agree to our Privacy Policy and Terms of
              Service.
            </p>
          </div>
        </Card>
      </div>
    </div>;
};
// Custom Calendar Icon component
const CalendarIcon = ({
  className
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>;