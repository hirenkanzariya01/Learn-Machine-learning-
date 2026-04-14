import { useState } from 'react'
import { PlayCircle, ExternalLink } from 'lucide-react'

export default function VideoPlayer({ videoId, title }) {
  const [loaded, setLoaded] = useState(false)

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <PlayCircle size={20} className="text-red-500" />
          Video Lesson
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">{title}</p>
      </div>

      {/* Video Container */}
      <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl" style={{ paddingTop: '56.25%' }}>
        {!loaded ? (
          /* Thumbnail + Play button */
          <div
            className="absolute inset-0 cursor-pointer group"
            onClick={() => setLoaded(true)}
          >
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={e => { e.target.style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <PlayCircle size={36} className="text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
                <p className="text-white text-xs font-medium truncate">{title}</p>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* External Link */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Watch on YouTube for best experience
        </p>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-sky-500 hover:text-sky-600 font-medium"
        >
          <ExternalLink size={14} />
          Open YouTube
        </a>
      </div>

      {/* Tips */}
      <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl">
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">📌 Study Tips</p>
        <ul className="text-xs text-amber-600 dark:text-amber-500 space-y-0.5 list-disc pl-4">
          <li>Take notes while watching</li>
          <li>Pause and experiment in the Code Lab</li>
          <li>Re-watch complex sections multiple times</li>
        </ul>
      </div>
    </div>
  )
}
