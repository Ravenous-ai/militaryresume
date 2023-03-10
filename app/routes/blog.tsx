import { Outlet } from "@remix-run/react";
import { type LinksFunction } from "@remix-run/server-runtime";
import styles from "highlight.js/styles/atom-one-dark.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function BlogPage() {
  return (
    <div className="prose mx-auto max-w-3xl bg-white px-6 py-20 lg:px-8">
      <Outlet />
    </div>
  );
}
