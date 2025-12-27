"use client"

import { useEffect, useState } from "react"

const breakingNews = [
  {title: "Prime Minister announces new economic reforms for 2025"},
  {title: "Prime Minister announces new economic reforms for 2025"},
  {title: "Prime Minister announces new economic reforms for 2025"},

]

export function BreakingNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const visibleNews = [
    ...breakingNews.slice(currentIndex),
    ...breakingNews.slice(0, currentIndex),
  ]

  return (
    <div className="bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-10">
          <span className="font-bold text-sm px-3 py-1 bg-destructive text-destructive-foreground mr-4 whitespace-nowrap">
            BREAKING NEWS
          </span>
          <div className="flex-1 overflow-hidden">
            <div
              className="whitespace-nowrap animate-marquee inline-block"
              style={{
                animation: "marquee 20s linear infinite",
              }}
            >
               {visibleNews.map((news, index) => (
                <span key={index} className="mx-8 text-sm">
                  {news.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
