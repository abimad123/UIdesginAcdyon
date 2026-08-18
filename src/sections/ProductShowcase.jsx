import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

/* ─── Demo data ───────────────────────────────────────────────────
   Internal fictional data for the TRACE product demo.
   Not customer statistics. Not real project metrics.
─────────────────────────────────────────────────────────────────── */
const EVENTS = [
  {
    id: 'research',
    type: 'Research',
    ref: '018',
    date: 'Jan 08, 2026',
    shortDate: 'Jan 08',
    shortMeta: '14 notes',
    title: 'User research completed',
    why: 'Initial discovery revealed navigation fragmentation across six product areas, creating context loss at handoff.',
    related: [
      { count: 14, label: 'research notes' },
      { count: 2,  label: 'decisions informed' },
    ],
  },
  {
    id: 'decision',
    type: 'Decision',
    ref: '024',
    date: 'Jan 14, 2026',
    shortDate: 'Jan 14',
    shortMeta: 'Navigation',
    title: 'Changed navigation architecture',
    why: 'The mobile navigation was creating inconsistent context between project areas.',
    related: [
      { count: 8,  label: 'design changes' },
      { count: 14, label: 'implementation changes' },
      { count: 1,  label: 'release' },
    ],
  },
  {
    id: 'design',
    type: 'Design',
    ref: '031',
    date: 'Jan 22, 2026',
    shortDate: 'Jan 22',
    shortMeta: '8 changes',
    title: 'Navigation system refined',
    why: 'The new structure reduced repeated navigation patterns across the workspace.',
    related: [
      { count: 8, label: 'design changes' },
      { count: 3, label: 'decisions' },
      { count: 1, label: 'implementation branch' },
    ],
  },
  {
    id: 'build',
    type: 'Build',
    ref: '038',
    date: 'Jan 29, 2026',
    shortDate: 'Jan 29',
    shortMeta: '24 commits',
    title: 'Core implementation complete',
    why: 'All navigation components rebuilt to reflect the new context-first architecture.',
    related: [
      { count: 24, label: 'commits' },
      { count: 8,  label: 'design changes' },
      { count: 3,  label: 'decisions' },
    ],
  },
  {
    id: 'release',
    type: 'Release',
    ref: '042',
    date: 'Feb 03, 2026',
    shortDate: 'Feb 03',
    shortMeta: 'v2.4',
    title: 'Version 2.4 shipped',
    why: 'Navigation architecture and project context were consolidated into the new release.',
    related: [
      { count: 1,  label: 'release' },
      { count: 24, label: 'implementation changes' },
      { count: 3,  label: 'decisions' },
    ],
  },
]

const SIDEBAR_NAV = ['Overview', 'Timeline', 'Decisions', 'Changes', 'Releases']

/* ─── Section ─────────────────────────────────────────────────── */

export default function ProductShowcase() {
  const [selectedId, setSelectedId] = useState('decision')
  const reduced = useReducedMotion()
  const selectedEvent = EVENTS.find((e) => e.id === selectedId)

  return (
    <section
      id="product"
      style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)',
      }}
    >
      <div className="container">

        {/* Section header */}
        <header style={{ marginBottom: 'var(--space-12)' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-4)',
            }}
          >
            The Workspace
          </p>
          <h2
            style={{
              fontSize: 'var(--text-headline)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Context, without the archaeology.
          </h2>
          <p
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.65,
              maxWidth: '52ch',
            }}
          >
            TRACE brings decisions, changes, and releases into one place, so
            the reasoning behind a project stays close to the work.
          </p>
        </header>

        {/* ── Application frame ─────────────────────────────── */}
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-bg)',
            boxShadow: 'var(--shadow-base)',
          }}
        >
          {/* App top bar */}
          <AppTopBar />

          {/* App body */}
          <div style={{ display: 'flex' }}>

            {/* Sidebar — desktop only */}
            <aside
              className="hidden md:flex"
              style={{
                flexDirection: 'column',
                width: '160px',
                flexShrink: 0,
                borderRight: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-subtle)',
                paddingTop: 'var(--space-5)',
              }}
            >
              <div
                style={{
                  padding: '0 16px 12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  borderBottom: '1px solid var(--color-border)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Nova
              </div>
              {SIDEBAR_NAV.map((item) => {
                const isActive = item === 'Timeline'
                return (
                  <div
                    key={item}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '7px 16px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: isActive ? 500 : 400,
                      color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                      backgroundColor: isActive ? 'var(--color-bg-muted)' : 'transparent',
                      borderLeft: isActive
                        ? '2px solid var(--color-accent)'
                        : '2px solid transparent',
                    }}
                  >
                    {item}
                  </div>
                )
              })}
            </aside>

            {/* Main content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

              {/* Timeline area */}
              <div
                style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {/* Mobile-only breadcrumb */}
                <p
                  className="block md:hidden"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-faint)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  Nova / Timeline
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    marginBottom: '20px',
                  }}
                >
                  Project Timeline
                </p>

                {/* Desktop: horizontal */}
                <div className="hidden md:block">
                  <HorizontalTimeline
                    events={EVENTS}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                </div>

                {/* Mobile: vertical */}
                <div className="block md:hidden">
                  <VerticalTimeline
                    events={EVENTS}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                </div>
              </div>

              {/* Detail panel */}
              <div style={{ padding: '20px 24px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedId}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}
                  >
                    <EventDetail event={selectedEvent} />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ─── App top bar ─────────────────────────────────────────────── */

function AppTopBar() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '44px',
        padding: '0 20px',
        backgroundColor: 'var(--color-bg-subtle)',
        borderBottom: '1px solid var(--color-border)',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-text)',
        }}
      >
        TRACE
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.04em',
        }}
      >
        Nova / Product
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--color-text-faint)',
        }}
      >
        In progress
      </span>
    </div>
  )
}

/* ─── Desktop horizontal timeline ─────────────────────────────── */

function HorizontalTimeline({ events, selectedId, onSelect }) {
  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}
      role="group"
      aria-label="Project timeline"
    >
      {/* Connector line — sits behind all dots */}
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

      {events.map((event) => {
        const isSelected = event.id === selectedId
        return (
          <button
            key={event.id}
            onClick={() => onSelect(event.id)}
            aria-pressed={isSelected}
            aria-label={`${event.type}: ${event.shortDate}, ${event.shortMeta}`}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0 4px',
              minWidth: 0,
            }}
          >
            {/* Dot */}
            <div
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
                border: `1.5px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
                backgroundColor: isSelected ? 'var(--color-accent)' : 'var(--color-bg)',
                transition:
                  'border-color var(--duration-base) var(--ease-out), background-color var(--duration-base) var(--ease-out)',
              }}
            />
            {/* Labels */}
            <div style={{ marginTop: '12px', textAlign: 'center', minWidth: 0, width: '100%' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  fontWeight: isSelected ? 600 : 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isSelected ? 'var(--color-accent)' : 'var(--color-text)',
                  transition: 'color var(--duration-base) var(--ease-out)',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                {event.type}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  color: 'var(--color-text-faint)',
                  marginBottom: '2px',
                }}
              >
                {event.shortDate}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  color: 'var(--color-text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {event.shortMeta}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

/* ─── Mobile vertical timeline ────────────────────────────────── */

function VerticalTimeline({ events, selectedId, onSelect }) {
  return (
    <div role="group" aria-label="Project timeline">
      {events.map((event, index) => {
        const isSelected = event.id === selectedId
        const isLast = index === events.length - 1
        return (
          <div key={event.id} style={{ display: 'flex', gap: '12px' }}>
            {/* Left: dot + connector */}
            <div
              aria-hidden="true"
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
                  marginTop: '4px',
                  border: `1.5px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
                  backgroundColor: isSelected ? 'var(--color-accent)' : 'transparent',
                  transition:
                    'border-color var(--duration-base) ease, background-color var(--duration-base) ease',
                }}
              />
              {!isLast && (
                <div
                  style={{
                    flex: 1,
                    width: '1px',
                    backgroundColor: 'var(--color-border)',
                    marginTop: '5px',
                  }}
                />
              )}
            </div>

            {/* Right: button */}
            <button
              onClick={() => onSelect(event.id)}
              aria-pressed={isSelected}
              aria-label={`${event.type}: ${event.shortDate}, ${event.shortMeta}`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: 0,
                paddingBottom: !isLast ? '14px' : 0,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isSelected ? 'var(--color-accent)' : 'var(--color-text)',
                  marginBottom: '3px',
                  transition: 'color var(--duration-base) ease',
                }}
              >
                {event.type}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--color-text-faint)',
                }}
              >
                {event.shortDate} · {event.shortMeta}
              </div>
            </button>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Event detail panel ──────────────────────────────────────── */

function EventDetail({ event }) {
  if (!event) return null

  return (
    <div>
      {/* Type / ref */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-3)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}
        >
          {event.type}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-border-strong)',
          }}
        >
          /
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-faint)',
          }}
        >
          {event.ref}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-title)',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-2)',
        }}
      >
        {event.title}
      </h3>

      {/* Date */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-faint)',
          marginBottom: 'var(--space-5)',
        }}
      >
        {event.date}
      </p>

      {/* Why it changed */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-2)',
          }}
        >
          Why it changed
        </p>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.65,
            fontStyle: 'italic',
          }}
        >
          "{event.why}"
        </p>
      </div>

      {/* Related context */}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-3)',
          }}
        >
          Related context
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {event.related.map((item) => (
            <div
              key={item.label}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  minWidth: '28px',
                }}
              >
                {item.count}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-faint)',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
