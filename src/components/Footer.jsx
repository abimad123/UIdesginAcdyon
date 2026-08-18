const NAV_LINKS = [
  { label: 'Product',    href: '#product'    },
  { label: 'Timeline',   href: '#timeline'   },
  { label: 'Philosophy', href: '#philosophy' },
]

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: 'var(--space-10)',
        paddingBottom: 'var(--space-10)',
      }}
    >
      <div className="container">

        {/* Main row */}
        <div
          className="flex flex-col md:flex-row md:justify-between md:items-start"
          style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }}
        >
          {/* Left: wordmark + tagline */}
          <div>
            {/*
              id="trace-wordmark-footer" — reserved anchor point.
              Can be used as an Easter egg trigger in a future step.
            */}
            <span
              id="trace-wordmark-footer"
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-text)',
                marginBottom: 'var(--space-2)',
                userSelect: 'none',
              }}
            >
              TRACE
            </span>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-faint)',
                letterSpacing: '0.02em',
              }}
            >
              Project context, connected.
            </p>
          </div>

          {/* Right: page navigation */}
          <nav aria-label="Footer navigation">
            <ul
              className="flex flex-col md:flex-row"
              style={{
                listStyle: 'none',
                gap: 'var(--space-4)',
                padding: 0,
                margin: 0,
              }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
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
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: 'var(--space-6)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-faint)',
              letterSpacing: '0.02em',
            }}
          >
            AcDyOn Frontend Challenge · Concept product
          </p>
        </div>

      </div>
    </footer>
  )
}
