import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { classementService, phasesService } from '../api';
import NavBar from '../components/NavBar';

export function Classement() {
  const { user } = useAuth();
  const [phases, setPhases] = useState<any[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [classement, setClassement] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhases();
  }, []);

  useEffect(() => {
    if (selectedPhase) {
      loadClassement();
    }
  }, [selectedPhase]);

  const loadPhases = async () => {
    try {
      const response = await phasesService.getAll();
      setPhases(response.data);
      if (response.data.length > 0) {
        setSelectedPhase(response.data[0].id);
      }
    } catch (error) {
      console.error('Failed to load phases', error);
    }
  };

  const loadClassement = async () => {
    if (!selectedPhase) return;
    try {
      setLoading(true);
      const response = await classementService.getByPhase(selectedPhase);
      setClassement(response.data);
    } catch (error) {
      console.error('Failed to load classement', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">League Standings</h1>

        {phases.length > 0 && (
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Select Phase</label>
            <select
              value={selectedPhase || ''}
              onChange={(e) => setSelectedPhase(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            >
              {phases.map((phase) => (
                <option key={phase.id} value={phase.id}>
                  {phase.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading standings...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Team</th>
                  <th className="px-6 py-3 text-center">Played</th>
                  <th className="px-6 py-3 text-center">W</th>
                  <th className="px-6 py-3 text-center">D</th>
                  <th className="px-6 py-3 text-center">L</th>
                  <th className="px-6 py-3 text-center">GF</th>
                  <th className="px-6 py-3 text-center">GA</th>
                  <th className="px-6 py-3 text-center">GD</th>
                  <th className="px-6 py-3 text-center">Points</th>
                </tr>
              </thead>
              <tbody>
                {classement.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-t ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-blue-50`}
                  >
                    <td className="px-6 py-4 font-bold text-lg text-purple-600">{row.position}</td>
                    <td className="px-6 py-4 font-semibold">{row.team_name}</td>
                    <td className="px-6 py-4 text-center">{row.matches_played}</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">{row.wins}</td>
                    <td className="px-6 py-4 text-center text-gray-600 font-semibold">{row.draws}</td>
                    <td className="px-6 py-4 text-center text-red-600 font-semibold">{row.losses}</td>
                    <td className="px-6 py-4 text-center">{row.goals_for}</td>
                    <td className="px-6 py-4 text-center">{row.goals_against}</td>
                    <td className="px-6 py-4 text-center font-semibold">
                      {row.goals_for - row.goals_against}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-lg text-purple-600">
                      {row.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {classement.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No standings available for this phase</p>
          </div>
        )}
      </div>
    </div>
  );
}
