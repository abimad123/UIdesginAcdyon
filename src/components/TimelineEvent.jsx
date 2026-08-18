export default function TimelineEvent({ event, isActive, isQuiet, onHover, onLeave }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${event.label}: ${event.date}, ${event.meta}`}
      aria-pressed={isActive}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onHover()
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        opacity: isQuiet ? 0.28 : 1,
        transition: 'opacity var(--duration-base) var(--ease-out)',
        cursor: 'pointer',
        minWidth: 0,
      }}
    >
      {/* Dot — sits on top of the connector line via z-index */}
      <div
        style={{
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          flexShrink: 0,
          border: `1.5px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
          backgroundColor: isActive ? 'var(--color-accent)' : 'var(--color-bg)',
          transition:
            'border-color var(--duration-base) var(--ease-out), background-color var(--duration-base) var(--ease-out)',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Labels */}
      <div style={{ marginTop: '16px', textAlign: 'center', minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
            transition: 'color var(--duration-base) var(--ease-out)',
            marginBottom: '5px',
          }}
        >
          {event.label}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--color-text-faint)',
            marginBottom: '2px',
          }}
        >
          {event.date}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--color-text-muted)',
          }}
        >
          {event.meta}
        </div>
      </div>
    </div>
  )
}
