import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

const useStore = create(
  persist(
    (set, get) => ({
      // Theme
      darkMode: false,
      toggleDarkMode: () => set(s => ({ darkMode: !s.darkMode })),

      // Progress
      completedTopics: [],
      bookmarkedTopics: [],
      lastVisitedTopic: null,

      markTopicComplete: (topicId, xpReward) => {
        const s = get()
        if (s.completedTopics.includes(topicId)) return
        const newXp = s.xp + xpReward
        set({
          completedTopics: [...s.completedTopics, topicId],
          xp: newXp,
          lastVisitedTopic: topicId,
        })
        get().updateStreak()
      },

      toggleBookmark: (topicId) => {
        const s = get()
        const bookmarks = s.bookmarkedTopics.includes(topicId)
          ? s.bookmarkedTopics.filter(id => id !== topicId)
          : [...s.bookmarkedTopics, topicId]
        set({ bookmarkedTopics: bookmarks })
      },

      setLastVisited: (topicId) => set({ lastVisitedTopic: topicId }),

      // Quiz
      quizScores: {},
      quizAttempts: {},
      setQuizScore: (topicId, score, totalQuestions) => {
        const s = get()
        const percentage = Math.round((score / totalQuestions) * 100)
        const xpEarned = Math.round((score / totalQuestions) * 30)
        set({
          quizScores: { ...s.quizScores, [topicId]: percentage },
          quizAttempts: { ...s.quizAttempts, [topicId]: (s.quizAttempts[topicId] || 0) + 1 },
          xp: s.xp + xpEarned,
        })
      },

      // Gamification
      xp: 0,
      streak: 0,
      lastActiveDate: null,

      updateStreak: () => {
        const s = get()
        const today = todayStr()
        if (s.lastActiveDate === today) return
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yStr = yesterday.toISOString().slice(0, 10)
        const newStreak = s.lastActiveDate === yStr ? s.streak + 1 : 1
        set({ streak: newStreak, lastActiveDate: today })
      },

      addXp: (amount) => set(s => ({ xp: s.xp + amount })),

      // Comments
      comments: {},
      addComment: (topicId, text, author = 'Anonymous') => {
        const s = get()
        const topicComments = s.comments[topicId] || []
        const newComment = {
          id: Date.now(),
          author,
          text,
          createdAt: new Date().toISOString(),
        }
        set({
          comments: {
            ...s.comments,
            [topicId]: [...topicComments, newComment],
          },
        })
      },

      // Search
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),

      // Sidebar
      sidebarOpen: true,
      toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
    }),
    {
      name: 'ailearn-storage',
      version: 1,
    }
  )
)

export default useStore
