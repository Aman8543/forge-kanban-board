import { useState } from 'react';
import Card from './Card';
import { createCard } from '../api/cards';
import { deleteList } from '../api/lists';

export default function List({ list, onCardClick, onListUpdated, onListDeleted }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);

  const handleAddCard = async () => {
    if (!newTitle.trim()) return;
    await createCard(list.id, { title: newTitle });
    setNewTitle('');
    setIsAdding(false);
    onListUpdated();
  };

  const handleUpdateTitle = async () => {
    if (!editTitle.trim()) return;
    // We'll use cards API or just reload
    setIsEditing(false);
    onListUpdated();
  };

  const handleDelete = async () => {
    if (confirm('Delete this list and all its cards?')) {
      await deleteList(list.id);
      onListDeleted();
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl w-72 flex-shrink-0 flex flex-col max-h-full">
      <div className="p-3 flex items-center justify-between">
        {isEditing ? (
          <input
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={handleUpdateTitle}
            onKeyDown={e => e.key === 'Enter' && handleUpdateTitle()}
            className="font-semibold text-sm bg-white border rounded px-2 py-1 w-full"
            autoFocus
          />
        ) : (
          <h3
            className="font-semibold text-sm text-gray-800 cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            {list.title}
            <span className="ml-2 text-gray-400 font-normal">({list.cards?.length || 0})</span>
          </h3>
        )}
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 text-lg leading-none"
          title="Delete list"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-2 space-y-2">
        {list.cards?.map(card => (
          <Card key={card.id} card={card} onClick={onCardClick} />
        ))}
      </div>

      <div className="p-3 pt-0">
        {isAdding ? (
          <div className="space-y-2">
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddCard()}
              placeholder="Enter card title..."
              className="w-full text-sm border rounded px-3 py-2"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddCard}
                className="bg-blue-500 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-600"
              >
                Add
              </button>
              <button
                onClick={() => { setIsAdding(false); setNewTitle(''); }}
                className="text-gray-500 text-sm px-3 py-1.5 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full text-left text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded px-2 py-1.5 transition-colors"
          >
            + Add a card
          </button>
        )}
      </div>
    </div>
  );
}
