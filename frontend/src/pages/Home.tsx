import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-white mb-4">⚽ Champions League</h1>
        <p className="text-2xl text-purple-200 mb-8">Tournament Management System</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          <FeatureCard
            icon="🏆"
            title="Team Management"
            description="Manage all teams participating in the tournament"
          />
          <FeatureCard
            icon="👥"
            title="Player Management"
            description="Add and manage players for each team"
          />
          <FeatureCard
            icon="🎯"
            title="Match Tracking"
            description="Record match results and scores"
          />
          <FeatureCard
            icon="📊"
            title="Live Standings"
            description="Real-time league standings and rankings"
          />
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/login')}
            className="block w-full max-w-xs mx-auto bg-white text-purple-700 font-bold py-3 px-8 rounded-lg hover:bg-purple-100 transition text-lg"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="block w-full max-w-xs mx-auto bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition text-lg"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-white hover:bg-opacity-20 transition">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-purple-200 text-sm">{description}</p>
    </div>
  );
}
