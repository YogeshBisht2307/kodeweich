import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import hljs from "highlight.js";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        p: ({ ...props }) => <p className="mb-4 font-medium md:text-md lg:text-md text-muted-foreground" {...props} />,
        h1: ({ ...props }) => <h1 className="mb-4 mt-6 text-3xl font-semibold tracking-wide" {...props} />,
        h2: ({ ...props }) => <h2 className="mb-4 mt-6 text-2xl font-semibold tracking-wide" {...props} />,
        h3: ({ ...props }) => <h3 className="mb-3 mt-5 text-xl font-semibold tracking-wide" {...props} />,
        h4: ({ ...props }) => <h4 className="mb-3 mt-5 text-lg font-semibold tracking-wide" {...props} />,
        ul: ({ ...props }) => <ul className="mb-4 font-medium md:text-md lg:text-md text-muted-foreground list-disc space-y-1 pl-6" {...props} />,
        ol: ({ ...props }) => <ol className="mb-4 font-medium md:text-md lg:text-md text-muted-foreground list-decimal space-y-1 pl-6" {...props} />,
        blockquote: ({ ...props }) => <blockquote className="mb-4 border-l-2 pl-4 italic font-semibold" {...props} />,
        table: ({ children, ...props }: any) => (
          <div className="mb-4 w-full overflow-x-auto rounded-md border">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm" {...props}>
              {children}
            </table>
          </div>
        ),
        thead: ({ ...props }) => <thead className="bg-muted/60" {...props} />,
        tbody: ({ ...props }) => <tbody className="divide-y" {...props} />,
        tr: ({ ...props }) => <tr className="hover:bg-muted/40 transition-colors" {...props} />,
        th: ({ ...props }) => (
          <th className="px-3 py-2 font-semibold text-foreground border-b" {...props} />
        ),
        td: ({ ...props }) => (
          <td className="px-3 py-2 align-top text-muted-foreground border-b" {...props} />
        ),
        pre: ({ children, ...props }: any) => {
          const codeElement = Array.isArray(children) ? children[0] : children;
          const className = codeElement?.props?.className || "";
          const rawCode = String(codeElement?.props?.children || "").replace(/\n$/, "");
          const match = /language-(\w+)/.exec(className);
          const language = match ? match[1] : "plaintext";
          let highlighted = rawCode;

          try {
            highlighted = hljs.getLanguage(language)
              ? hljs.highlight(rawCode, { language }).value
              : hljs.highlightAuto(rawCode).value;
          } catch {
            highlighted = rawCode;
          }

          return (
            <pre className="mb-4 overflow-x-auto rounded-md bg-muted p-3" {...props}>
              <code
                className={`${className} block hljs text-sm leading-6`}
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            </pre>
          );
        },
        code: ({ children, ...props }: any) => (
          <code className="rounded-sm bg-muted px-1.5 py-0.5 text-sm break-words" {...props}>
            {children}
          </code>
        ),
        a: ({ ...props }) => <a className="underline underline-offset-2" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
