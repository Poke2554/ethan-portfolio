"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const t = useTranslations("about");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" onClick={handleCopy} className="btn-secondary mt-4">
      {copied ? t("copied") : t("copyEmail")}
    </button>
  );
}
