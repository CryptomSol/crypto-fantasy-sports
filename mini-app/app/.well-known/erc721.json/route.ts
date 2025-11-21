import { title, description, url } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    name: title,
    description: description,
    image: `${url}/logo.png`,
  });
}
