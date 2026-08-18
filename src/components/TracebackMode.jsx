import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const CHAIN = [
  { id: 'research', label: 'RESEARCH / 012', delay: 0.4 },
  { id: 'decision', label: 'DECISION / 024', delay: 0.65 },
  { id: 'design', label: 'DESIGN / 031', delay: 0.9 },
  { id: 'build', label: 'BUILD / 037', delay: 1.15 },
  { id: 'release', label: 'RELEASE / 042', delay: 1.4 },
]

export default function TracebackMode({ onClose }) {
  const reduced = useReducedMotion()
  const closeBtnRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Lock body scroll while modal is open, and set focus
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  const lineVariants = {
    hidden: { opacity: 0, y: 4 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduced ? 0 : customDelay,
        duration: reduced ? 0 : 0.2,
      },
    }),
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Traceback Mode Console"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.2 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(15, 15, 17, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? false : { opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '700px',
          backgroundColor: 'hsl(220, 14%, 8%)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
          border: '1px solid hsl(220, 10%, 20%)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100%',
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
            borderBottom: '1px solid hsl(220, 10%, 20%)',
            backgroundColor: 'hsl(220, 14%, 11%)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
            }}
          >
            Traceback Mode
          </span>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Return to TRACE"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'hsl(220, 6%, 62%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              outline: 'none',
              borderRadius: 'var(--radius-sm)',
              transition: 'color var(--duration-fast) ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-bg)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'hsl(220, 6%, 62%)')}
            onFocus={(e) => {
              e.currentTarget.style.color = 'var(--color-bg)'
              e.currentTarget.style.outline = '2px solid var(--color-accent)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.color = 'hsl(220, 6%, 62%)'
              e.currentTarget.style.outline = 'none'
            }}
          >
            [ ESC ] RETURN TO TRACE
          </button>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: 'var(--space-6) var(--space-6) var(--space-10)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            lineHeight: 1.65,
            overflowY: 'auto',
          }}
        >
          {/* Step 1: Initial terminal line */}
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            style={{ color: 'hsl(220, 6%, 62%)', marginBottom: 'var(--space-6)' }}
          >
            &gt; reconstructing project history...
          </motion.div>

          {/* Step 2: Event Chain */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            {CHAIN.map((node, i) => (
              <div key={node.id}>
                {i > 0 && (
                  <motion.div
                    custom={node.delay - 0.12} // Connector appears slightly before the next node
                    initial="hidden"
                    animate="visible"
                    variants={lineVariants}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '6px',
                      color: 'hsl(220, 10%, 30%)',
                      lineHeight: 1.1,
                      paddingTop: '6px',
                      paddingBottom: '6px',
                    }}
                  >
                    <span>│</span>
                    <span>↓</span>
                  </motion.div>
                )}
                <motion.div
                  custom={node.delay}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    maxWidth: '300px',
                    color: 'var(--color-bg)',
                  }}
                >
                  <span>{node.label}</span>
                  <span style={{ color: 'var(--color-accent)' }}>✓</span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Step 3: Reconstruction Status */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <motion.div custom={1.7} initial="hidden" animate="visible" variants={lineVariants} style={{ color: 'hsl(220, 6%, 62%)' }}>
              &gt; 5 events reconstructed
            </motion.div>
            <motion.div custom={1.9} initial="hidden" animate="visible" variants={lineVariants} style={{ color: 'hsl(220, 6%, 62%)' }}>
              &gt; 4 connections resolved
            </motion.div>
            <motion.div custom={2.1} initial="hidden" animate="visible" variants={lineVariants} style={{ color: 'var(--color-accent)' }}>
              &gt; 1 context gap detected
            </motion.div>
          </div>

          {/* Step 4: Context Gap details */}
          <motion.div
            custom={2.4}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            style={{
              marginBottom: 'var(--space-8)',
              paddingTop: 'var(--space-6)',
              borderTop: '1px solid hsl(220, 10%, 20%)',
            }}
          >
            <div style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-4)' }}>
              CONTEXT GAP / 024
            </div>
            <div style={{ color: 'var(--color-bg)', marginBottom: 'var(--space-4)' }}>
              The navigation architecture changed.
            </div>
            <div style={{ color: 'hsl(220, 6%, 62%)', marginBottom: 'var(--space-4)' }}>
              The change was recorded.<br />
              The implementation was recorded.<br />
              The release was recorded.
            </div>
            <div style={{ color: 'var(--color-bg)' }}>
              The reason was not.
            </div>
          </motion.div>

          {/* Step 5: Context Recovery */}
          <div style={{ marginBottom: 'var(--space-12)' }}>
            <motion.div
              custom={3.0}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              style={{ color: 'hsl(220, 6%, 62%)', marginBottom: 'var(--space-6)' }}
            >
              &gt; attempting context recovery...
            </motion.div>
            <motion.div
              custom={3.5}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-4)' }}
            >
              ✓ CONTEXT RECOVERED
            </motion.div>
            <motion.div
              custom={3.9}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              style={{
                color: 'var(--color-bg)',
                paddingLeft: 'var(--space-4)',
                borderLeft: '2px solid var(--color-accent)',
              }}
            >
              "Mobile navigation was creating<br />
              inconsistent context between<br />
              project areas."
            </motion.div>
          </div>

          {/* Step 6: Final Message */}
          <motion.div
            custom={4.4}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)',
              fontWeight: 500,
              lineHeight: 1.25,
              color: 'var(--color-bg)',
              letterSpacing: '-0.02em',
            }}
          >
            THE WORK WAS ALWAYS THERE.<br />
            THE REASONING WASN'T.
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
