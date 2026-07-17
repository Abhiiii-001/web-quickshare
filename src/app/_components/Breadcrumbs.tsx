import Link from "next/link";
import JsonLd, { getBreadcrumbSchema } from "./JsonLd";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const SITE_URL = "https://www.rapidshare.live";

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = [
    { name: "Home", url: SITE_URL },
    ...items.map((item) => ({
      name: item.label,
      url: `${SITE_URL}${item.href}`,
    })),
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(schemaItems)} />
      <nav
        aria-label="Breadcrumb"
        className="relative z-10 mb-6 mt-20 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400"
      >
        <Link
          href="/"
          className="transition-colors hover:text-indigo-400"
        >
          Home
        </Link>
        {items.map((item, index) => (
          <span key={item.href} className="flex items-center gap-2">
            <span className="text-gray-600" aria-hidden="true">
              /
            </span>
            {index === items.length - 1 ? (
              <span className="text-indigo-400" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="transition-colors hover:text-indigo-400"
              >
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
