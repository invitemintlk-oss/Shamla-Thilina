import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Invitation Link Generator",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminClient />;
}
