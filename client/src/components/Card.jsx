import DueDateBadge from './DueDateBadge';
import TagBadge from './TagBadge';

export default function Card({ card, onClick }) {
  return (
    <div
      onClick={() => onClick(card)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow group"
    >
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {card.tags.map(tag => (
            <TagBadge key={tag.id} name={tag.name} color={tag.color} />
          ))}
        </div>
      )}
      <h4 className="text-sm font-medium text-gray-800 mb-1">{card.title}</h4>
      {card.description && (
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{card.description}</p>
      )}
      <div className="flex items-center justify-between">
        <DueDateBadge date={card.due_date} />
        {card.members && card.members.length > 0 && (
          <div className="flex -space-x-1">
            {card.members.slice(0, 3).map(member => (
              <div
                key={member.id}
                className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
                title={member.name}
              >
                {member.name.charAt(0)}
              </div>
            ))}
            {card.members.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 text-xs flex items-center justify-center border-2 border-white">
                +{card.members.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
