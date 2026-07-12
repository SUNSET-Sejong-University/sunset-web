import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/navigation/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { SkipLink } from "@/components/navigation/skip-link";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { RevealObserver } from "@/components/visual/RevealObserver";
import { pickClientNavDictionary } from "@/lib/i18n/client-dictionary";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n/locales";

type LangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return (
    <div lang={locale} data-locale={locale} className="flex min-h-full flex-col">
      <MotionProvider>
        <RevealObserver />
        <SkipLink locale={locale} dictionary={dictionary} />
        <SiteHeader
          locale={locale}
          dictionary={pickClientNavDictionary(dictionary)}
        />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} dictionary={dictionary} />
      </MotionProvider>
    </div>
  );
}
