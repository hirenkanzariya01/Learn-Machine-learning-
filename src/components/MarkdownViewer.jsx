import ReactMarkdown from 'react-markdown'

export default function MarkdownViewer({ content }) {
  return (
    <article className="prose max-w-none dark:prose-invert">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            if (inline) {
              return (
                <code
                  className="bg-gray-100 dark:bg-gray-800 text-sky-600 dark:text-sky-400 px-1.5 py-0.5 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return (
              <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto mb-4 text-sm">
                <code className="font-mono" {...props}>{children}</code>
              </pre>
            )
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse text-sm">{children}</table>
              </div>
            )
          },
          th({ children }) {
            return (
              <th className="bg-gray-100 dark:bg-gray-800 font-semibold px-3 py-2 text-left border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                {children}
              </th>
            )
          },
          td({ children }) {
            return (
              <td className="px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                {children}
              </td>
            )
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-sky-400 pl-4 italic text-gray-600 dark:text-gray-400 my-4 bg-sky-50 dark:bg-sky-900/10 rounded-r-lg py-2 pr-3">
                {children}
              </blockquote>
            )
          },
          h1({ children }) {
            return <h1 className="text-2xl font-bold mb-4 mt-6 text-gray-900 dark:text-gray-100">{children}</h1>
          },
          h2({ children }) {
            return <h2 className="text-xl font-semibold mb-3 mt-5 text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-1">{children}</h2>
          },
          h3({ children }) {
            return <h3 className="text-base font-semibold mb-2 mt-4 text-gray-800 dark:text-gray-200">{children}</h3>
          },
          p({ children }) {
            return <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>
          },
          ul({ children }) {
            return <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300 space-y-1">{children}</ul>
          },
          ol({ children }) {
            return <ol className="list-decimal pl-5 mb-4 text-gray-700 dark:text-gray-300 space-y-1">{children}</ol>
          },
          strong({ children }) {
            return <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
          },
          hr() {
            return <hr className="border-gray-200 dark:border-gray-700 my-6" />
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
