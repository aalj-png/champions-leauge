import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { matchesService, teamsService, phasesService } from '../api';
import NavBar from '../components/NavBar';

export function Matches() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [phases, setPhases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    phase_id: '',
    home_team_id: '',
    away_team_id: '',
    home_score: '',
    away_score: '',
    match_date: '',
    venue: '',
    status: 'pending',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [matchesRes, teamsRes, phasesRes] = await Promise.all([
        matchesService.getAll(),
        teamsService.getAll(),
        phasesService.getAll(),
      ]);
      setMatches(matchesRes.data);
      setTeams(teamsRes.data);
      setPhases(phasesRes.data);
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await matchesService.update(editingId, {
          ...formData,
          home_score: parseInt(formData.home_score),
          away_score: parseInt(formData.away_score),
        });
      } else {
        await matchesService.create(formData);
      }
      resetForm();
      loadData();
    } catch (error) {
      console.error('Failed to save match', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await matchesService.delete(id);
        loadData();
      } catch (error) {
        console.error('Failed to delete match', error);
      }
    }
  };

  const handleEdit = (match: any) => {
    setFormData({
      phase_id: match.phase_id,
      home_team_id: match.home_team_id,
      away_team_id: match.away_team_id,
      home_score: match.home_score,
      away_score: match.away_score,
      match_date: match.match_date,
      venue: match.venue,
      status: match.status,
    });
    setEditingId(match.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      phase_id: '',
      home_team_id: '',
      away_team_id: '',
      home_score: '',
      away_score: '',
      match_date: '',
      venue: '',
      status: 'pending',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const isAdmin = user?.role === 'admin';

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Matches</h1>
          {isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : 'Add Match'}
            </button>
          )}
        </div>

        {showForm && isAdmin && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Match' : 'Add New Match'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phase</label>
                <select
                  value={formData.phase_id}
                  onChange={(e) => setFormData({ ...formData, phase_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select Phase</option>
                  {phases.map((phase) => (
                    <option key={phase.id} value={phase.id}>
                      {phase.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Venue</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Home Team</label>
                <select
                  value={formData.home_team_id}
                  onChange={(e) => setFormData({ ...formData, home_team_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Away Team</label>
                <select
                  value={formData.away_team_id}
                  onChange={(e) => setFormData({ ...formData, away_team_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Home Score</label>
                <input
                  type="number"
                  value={formData.home_score}
                  onChange={(e) => setFormData({ ...formData, home_score: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Away Score</label>
                <input
                  type="number"
                  value={formData.away_score}
                  onChange={(e) => setFormData({ ...formData, away_score: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Match Date</label>
                <input
                  type="datetime-local"
                  value={formData.match_date}
                  onChange={(e) => setFormData({ ...formData, match_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  {editingId ? 'Update' : 'Create'} Match
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800">{match.home_team_name}</span>
                    <span className="text-2xl font-bold mx-4 text-purple-600">
                      {match.home_score} - {match.away_score}
                    </span>
                    <span className="font-bold text-gray-800">{match.away_team_name}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {match.match_date} - {match.venue} ({match.phase_name})
                  </p>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      match.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {match.status}
                  </span>
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => handleEdit(match)}
                        className="text-blue-600 hover:text-blue-800 underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(match.id)}
                        className="text-red-600 hover:text-red-800 underline text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {matches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No matches found</p>
          </div>
        )}
      </div>
    </div>
  );
}
