import { knowledgeLines } from "@/lib/knowledge";
import { getGuides } from "@/lib/guides";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** llms.txt: a plain-text brief for AI assistants and answer engines. */
export function GET() {
  const guides = getGuides();
  const lines = [
    ...knowledgeLines(),
    ...(guides.length
      ? ["", "## Guides", ...guides.map((g) => `- [${g.heading}](${site.url}/guides/${g.slug}): ${g.summary}`)]
      : []),
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
