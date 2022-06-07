import { useRouter } from "next/router";

// should change to html parser and change dangerouslySetInnerHTML
export const Parser = ({
  locales,
  content,
}: {
  locales: object;
  content: string;
}) => {
  const { locale } = useRouter();
  const reg = new RegExp("<*>");
  const contents = content.split("@");
  function t(key: string): string {
    const properties = key.split(".");
    const tLocale = locales[locale] === undefined ? "fr" : locale;
    let lastProperty = locales;
    for (let i = -1; i < properties.length; i++) {
      const property = i === -1 ? tLocale : properties[i];
      if (lastProperty[property] === undefined) return key;
      lastProperty = lastProperty[property];
    }
    if (typeof lastProperty === "object") return key;
    return lastProperty;
  }
  let html = "";
  for (const tag of contents) {
    if (reg.test(tag)) html += tag;
    else if (tag) html += t(tag);
  }

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};
