import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Invitation from "../components/Invitation";
import { invitation as inv } from "../data";
import { guestFromSegment } from "../guest";

type Props = { params: Promise<{ guest: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guest = guestFromSegment((await params).guest);
  return guest ? { title: `${guest} — ${inv.groom} & ${inv.bride}'s Homecoming` } : {};
}

export default async function GuestPage({ params }: Props) {
  const guest = guestFromSegment((await params).guest);
  if (!guest) notFound();
  return (
    <>
      <h1 className="sr-only">Homecoming invitation for {guest}</h1>
      <Invitation guest={guest} />
    </>
  );
}
