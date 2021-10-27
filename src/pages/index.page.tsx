import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import { useCallback, useEffect, useState } from "react";
import Counter from "components/Counter";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", ["common", "home"])),
    },
  };
};

/**
 * Improve this code as much as possible and make it work.
 * You're allowed to use online resources.
 */
export default function Home() {
  const { t } = useTranslation("home");

  const [count, setCount] = useState(0);
  const [automate, setAutomate] = useState(false);

  const autoCount = useCallback(() => {
    if (automate) {
      setCount(count + 1);

      autoCount();
    }
  }, [automate, count]);

  useEffect(() => {
    if (automate) {
      autoCount();
    }
  }, [autoCount, automate]);

  const reset = () => {
    setCount(0);
  };

  return (
    <>
      <Head>
        <title>{t("common:appName")}</title>
      </Head>

      <a href="#main" className="sr-only focus:not-sr-only">
        {t("common:skipToContent")}
      </a>

      <h1 className="sr-only">{t("common:appName")}</h1>

      <div className="container mx-auto min-h-screen flex flex-col justify-center items-center">
        <div className="h-4" />

        <main id="main">
          <Counter value={count} />

          <div className="h-16" />

          <div className="flex items-center justify-center">
            <a
              onClick={e => {
                e.preventDefault();

                setCount(count + 1);
              }}
            >
              <img height={200} width={200} src="/cookie.svg" alt={t("increment")} />
            </a>
          </div>

          <div className="h-16" />

          <div className="flex items-center justify-center">
            <div
              onClick={() => {
                if (!automate) {
                  setAutomate(true);
                }

                if (automate) {
                  setAutomate(false);
                }
              }}
              className="shadow-md bg-blue-500 py-4 px-6 rounded-lg text-blue-100 font-bold hover:bg-blue-600 hover:underline focus:ring-2 ring-offset-2 ring-blue-600 focus:outline-none"
            >
              {t("automate")}
            </div>
            <div className="w-3" />
            <div
              onClick={reset}
              className="border shadow-md bg-white py-4 px-6 rounded-lg text-gray-700 font-bold hover:bg-gray-100 hover:underline focus:ring-2 ring-offset-2 ring-blue-600 focus:outline-none"
            >
              {t("reset")}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
