import { useState } from 'react';
import { SignupModal } from '../components/auth/SignupModal';
import { useNavigate } from 'react-router-dom';

export const SignupPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleComplete = () => {
    // Redirect to dashboard after successful signup
    navigate('/dashboard');
  };

  const handleClose = () => {
    // Redirect to home if user closes the modal
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Welcome to NASA Air Quality
        </h1>
        <p className="text-text-secondary mb-8">
          Get started by creating your account
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-neon-cyan text-background-dark rounded-lg font-medium hover:bg-neon-cyan/80 transition-colors"
        >
          Get Started
        </button>
      </div>
      
      <SignupModal
        open={isModalOpen}
        onClose={handleClose}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default SignupPage;
