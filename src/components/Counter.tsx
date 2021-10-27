import { useTranslation } from "next-i18next";
import { useState } from "react";

type CounterProps = {
  value: number;
};

export default function Counter({ value }: CounterProps) {
  const { t } = useTranslation("home");
  const [count] = useState(value);

  return (
    <div>
      <p className="heading text-6xl font-medium text-center">{count}</p>
      <p className="text-xl text-gray-500 font-medium text-center">{t("cookies")}</p>
    </div>
  );
}
