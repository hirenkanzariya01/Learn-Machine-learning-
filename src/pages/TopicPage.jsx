import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  CheckCircle, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight,
  Download, Code2, Brain, MessageSquare, PlayCircle, Trophy, Zap
} from 'lucide-react'
import useStore from '../store/useStore'
import { topics } from '../data/topics'
import MarkdownViewer from '../components/MarkdownViewer'
import CodeEditor from '../components/CodeEditor'
import QuizSection from '../components/QuizSection'
import VideoPlayer from '../components/VideoPlayer'
import CommentsSection from '../components/CommentsSection'
import AIAssistant from '../components/AIAssistant'
import { generatePDF } from '../utils/pdfExport'

const tabs = [
  { id: 'content', label: 'Notes', icon: Brain },
  { id: 'video', label: 'Video', icon: PlayCircle },
  { id: 'code', label: 'Code Lab', icon: Code2 },
  { id: 'quiz', label: 'Quiz', icon: Trophy },
  { id: 'discuss', label: 'Discuss', icon: MessageSquare },
]

export default function TopicPage() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const { completedTopics, bookmarkedTopics, markTopicComplete, toggleBookmark, setLastVisited, quizScores } = useStore()
  const [activeTab, setActiveTab] = useState('content')
  const [showAI, setShowAI] = useState(false)

  const topic = topics.find(t => t.id === topicId)
  const topicIndex = topics.findIndex(t => t.id === topicId)
  const prevTopic = topics[topicIndex - 1]
  const nextTopic = topics[topicIndex + 1]
  const isDone = completedTopics.includes(topicId)
  const isBookmarked = bookmarkedTopics.includes(topicId)
  const quizScore = quizScores[topicId]

  useEffect(() => {
    if (topic) {
      setLastVisited(topicId)
      setActiveTab('content')
    }
  }, [topicId])

  if (!topic) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="text-center">
          <Brain size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">Topic not found</p>
          <Link to="/" className="text-sky-500 text-sm hover:underline">Back to home</Link>
        </div>
      </div>
    )
  }

  const handleMarkRead = () => {
    if (!isDone) {
      markTopicComplete(topicId, topic.xp)
    }
  }

  const handleDownloadPDF = () => {
    generatePDF(topic.title, topic.content)
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topic Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                <Link to="/" className="hover:text-sky-500">Home</Link>
                <span>›</span>
                <span>{topic.category}</span>
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{topic.title}</h1>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                  <Zap size={12} />
                  {topic.xp} XP
                </span>
                {quizScore !== undefined && (
                  <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                    <Trophy size={12} />
                    Quiz: {quizScore}%
                  </span>
                )}
                {isDone && (
                  <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                    <CheckCircle size={12} />
                    Completed
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowAI(p => !p)}
                className={`p-2 rounded-xl text-sm transition-colors ${showAI ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                title="AI Assistant"
              >
                <Brain size={18} />
              </button>
              <button
                onClick={() => toggleBookmark(topicId)}
                className={`p-2 rounded-xl text-sm transition-colors ${isBookmarked ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>
              <button
                onClick={handleDownloadPDF}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                title="Download PDF"
              >
                <Download size={18} />
              </button>
              <button
                onClick={handleMarkRead}
                disabled={isDone}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isDone
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-default'
                    : 'bg-sky-500 hover:bg-sky-600 text-white'
                }`}
              >
                <CheckCircle size={15} />
                {isDone ? 'Completed' : 'Mark Read'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 flex-shrink-0">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            {activeTab === 'content' && (
              <div>
                <MarkdownViewer content={topic.content} />
                <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4">
                  {prevTopic ? (
                    <Link
                      to={`/topic/${prevTopic.id}`}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-sky-500 transition-colors"
                    >
                      <ChevronLeft size={16} />
                      <span className="hidden sm:block">{prevTopic.title}</span>
                      <span className="sm:hidden">Previous</span>
                    </Link>
                  ) : <div />}
                  {nextTopic ? (
                    <Link
                      to={`/topic/${nextTopic.id}`}
                      className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 font-medium transition-colors"
                    >
                      <span className="hidden sm:block">{nextTopic.title}</span>
                      <span className="sm:hidden">Next</span>
                      <ChevronRight size={16} />
                    </Link>
                  ) : <div />}
                </div>
              </div>
            )}
            {activeTab === 'video' && <VideoPlayer videoId={topic.videoId} title={topic.title} />}
            {activeTab === 'code' && <CodeEditor defaultCode={topic.codeTemplate} topicId={topicId} />}
            {activeTab === 'quiz' && <QuizSection topic={topic} />}
            {activeTab === 'discuss' && <CommentsSection topicId={topicId} />}
          </div>
        </div>
      </div>

      {/* AI Assistant Panel */}
      {showAI && (
        <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-800 hidden lg:block">
          <AIAssistant topic={topic} />
        </div>
      )}
    </div>
  )
}
