import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BoardView from './components/BoardView';
import { Link } from 'react-router-dom';
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-40">
          <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            📋 Kanban Board
          </Link>
          <span className="text-sm text-gray-400">Laravel 12 + React</span>
        </header>
        <main className="h-[calc(100vh-56px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board/:id" element={<BoardView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
