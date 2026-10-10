import { knowledgeLines } from "@/lib/knowledge";

export const dynamic = "force-static";

/** llms.txt: a plain-text brief for AI assistants and answer engines. */
export function GET() {
  return new Response(knowledgeLines().join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
