import { description, title, url } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: `${url}/logo.png`,
        ogTitle: title,
        ogDescription: description,
        ogImageUrl: `${url}/logo.png`,
        button: {
          title: "Launch Mini App",
          action: {
            type: "launch_miniapp",
            name: title,
            url: url,
            splashImageUrl: `${url}/logo.png`,
            iconUrl: `${url}/logo.png`,
            splashBackgroundColor: "#000000",
            description: description,
            primaryCategory: "utility",
            tags: [],
          },
        },
      }),
    },
  };
}
