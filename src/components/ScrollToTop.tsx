import { useLayoutEffect } from "react";

export default function ScrollToTop({ pathname, hash }: { pathname: string; hash: string }) {
  // The exiting page keeps its own location until its fade has finished.
  useLayoutEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}
