export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Best of JS",
  description:
    "Check out the most popular open-source projects and the latest trends about the web platform: React, Bue.js, Node.js, Bun, Deno...",
  mainNav: [
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Tags",
      href: "/tags",
    },
  ],
  links: {
    github: "https://github.com/bestofjs/bestofjs-webui",
  },
};

export const APP_DISPLAY_NAME = "Best of JS";
export const APP_REPO_URL = "https://github.com/bestofjs/bestofjs-webui";
export const RISING_STARS_URL = "https://risingstars.js.org";
export const SPONSOR_URL = `https://github.com/sponsors/michaelrambeau`;
export const STATE_OF_JS_URL = `https://stateofjs.com`;
export const APP_VERSION = process.env.NEXT_PUBLIC_VERSION || "0.0.0";
export const ISSUE_TRACKER_URL = `https://github.com/michaelrambeau/bestofjs`;
