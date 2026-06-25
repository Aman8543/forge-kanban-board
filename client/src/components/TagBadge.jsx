export default function TagBadge({ name, color, onRemove }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full text-white font-medium"
      style={{ backgroundColor: color || '#6B7280' }}
    >
      {name}
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="hover:bg-white/20 rounded-full w-3 h-3 flex items-center justify-center text-[10px]"
        >
          ×
        </button>
      )}
    </span>
  );
}
