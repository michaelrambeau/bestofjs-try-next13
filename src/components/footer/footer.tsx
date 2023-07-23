import Image from "next/image";
import NextLink from "next/link";

import { RISING_STARS_URL, STATE_OF_JS_URL } from "@/config/site";

export const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t">
      <div className="container">
        <div className="grid gap-8 py-10 sm:grid-cols-3">
          <div>
            <Image
              src="/logo.png"
              alt="Best of JS logo"
              width="100"
              height="56"
            />
          </div>
          <div className="grid gap-2">
            <div className="text-muted-foreground">Direct links</div>
            <NextLink href="/projects" className="hover:underline">
              Projects
            </NextLink>
            <NextLink href="/tags" className="hover:underline">
              Tags
            </NextLink>
          </div>
          <div className="grid gap-2">
            <div className="text-muted-foreground">Related projects</div>
            <a
              href={RISING_STARS_URL}
              className="hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Rising Stars
            </a>
            <a
              href={STATE_OF_JS_URL}
              className="hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              State of JS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
