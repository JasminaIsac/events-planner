import { Link } from "react-router-dom";

type CustomLinkProps = {
  title: string;
  route: string;
  linkText: string;
};

export default function CustomLink({
  title,
  route,
  linkText,
}: CustomLinkProps) {
  return (
    <div className="flex items-center justify-center gap-2 font-semibold text-sm mt-2">
      <p className="text-gray-500">
        {title}{" "}
        <Link
          to={route}
          className="text-red-500 hover:text-red-400 hover:underline transition-colors"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
}
