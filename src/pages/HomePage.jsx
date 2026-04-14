import { Link } from 'react-router-dom'
import { BookOpen, CheckCircle, Bookmark, Clock, Zap, ArrowRight, Flame, Trophy, BarChart2, Brain } from 'lucide-react'
import useStore from '../store/useStore'
import { topics, getLevel, LEVELS } from '../data/topics'

const categoryColors = {
  'Fundamentals': 'bg-blue-500',
  'Deep Learning': 'bg-purple-500',
  'Tools': 'bg-green-500',
  'NLP': 'bg-orange-500',
}
const categoryLight = {
  'Fundamentals': 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800/30',
  'Deep Learning': 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800/30',
  'Tools': 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800/30',
  'NLP': 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-100 dark:border-orange-800/30',
}

export default function HomePage() {
  const { completedTopics, bookmarkedTopics, xp, streak, lastVisitedTopic, searchQuery } = useStore()
  const levelInfo = getLevel(xp)
  const nextLevel = LEVELS.find(l => l.level === levelInfo.level + 1) || levelInfo
  const xpProgress = Math.min(100, Math.round(((xp - levelInfo.minXp) / (nextLevel.maxXp - levelInfo.minXp)) * 100))

  const lastTopic = lastVisitedTopic ? topics.find(t => t.id === lastVisitedTopic) : null
  const filteredTopics = searchQuery
    ? topics.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : topics

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">
      {/* Hero / Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Brain size={20} />
              <span className="font-semibold text-sky-100">AI/ML Learning Platform</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, Learner! 👋</h1>
            <p className="text-sky-100 text-sm mb-4">
              {completedTopics.length === 0
                ? 'Start your AI/ML journey today'
                : `${completedTopics.length} of ${topics.length} topics completed`}
            </p>
            {lastTopic ? (
              <Link
                to={`/topic/${lastTopic.id}`}
                className="inline-flex items-center gap-2 bg-white text-sky-600 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-sky-50 transition-colors"
              >
                Continue: {lastTopic.title}
                <ArrowRight size={15} />
              </Link>
            ) : (
              <Link
                to={`/topic/${topics[0].id}`}
                className="inline-flex items-center gap-2 bg-white text-sky-600 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-sky-50 transition-colors"
              >
                Start Learning
                <ArrowRight size={15} />
              </Link>
            )}
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -right-2 -bottom-10 w-28 h-28 bg-white/10 rounded-full" />
        </div>

        {/* Stats Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Stats</span>
            <Link to="/dashboard" className="text-xs text-sky-500 hover:underline flex items-center gap-1">
              <BarChart2 size={12} /> View All
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                <Zap size={18} className="text-yellow-500" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{xp} XP</div>
                <div className="text-xs text-gray-400">{levelInfo.name} · Lv.{levelInfo.level}</div>
              </div>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
              <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: `${xpProgress}%` }} />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <Flame size={18} className="text-orange-500" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{streak} days</div>
                <div className="text-xs text-gray-400">Current streak</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <CheckCircle size={18} className="text-green-500" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{completedTopics.length}/{topics.length}</div>
                <div className="text-xs text-gray-400">Topics done</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarks */}
      {bookmarkedTopics.length > 0 && !searchQuery && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Bookmark size={18} className="text-sky-500" fill="currentColor" />
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">Bookmarked</h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {bookmarkedTopics.map(id => {
              const t = topics.find(tp => tp.id === id)
              if (!t) return null
              return (
                <Link
                  key={id}
                  to={`/topic/${t.id}`}
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:border-sky-400 transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full ${categoryColors[t.category] || 'bg-gray-400'}`} />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t.title}</span>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* All Topics */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-gray-500" />
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Topics'}
            </h2>
          </div>
          <span className="text-xs text-gray-400">{filteredTopics.length} topics</span>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Brain size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No topics found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTopics.map((topic, idx) => {
              const isDone = completedTopics.includes(topic.id)
              const isBookmarked = bookmarkedTopics.includes(topic.id)

              return (
                <Link
                  key={topic.id}
                  to={`/topic/${topic.id}`}
                  className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm ${categoryColors[topic.category] || 'bg-gray-400'}`}>
                    {isDone ? <CheckCircle size={18} /> : <span>{idx + 1}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
                        {topic.title}
                      </h3>
                      {isBookmarked && <Bookmark size={13} className="text-sky-400 flex-shrink-0 mt-0.5" fill="currentColor" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryLight[topic.category] || 'bg-gray-100 text-gray-600'}`}>
                        {topic.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={11} />
                        {topic.duration}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                        <Zap size={11} />
                        {topic.xp} XP
                      </span>
                    </div>
                    {isDone && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                        <CheckCircle size={12} />
                        Completed
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
