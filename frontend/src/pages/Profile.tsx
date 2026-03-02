import { useAuth } from '../context/AuthContext';
import NavBar from '../components/NavBar';

export function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Username</label>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                {user?.username}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                {user?.email}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Role</label>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  user?.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user?.role}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
