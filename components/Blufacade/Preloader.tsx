"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if preloader has been shown in this session
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader")

    if (!hasSeenPreloader) {
      // First time in this session - show preloader
      setIsVisible(true)
      document.body.style.overflow = "hidden"

      const timer = setTimeout(() => {
        setIsVisible(false)
        document.body.style.overflow = "unset"
        // Mark as seen for this session
        sessionStorage.setItem("hasSeenPreloader", "true")
      }, 2800)

      return () => {
        clearTimeout(timer)
        document.body.style.overflow = "unset"
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#014a74] text-white"
        >
          <div className="relative flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative flex items-baseline text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter"
            >
              <span className="text-white">BLU</span>
              <span className="text-[#f58420]">FACADE</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-12 text-sm md:text-base font-bold tracking-widest uppercase text-[#f58420]"
          >
            INSPIRING SKYLINES
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
