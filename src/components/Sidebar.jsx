import { Link, useParams } from 'react-router-dom'
import { CheckCircle, Bookmark, Clock, Zap, BookOpen } from 'lucide-react'
import useStore from '../store/useStore'
import { topics } from '../data/topics'

const categoryColors = {
  'Fundamentals': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  'Deep Learning': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  'Tools': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  'NLP': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
}

export default function Sidebar() {
  const { topicId } = useParams()
  const { completedTopics, bookmarkedTopics, searchQuery } = useStore()

  const filteredTopics = searchQuery
    ? topics.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : topics

  const categories = [...new Set(filteredTopics.map(t => t.category))]

  return (
    <div className="h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="p-3">
        {/* Progress summary */}
        <div className="mb-4 p-3 bg-sky-50 dark:bg-sky-900/20 rounded-xl border border-sky-100 dark:border-sky-800/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-sky-700 dark:text-sky-300">Course Progress</span>
            <span className="text-xs font-bold text-sky-700 dark:text-sky-300">
              {completedTopics.length}/{topics.length}
            </span>
          </div>
          <div className="w-full h-2 bg-sky-100 dark:bg-sky-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedTopics.length / topics.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Topics by category */}
        {filteredTopics.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            <BookOpen size={32} className="mx-auto mb-2 opacity-40" />
            No topics found
          </div>
        ) : (
          categories.map(cat => (
            <div key={cat} className="mb-4">
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[cat] || 'bg-gray-100 text-gray-600'}`}>
                  {cat}
                </span>
              </div>
              <div className="space-y-1">
                {filteredTopics.filter(t => t.category === cat).map(topic => {
                  const isActive = topicId === topic.id
                  const isDone = completedTopics.includes(topic.id)
                  const isBookmarked = bookmarkedTopics.includes(topic.id)

                  return (
                    <Link
                      key={topic.id}
                      to={`/topic/${topic.id}`}
                      className={`
                        flex items-start gap-2 p-2.5 rounded-lg text-sm transition-all group
                        ${isActive
                          ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700/50'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }
                      `}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {isDone ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border-2 ${isActive ? 'border-sky-400' : 'border-gray-300 dark:border-gray-600'}`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium leading-tight truncate">{topic.title}</div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {topic.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap size={10} className="text-yellow-500" />
                            {topic.xp} XP
                          </span>
                        </div>
                      </div>
                      {isBookmarked && (
                        <Bookmark size={13} className="text-sky-400 flex-shrink-0 mt-0.5" fill="currentColor" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
