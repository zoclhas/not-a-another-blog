import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import Prism from "prismjs";

import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-css-extras";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-js-extras";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-php";
import "prismjs/components/prism-php-extras";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-objectivec";
import "prismjs/components/prism-scala";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-php-extras";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-r";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-elixir";
import "prismjs/components/prism-erlang";
import "prismjs/components/prism-haskell";
import "prismjs/components/prism-lua";
import "prismjs/components/prism-matlab";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-tcl";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-latex";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup-templating";

export const Markdown = ({ children }: { children: string }) => {
    return (
        <ReactMarkdown
            rehypePlugins={[rehypeKatex, rehypeSlug]}
            remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkMath]}
            components={{
                code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "")!;

                    if (!inline && match) {
                        if (Prism.languages[match[1]]) {
                            return (
                                <code
                                    className={`language-${match[1]}`}
                                    {...props}
                                    dangerouslySetInnerHTML={{
                                        __html: `${Prism.highlight(
                                            String(children).replace(/\n$/, ""),
                                            Prism.languages[match[1]],
                                            match[1]
                                        )}`,
                                    }}
                                ></code>
                            );
                        }

                        return (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    }

                    return (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {children}
        </ReactMarkdown>
    );
};
