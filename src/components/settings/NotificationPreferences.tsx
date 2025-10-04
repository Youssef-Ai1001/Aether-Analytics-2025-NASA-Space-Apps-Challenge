import { useState } from 'react';
import { Card } from '../ui/Card';
import { Switch } from '../ui/Switch';

export function NotificationPreferences() {
  const [critical, setCritical] = useState(false);
  const [moderate, setModerate] = useState(false);
  const [daily, setDaily] = useState(false);
  const [health, setHealth] = useState(false);

  return <div className="pt-16 min-h-screen" style={{ backgroundColor: '#0B1D2A' }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Notification Preferences</h1>
        <Card className="p-6 bg-background-dark/60 border border-neon-cyan/20 rounded-xl shadow-[0_0_40px_rgba(0,230,255,0.08)]">
          <div className="divide-y divide-white/10">
            <div className="flex items-start justify-between py-4">
              <div>
                <div className="text-white font-semibold">Critical Alerts</div>
                <div className="text-sm" style={{ color: '#B0BEC5' }}>Get notified about dangerous air quality</div>
              </div>
              <Switch checked={critical} onCheckedChange={setCritical} accent="red" />
            </div>
            <div className="flex items-start justify-between py-4">
              <div>
                <div className="text-white font-semibold">Moderate Alerts</div>
                <div className="text-sm" style={{ color: '#B0BEC5' }}>Warnings for sensitive groups</div>
              </div>
              <Switch checked={moderate} onCheckedChange={setModerate} accent="orange" />
            </div>
            <div className="flex items-start justify-between py-4">
              <div>
                <div className="text-white font-semibold">Daily Forecasts</div>
                <div className="text-sm" style={{ color: '#B0BEC5' }}>Daily air quality predictions</div>
              </div>
              <Switch checked={daily} onCheckedChange={setDaily} accent="cyan" />
            </div>
            <div className="flex items-start justify-between py-4">
              <div>
                <div className="text-white font-semibold">Health Recommendations</div>
                <div className="text-sm" style={{ color: '#B0BEC5' }}>Personalized advice based on your profile</div>
              </div>
              <Switch checked={health} onCheckedChange={setHealth} accent="green" />
            </div>
          </div>
        </Card>
      </div>
    </div>;
}

export default NotificationPreferences;

