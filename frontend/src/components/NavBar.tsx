import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="text-2xl font-bold cursor-pointer hover:text-purple-200"
          onClick={() => navigate('/dashboard')}
        >
          ⚽ Champions League
        </div>

        <div className="hidden md:flex space-x-6">
          <NavLink label="Dashboard" onClick={() => navigate('/dashboard')} />
          <NavLink label="Teams" onClick={() => navigate('/teams')} />
          <NavLink label="Players" onClick={() => navigate('/players')} />
          <NavLink label="Matches" onClick={() => navigate('/matches')} />
          <NavLink label="Standings" onClick={() => navigate('/classement')} />
          <NavLink label="Phases" onClick={() => navigate('/phases')} />
          <NavLink label="Profile" onClick={() => navigate('/profile')} />
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <button
          className="md:hidden flex flex-col cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-purple-700 px-4 py-2 space-y-2">
          <NavLink label="Dashboard" onClick={() => { navigate('/dashboard'); setMenuOpen(false); }} />
          <NavLink label="Teams" onClick={() => { navigate('/teams'); setMenuOpen(false); }} />
          <NavLink label="Players" onClick={() => { navigate('/players'); setMenuOpen(false); }} />
          <NavLink label="Matches" onClick={() => { navigate('/matches'); setMenuOpen(false); }} />
          <NavLink label="Standings" onClick={() => { navigate('/classement'); setMenuOpen(false); }} />
          <NavLink label="Phases" onClick={() => { navigate('/phases'); setMenuOpen(false); }} />
          <NavLink label="Profile" onClick={() => { navigate('/profile'); setMenuOpen(false); }} />
          <button
            onClick={() => { logout(); setMenuOpen(false); }}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

function NavLink({ label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="hover:text-purple-200 transition font-semibold"
    >
      {label}
    </button>
  );
}
