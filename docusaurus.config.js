import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Examplary Developers",
  tagline: "Developer documentation for Examplary AI",

  url: "https://developers.examplary.ai",
  baseUrl: "/",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  future: {
    v4: true,
  },

  noIndex: process.env.STAGE !== "production",

  onBrokenLinks: "throw",

  markdown: {
    hooks: {
      onBrokenMarkdownImages: "throw",
      onBrokenMarkdownLinks: "throw",
    }
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        theme: {
          customCss: "./static/custom.css",
        },
        sitemap: {
          lastmod: "date",
          filename: "sitemap.xml",
        },
      }),
    ],
  ],

  plugins: [
    ["docusaurus-plugin-generate-llms-txt", { outputFile: "llms.txt" }],
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          petstore: {
            specPath: "https://api-staging.examplary.ai/openapi",
            infoTemplate: "./docs/rest-api/index.md",
            outputDir: "docs/rest-api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
        },
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Examplary Developers",
        logo: {
          alt: "Examplary Developers",
          src: "/icon.svg",
        },
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      prism: {
        additionalLanguages: ["bash"],
      },
    }),
};

export default config;
