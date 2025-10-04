import { useEffect, useMemo, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BellIcon, BellOffIcon, MapPinIcon, CheckCircleIcon, AlertTriangleIcon, AlertCircleIcon, InfoIcon, FilterIcon, ChevronDownIcon, ChevronRightIcon, ClockIcon, CloudIcon } from 'lucide-react';
import AlertHistoryModal from '../components/settings/AlertHistoryModal';
import AlertPreferencesModal from '../components/settings/AlertPreferencesModal';
type AlertItem = {
  id: number;
  type: 'warning' | 'forecast' | 'info';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string;
  time: string;
  pollutant: string;
  value: number;
  recommendation: string;
  expires: string;
};
// Mock data for alerts
const mockAlerts: AlertItem[] = [{
  id: 1,
  type: 'warning',
  severity: 'high',
  title: 'Unhealthy Air Quality',
  description: 'Air quality levels have reached unhealthy levels in downtown Los Angeles due to wildfire smoke.',
  location: 'Los Angeles, CA',
  time: '10 minutes ago',
  pollutant: 'PM2.5',
  value: 158,
  recommendation: 'Sensitive groups should avoid outdoor activities. Everyone else should limit prolonged outdoor exertion.',
  expires: '5 hours'
}, {
  id: 2,
  type: 'warning',
  severity: 'medium',
  title: 'Moderate Ozone Levels',
  description: 'Ozone levels are expected to reach moderate levels this afternoon.',
  location: 'Phoenix, AZ',
  time: '25 minutes ago',
  pollutant: 'O3',
  value: 89,
  recommendation: 'People with respiratory issues should consider limiting prolonged outdoor activities.',
  expires: '8 hours'
}, {
  id: 3,
  type: 'forecast',
  severity: 'medium',
  title: 'Deteriorating Air Quality',
  description: 'Air quality is expected to worsen tomorrow due to incoming weather patterns.',
  location: 'Denver, CO',
  time: '1 hour ago',
  pollutant: 'PM10',
  value: 92,
  recommendation: 'Plan outdoor activities for early morning when air quality is better.',
  expires: '24 hours'
}, {
  id: 4,
  type: 'info',
  severity: 'low',
  title: 'Air Quality Advisory',
  description: 'An air quality advisory has been issued for the greater Seattle area.',
  location: 'Seattle, WA',
  time: '3 hours ago',
  pollutant: 'NO2',
  value: 54,
  recommendation: 'No immediate action needed. Monitor updates if you have respiratory conditions.',
  expires: '48 hours'
}, {
  id: 5,
  type: 'warning',
  severity: 'critical',
  title: 'Hazardous Air Quality',
  description: 'Air quality has reached hazardous levels due to industrial incident.',
  location: 'Houston, TX',
  time: '30 minutes ago',
  pollutant: 'SO2',
  value: 305,
  recommendation: 'Everyone should avoid outdoor activities. Stay indoors with windows closed and air purifiers running if available.',
  expires: '12 hours'
}];
// Helper functions for alert styling
const getSeverityColor = (severity: AlertItem['severity']) => {
  switch (severity) {
    case 'low':
      return 'bg-neon-green text-background-dark';
    case 'medium':
      return 'bg-alert-yellow text-background-dark';
    case 'high':
      return 'bg-alert-orange text-background-dark';
    case 'critical':
      return 'bg-alert-red text-background-dark';
    default:
      return 'bg-neon-cyan text-background-dark';
  }
};
const getSeverityBorder = (severity: AlertItem['severity']) => {
  switch (severity) {
    case 'low':
      return 'border-neon-green';
    case 'medium':
      return 'border-alert-yellow';
    case 'high':
      return 'border-alert-orange';
    case 'critical':
      return 'border-alert-red';
    default:
      return 'border-neon-cyan';
  }
};
const getAlertIcon = (type: AlertItem['type'], severity: AlertItem['severity']) => {
  if (type === 'info') return <InfoIcon className="h-5 w-5 text-neon-cyan" />;
  if (type === 'forecast') return <CloudIcon className="h-5 w-5 text-neon-cyan" />;
  switch (severity) {
    case 'low':
      return <CheckCircleIcon className="h-5 w-5 text-neon-green" />;
    case 'medium':
      return <AlertTriangleIcon className="h-5 w-5 text-alert-yellow" />;
    case 'high':
      return <AlertTriangleIcon className="h-5 w-5 text-alert-orange" />;
    case 'critical':
      return <AlertCircleIcon className="h-5 w-5 text-alert-red" />;
    default:
      return <BellIcon className="h-5 w-5 text-neon-cyan" />;
  }
};
export const Alerts = () => {
  const [activeAlerts, setActiveAlerts] = useState<AlertItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'moderate'>('all');
  const [manageOpen, setManageOpen] = useState(false);
  const [prefs, setPrefs] = useState({ critical: false, moderate: true, daily: true, health: false });
  const [historyOpen, setHistoryOpen] = useState(false);
  const historyItems = activeAlerts.map(a => ({ id: a.id, title: a.title, time: a.time, severity: a.severity }));
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setActiveAlerts(mockAlerts);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const visibleAlerts = useMemo(() => {
    if (filter === 'all') return activeAlerts;
    if (filter === 'critical') return activeAlerts.filter(a => a.severity === 'critical');
    if (filter === 'high') return activeAlerts.filter(a => a.severity === 'high' || a.severity === 'critical');
    if (filter === 'moderate') return activeAlerts.filter(a => a.severity === 'medium' || a.severity === 'high' || a.severity === 'critical');
    return activeAlerts;
  }, [activeAlerts, filter]);
  return <div className="pt-16 min-h-screen bg-background-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Air Quality <span className="text-neon-cyan">Alerts</span>
            </h1>
            <p className="text-text-secondary">
              Real-time notifications and warnings about air quality conditions
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="primary" size="sm" className="flex items-center space-x-2">
              <BellIcon className="h-4 w-4" />
              <span>Configure Alerts</span>
            </Button>
          </div>
        </div>

        {/* Alert Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Alert Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-lg font-medium text-text-primary mb-4">
                Alert Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-alert-red/20 flex items-center justify-center">
                      <AlertCircleIcon className="h-4 w-4 text-alert-red" />
                    </div>
                    <span className="text-text-secondary">Critical</span>
                  </div>
                  <span className="text-alert-red font-medium">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-alert-orange/20 flex items-center justify-center">
                      <AlertTriangleIcon className="h-4 w-4 text-alert-orange" />
                    </div>
                    <span className="text-text-secondary">High</span>
                  </div>
                  <span className="text-alert-orange font-medium">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-alert-yellow/20 flex items-center justify-center">
                      <AlertTriangleIcon className="h-4 w-4 text-alert-yellow" />
                    </div>
                    <span className="text-text-secondary">Moderate</span>
                  </div>
                  <span className="text-alert-yellow font-medium">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center">
                      <CheckCircleIcon className="h-4 w-4 text-neon-green" />
                    </div>
                    <span className="text-text-secondary">Low/Info</span>
                  </div>
                  <span className="text-neon-green font-medium">1</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-neon-cyan/20">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">
                    Total Active Alerts
                  </span>
                  <span className="text-neon-cyan font-medium text-lg">5</span>
                </div>
              </div>
            </Card>
            <Card className="p-6 border border-neon-cyan/30">
              <h3 className="text-lg font-medium text-text-primary mb-4">
                Alert Settings
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <BellIcon className="h-5 w-5 text-neon-cyan" />
                    <span className="text-text-secondary">Alerts</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => setManageOpen(true)}>
                    Manage
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="primary" className="w-full">
                  Save Preferences
                </Button>
              </div>
            </Card>
          </div>

          {/* Alert List */}
          <div className="lg:col-span-3">
            <Card className="p-6 border border-neon-cyan/30">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h3 className="text-lg font-medium text-text-primary mb-2 md:mb-0">
                  Active Alerts
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <FilterIcon className="h-4 w-4 text-neon-cyan" />
                    <span className="text-text-secondary text-sm">Filter:</span>
                  </div>
                  <div className="relative">
                    <select className="appearance-none bg-background-light/30 border border-neon-cyan/30 rounded-md px-3 py-1 pr-8 text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-neon-cyan" value={filter} onChange={e => setFilter(e.target.value as 'all' | 'critical' | 'high' | 'moderate')}>
                      <option value="all">All Alerts</option>
                      <option value="critical">Critical Only</option>
                      <option value="high">High & Above</option>
                      <option value="moderate">Moderate & Above</option>
                    </select>
                    <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neon-cyan pointer-events-none" />
                  </div>
                </div>
              </div>
              {isLoading ? <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-secondary">Loading alerts...</p>
                  </div>
                </div> : <div className="space-y-4">
                  {visibleAlerts.map(alert => <div key={alert.id} className={`bg-background-light/20 rounded-lg border-l-4 ${getSeverityBorder(alert.severity)} overflow-hidden transition-all duration-300 hover:bg-background-light/30`}>
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className="mr-4 mt-1">
                            {getAlertIcon(alert.type, alert.severity)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                              <h4 className="text-text-primary font-medium">
                                {alert.title}
                              </h4>
                              <div className="flex items-center mt-1 md:mt-0">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getSeverityColor(alert.severity)}`}>
                                  {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                                </span>
                                <span className="text-text-secondary text-xs ml-2 flex items-center">
                                  <ClockIcon className="h-3 w-3 mr-1" />
                                  {alert.time}
                                </span>
                              </div>
                            </div>
                            <p className="text-text-secondary text-sm mb-3">
                              {alert.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <div className="bg-background-light/30 text-text-secondary text-xs px-2 py-1 rounded flex items-center">
                                <MapPinIcon className="h-3 w-3 mr-1" />
                                {alert.location}
                              </div>
                              <div className="bg-background-light/30 text-text-secondary text-xs px-2 py-1 rounded">
                                {alert.pollutant}: {alert.value}
                              </div>
                              <div className="bg-background-light/30 text-text-secondary text-xs px-2 py-1 rounded flex items-center">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                Expires in {alert.expires}
                              </div>
                            </div>
                            <div className="bg-background-dark/50 rounded p-3 text-text-secondary text-sm">
                              <strong className="text-neon-cyan">
                                Recommendation:
                              </strong>{' '}
                              {alert.recommendation}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-background-light/30 px-4 py-2 flex justify-between items-center border-t border-neon-cyan/10">
                        <button className="text-neon-cyan text-xs flex items-center">
                          <BellOffIcon className="h-3 w-3 mr-1" />
                          Mute this alert
                        </button>
                        <button className="text-neon-cyan text-xs flex items-center">
                          View details
                          <ChevronRightIcon className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </div>)}
                </div>}
              <div className="mt-6 text-center">
                <Button variant="outline" onClick={() => setHistoryOpen(true)}>View Alert History</Button>
              </div>
            </Card>
          </div>
        </div>

      </div>
      <AlertPreferencesModal open={manageOpen} onClose={() => setManageOpen(false)} values={prefs} onChange={setPrefs} onSave={() => setManageOpen(false)} />
      <AlertHistoryModal open={historyOpen} onClose={() => setHistoryOpen(false)} items={historyItems} />
    </div>;
};