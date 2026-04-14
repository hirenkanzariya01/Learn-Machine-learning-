import { Link } from 'react-router-dom'
import { Brain, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-sky-50 dark:bg-sky-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Brain size={40} className="text-sky-400" />
        </div>
        <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-700 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          The page you're looking for doesn't exist. Maybe the model hallucinated it? 🤖
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors"
        >
          <Home size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
