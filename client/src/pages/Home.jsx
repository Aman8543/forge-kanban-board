import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBoards, createBoard } from '../api/boards';

export default function Home() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newColor, setNewColor] = useState('#3B82F6');

  const loadBoards = async () => {
    try {
      const data = await fetchBoards();
      setBoards(data);
    } catch (err) {
      console.error('Failed to load boards:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBoards(); }, []);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    await createBoard({ title: newTitle, color: newColor });
    setNewTitle('');
    setIsAdding(false);
    loadBoards();
  };

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">📋 Kanban Boards</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          + New Board
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            placeholder="Board title..."
            className="w-full border rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-600">Color:</span>
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setNewColor(c)}
                className={`w-6 h-6 rounded-full transition-transform ${newColor === c ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Create Board
            </button>
            <button
              onClick={() => { setIsAdding(false); setNewTitle(''); }}
              className="text-gray-500 text-sm px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading boards...</div>
      ) : boards.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="text-lg mb-2">No boards yet!</p>
          <p className="text-sm">Create your first board to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map(board => (
            <Link
              key={board.id}
              to={`/board/${board.id}`}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow p-5 group"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: board.color }}
                />
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {board.title}
                </h3>
              </div>
              <p className="text-xs text-gray-400">
                Created {new Date(board.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
