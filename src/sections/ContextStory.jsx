import { Fragment } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/* ─── Chain data ───────────────────────────────────────────────────
   Internal fictional data for the TRACE context chain demo.
   These events are not real customer data or project metrics.
─────────────────────────────────────────────────────────────────── */
const CHAIN = [
  {
    id: 'decision',
    type: 'Decision',
    ref: '024',
    date: 'Jan 14, 2026',
    description: 'Navigation architecture changed to a context-first model.',
  },
  {
    id: 'design',
    type: 'Design',
    ref: '031',
    date: 'Jan 22, 2026',
    description: 'Navigation system refined and component library updated.',
  },
  {
    id: 'build',
    type: 'Build',
    ref: '037',
    date: 'Jan 29, 2026',
    description: 'New navigation implementation merged. 24 commits.',
  },
  {
    id: 'release',
    type: 'Release',
    ref: '042',
    date: 'Feb 03, 2026',
    description: 'Version 2.4 shipped with consolidated project context.',
  },
]

/* ─── Animation helpers ─────────────────────────────────────────── */

function fadeUp(reduced, delay = 0) {
  return {
    initial: reduced ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: reduced
      ? { duration: 0 }
      : { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
  }
}

function revealConnector(reduced) {
  return {
    initial: reduced ? false : { scaleY: 0 },
    whileInView: { scaleY: 1 },
    viewport: { once: true, margin: '-20px' },
    transition: reduced
      ? { duration: 0 }
      : { duration: 0.4, ease: 'easeOut', delay: 0.18 },
  }
}

/* ─── Section ───────────────────────────────────────────────────── */

export default function ContextStory() {
  const reduced = useReducedMotion()

  return (
    <section
      id="philosophy"
      style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)',
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">
          
          {/* ── LEFT: Editorial statement ──────────────────────── */}
          <div className="md:col-span-5 md:col-start-1">
            <motion.div
              {...fadeUp(reduced)}
            >
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
                Why TRACE
              </p>

              <h2
                style={{
                  fontSize: 'var(--text-headline)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.12,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                The work isn't missing.
                <br />
                The context is.
              </h2>

              <p
                style={{
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.65,
                }}
              >
                Projects accumulate decisions, changes, and releases faster than
                anyone can remember them. TRACE keeps the reasoning connected to
                the work.
              </p>
            </motion.div>

            {/* ── Closing remark (moved to left column) ──────────── */}
            <motion.p
              {...fadeUp(reduced, 0.2)}
              style={{
                marginTop: 'var(--space-12)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-faint)',
                lineHeight: 1.7,
                borderTop: '1px solid var(--color-border)',
                paddingTop: 'var(--space-6)',
              }}
            >
              Each event in TRACE carries the context of what preceded it.
              A release is traceable to the decision that started it.
            </motion.p>
          </div>

          {/* ── RIGHT: Connection chain ──────────────────────────── */}
          <div
            className="md:col-span-6 md:col-start-7"
            role="list"
            aria-label="Project context chain"
          >
            {CHAIN.map((event, index) => {
              const isLast = index === CHAIN.length - 1

              return (
                <Fragment key={event.id}>
                  {/* ── Event ── */}
                  <motion.div
                    role="listitem"
                    {...fadeUp(reduced, index * 0.08)}
                    style={{ display: 'flex', gap: 'var(--space-5)' }}
                  >
                    {/* Left column: dot */}
                    <div
                      aria-hidden="true"
                      style={{
                        width: '20px',
                        flexShrink: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '4px',
                      }}
                    >
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          border: '1.5px solid var(--color-border-strong)',
                          backgroundColor: 'transparent',
                          flexShrink: 0,
                        }}
                      />
                    </div>

                    {/* Right column: content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--color-accent)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        {event.type} / {event.ref}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-text-faint)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        {event.date}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text-muted)',
                          lineHeight: 1.6,
                        }}
                      >
                        {event.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* ── Connector ── */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      style={{
                        display: 'flex',
                        gap: 'var(--space-5)',
                        padding: 'var(--space-2) 0',
                      }}
                    >
                      {/* Aligns with the dot column */}
                      <div
                        style={{
                          width: '20px',
                          flexShrink: 0,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <motion.div
                          {...revealConnector(reduced)}
                          style={{
                            width: '1px',
                            height: '36px',
                            backgroundColor: 'var(--color-border)',
                            transformOrigin: 'top',
                          }}
                        />
                      </div>
                      {/* Empty right side to preserve the two-column structure */}
                      <div />
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
