import { useCallback, useEffect, useState } from 'react';
import { XIcon, MailIcon, MapPinIcon, CompassIcon, ShieldCheckIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircle2Icon } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';


type Props = {
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
};

type Step = 'email' | 'otp' | 'location' | 'health' | 'welcome';

const healthOptions = [
  'Asthma',
  'Elderly (65+)',
  'Children under 12',
  'Heart Conditions',
  'Respiratory Issues'
];

export function SignupModal({ open, onClose, onComplete }: Props) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [usingLocation, setUsingLocation] = useState(false);
  const [conditions, setConditions] = useState<string[]>([]);
  


  useEffect(() => {
    if (open) {
      setStep('email');
      setEmail('');
      setOtp('');
      setError(null);
      setLocationQuery('');
      setConditions([]);
    }
  }, [open]);

  const canClose = true;

  const toggleCondition = useCallback((c: string) => {
    setConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }, []);

  function handleEmailNext() {
    setError(null);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setStep('otp');
  }

  function handleVerifyOtp() {
    setError(null);
    if (!otp || otp.trim().length < 6) {
      setError('Enter the 6-digit OTP sent to your email.');
      return;
    }

    setStep('location');
  }

  function handleUseCurrentLocation() {
    setUsingLocation(true);
    navigator.geolocation?.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      setLocationQuery(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      setUsingLocation(false);
    }, () => {
      setError('Unable to get current location. Please enter it manually.');
      setUsingLocation(false);
    });
  }

  function nextFromLocation() {
    if (!locationQuery.trim()) {
      setError('Please enter your city/zip or use current location.');
      return;
    }
    setError(null);
    setStep('health');
  }

  function completeSignup() {
    onComplete?.();
    setStep('welcome');
  }

  if (!open) return null;

  return <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm" onClick={() => canClose && onClose()}></div>
      <div className="relative w-full max-w-lg mx-4">
        <Card className="relative overflow-hidden border border-neon-cyan/40 bg-gradient-to-br from-background-darker/90 via-background-dark/90 to-background-dark/90 shadow-[0_0_40px_rgba(0,230,255,0.15)]">
          <div className="absolute -inset-1 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,230,255,0.2),transparent_70%)] pointer-events-none"></div>
          <button className={`absolute top-3 right-3 p-2 rounded-full hover:bg-white/5 transition ${canClose ? '' : 'opacity-50 cursor-not-allowed'}`} onClick={() => canClose && onClose()} aria-label="Close">
            <XIcon className="h-5 w-5 text-text-secondary hover:text-neon-cyan" />
          </button>

          <div className="p-6">
            {error && <div className="mb-4 text-sm text-red-400">{error}</div>}

            {step === 'email' && <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MailIcon className="h-5 w-5 text-neon-cyan" />
                  <h3 className="text-xl font-semibold">Welcome to Community Hub</h3>
                </div>
                <p className="text-text-secondary text-sm">Enter your email to continue. If you already have an account, we’ll log you in.</p>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg bg-background-light/30 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan" />
                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline" onClick={onClose}>Cancel</Button>
                  <Button variant="primary" className="flex items-center gap-2" onClick={handleEmailNext}>
                    Continue
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>}

            {step === 'otp' && <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MailIcon className="h-5 w-5 text-neon-cyan" />
                  <h3 className="text-xl font-semibold">Verify your email</h3>
                </div>
                <p className="text-text-secondary text-sm">We sent a 6-digit code to {email}. Enter any 6 digits for now (backend will verify later).</p>
                <div className="flex gap-2">
                  <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="OTP (use 123456)" className="flex-1 px-4 py-3 rounded-lg bg-background-light/30 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan" />
                  <Button variant="primary" onClick={handleVerifyOtp}>Verify</Button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => setStep('email')}>
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back
                  </Button>
                  <Button variant="outline" onClick={handleEmailNext}>Resend Code</Button>
                </div>
              </div>}

            {step === 'location' && <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-neon-cyan" />
                  <h3 className="text-xl font-semibold">Where are you located?</h3>
                </div>
                <p className="text-text-secondary text-sm">Enter your city or zip code to personalize your experience.</p>
                <input value={locationQuery} onChange={e => setLocationQuery(e.target.value)} placeholder="City or ZIP" className="w-full px-4 py-3 rounded-lg bg-background-light/30 border border-neon-cyan/30 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan" />
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="flex items-center gap-2" onClick={handleUseCurrentLocation}>
                    <CompassIcon className="h-4 w-4" />
                    <span>Use Current Location</span>
                  </Button>
                  <div className="flex-1"></div>
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => setStep('email')}>
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back
                  </Button>
                  <Button variant="primary" className="flex items-center gap-2" onClick={nextFromLocation}>
                    Next
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>}

            {step === 'health' && <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5 text-neon-cyan" />
                  <h3 className="text-xl font-semibold">Any health sensitivities?</h3>
                </div>
                <p className="text-text-secondary text-sm">Select any that apply. You can skip and update later.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {healthOptions.map(opt => <button key={opt} onClick={() => toggleCondition(opt)} className={`p-3 rounded-lg border transition-all text-left ${conditions.includes(opt) ? 'border-neon-green bg-neon-green/10 shadow-[0_0_20px_rgba(20,255,158,0.15)]' : 'border-neon-cyan/30 hover:border-neon-cyan/60 hover:bg-neon-cyan/5'}`}>
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {conditions.includes(opt) && <CheckCircle2Icon className="h-5 w-5 text-neon-green" />}
                      </div>
                    </button>)}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => setStep('location')}>
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setStep('welcome')}>Skip</Button>
                    <Button variant="primary" onClick={completeSignup}>Finish</Button>
                  </div>
                </div>
              </div>}

            {step === 'welcome' && <div className="space-y-4 text-center">
                <div className="mx-auto w-16 h-16 rounded-full border border-neon-cyan/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,230,255,0.2)]">
                  <CheckCircle2Icon className="h-10 w-10 text-neon-green" />
                </div>
                <h3 className="text-2xl font-semibold">Welcome aboard!</h3>
                <p className="text-text-secondary">Your Community Hub is ready. Let’s explore your dashboard.</p>
                <div className="flex items-center justify-center gap-3">
                  <Button variant="outline" onClick={onClose}>Close</Button>
                  <a href="/dashboard">
                    <Button variant="primary" className="flex items-center gap-2">
                      Go to Dashboard
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>}
          </div>
        </Card>
      </div>
    </div>;
}

export default SignupModal;

