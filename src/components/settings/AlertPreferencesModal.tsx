import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Switch } from '../ui/Switch';
import { XIcon, BellIcon } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  values: {
    critical: boolean;
    moderate: boolean;
    daily: boolean;
    health: boolean;
  };
  onChange: (next: Props['values']) => void;
  onSave?: () => void;
};

export function AlertPreferencesModal({ open, onClose, values, onChange, onSave }: Props) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg mx-4">
        <Card className="relative p-6 bg-background-dark border border-neon-cyan/30 rounded-xl shadow-[0_0_40px_rgba(0,230,255,0.12)]">
          <button className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/5" onClick={onClose} aria-label="Close">
            <XIcon className="h-5 w-5 text-text-secondary" />
          </button>
          <div className="flex items-center gap-2 mb-4">
            <BellIcon className="h-5 w-5 text-neon-cyan" />
            <h3 className="text-lg font-semibold text-text-primary">Manage Alerts</h3>
          </div>
          <div className="divide-y divide-white/10">
            <div className="flex items-start justify-between py-3">
              <div>
                <div className="text-text-primary font-medium">Critical Alerts</div>
                <div className="text-sm text-text-secondary">Get notified about dangerous air quality</div>
              </div>
              <Switch checked={values.critical} onCheckedChange={v => onChange({ ...values, critical: v })} accent="red" />
            </div>
            <div className="flex items-start justify-between py-3">
              <div>
                <div className="text-text-primary font-medium">Moderate Alerts</div>
                <div className="text-sm text-text-secondary">Warnings for sensitive groups</div>
              </div>
              <Switch checked={values.moderate} onCheckedChange={v => onChange({ ...values, moderate: v })} accent="orange" />
            </div>
            <div className="flex items-start justify-between py-3">
              <div>
                <div className="text-text-primary font-medium">Daily Forecasts</div>
                <div className="text-sm text-text-secondary">Daily air quality predictions</div>
              </div>
              <Switch checked={values.daily} onCheckedChange={v => onChange({ ...values, daily: v })} accent="cyan" />
            </div>
            <div className="flex items-start justify-between py-3">
              <div>
                <div className="text-text-primary font-medium">Health Recommendations</div>
                <div className="text-sm text-text-secondary">Personalized advice based on your profile</div>
              </div>
              <Switch checked={values.health} onCheckedChange={v => onChange({ ...values, health: v })} accent="green" />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={onSave}>Save</Button>
          </div>
        </Card>
      </div>
    </div>;
}

export default AlertPreferencesModal;

