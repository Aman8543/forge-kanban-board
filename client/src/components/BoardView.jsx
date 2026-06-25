import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBoard } from '../api/boards';
import { createList } from '../api/lists';
import List from './List';
import CardModal from './CardModal';

export default function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  const loadBoard = useCallback(async () => {
    try {
      const data = await fetchBoard(id);
      setBoard(data);
    } catch (err) {
      console.error('Failed to load board:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

  const handleAddList = async () => {
    if (!newListTitle.trim()) return;
    await createList(id, { title: newListTitle });
    setNewListTitle('');
    setIsAddingList(false);
    loadBoard();
  };

  const handleCardUpdated = () => {
    loadBoard();
  };

  const handleCardDeleted = () => {
    loadBoard();
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;
  if (!board) return <div className="flex items-center justify-center h-64 text-gray-500">Board not found</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur border-b">
        <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">← Back</Link>
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: board.color }}
        />
        <h1 className="text-lg font-bold text-gray-800">{board.title}</h1>
      </div>

      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-4 items-start h-full">
          {board.lists?.map(list => (
            <List
              key={list.id}
              list={list}
              onCardClick={setSelectedCard}
              onListUpdated={loadBoard}
              onListDeleted={loadBoard}
            />
          ))}

          {isAddingList ? (
            <div className="bg-gray-100 rounded-xl p-3 w-72 flex-shrink-0">
              <input
                value={newListTitle}
                onChange={e => setNewListTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddList()}
                placeholder="Enter list title..."
                className="w-full border rounded px-3 py-2 text-sm mb-2"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddList}
                  className="bg-blue-500 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-600"
                >
                  Add List
                </button>
                <button
                  onClick={() => { setIsAddingList(false); setNewListTitle(''); }}
                  className="text-gray-500 text-sm px-3 py-1.5 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingList(true)}
              className="bg-white/50 hover:bg-white/80 border-2 border-dashed border-gray-300 rounded-xl p-3 w-72 flex-shrink-0 text-gray-500 text-sm font-medium transition-colors"
            >
              + Add another list
            </button>
          )}
        </div>
      </div>

      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onUpdated={handleCardUpdated}
          onDeleted={handleCardDeleted}
        />
      )}
    </div>
  );
}
