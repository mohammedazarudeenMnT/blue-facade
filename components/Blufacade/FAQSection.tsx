'use client'

import { useEffect, useMemo, useState } from 'react'
import { useContact } from '@/hooks/use-contact'

const INTRO_STYLE_ID = 'blufacade-faq-animations'

interface FAQItem {
  question: string
  answer: string
  meta: string
}

const faqData: FAQItem[] = [
  {
    question: 'Which glass brands do you supply?',
    answer:
      'We collaborate with global leaders like Saint-Gobain for glass and partner with renowned German and American brands for architectural hardware. As an authorized supplier of Saint-Gobain in the Tamil Nadu region, we are committed to delivering premium quality. We work with other leading glass manufacturers such as AGC, Guardian, and Nippon Sheet Glass. Our product range includes clear glass, tempered glass, laminated glass, and safety glass.',
    meta: 'Products',
  },
  {
    question: 'Do you offer maintenance and after-installation services?',
    answer:
      'Yes, we offer a 2-year free service warranty on all installed architectural hardware, provided our maintenance guidelines are properly followed.',
    meta: 'Warranty',
  },
  {
    question: 'What about your pricing?',
    answer:
      'Our purchase management team thoughtfully develops after-sales policies to ensure the best market pricing while maximizing the value of your investment. We are committed to maintaining product quality and customer satisfaction in alignment with the value you expect and deserve.',
    meta: 'Pricing',
  },
  {
    question: 'What is the background of your team members?',
    answer:
      'Our young team of professionals is qualified, skilled, and experienced, backed by relevant education, prior work with leading infrastructure corporations, and internationally accredited training programs.',
    meta: 'Team',
  },
  {
    question: 'Do you take on projects in the interior regions of Tamil Nadu?',
    answer:
      'Yes, our channel partners and project teams have a proven track record of successfully completing projects across Tamil Nadu. This is made possible by our continuous investment in advanced technologies and efficient logistics, allowing us to serve clients throughout the region. Our passion for what we do drives us to consistently deliver excellence in every project we undertake.',
    meta: 'Coverage',
  },
  {
    question: 'What does the free onsite consultation include?',
    answer:
      'Following a site visit, we offer our clients complimentary drawings, designs, bills of quantities (BOQ), and budget proposals. This approach not only supports informed decision-making but also helps us connect with a broader market and deliver higher levels of customer satisfaction.',
    meta: 'Consultation',
  },
  {
    question: 'What is your typical project completion time?',
    answer:
      'Construction site readiness and client cooperation play a critical role in meeting our target completion timelines. Delays can occur if the site is not prepared at the scheduled start or if necessary information and timely decisions from the client are not provided. By maintaining close collaboration with our clients and ensuring that sites are ready for execution, we have consistently achieved a 95% on-time project completion rate.',
    meta: 'Timeline',
  },
]

const palettes = {
  dark: {
    surface: 'bg-neutral-950 text-neutral-100',
    panel: 'bg-neutral-900/50',
    border: 'border-white/10',
    heading: 'text-white',
    muted: 'text-neutral-400',
    iconRing: 'border-white/20',
    iconSurface: 'bg-white/5',
    icon: 'text-white',
    glow: 'rgba(255, 255, 255, 0.08)',
    aurora:
      'radial-gradient(ellipse 50% 100% at 10% 0%, rgba(226, 232, 240, 0.15), transparent 65%), #000000',
    shadow: 'shadow-[0_36px_140px_-60px_rgba(10,10,10,0.95)]',
    overlay: 'linear-gradient(130deg, rgba(255,255,255,0.04) 0%, transparent 65%)',
  },
  light: {
    surface: 'bg-[#fefaf6] text-[#282828]',
    panel: 'bg-white/60',
    border: 'border-[#014a74]/10',
    heading: 'text-[#014a74]',
    muted: 'text-[#282828]/70',
    iconRing: 'border-[#f58420]/20',
    iconSurface: 'bg-[#f58420]/5',
    icon: 'text-[#f58420]',
    glow: 'rgba(1, 74, 116, 0.05)',
    aurora:
      'radial-gradient(ellipse 50% 100% at 10% 0%, rgba(1, 74, 116, 0.05), rgba(254, 250, 246, 0.95) 70%)',
    shadow: 'shadow-[0_36px_120px_-70px_rgba(1,74,116,0.1)]',
    overlay: 'linear-gradient(130deg, rgba(1,74,116,0.02) 0%, transparent 70%)',
  },
}

type ThemeType = keyof typeof palettes

export function FAQSection() {
  const getRootTheme = (): ThemeType => {
    return 'light'
  }

  const { contactInfo } = useContact()
  const [theme, setTheme] = useState<ThemeType>(getRootTheme)
  const [introReady, setIntroReady] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.getElementById(INTRO_STYLE_ID)) return
    const style = document.createElement('style')
    style.id = INTRO_STYLE_ID
    style.innerHTML = `
      @keyframes blufacade-fade-up {
        0% { transform: translate3d(0, 20px, 0); opacity: 0; filter: blur(6px); }
        60% { filter: blur(0); }
        100% { transform: translate3d(0, 0, 0); opacity: 1; filter: blur(0); }
      }
      @keyframes blufacade-beam-spin {
        0% { transform: rotate(0deg) scale(1); }
        100% { transform: rotate(360deg) scale(1); }
      }
      @keyframes blufacade-pulse {
        0% { transform: scale(0.7); opacity: 0.55; }
        60% { opacity: 0.1; }
        100% { transform: scale(1.25); opacity: 0; }
      }
      @keyframes blufacade-meter {
        0%, 20% { transform: scaleX(0); transform-origin: left; }
        45%, 60% { transform: scaleX(1); transform-origin: left; }
        80%, 100% { transform: scaleX(0); transform-origin: right; }
      }
      @keyframes blufacade-tick {
        0%, 30% { transform: translateX(-6px); opacity: 0.4; }
        50% { transform: translateX(2px); opacity: 1; }
        100% { transform: translateX(20px); opacity: 0; }
      }
      .blufacade-intro {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.85rem 1.4rem;
        border-radius: 9999px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(12, 12, 12, 0.42);
        color: rgba(248, 250, 252, 0.92);
        text-transform: uppercase;
        letter-spacing: 0.35em;
        font-size: 0.85rem;
        width: 100%;
        max-width: 24rem;
        margin: 0 auto;
        mix-blend-mode: screen;
        opacity: 0;
        transform: translate3d(0, 12px, 0);
        filter: blur(8px);
        transition: opacity 720ms ease, transform 720ms ease, filter 720ms ease;
        isolation: isolate;
      }
      .blufacade-intro--light {
        border-color: rgba(17, 17, 17, 0.12);
        background: rgba(248, 250, 252, 0.88);
        color: rgba(15, 23, 42, 0.78);
        mix-blend-mode: multiply;
      }
      .blufacade-intro--active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        filter: blur(0);
      }
      .blufacade-intro__beam,
      .blufacade-intro__pulse {
        position: absolute;
        inset: -110%;
        pointer-events: none;
        border-radius: 50%;
      }
      .blufacade-intro__beam {
        background: conic-gradient(from 160deg, rgba(226, 232, 240, 0.25), transparent 32%, rgba(148, 163, 184, 0.22) 58%, transparent 78%, rgba(148, 163, 184, 0.18));
        animation: blufacade-beam-spin 18s linear infinite;
        opacity: 0.55;
      }
      .blufacade-intro--light .blufacade-intro__beam {
        background: conic-gradient(from 180deg, rgba(15, 23, 42, 0.18), transparent 30%, rgba(71, 85, 105, 0.18) 58%, transparent 80%, rgba(15, 23, 42, 0.14));
      }
      .blufacade-intro__pulse {
        border: 1px solid currentColor;
        opacity: 0.25;
        animation: blufacade-pulse 3.4s ease-out infinite;
      }
      .blufacade-intro__label {
        position: relative;
        z-index: 1;
        font-weight: 600;
        letter-spacing: 0.4em;
      }
      .blufacade-intro__meter {
        position: relative;
        z-index: 1;
        flex: 1 1 auto;
        height: 1px;
        background: linear-gradient(90deg, transparent, currentColor 35%, transparent 85%);
        transform: scaleX(0);
        transform-origin: left;
        animation: blufacade-meter 5.8s ease-in-out infinite;
        opacity: 0.7;
      }
      .blufacade-intro__tick {
        position: relative;
        z-index: 1;
        width: 0.55rem;
        height: 0.55rem;
        border-radius: 9999px;
        background: currentColor;
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
        animation: blufacade-tick 3.2s ease-in-out infinite;
      }
      .blufacade-intro--light .blufacade-intro__tick {
        box-shadow: 0 0 0 4px rgba(15, 15, 15, 0.08);
      }
      .blufacade-fade {
        opacity: 0;
        transform: translate3d(0, 24px, 0);
        filter: blur(12px);
        transition: opacity 700ms ease, transform 700ms ease, filter 700ms ease;
      }
      .blufacade-fade--ready {
        animation: blufacade-fade-up 860ms cubic-bezier(0.22, 0.68, 0, 1) forwards;
      }
    `

    document.head.appendChild(style)

    return () => {
      if (style.parentNode) style.remove()
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIntroReady(true)
      return
    }
    const frame = window.requestAnimationFrame(() => setIntroReady(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const applyThemeFromRoot = () => setTheme(getRootTheme())

    applyThemeFromRoot()

    const observer = new MutationObserver(applyThemeFromRoot)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'blufacade-theme') applyThemeFromRoot()
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      observer.disconnect()
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const palette = useMemo(() => palettes[theme], [theme])

  const toggleQuestion = (index: number) => setActiveIndex((prev) => (prev === index ? -1 : index))

  useEffect(() => {
    if (typeof window === 'undefined') {
      setHasEntered(true)
      return
    }

    let timeout: ReturnType<typeof setTimeout>
    const onLoad = () => {
      timeout = setTimeout(() => setHasEntered(true), 120)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(timeout)
    }
  }, [])

  const setCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    target.style.setProperty('--faq-x', `${event.clientX - rect.left}px`)
    target.style.setProperty('--faq-y', `${event.clientY - rect.top}px`)
  }

  const clearCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget
    target.style.removeProperty('--faq-x')
    target.style.removeProperty('--faq-y')
  }

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in your facade solutions. Please provide more details."
    const whatsappNumber = contactInfo?.whatsappNumber || ''
    if (!whatsappNumber) return
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className={`relative w-full overflow-hidden transition-colors duration-700 ${palette.surface}`}>
      <div className="absolute inset-0 z-0" style={{ background: palette.aurora }} />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-80"
        style={{ background: palette.overlay, mixBlendMode: theme === 'dark' ? 'screen' : 'multiply' }}
      />

      <section
        className={`relative z-10 mx-auto flex max-w-4xl flex-col gap-12 px-6 py-24 lg:max-w-5xl lg:px-12 ${
          hasEntered ? 'blufacade-fade--ready' : 'blufacade-fade'
        }`}
      >
        <div
          className={`blufacade-intro ${introReady ? 'blufacade-intro--active' : ''} ${
            theme === 'light' ? 'blufacade-intro--light' : 'blufacade-intro--dark'
          }`}
        >
          <span className="blufacade-intro__beam" aria-hidden="true" />
          <span className="blufacade-intro__pulse" aria-hidden="true" />
          <span className="blufacade-intro__label">Blufacade FAQ</span>
          <span className="blufacade-intro__meter" aria-hidden="true" />
          <span className="blufacade-intro__tick" aria-hidden="true" />
        </div>

        <header className="flex flex-col gap-8">
          <div className="space-y-4">
            <p className={`text-[10px] uppercase tracking-[0.35em] ${palette.muted}`}>Questions</p>
            <h1 className={`text-3xl font-semibold leading-tight md:text-4xl ${palette.heading}`}>
              Everything you need to know about our facade solutions.
            </h1>
            <p className={`max-w-xl text-sm ${palette.muted}`}>
              Get answers to common questions about partnering with Blufacade for your architectural glass and facade
              projects.
            </p>
          </div>
        </header>

        <ul className="space-y-4">
          {faqData.map((item, index) => {
            const open = activeIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-trigger-${index}`

            return (
              <li
                key={item.question}
                className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 focus-within:-translate-y-0.5 ${palette.border} ${palette.panel} ${palette.shadow}`}
                onMouseMove={setCardGlow}
                onMouseLeave={clearCardGlow}
              >
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    open ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{
                    background: `radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), ${palette.glow}, transparent 70%)`,
                  }}
                />

                <button
                  type="button"
                  id={buttonId}
                  aria-controls={panelId}
                  aria-expanded={open}
                  onClick={() => toggleQuestion(index)}
                  className="relative flex w-full items-start gap-6 px-8 py-7 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <span
                    className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-105 ${palette.iconRing} ${palette.iconSurface}`}
                  >
                    <span
                      className={`pointer-events-none absolute inset-0 rounded-full border opacity-30 ${
                        palette.iconRing
                      } ${open ? 'animate-ping' : ''}`}
                    />
                    <svg
                      className={`relative h-5 w-5 transition-transform duration-500 ${palette.icon} ${
                        open ? 'rotate-45' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>

                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <h2 className={`text-base font-medium leading-tight sm:text-lg ${palette.heading}`}>
                        {item.question}
                      </h2>
                      {item.meta && (
                        <span
                          className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.35em] transition-opacity duration-300 sm:ml-auto ${palette.border} ${palette.muted}`}
                        >
                          {item.meta}
                        </span>
                      )}
                    </div>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`overflow-hidden text-sm leading-relaxed transition-[max-height] duration-500 ease-out ${
                        open ? 'max-h-64' : 'max-h-0'
                      } ${palette.muted}`}
                    >
                      <p className="pr-2 text-justify">{item.answer}</p>
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        {/* WhatsApp CTA Section */}
        <div className={`text-center p-8 rounded-3xl border backdrop-blur-xl ${palette.border} ${palette.panel}`}>
          <h3 className={`text-xl font-bold mb-4 ${palette.heading}`}>Have More Questions?</h3>
          <p className={`mb-6 text-sm ${palette.muted}`}>
            Chat with us on WhatsApp for instant answers and personalized assistance.
          </p>
          <button
            onClick={handleWhatsAppClick}
            disabled={!contactInfo?.whatsappNumber}
            className={`inline-flex items-center gap-3 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 bg-[#25D366] hover:bg-[#128C7E] text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chat on WhatsApp
          </button>
        </div>
      </section>
    </div>
  )
}