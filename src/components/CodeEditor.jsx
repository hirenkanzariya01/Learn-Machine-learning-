import { useState, useRef, Suspense } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, Terminal, Loader } from 'lucide-react'
import useStore from '../store/useStore'

function safeExecute(code) {
  const logs = []
  const fakeConsole = {
    log: (...args) => logs.push(args.map(a => {
      if (typeof a === 'object') {
        try { return JSON.stringify(a, null, 2) } catch { return String(a) }
      }
      return String(a)
    }).join(' ')),
    error: (...args) => logs.push('❌ ' + args.join(' ')),
    warn: (...args) => logs.push('⚠️ ' + args.join(' ')),
  }

  try {
    const fn = new Function('console', code)
    fn(fakeConsole)
    return { output: logs.join('\n'), error: null }
  } catch (err) {
    return { output: '', error: err.message }
  }
}

export default function CodeEditor({ defaultCode, topicId }) {
  const darkMode = useStore(s => s.darkMode)
  const addXp = useStore(s => s.addXp)
  const [code, setCode] = useState(defaultCode || '// Write your JavaScript code here\nconsole.log("Hello, AI/ML world!");')
  const [output, setOutput] = useState('')
  const [hasRun, setHasRun] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const ranRef = useRef(false)

  const handleRun = () => {
    setIsRunning(true)
    setTimeout(() => {
      const { output: out, error } = safeExecute(code)
      if (error) {
        setOutput(`Error: ${error}`)
      } else {
        setOutput(out || '(no output)')
      }
      setHasRun(true)
      setIsRunning(false)
      if (!ranRef.current) {
        ranRef.current = true
        addXp(10)
      }
    }, 200)
  }

  const handleReset = () => {
    setCode(defaultCode || '// Write your code here')
    setOutput('')
    setHasRun(false)
    ranRef.current = false
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Terminal size={20} className="text-sky-500" />
            Code Lab
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">Edit and run the JavaScript code below. Earn +10 XP per run!</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-colors font-medium disabled:opacity-60"
          >
            {isRunning ? <Loader size={14} className="animate-spin" /> : <Play size={14} />}
            Run
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-gray-400 text-xs font-mono ml-2">main.js</span>
        </div>
        <Suspense fallback={
          <div className="h-72 bg-gray-900 flex items-center justify-center">
            <Loader size={24} className="animate-spin text-gray-500" />
          </div>
        }>
          <Editor
            height="320px"
            defaultLanguage="javascript"
            value={code}
            onChange={val => setCode(val || '')}
            theme={darkMode ? 'vs-dark' : 'vs-dark'}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: '"Fira Code", "Cascadia Code", monospace',
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              padding: { top: 12, bottom: 12 },
            }}
          />
        </Suspense>
      </div>

      {/* Output Console */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Terminal size={14} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Console Output</span>
          {hasRun && !output.startsWith('Error') && (
            <span className="text-xs text-green-500 font-medium">● Success</span>
          )}
          {hasRun && output.startsWith('Error') && (
            <span className="text-xs text-red-500 font-medium">● Error</span>
          )}
        </div>
        <div className={`min-h-24 max-h-48 overflow-y-auto bg-gray-950 rounded-xl p-4 font-mono text-sm ${
          output.startsWith('Error') ? 'text-red-400' : 'text-green-400'
        }`}>
          {output ? (
            <pre className="whitespace-pre-wrap">{output}</pre>
          ) : (
            <span className="text-gray-600">// Output will appear here after running</span>
          )}
        </div>
      </div>
    </div>
  )
}
