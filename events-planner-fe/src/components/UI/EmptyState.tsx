type EmptyStateProps = {
  text: string;
  className?: string;
};

export default function EmptyState({ text, className = "" }: EmptyStateProps) {
  return (
    <div
      className={`flex items-center justify-center py-10 text-sm text-gray-400 ${className}`}
    >
      {text}
    </div>
  );
}
