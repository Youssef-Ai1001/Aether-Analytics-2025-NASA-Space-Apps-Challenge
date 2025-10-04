import React, { useState, Children } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ActivityIcon, HeartIcon, CloudIcon, UserIcon, AlertTriangleIcon, CheckCircleIcon, CalendarIcon, ChevronDownIcon, ClockIcon, ArrowRightIcon, BarChart2Icon, SlidersIcon, InfoIcon } from 'lucide-react';
// Mock data for health profiles
const healthProfiles = [{
  id: 1,
  name: 'General',
  description: 'Default health profile for adults with no specific health concerns'
}, {
  id: 2,
  name: 'Respiratory Conditions',
  description: 'For individuals with asthma, COPD, or other respiratory issues'
}, {
  id: 3,
  name: 'Cardiovascular',
  description: 'For individuals with heart disease or high blood pressure'
}, {
  id: 4,
  name: 'Children',
  description: 'Tailored for children under 12 years old'
}, {
  id: 5,
  name: 'Elderly',
  description: 'For adults over 65 years old'
}, {
  id: 6,
  name: 'Pregnant',
  description: 'For expectant mothers'
}, {
  id: 7,
  name: 'Athletes',
  description: 'For individuals who exercise outdoors regularly'
}];
// Mock data for health recommendations
const healthRecommendations = [{
  id: 1,
  title: 'Moderate Air Quality Today',
  description: "Today's air quality is in the moderate range. Most individuals won't experience negative health effects, but sensitive groups should consider limiting prolonged outdoor exposure.",
  severity: 'moderate',
  pollutant: 'PM2.5',
  value: '58 μg/m³',
  time: 'Updated 20 minutes ago'
}, {
  id: 2,
  title: 'Increased Ozone Tomorrow',
  description: 'Ozone levels are forecasted to increase tomorrow afternoon. Consider scheduling outdoor activities in the morning when levels are lower.',
  severity: 'warning',
  pollutant: 'O3',
  value: '85 ppb (forecast)',
  time: 'For tomorrow, 1-5 PM'
}, {
  id: 3,
  title: 'Pollen Count Rising',
  description: 'Tree pollen counts are rising this week. If you have allergies, consider taking preventative medication and keeping windows closed.',
  severity: 'moderate',
  pollutant: 'Pollen',
  value: 'High',
  time: 'Seasonal alert'
}];
// Helper function for recommendation styling
const getSeverityStyles = severity => {
  switch (severity) {
    case 'good':
      return {
        icon: <CheckCircleIcon className="h-5 w-5 text-neon-green" />,
        border: 'border-neon-green',
        bg: 'bg-neon-green/10'
      };
    case 'moderate':
      return {
        icon: <AlertTriangleIcon className="h-5 w-5 text-alert-yellow" />,
        border: 'border-alert-yellow',
        bg: 'bg-alert-yellow/10'
      };
    case 'warning':
      return {
        icon: <AlertTriangleIcon className="h-5 w-5 text-alert-orange" />,
        border: 'border-alert-orange',
        bg: 'bg-alert-orange/10'
      };
    case 'danger':
      return {
        icon: <AlertTriangleIcon className="h-5 w-5 text-alert-red" />,
        border: 'border-alert-red',
        bg: 'bg-alert-red/10'
      };
    default:
      return {
        icon: <InfoIcon className="h-5 w-5 text-neon-cyan" />,
        border: 'border-neon-cyan',
        bg: 'bg-neon-cyan/10'
      };
  }
};
export const HealthAdvisor = () => {
  const [activeProfile, setActiveProfile] = useState(1);
  const [showAllProfiles, setShowAllProfiles] = useState(false);
  return <div className="pt-16 min-h-screen bg-background-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Health <span className="text-neon-cyan">Advisor</span>
            </h1>
            <p className="text-text-secondary">
              Personalized health recommendations based on air quality
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 bg-background-light/30 rounded-md px-3 py-1.5 border border-neon-cyan/30">
              <CalendarIcon className="h-4 w-4 text-neon-cyan" />
              <span className="text-text-secondary text-sm">
                {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
              </span>
            </div>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4" />
              <span>My Profile</span>
            </Button>
          </div>
        </div>

        {/* Health Profile Selector */}
        <Card className="p-6 mb-8 border border-neon-cyan/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-1">
                Health Profile
              </h2>
              <p className="text-text-secondary text-sm">
                Select a health profile to receive personalized recommendations
              </p>
            </div>
            <Button variant="primary" size="sm" className="mt-4 md:mt-0">
              Create Custom Profile
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthProfiles.slice(0, showAllProfiles ? healthProfiles.length : 3).map(profile => <div key={profile.id} onClick={() => setActiveProfile(profile.id)} className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border ${activeProfile === profile.id ? 'border-neon-cyan bg-neon-cyan/10' : 'border-background-light/50 hover:border-neon-cyan/50'}`}>
                  <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${activeProfile === profile.id ? 'bg-neon-cyan/20' : 'bg-background-light/30'}`}>
                      {profile.id === 1 && <UserIcon className={`h-5 w-5 ${activeProfile === profile.id ? 'text-neon-cyan' : 'text-text-secondary'}`} />}
                      {profile.id === 2 && <div className={`h-5 w-5 ${activeProfile === profile.id ? 'text-neon-cyan' : 'text-text-secondary'}`} />}
                      {profile.id === 3 && <HeartIcon className={`h-5 w-5 ${activeProfile === profile.id ? 'text-neon-cyan' : 'text-text-secondary'}`} />}
                      {profile.id === 4 && <UserIcon className={`h-5 w-5 ${activeProfile === profile.id ? 'text-neon-cyan' : 'text-text-secondary'}`} />}
                      {profile.id === 5 && <UserIcon className={`h-5 w-5 ${activeProfile === profile.id ? 'text-neon-cyan' : 'text-text-secondary'}`} />}
                      {profile.id === 6 && <UserIcon className={`h-5 w-5 ${activeProfile === profile.id ? 'text-neon-cyan' : 'text-text-secondary'}`} />}
                      {profile.id === 7 && <ActivityIcon className={`h-5 w-5 ${activeProfile === profile.id ? 'text-neon-cyan' : 'text-text-secondary'}`} />}
                    </div>
                    <div>
                      <h3 className={`font-medium ${activeProfile === profile.id ? 'text-neon-cyan' : 'text-text-primary'}`}>
                        {profile.name}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {profile.description}
                      </p>
                    </div>
                  </div>
                </div>)}
          </div>
          {healthProfiles.length > 3 && <button onClick={() => setShowAllProfiles(!showAllProfiles)} className="flex items-center justify-center text-neon-cyan text-sm mt-4 mx-auto hover:underline">
              {showAllProfiles ? 'Show Less' : 'Show All Profiles'}
              <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-300 ${showAllProfiles ? 'rotate-180' : ''}`} />
            </button>}
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Health Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border border-neon-cyan/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Current Health Recommendations
                </h2>
                <div className="flex items-center space-x-2 text-text-secondary text-sm">
                  <ClockIcon className="h-4 w-4 text-neon-cyan" />
                  <span>Last updated: 20 minutes ago</span>
                </div>
              </div>
              <div className="space-y-4">
                {healthRecommendations.map(rec => {
                const styles = getSeverityStyles(rec.severity);
                return <div key={rec.id} className={`p-4 rounded-lg border-l-4 ${styles.border} bg-background-light/20`}>
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">{styles.icon}</div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                            <h3 className="font-medium text-text-primary">
                              {rec.title}
                            </h3>
                            <div className="flex items-center mt-1 md:mt-0 space-x-2">
                              <span className={`text-xs py-1 px-2 rounded-full ${styles.bg}`}>
                                {rec.pollutant}: {rec.value}
                              </span>
                              <span className="text-text-secondary text-xs">
                                {rec.time}
                              </span>
                            </div>
                          </div>
                          <p className="text-text-secondary text-sm">
                            {rec.description}
                          </p>
                        </div>
                      </div>
                    </div>;
              })}
              </div>
              <div className="mt-6 pt-6 border-t border-neon-cyan/20">
                <h3 className="text-lg font-medium text-text-primary mb-4">
                  Suggested Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background-light/20 p-4 rounded-lg border border-neon-cyan/20">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-neon-cyan/10 rounded-full flex items-center justify-center mr-3">
                        <HeartIcon className="h-4 w-4 text-neon-cyan" />
                      </div>
                      <h4 className="text-text-primary font-medium">
                        Indoor Activities
                      </h4>
                    </div>
                    <p className="text-text-secondary text-sm">
                      Consider indoor exercise options today. Keep windows
                      closed during peak pollution hours (2-6 PM).
                    </p>
                  </div>
                  <div className="bg-background-light/20 p-4 rounded-lg border border-neon-cyan/20">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-neon-cyan/10 rounded-full flex items-center justify-center mr-3">
                        <CloudIcon className="h-4 w-4 text-neon-cyan" />
                      </div>
                      <h4 className="text-text-primary font-medium">
                        Air Purification
                      </h4>
                    </div>
                    <p className="text-text-secondary text-sm">
                      Run air purifiers if available. Change HVAC filters if
                      they haven't been changed in the last 3 months.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6 border border-neon-cyan/30">
              <h2 className="text-xl font-semibold text-text-primary mb-6">
                Health Impact Analysis
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-3">
                    Daily Exposure Summary
                  </h3>
                  <div className="h-64">
                    <div className="w-full h-full flex items-center justify-center bg-background-light/20 rounded-lg">
                      <div className="text-center p-6">
                        <BarChart2Icon className="h-12 w-12 text-neon-cyan mx-auto mb-3" />
                        <p className="text-text-secondary">
                          Visualize your daily exposure to different pollutants
                          and allergens
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Connect Health Device
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-neon-cyan/20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-text-primary">
                      Long-term Health Insights
                    </h3>
                    <Button variant="outline" size="sm">
                      View Full Report
                    </Button>
                  </div>
                  <p className="text-text-secondary mb-4">
                    Based on your location and profile, here are your
                    personalized long-term health insights:
                  </p>
                  <div className="bg-background-light/20 p-4 rounded-lg border border-neon-cyan/20">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="bg-neon-cyan rounded-full p-1 mt-1 mr-3">
                          <svg className="h-3 w-3 text-background-dark" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-text-secondary text-sm">
                          Your area has seen a 12% improvement in annual average
                          PM2.5 levels over the last 3 years.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-neon-cyan rounded-full p-1 mt-1 mr-3">
                          <svg className="h-3 w-3 text-background-dark" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-text-secondary text-sm">
                          Summer ozone levels remain a concern for your
                          respiratory profile. Consider indoor activities during
                          peak ozone days.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-neon-cyan rounded-full p-1 mt-1 mr-3">
                          <svg className="h-3 w-3 text-background-dark" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-text-secondary text-sm">
                          Your exposure history suggests a 15% lower risk of air
                          quality related health issues compared to the average
                          resident in your area.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-lg font-medium text-text-primary mb-4">
                Your Air Quality
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full border-4 border-alert-yellow flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-alert-yellow">
                        58
                      </span>
                    </div>
                    <div>
                      <p className="text-text-secondary text-xs">Current AQI</p>
                      <p className="text-alert-yellow font-medium">Moderate</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    View Details
                  </Button>
                </div>
                <div className="pt-4 border-t border-neon-cyan/20">
                  <p className="text-text-secondary text-sm mb-3">
                    Primary Pollutants
                  </p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary">PM2.5</span>
                        <span className="text-neon-cyan">32 μg/m³</span>
                      </div>
                      <div className="h-1.5 bg-background-light/30 rounded-full overflow-hidden">
                        <div className="h-full bg-neon-cyan rounded-full" style={{
                        width: '32%'
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary">O3 (Ozone)</span>
                        <span className="text-alert-yellow">45 ppb</span>
                      </div>
                      <div className="h-1.5 bg-background-light/30 rounded-full overflow-hidden">
                        <div className="h-full bg-alert-yellow rounded-full" style={{
                        width: '45%'
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary">NO2</span>
                        <span className="text-neon-green">18 ppb</span>
                      </div>
                      <div className="h-1.5 bg-background-light/30 rounded-full overflow-hidden">
                        <div className="h-full bg-neon-green rounded-full" style={{
                        width: '18%'
                      }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-lg font-medium text-text-primary mb-4">
                Health Tips
              </h3>
              <div className="space-y-4">
                <div className="bg-background-light/20 p-3 rounded-lg">
                  <div className="flex">
                    <div className="mr-3 mt-0.5">
                      <div className="h-5 w-5 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-text-primary font-medium text-sm mb-1">
                        Respiratory Health
                      </h4>
                      <p className="text-text-secondary text-xs">
                        Take preventative medications before symptoms appear
                        when AQI exceeds 50.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-background-light/20 p-3 rounded-lg">
                  <div className="flex">
                    <div className="mr-3 mt-0.5">
                      <ActivityIcon className="h-5 w-5 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-text-primary font-medium text-sm mb-1">
                        Exercise Timing
                      </h4>
                      <p className="text-text-secondary text-xs">
                        Schedule outdoor activities in the morning when air
                        quality is typically better.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-background-light/20 p-3 rounded-lg">
                  <div className="flex">
                    <div className="mr-3 mt-0.5">
                      <HeartIcon className="h-5 w-5 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-text-primary font-medium text-sm mb-1">
                        Heart Health
                      </h4>
                      <p className="text-text-secondary text-xs">
                        Monitor blood pressure more frequently during high
                        pollution days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neon-cyan/20">
                <a href="#" className="text-neon-cyan text-sm flex items-center hover:underline">
                  View all health tips
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </a>
              </div>
            </Card>
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-lg font-medium text-text-primary mb-4">
                Connect Devices
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Connect your health devices to receive more personalized
                recommendations
              </p>
              <div className="space-y-3">
                <button className="w-full py-2 px-3 bg-background-light/20 rounded-lg text-left hover:bg-background-light/30 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M2 12h20" />
                      </svg>
                    </div>
                    <span className="text-text-primary text-sm">
                      Add Health Device
                    </span>
                  </div>
                </button>
                <button className="w-full py-2 px-3 bg-background-light/20 rounded-lg text-left hover:bg-background-light/30 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <span className="text-text-primary text-sm">
                      Connect Activity Tracker
                    </span>
                  </div>
                </button>
                <button className="w-full py-2 px-3 bg-background-light/20 rounded-lg text-left hover:bg-background-light/30 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-3">
                      <HeartIcon className="h-4 w-4 text-neon-cyan" />
                    </div>
                    <span className="text-text-primary text-sm">
                      Connect Heart Monitor
                    </span>
                  </div>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};