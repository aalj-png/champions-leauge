import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { teamsService, playersService, matchesService, phasesService } from '../api';
import NavBar from '../components/NavBar';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ teams: 0, players: 0, matches: 0, phases: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [teams, players, matches, phases] = await Promise.all([
        teamsService.getAll(),
        playersService.getAll(),
        matchesService.getAll(),
        phasesService.getAll(),
      ]);

      setStats({
        teams: teams.data.length,
        players: players.data.length,
        matches: matches.data.length,
        phases: phases.data.length,
      });
    } catch (error) {
      console.error('Failed to load stats', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {user?.username}!</h1>
          <p className="text-gray-600">Champions League Management Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Teams"
            value={stats.teams}
            icon="⚽"
            onClick={() => navigate('/teams')}
          />
          <StatCard
            title="Players"
            value={stats.players}
            icon="👥"
            onClick={() => navigate('/players')}
          />
          <StatCard
            title="Matches"
            value={stats.matches}
            icon="🎯"
            onClick={() => navigate('/matches')}
          />
          <StatCard
            title="Phases"
            value={stats.phases}
            icon="📅"
            onClick={() => navigate('/phases')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <QuickActionCard
            title="Manage Teams"
            description="Create, edit, and manage football teams"
            icon="⚽"
            onClick={() => navigate('/teams')}
          />
          <QuickActionCard
            title="Player Management"
            description="Add players to teams and manage rosters"
            icon="👥"
            onClick={() => navigate('/players')}
          />
          <QuickActionCard
            title="Match Results"
            description="Record match scores and track results"
            icon="🎯"
            onClick={() => navigate('/matches')}
          />
          <QuickActionCard
            title="Standings"
            description="View team standings and rankings"
            icon="📊"
            onClick={() => navigate('/classement')}
          />
          <QuickActionCard
            title="Tournament Phases"
            description="Manage tournament phases and format"
            icon="📅"
            onClick={() => navigate('/phases')}
          />
          <QuickActionCard
            title="Profile"
            description="View and manage your profile"
            icon="👤"
            onClick={() => navigate('/profile')}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition transform hover:scale-105"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-semibold">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

function QuickActionCard({ title, description, icon, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg hover:border-purple-500 border-2 border-transparent transition"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
