// 📖 Docs: obsidian/frontend/seo-metadata.md

/**
 * Renders a JSON-LD block. `<` is escaped so a value can never close the
 * script tag early.
 */
export interface JsonLdProps {
  data: object;
}

export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    }}
  />
);
