import type { PostFilter } from "./utils/posts";

export interface SiteConfig {
  title: string;
  slogan: string;
  description?: string;
  site: string,
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
    rss?: boolean;
  };
  homepage: PostFilter;
  googleAnalysis?: string;
  search?: boolean;
}

export const siteConfig: SiteConfig = {
  site: "https://blog.bingops.com/", // your site url
  title: "Bingops' blog",
  slogan: "Bingops – Cybersecurity & Devops",
  description: "Just a penguin writing about cybersecurity, self-hosting, and DevOps.",
  social: {
    github: "https://github.com/0xBingo", // leave empty if you don't want to show the github
    linkedin: "https://www.linkedin.com/in/corentin-guyon/", // leave empty if you don't want to show the linkedin
    email: "contact@bingops.com", // leave empty if you don't want to show the email
    rss: false, // set this to false if you don't want to provide an rss feed
  },
  homepage: {
    maxPosts: 5,
    tags: [],
    excludeTags: [],
  },
  googleAnalysis: "", // your google analysis id
  search: true, // set this to false if you don't want to provide a search feature
};
