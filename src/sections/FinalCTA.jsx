import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export default function FinalCTA() {
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()

  return (
    <section
      style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: 'var(--space-32)',
        paddingBottom: 'var(--space-32)',
      }}
    >
      <div className="container">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={reduced ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-6)',
              maxWidth: '18ch',
            }}
          >
            Understand what you built.
          </h2>

          <p
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.65,
              maxWidth: '50ch',
              marginBottom: 'var(--space-10)',
            }}
          >
            Keep the decisions, changes, and releases connected — from the
            first idea to the final release.
          </p>

          <a
            href="#timeline"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body-lg)',
              fontWeight: 500,
              color: 'var(--color-accent)',
              gap: '0.35em',
              textDecoration: 'none',
              transition: 'color var(--duration-fast) ease',
            }}
          >
            Explore TRACE
            <motion.span
              aria-hidden="true"
              animate={{ x: reduced ? 0 : (hovered ? 6 : 0) }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{ display: 'inline-block', lineHeight: 1 }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
