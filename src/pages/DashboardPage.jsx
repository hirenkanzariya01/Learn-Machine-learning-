import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { Zap, Trophy, Flame, CheckCircle, Target, Award, BookOpen, TrendingUp } from 'lucide-react'
import useStore from '../store/useStore'
import { topics, getLevel, LEVELS, BADGES } from '../data/topics'

ChartJS.register(
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Title, Tooltip, Legend, Filler
)

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
}

export default function DashboardPage() {
  const { xp, streak, completedTopics, quizScores, quizAttempts, darkMode, bookmarkedTopics } = useStore()
  const levelInfo = getLevel(xp)
  const nextLevel = LEVELS.find(l => l.level === levelInfo.level + 1) || levelInfo
  const xpInLevel = xp - levelInfo.minXp
  const xpNeeded = nextLevel.maxXp - levelInfo.minXp
  const xpProgress = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100))

  const totalQuizzes = Object.keys(quizScores).length
  const avgAccuracy = totalQuizzes > 0
    ? Math.round(Object.values(quizScores).reduce((a, b) => a + b, 0) / totalQuizzes)
    : 0

  // Badge state
  const gameState = { completedTopics, quizScores, streak, xp, bookmarkedTopics }
  const earnedBadges = BADGES.filter(b => b.condition(gameState))

  // Colors
  const textColor = darkMode ? '#9ca3af' : '#6b7280'
  const gridColor = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'

  // Quiz scores bar chart
  const quizLabels = topics.map(t => t.title.split(' ').slice(0, 2).join(' '))
  const quizData = topics.map(t => quizScores[t.id] || 0)

  const barChartData = {
    labels: quizLabels,
    datasets: [{
      label: 'Quiz Score (%)',
      data: quizData,
      backgroundColor: quizData.map(v =>
        v >= 80 ? 'rgba(34,197,94,0.8)' :
        v >= 50 ? 'rgba(234,179,8,0.8)' :
        v > 0  ? 'rgba(239,68,68,0.8)' :
                  'rgba(156,163,175,0.4)'
      ),
      borderRadius: 8,
      borderSkipped: false,
    }]
  }

  const barOptions = {
    ...chartDefaults,
    scales: {
      x: {
        ticks: { color: textColor, font: { size: 10 }, maxRotation: 30 },
        grid: { color: gridColor }
      },
      y: {
        max: 100,
        ticks: { color: textColor, font: { size: 10 }, callback: v => v + '%' },
        grid: { color: gridColor }
      }
    }
  }

  // Completion doughnut
  const doughnutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [completedTopics.length, topics.length - completedTopics.length],
      backgroundColor: ['rgba(14,165,233,0.9)', 'rgba(156,163,175,0.3)'],
      borderWidth: 0,
      hoverOffset: 4,
    }]
  }

  const doughnutOptions = {
    ...chartDefaults,
    cutout: '72%',
    plugins: {
      legend: { display: true, position: 'bottom', labels: { color: textColor, font: { size: 11 }, boxWidth: 12, padding: 12 } }
    }
  }

  // XP timeline (simulated progression)
  const xpTimeline = [0, 50, 50, 125, 125, 200, 275, 350, xp]
  const lineData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Today'],
    datasets: [{
      label: 'XP',
      data: xpTimeline,
      borderColor: 'rgba(14,165,233,1)',
      backgroundColor: 'rgba(14,165,233,0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgba(14,165,233,1)',
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    }]
  }

  const lineOptions = {
    ...chartDefaults,
    scales: {
      x: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: gridColor } },
      y: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: gridColor } }
    }
  }

  const stats = [
    {
      icon: Zap,
      label: 'Total XP',
      value: xp,
      sub: `Level ${levelInfo.level} · ${levelInfo.name}`,
      color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/40',
    },
    {
      icon: Flame,
      label: 'Day Streak',
      value: streak,
      sub: streak >= 3 ? '🔥 On fire!' : 'Keep it up!',
      color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
      iconBg: 'bg-orange-100 dark:bg-orange-900/40',
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: `${completedTopics.length}/${topics.length}`,
      sub: `${Math.round((completedTopics.length / topics.length) * 100)}% of course`,
      color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-900/40',
    },
    {
      icon: Target,
      label: 'Quiz Accuracy',
      value: totalQuizzes > 0 ? `${avgAccuracy}%` : '—',
      sub: `${totalQuizzes} quiz${totalQuizzes !== 1 ? 'zes' : ''} taken`,
      color: 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400',
      iconBg: 'bg-sky-100 dark:bg-sky-900/40',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <TrendingUp size={24} className="text-sky-500" />
          Analytics Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">Track your learning progress and achievements</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${s.iconBg}`}>
                <Icon size={18} className={s.color.split(' ').filter(c => c.startsWith('text-')).join(' ')} />
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          )
        })}
      </div>

      {/* Level Progress */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Level Progress</p>
            <p className="text-sm text-gray-400">
              {levelInfo.name} → {nextLevel.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-sky-500">{xpProgress}%</p>
            <p className="text-xs text-gray-400">{xpInLevel} / {xpNeeded} XP</p>
          </div>
        </div>
        <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${xpProgress}%`,
              background: 'linear-gradient(90deg, #0ea5e9, #6366f1)'
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {LEVELS.map(l => (
            <div key={l.level} className="flex flex-col items-center gap-1">
              <div className={`w-2.5 h-2.5 rounded-full border-2 transition-colors ${
                xp >= l.minXp
                  ? 'bg-sky-500 border-sky-500'
                  : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`} />
              <span className="text-xs text-gray-400">{l.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quiz Scores */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
          <p className="font-semibold text-gray-900 dark:text-white mb-1">Quiz Performance</p>
          <p className="text-xs text-gray-400 mb-4">Score per topic</p>
          <div className="h-48">
            <Bar data={barChartData} options={barOptions} />
          </div>
        </div>

        {/* Completion */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
          <p className="font-semibold text-gray-900 dark:text-white mb-1">Topic Completion</p>
          <p className="text-xs text-gray-400 mb-2">Overall progress</p>
          <div className="relative h-48">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ paddingBottom: '30px' }}>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{completedTopics.length}</div>
                <div className="text-xs text-gray-400">done</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* XP Timeline */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">XP Timeline</p>
        <p className="text-xs text-gray-400 mb-4">Your learning journey (simulated)</p>
        <div className="h-40">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
        <p className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen size={16} className="text-sky-500" />
          Topic Breakdown
        </p>
        <div className="space-y-2">
          {topics.map(t => {
            const done = completedTopics.includes(t.id)
            const score = quizScores[t.id]
            const attempts = quizAttempts[t.id] || 0
            return (
              <div key={t.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${done ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">{t.title}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {score !== undefined ? (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      score >= 75
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : score >= 50
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}>
                      {score}%
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">No quiz</span>
                  )}
                  {attempts > 0 && (
                    <span className="text-xs text-gray-400">{attempts}x</span>
                  )}
                  <span className={`text-xs font-medium ${done ? 'text-green-500' : 'text-gray-400'}`}>
                    {done ? '✓' : '○'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
        <p className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Award size={16} className="text-yellow-500" />
          Badges
          <span className="text-xs text-gray-400 font-normal">
            {earnedBadges.length}/{BADGES.length} earned
          </span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BADGES.map(badge => {
            const earned = badge.condition(gameState)
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-xl border text-center transition-all ${
                  earned
                    ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-700/50'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-50'
                }`}
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{badge.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">{badge.desc}</p>
                {earned && (
                  <div className="mt-1.5 text-xs text-yellow-600 dark:text-yellow-400 font-medium">Earned ✓</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
