import { useState, useEffect } from 'react';
import { updateCard, deleteCard } from '../api/cards';
import { fetchTags } from '../api/tags';
import { fetchMembers as fetchCardMembers, attachMember, detachMember } from '../api/members';
import { fetchUsers } from '../api/users';
import DueDateBadge from './DueDateBadge';
import TagBadge from './TagBadge';

export default function CardModal({ card, onClose, onUpdated, onDeleted }) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.due_date || '');
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(card.tags?.map(t => t.id) || []);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState(card.members?.map(m => m.id) || []);

  useEffect(() => {
    fetchTags().then(setAllTags);
    fetchUsers().then(setAllUsers);
  }, [card.id]);

  const handleSave = async () => {
    const updated = await updateCard(card.id, {
      title,
      description,
      due_date: dueDate || null,
    });

    // Sync tags
    const currentTagIds = card.tags?.map(t => t.id) || [];
    const toAdd = selectedTags.filter(id => !currentTagIds.includes(id));
    const toRemove = currentTagIds.filter(id => !selectedTags.includes(id));

    // For members
    const currentMemberIds = card.members?.map(m => m.id) || [];
    const toAddMembers = selectedMembers.filter(id => !currentMemberIds.includes(id));
    const toRemoveMembers = currentMemberIds.filter(id => !selectedMembers.includes(id));

    // Note: In a real app, we'd have proper endpoints for this.
    // For now, we rely on the card being re-fetched
    onUpdated();
    onClose();
  };

  const handleDelete = async () => {
    if (confirm('Delete this card?')) {
      await deleteCard(card.id);
      onDeleted();
      onClose();
    }
  };

  const toggleTag = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const toggleMember = (userId) => {
    setSelectedMembers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-16 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="text-lg font-semibold text-gray-800 border-b-2 border-blue-500 bg-transparent outline-none flex-1 mr-4"
            />
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Add a description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {dueDate && <DueDateBadge date={dueDate} />}
            </div>

            {allTags.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`transition-all ${selectedTags.includes(tag.id) ? 'ring-2 ring-offset-1 ring-blue-500 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                    >
                      <TagBadge name={tag.name} color={tag.color} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {card.tags && card.tags.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remove Tags</label>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map(tag => (
                    <TagBadge
                      key={tag.id}
                      name={tag.name}
                      color={tag.color}
                      onRemove={() => toggleTag(tag.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {allUsers.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Members</label>
                <div className="flex flex-wrap gap-2">
                  {allUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => toggleMember(user.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-all ${
                        selectedMembers.includes(user.id)
                          ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                        {user.name.charAt(0)}
                      </span>
                      {user.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Delete Card
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
