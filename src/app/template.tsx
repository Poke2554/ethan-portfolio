"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  if (pathname.startsWith("/admin")) {
    return children;
  }

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
