export default function DashboardHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center border-b border-gray-100">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
}
