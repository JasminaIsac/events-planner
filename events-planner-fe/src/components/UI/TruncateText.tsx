type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  lines?: number;
};

export default function TruncateText({
  children,
  className,
  style,
  lines = 1,
}: Props) {
  return (
    <div
      className={`overflow-hidden wrap-break-word ${className}`}
      style={{
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
