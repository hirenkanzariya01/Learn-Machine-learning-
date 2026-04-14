import { useState } from 'react'
import { MessageSquare, Send, User, Trash2 } from 'lucide-react'
import useStore from '../store/useStore'

export default function CommentsSection({ topicId }) {
  const { comments, addComment } = useStore()
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [posting, setPosting] = useState(false)

  const topicComments = comments[topicId] || []

  const handlePost = () => {
    if (!text.trim()) return
    setPosting(true)
    setTimeout(() => {
      addComment(topicId, text.trim(), author.trim() || 'Anonymous')
      setText('')
      setPosting(false)
    }, 300)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handlePost()
    }
  }

  function formatTime(iso) {
    const d = new Date(iso)
    const now = new Date()
    const diff = Math.floor((now - d) / 1000)
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return d.toLocaleDateString()
  }

  const avatarColors = [
    'bg-sky-500', 'bg-purple-500', 'bg-green-500',
    'bg-orange-500', 'bg-pink-500', 'bg-teal-500'
  ]
  const getAvatarColor = (name) => {
    const idx = name.charCodeAt(0) % avatarColors.length
    return avatarColors[idx]
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageSquare size={20} className="text-sky-500" />
          Community Discussion
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          {topicComments.length} comment{topicComments.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Post a comment */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 space-y-3">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Leave a comment</p>
        <input
          type="text"
          placeholder="Your name (optional)"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 dark:text-gray-100 placeholder-gray-400"
        />
        <textarea
          placeholder="Ask a question, share an insight, or help others..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 dark:text-gray-100 placeholder-gray-400"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">Ctrl+Enter to post</p>
          <button
            onClick={handlePost}
            disabled={!text.trim() || posting}
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-sm font-medium disabled:opacity-50 transition-colors"
          >
            <Send size={14} />
            Post
          </button>
        </div>
      </div>

      {/* Comments List */}
      {topicComments.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium text-sm">No comments yet</p>
          <p className="text-xs mt-1">Be the first to start the discussion!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...topicComments].reverse().map((comment) => (
            <div
              key={comment.id}
              className="flex gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl"
            >
              <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold ${getAvatarColor(comment.author)}`}>
                {comment.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {formatTime(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
