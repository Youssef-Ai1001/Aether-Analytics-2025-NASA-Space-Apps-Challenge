import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { XIcon, ClockIcon, BellIcon } from 'lucide-react';

type HistoryItem = {
  id: number;
  title: string;
  time: string;
  severity?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  items: HistoryItem[];
};

export function AlertHistoryModal({ open, onClose, items }: Props) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl mx-4">
        <Card className="relative p-6 bg-background-dark border border-neon-cyan/30 rounded-xl shadow-[0_0_40px_rgba(0,230,255,0.12)]">
          <button className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/5" onClick={onClose} aria-label="Close">
            <XIcon className="h-5 w-5 text-text-secondary" />
          </button>
          <div className="flex items-center gap-2 mb-4">
            <BellIcon className="h-5 w-5 text-neon-cyan" />
            <h3 className="text-lg font-semibold text-text-primary">Alert History</h3>
          </div>
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-white/10">
            {items.length === 0 ? (
              <div className="text-text-secondary text-sm py-6">No history yet.</div>
            ) : (
              items.map(item => (
                <div key={item.id} className="py-3 flex items-start justify-between">
                  <div>
                    <div className="text-text-primary font-medium">{item.title}</div>
                    <div className="text-xs text-text-secondary flex items-center mt-1">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {item.time}
                    </div>
                  </div>
                  {item.severity && <span className="text-text-secondary text-xs">{item.severity}</span>}
                </div>
              ))
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </Card>
      </div>
    </div>;
}

export default AlertHistoryModal;

