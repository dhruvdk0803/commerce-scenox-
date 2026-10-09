import { notFound } from "next/navigation";

/** Any URL that matches no route renders the branded [market]/not-found page with a 404 status. */
export const dynamicParams = true;

export default function CatchAll() {
  notFound();
}
