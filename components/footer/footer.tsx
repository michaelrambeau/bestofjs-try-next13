import Image from "next/image";
import NextLink from "next/link";

import { RISING_STARS_URL, STATE_OF_JS_URL } from "@/config/site";

export const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t p-10 py-6">
      <div className="app-container">
        <div className="grid grid-cols-3 py-10">
          <div>
            <Image
              src="/logo.png"
              alt="Best of JS logo"
              width="100"
              height="56"
            />
          </div>
          <div className="grid gap-2">
            <div className="footer-title">Direct links</div>
            <NextLink href="/projects" className="link link-hover">
              Projects
            </NextLink>
            <NextLink href="/tags" className="link link-hover">
              Tags
            </NextLink>
          </div>
          <div className="grid gap-2">
            <div className="footer-title">Related projects</div>
            <a
              href={RISING_STARS_URL}
              className="link link-hover"
              target="_blank"
              rel="noreferrer"
            >
              Rising Stars
            </a>
            <a
              href={STATE_OF_JS_URL}
              className="link link-hover"
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
