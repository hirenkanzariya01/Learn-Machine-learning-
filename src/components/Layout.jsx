import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Brain, Sun, Moon, BarChart2, Home, Menu, X,
  Flame, Zap, Search, BookOpen
} from 'lucide-react'
import useStore from '../store/useStore'
import Sidebar from './Sidebar'
import { getLevel, LEVELS } from '../data/topics'

export default function Layout({ children }) {
  const { darkMode, toggleDarkMode, xp, streak, sidebarOpen, toggleSidebar, setSearchQuery, searchQuery } = useStore()
  const location = useLocation()
  const levelInfo = getLevel(xp)
  const nextLevel = LEVELS.find(l => l.level === levelInfo.level + 1) || levelInfo
  const xpInLevel = xp - levelInfo.minXp
  const xpNeeded = nextLevel.maxXp - levelInfo.minXp
  const progress = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100))
  const isTopicPage = location.pathname.startsWith('/topic/')

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center h-14 px-4 gap-3">
          {/* Hamburger (only on topic pages or mobile) */}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-lg">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <Brain size={18} className="text-white" />
            </div>
            <span className="hidden sm:block">AI-ML Learn</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md mx-auto relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg border border-transparent focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 dark:text-gray-100 placeholder-gray-400"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* XP + Level */}
            <div className="hidden md:flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                <Zap size={12} className="text-yellow-500" />
                <span>{xp} XP</span>
                <span className="text-gray-400">·</span>
                <span className="text-sky-600 dark:text-sky-400">{levelInfo.name}</span>
              </div>
              <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-lg text-xs font-semibold">
              <Flame size={13} />
              <span>{streak}</span>
            </div>

            {/* Nav links */}
            <Link
              to="/"
              className={`p-1.5 rounded-lg transition-colors ${location.pathname === '/' ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <Home size={18} />
            </Link>
            <Link
              to="/dashboard"
              className={`p-1.5 rounded-lg transition-colors ${location.pathname === '/dashboard' ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <BarChart2 size={18} />
            </Link>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`
            fixed md:sticky top-14 z-40 h-[calc(100vh-3.5rem)]
            transition-transform duration-200 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-full'}
            w-64 flex-shrink-0
          `}
        >
          <Sidebar />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden top-14"
            onClick={toggleSidebar}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
