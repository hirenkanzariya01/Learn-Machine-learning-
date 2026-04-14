import { useState } from 'react'
import { CheckCircle, XCircle, Trophy, RefreshCw, ChevronRight } from 'lucide-react'
import useStore from '../store/useStore'

export default function QuizSection({ topic }) {
  const { setQuizScore, quizScores, quizAttempts } = useStore()
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)

  const quiz = topic.quiz
  const prevScore = quizScores[topic.id]
  const attempts = quizAttempts[topic.id] || 0

  const handleAnswer = (qIdx, optIdx) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }))
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length < quiz.length) return
    const correct = quiz.filter((q, i) => answers[i] === q.answer).length
    setQuizScore(topic.id, correct, quiz.length)
    setSubmitted(true)
    setCurrentQ(quiz.length) // show all
  }

  const handleRetry = () => {
    setAnswers({})
    setSubmitted(false)
    setCurrentQ(0)
  }

  const score = submitted
    ? quiz.filter((q, i) => answers[i] === q.answer).length
    : null

  const scorePercent = score !== null ? Math.round((score / quiz.length) * 100) : 0

  if (submitted) {
    return (
      <div className="space-y-6">
        {/* Score Card */}
        <div className={`p-6 rounded-2xl text-center border-2 ${
          scorePercent >= 75
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
            : scorePercent >= 50
            ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
        }`}>
          <Trophy size={40} className={`mx-auto mb-2 ${
            scorePercent >= 75 ? 'text-green-500' : scorePercent >= 50 ? 'text-yellow-500' : 'text-red-500'
          }`} />
          <div className={`text-4xl font-bold mb-1 ${
            scorePercent >= 75 ? 'text-green-700 dark:text-green-300' : scorePercent >= 50 ? 'text-yellow-700 dark:text-yellow-300' : 'text-red-700 dark:text-red-300'
          }`}>
            {scorePercent}%
          </div>
          <p className={`text-sm font-medium ${
            scorePercent >= 75 ? 'text-green-600 dark:text-green-400' : scorePercent >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {score}/{quiz.length} correct ·{' '}
            {scorePercent >= 75 ? '🎉 Excellent!' : scorePercent >= 50 ? '👍 Good effort!' : '📖 Keep studying!'}
          </p>
          <p className="text-xs text-gray-400 mt-1">Attempt #{attempts} · +{Math.round((score / quiz.length) * 30)} XP earned</p>
          <button
            onClick={handleRetry}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mx-auto"
          >
            <RefreshCw size={14} />
            Retry Quiz
          </button>
        </div>

        {/* Review answers */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Review Answers</h3>
          {quiz.map((q, qIdx) => {
            const userAns = answers[qIdx]
            const correct = q.answer
            const isCorrect = userAns === correct
            return (
              <div key={qIdx} className={`p-4 rounded-xl border ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-start gap-2 mb-3">
                  {isCorrect
                    ? <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    : <XCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                  }
                  <p className="font-medium text-sm text-gray-800 dark:text-gray-200">Q{qIdx + 1}. {q.q}</p>
                </div>
                <div className="space-y-1 pl-6">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`text-sm px-3 py-1.5 rounded-lg ${
                        oIdx === correct
                          ? 'bg-green-200 dark:bg-green-800/40 text-green-800 dark:text-green-300 font-medium'
                          : oIdx === userAns && !isCorrect
                          ? 'bg-red-200 dark:bg-red-800/40 text-red-800 dark:text-red-300 line-through opacity-70'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {oIdx === correct && <span className="mr-1">✓</span>}
                      {oIdx === userAns && !isCorrect && <span className="mr-1">✗</span>}
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const q = quiz[currentQ]
  const allAnswered = Object.keys(answers).length === quiz.length

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            Knowledge Check
          </h2>
          {prevScore !== undefined && (
            <span className="text-xs text-gray-400">Best score: {prevScore}%</span>
          )}
        </div>
        <div className="flex gap-2 mb-4">
          {quiz.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                answers[i] !== undefined
                  ? 'bg-sky-500'
                  : i === currentQ
                  ? 'bg-sky-300'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400">Question {currentQ + 1} of {quiz.length}</p>
      </div>

      {/* Current Question */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-4 text-base leading-snug">
          {q.q}
        </p>
        <div className="space-y-2">
          {q.options.map((opt, oIdx) => {
            const selected = answers[currentQ] === oIdx
            return (
              <button
                key={oIdx}
                onClick={() => handleAnswer(currentQ, oIdx)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all font-medium ${
                  selected
                    ? 'bg-sky-50 dark:bg-sky-900/30 border-sky-400 text-sky-700 dark:text-sky-300'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/10'
                }`}
              >
                <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs mr-3 font-bold ${
                  selected ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {['A', 'B', 'C', 'D'][oIdx]}
                </span>
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          disabled={currentQ === 0}
          onClick={() => setCurrentQ(p => p - 1)}
          className="px-4 py-2 text-sm rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors font-medium"
        >
          Previous
        </button>

        {currentQ < quiz.length - 1 ? (
          <button
            onClick={() => setCurrentQ(p => p + 1)}
            disabled={answers[currentQ] === undefined}
            className="flex items-center gap-1 px-4 py-2 text-sm rounded-xl bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-40 transition-colors font-medium"
          >
            Next
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="flex items-center gap-2 px-5 py-2 text-sm rounded-xl bg-green-500 text-white hover:bg-green-600 disabled:opacity-40 transition-colors font-semibold"
          >
            <Trophy size={15} />
            Submit Quiz
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center">
        {Object.keys(answers).length}/{quiz.length} answered
      </p>
    </div>
  )
}
