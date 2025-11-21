"use client";

import Link from "next/link";
import { useMiniAppContext } from "./context/miniapp-provider";

export function Footer() {
  const { sdk, isInMiniApp } = useMiniAppContext();

  return (
    <footer className="flex place-content-center pb-4">
      <span>
        Made with{" "}
        {isInMiniApp ? (
          <span
            onClick={() => {
              sdk.actions.openMiniApp({
                url: "https://miniapp-factory.marketplace.openxai.network",
              });
            }}
          >
            Mini App Factory
          </span>
        ) : (
          <Link
            href="https://miniapp-factory.marketplace.openxai.network"
            target="_blank"
          >
            Mini App Factory
          </Link>
        )}
      </span>
    </footer>
  );
}
