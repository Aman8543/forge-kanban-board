export default function DueDateBadge({ date }) {
  if (!date) return null;
  const due = new Date(date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const isOverdue = due < now;
  return (
    <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded ${isOverdue ? 'bg-red-100 text-red-700 font-semibold' : 'bg-gray-100 text-gray-600'}`}>
      {isOverdue && '⚠ '}{new Date(date).toLocaleDateString()}
    </span>
  );
}
