type ModalHeaderProps = {
  title: string;
  color?: string;
  textStyles?: string;
};

export default function ModalHeader({
  title,
  color,
  textStyles,
}: ModalHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      {color && (
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      <h3 className={`font-semibold text-gray-900 ${textStyles}`}>{title}</h3>
    </div>
  );
}
