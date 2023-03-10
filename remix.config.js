/**
 * @type {import('@remix-run/dev').AppConfig}
 */

module.exports = {
  mdx: async (filename) => {
    const [rehypeHighlight, remarkToc] = await Promise.all([
      import("rehype-highlight").then((mod) => mod.default),
      import("remark-toc").then((mod) => mod.default),
    ]);

    return {
      remarkPlugins: [remarkToc],
      rehypePlugins: [rehypeHighlight],
    };
  },
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  future: {
    unstable_tailwind: true,
  },
};
