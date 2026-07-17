export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white">
        {title}
      </h1>

      <p className="text-center text-gray-400">{subtitle}</p>
    </div>
  );
}
