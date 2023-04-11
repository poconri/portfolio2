import React from "react";
import marked, { Lexer, Parser } from "marked";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";

interface MarkdownRendererProps {
  content: string;
}

const isLanguage = (lang?: string): lang is Language => {
  return !!lang && lang !== null;
};

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const tokens = new Lexer().lex(content);

  const processTokens = (tokens: marked.marked.TokensList): React.ReactNode => {
    return tokens.map((token, index) => {
      if (token.type === "code") {
        const lang = isLanguage(token.lang) ? token.lang : "typescript";

        return (
          <Highlight
            {...defaultProps}
            key={index}
            theme={theme}
            code={token.text}
            language={lang}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={className}
                style={{
                  ...style,
                }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        );
      } else {
        const html = new Parser().parse([token]);
        return (
          <div
            className="post-body mt-4 text-justify"
            key={index}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
    });
  };

  return <>{processTokens(tokens)}</>;
};

export default MarkdownRenderer;
