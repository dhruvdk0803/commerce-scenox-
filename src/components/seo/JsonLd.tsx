export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a raw script body
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
