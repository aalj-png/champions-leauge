import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { teamsService } from '../api';
import NavBar from '../components/NavBar';

export function Teams() {
  const { user } = useAuth();
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', country: '', logo: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const response = await teamsService.getAll();
      setTeams(response.data);
    } catch (error) {
      console.error('Failed to load teams', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await teamsService.update(editingId, formData);
      } else {
        await teamsService.create(formData);
      }
      setFormData({ name: '', country: '', logo: '' });
      setEditingId(null);
      setShowForm(false);
      loadTeams();
    } catch (error) {
      console.error('Failed to save team', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await teamsService.delete(id);
        loadTeams();
      } catch (error) {
        console.error('Failed to delete team', error);
      }
    }
  };

  const handleEdit = (team: any) => {
    setFormData({ name: team.name, country: team.country, logo: team.logo || '' });
    setEditingId(team.id);
    setShowForm(true);
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
          <h1 className="text-3xl font-bold text-gray-800">Teams</h1>
          {isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : 'Add Team'}
            </button>
          )}
        </div>

        {showForm && isAdmin && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Team' : 'Add New Team'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Team Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Logo URL</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                {editingId ? 'Update' : 'Create'} Team
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{team.name}</h3>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(team)}
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(team.id)}
                      className="text-red-600 hover:text-red-800 underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-2">
                <strong>Country:</strong> {team.country}
              </p>
              {team.logo && <img src={team.logo} alt={team.name} className="w-full h-32 object-cover rounded" />}
            </div>
          ))}
        </div>

        {teams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No teams found. Create your first team!</p>
          </div>
        )}
      </div>
    </div>
  );
}
