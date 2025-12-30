import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";
import { Card } from "@/components/ui/card";
import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

interface ArticleRendererProps {
  content: string;
}

export function ArticleRenderer({ content }: ArticleRendererProps) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        // A. Normal Image ko Next.js Image se badalna (Performance ke liye)
        if (domNode.name === "img") {
          const { src, alt } = domNode.attribs;
          return (
            <div className="relative w-full aspect-video my-8 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={src || "/placeholder.jpg"}
                alt={alt || "Article image"}
                fill
                className="object-cover"
              />
            </div>
          );
        }

        // B. External Links ko secure banana
        if (domNode.name === "a") {
          const { href } = domNode.attribs;
          return (
            <Link
              href={href}
              className="text-primary font-bold underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all"
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </Link>
          );
        }

        // C. Khali paragraphs ko remove karna (Ghost spaces fix)
        if (domNode.name === "p" && domNode.children.length === 0) {
          return <></>;
        }
      }
    },
  };

  const reactElements = parse(content, options);

  // 2. Agar content array hai, toh beech mein Ads ghusayein
  const contentWithAds = Array.isArray(reactElements)
    ? reactElements.reduce<(React.ReactNode | JSX.Element)[]>(
        (acc, curr, idx) => {
          acc.push(curr);

          // Har 3rd paragraph ke baad ek Ad Card daal dein
          if ((idx + 1) % 3 === 0 && idx !== reactElements.length - 1) {
            acc.push(
              <Card
                key={`ad-${idx}`}
                className="my-10 bg-muted/30 border-dashed border-2 p-8 text-center overflow-hidden relative"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 absolute top-2 right-4">
                  Sponsored Content
                </span>
                <div className="text-sm italic text-muted-foreground/50">
                  Advertisement Space
                </div>
              </Card>
            );
          }
          return acc;
        },
        []
      )
    : reactElements;

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mt-10">
      {contentWithAds}
    </div>
  );
}
