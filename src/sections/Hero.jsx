import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Logo from '../components/Logo'
import TimelineEvent from '../components/TimelineEvent'

const EVENTS = [
  {
    id: 'research',
    label: 'Research',
    date: 'Jan 08',
    meta: '14 notes',
    detail: 'Gathered competitive analysis and user research across six product areas.',
  },
  {
    id: 'decision',
    label: 'Decision',
    date: 'Jan 14',
    meta: 'Navigation',
    detail: 'Changed navigation architecture to a context-first model.',
  },
  {
    id: 'design',
    label: 'Design',
    date: 'Jan 22',
    meta: '8 changes',
    detail: 'Finalized layout and component library for the new timeline view.',
  },
  {
    id: 'build',
    label: 'Build',
    date: 'Jan 29',
    meta: '24 commits',
    detail: 'Implemented core timeline renderer and event connectors.',
  },
  {
    id: 'release',
    label: 'Release',
    date: 'Feb 03',
    meta: 'v2.4',
    detail: 'Shipped to production. Zero regressions. Timeline latency under 40ms.',
  },
]

function motionProps(reduced, delay, y = 14) {
  if (reduced) return { initial: false, animate: { opacity: 1 } }
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
  }
}

function fadeProps(reduced, delay) {
  if (reduced) return { initial: false, animate: { opacity: 1 } }
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.35, ease: 'easeOut', delay },
  }
}

export default function Hero() {
  const [activeId, setActiveId] = useState(null)
  const reduced = useReducedMotion()

  const activeEvent = EVENTS.find((e) => e.id === activeId) ?? null

  return (
    <section style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* ─── Navigation ──────────────────────────────────────────── */}
        <motion.nav
          {...fadeProps(reduced, 0)}
          aria-label="Main navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-6)',
            paddingBottom: 'var(--space-6)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <a href="/" aria-label="TRACE — go to homepage">
            <Logo />
          </a>

          {/* Nav links — hidden on mobile to avoid overflow */}
          <div
            className="hidden md:flex"
            style={{ gap: 'var(--space-8)', alignItems: 'center' }}
          >
            {['Product', 'Philosophy'].map((label) => (
              <NavLink key={label} href={`#${label.toLowerCase()}`}>
                {label}
              </NavLink>
            ))}
          </div>

          <OpenButton />
        </motion.nav>

        {/* ─── Hero Copy ───────────────────────────────────────────── */}
        <div style={{ paddingTop: 'var(--space-20)', paddingBottom: 'var(--space-12)' }}>
          <motion.h1
            {...motionProps(reduced, 0.18)}
            style={{
              fontSize: 'var(--text-display)',
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: 'var(--color-text)',
              marginBottom: 'var(--space-6)',
            }}
          >
            Your project has a story.
            <br />
            <span style={{ color: 'var(--color-accent)' }}>See it.</span>
          </motion.h1>

          <motion.p
            {...motionProps(reduced, 0.3)}
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.65,
              maxWidth: '46ch',
              marginBottom: 'var(--space-8)',
            }}
          >
            TRACE connects the decisions, changes, and releases behind your
            work into one clear timeline.
          </motion.p>

          <motion.div
            {...motionProps(reduced, 0.42)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-6)',
              flexWrap: 'wrap',
            }}
          >
            <PrimaryButton href="#timeline">Explore the timeline</PrimaryButton>
            <SecondaryLink href="#how-it-works">See how it works</SecondaryLink>
          </motion.div>
        </div>

        {/* ─── Product Visualization ───────────────────────────────── */}
        <motion.div
          {...motionProps(reduced, 0.58, 10)}
          style={{ paddingBottom: 'var(--space-20)' }}
          id="timeline"
        >
          {/* Desktop — horizontal timeline */}
          <div
            className="hidden md:block"
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}
          >
            <PanelHeader />

            <div style={{ padding: '32px 28px 0', backgroundColor: 'var(--color-bg)' }}>
              {/* Events + connector line */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
                {/* Connector line sits behind all dots */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '4px',
                    left: 0,
                    right: 0,
                    height: '1px',
                    backgroundColor: 'var(--color-border)',
                  }}
                />
                {EVENTS.map((event) => (
                  <TimelineEvent
                    key={event.id}
                    event={event}
                    isActive={activeId === event.id}
                    isQuiet={activeId !== null && activeId !== event.id}
                    onHover={() => setActiveId(event.id)}
                    onLeave={() => setActiveId(null)}
                  />
                ))}
              </div>

              {/* Context detail row — fixed height prevents layout shift */}
              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '14px',
                  paddingBottom: '14px',
                  borderTop: '1px solid var(--color-border)',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AnimatePresence mode="wait">
                  {activeEvent ? (
                    <motion.p
                      key={activeEvent.id}
                      initial={reduced ? false : { opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text)',
                        margin: 0,
                      }}
                    >
                      {activeEvent.detail}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="idle"
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-faint)',
                        margin: 0,
                      }}
                    >
                      Hover an event to see context
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile — vertical timeline */}
          <div
            className="block md:hidden"
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}
          >
            <PanelHeader />

            <div style={{ padding: '20px 16px 24px', backgroundColor: 'var(--color-bg)' }}>
              {EVENTS.map((event, index) => (
                <div key={event.id} style={{ display: 'flex', gap: '14px' }}>
                  {/* Left column: dot + connector line */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        flexShrink: 0,
                        border: '1.5px solid var(--color-border-strong)',
                        backgroundColor: 'transparent',
                        marginTop: '3px',
                      }}
                    />
                    {index < EVENTS.length - 1 && (
                      <div
                        aria-hidden="true"
                        style={{
                          flex: 1,
                          width: '1px',
                          backgroundColor: 'var(--color-border)',
                          marginTop: '5px',
                        }}
                      />
                    )}
                  </div>

                  {/* Right column: text */}
                  <div style={{ paddingBottom: index < EVENTS.length - 1 ? '18px' : 0 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text)',
                        marginBottom: '4px',
                      }}
                    >
                      {event.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        color: 'var(--color-text-faint)',
                      }}
                    >
                      {event.date} · {event.meta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

/* ─── Small internal components ───────────────────────────────── */

function PanelHeader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-subtle)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
        }}
      >
        Project / Nova
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-faint)',
        }}
      >
        Jan – Feb 2025
      </span>
    </div>
  )
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-muted)',
        transition: 'color var(--duration-fast) ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
    >
      {children}
    </a>
  )
}

function OpenButton() {
  return (
    <a
      href="#open"
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        color: 'var(--color-text)',
        padding: '6px 16px',
        border: '1px solid var(--color-border-strong)',
        borderRadius: 'var(--radius-button)',
        transition:
          'border-color var(--duration-fast) ease, background-color var(--duration-fast) ease',
        whiteSpace: 'nowrap',
        display: 'inline-block',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-text)'
        e.currentTarget.style.backgroundColor = 'var(--color-bg-muted)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      Open TRACE
    </a>
  )
}

function PrimaryButton({ href, children }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        color: 'hsl(36, 14%, 97%)',
        backgroundColor: 'var(--color-accent)',
        padding: '10px 22px',
        borderRadius: 'var(--radius-button)',
        transition: 'background-color var(--duration-fast) var(--ease-out)',
        whiteSpace: 'nowrap',
        display: 'inline-block',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
    >
      {children}
    </a>
  )
}

function SecondaryLink({ href, children }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-muted)',
        transition: 'color var(--duration-fast) ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
    >
      {children} →
    </a>
  )
}
