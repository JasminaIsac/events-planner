type DetailRowProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

export default function DetailRow({ icon, children }: DetailRowProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className="text-gray-500">{icon}</span>
      <p className="text-sm text-gray-500 leading-none">{children}</p>
    </div>
  );
}
