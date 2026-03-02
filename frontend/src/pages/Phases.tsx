import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { phasesService } from '../api';
import NavBar from '../components/NavBar';

export function Phases() {
  const { user } = useAuth();
  const [phases, setPhases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    matches_format: 'knockout',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadPhases();
  }, []);

  const loadPhases = async () => {
    try {
      const response = await phasesService.getAll();
      setPhases(response.data);
    } catch (error) {
      console.error('Failed to load phases', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await phasesService.update(editingId, formData);
      } else {
        await phasesService.create(formData);
      }
      resetForm();
      loadPhases();
    } catch (error) {
      console.error('Failed to save phase', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await phasesService.delete(id);
        loadPhases();
      } catch (error) {
        console.error('Failed to delete phase', error);
      }
    }
  };

  const handleEdit = (phase: any) => {
    setFormData({
      name: phase.name,
      description: phase.description,
      start_date: phase.start_date,
      end_date: phase.end_date,
      matches_format: phase.matches_format,
    });
    setEditingId(phase.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      matches_format: 'knockout',
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
          <h1 className="text-3xl font-bold text-gray-800">Tournament Phases</h1>
          {isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : 'Add Phase'}
            </button>
          )}
        </div>

        {showForm && isAdmin && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Phase' : 'Add New Phase'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Phase Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Match Format</label>
                <select
                  value={formData.matches_format}
                  onChange={(e) => setFormData({ ...formData, matches_format: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="knockout">Knockout</option>
                  <option value="group">Group Stage</option>
                  <option value="round_robin">Round Robin</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  {editingId ? 'Update' : 'Create'} Phase
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phases.map((phase) => (
            <div key={phase.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{phase.name}</h3>
              <p className="text-gray-600 mb-4">{phase.description}</p>
              <div className="space-y-2 text-sm mb-4">
                <p>
                  <strong>Format:</strong> {phase.matches_format}
                </p>
                {phase.start_date && <p><strong>Start:</strong> {phase.start_date}</p>}
                {phase.end_date && <p><strong>End:</strong> {phase.end_date}</p>}
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(phase)}
                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(phase.id)}
                    className="text-red-600 hover:text-red-800 underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {phases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No phases found</p>
          </div>
        )}
      </div>
    </div>
  );
}
