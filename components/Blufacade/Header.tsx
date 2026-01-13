"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "CONTACT", href: "/contact" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg" 
            : "bg-gradient-to-b from-black/50 to-transparent"
        }`}
      >
        <div className="mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 relative shrink-0">
                <Image
                  src="/images/logo/Blufacade Logo PNG (1).png"
                  alt="Blufacade"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="font-bold text-2xl tracking-tight transition-colors duration-300">
                <span className={scrolled ? "text-[#014a74]" : "text-[#014a74]"}>blu</span>
                <span className={scrolled ? "text-[#f58420]" : "text-[#f58420]"}>facade</span>
              </h1>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-lg transition-colors px-3 py-2.5 md:hidden ${
                scrolled 
                  ? "bg-[#014a74] text-white" 
                  : "bg-white/20 backdrop-blur-sm text-white border border-white/30"
              }`}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-[#f58420] ${
                    scrolled ? "text-[#014a74]" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#014a74]/95 backdrop-blur-xl z-40 flex items-center justify-center"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
              className="text-center"
            >
              <motion.ul className="space-y-6 text-4xl md:text-6xl font-black uppercase text-white">
                {navItems.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={{
                      open: { opacity: 1, y: 0, rotate: 0 },
                      closed: { opacity: 0, y: 20, rotate: -5 },
                    }}
                  >
                    <Link
                      href={item.href}
                      className="inline-block hover:text-[#f58420] transition-colors duration-300 hover:scale-110 transform"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
                className="mt-12 flex justify-center gap-6"
              >
                {["INSTAGRAM", "LINKEDIN", "FACEBOOK"].map((social) => (
                  <motion.a
                    key={social}
                    whileHover={{ scale: 1.1, color: "#f58420" }}
                    href="#"
                    className="text-sm font-bold text-white/60 hover:text-[#f58420] transition-colors"
                  >
                    {social}
                  </motion.a>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
