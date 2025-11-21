"use client";

import { Share2 } from "lucide-react";
import { useMiniAppContext } from "./context/miniapp-provider";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Link from "next/link";

export function Share({ text }: { text: string }) {
  const { sdk, isInMiniApp, context } = useMiniAppContext();

  const farcasterApp =
    context?.client.clientFid === 309857 ? "Base App" : "Farcaster";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex place-items-center gap-2">
          <Share2 />
          <span>Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl">Share</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Button
            className="flex place-items-center gap-2 text-lg h-14"
            variant="outline"
            onClick={() => {
              if (isInMiniApp) {
                sdk.actions.composeCast({
                  text,
                });
              }
            }}
            asChild
          >
            <Link
              href={
                isInMiniApp
                  ? "#"
                  : `https://farcaster.xyz/~/compose?text=${encodeURIComponent(
                      text
                    )}`
              }
              target={isInMiniApp ? undefined : "_blank"}
            >
              {farcasterApp === "Base App" ? (
                <div className="size-6 rounded-sm bg-blue-700" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 1080 1080"
                  fill="none"
                  className="size-6"
                >
                  <rect
                    width="1080"
                    height="1080"
                    rx="120"
                    fill="#6A3CFF"
                  ></rect>
                  <path
                    d="M847.387 270V343.023H774.425V415.985H796.779V416.01H847.387V810.795H725.173L725.099 810.434L662.737 515.101C656.791 486.949 641.232 461.477 618.927 443.362C596.623 425.248 568.527 415.275 539.818 415.275H539.575C510.866 415.275 482.77 425.248 460.466 443.362C438.161 461.477 422.602 486.958 416.657 515.101L354.223 810.795H232V416.001H282.608V415.985H304.959V343.023H232V270H847.387Z"
                    fill="white"
                  ></path>
                </svg>
              )}
              <span>{farcasterApp}</span>
            </Link>
          </Button>
          <Button
            className="flex place-items-center gap-2 text-lg h-14"
            variant="outline"
            asChild
          >
            <Link
              href={`https://x.com/intent/post?text=${encodeURIComponent(
                text
              )}`}
              target="_blank"
            >
              <svg
                viewBox="0 0 1200 1227"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="none"
                className="size-6"
              >
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
              </svg>
              <span>X</span>
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
