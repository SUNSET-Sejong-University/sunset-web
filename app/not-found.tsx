import Link from "next/link";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";

export default function NotFound() {
  const dictionary = getDictionary(defaultLocale);

  return (
    <div className="page-container flex min-h-[50vh] flex-col items-start justify-center py-16">
      <p className="technical-label">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink">
        {dictionary.common.notFoundTitle}
      </h1>
      <p className="mt-3 max-w-lg text-ink-soft">
        {dictionary.common.notFoundDescription}
      </p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-6 inline-flex min-h-11 items-center rounded-md bg-sunset px-5 py-2.5 text-sm font-medium text-canvas"
      >
        {dictionary.common.returnHome}
      </Link>
    </div>
  );
}
