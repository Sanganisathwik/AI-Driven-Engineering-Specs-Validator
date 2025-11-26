export function EngineeringIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-md">
      {/* Grid pattern background */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#grid)" className="text-muted-foreground" />

      {/* Central document */}
      <rect x="140" y="60" width="120" height="150" rx="4" className="fill-card stroke-border" strokeWidth="2" />
      <rect x="155" y="80" width="60" height="4" rx="2" className="fill-muted" />
      <rect x="155" y="92" width="90" height="3" rx="1.5" className="fill-muted" />
      <rect x="155" y="102" width="75" height="3" rx="1.5" className="fill-muted" />
      <rect x="155" y="112" width="85" height="3" rx="1.5" className="fill-muted" />
      <rect
        x="155"
        y="130"
        width="90"
        height="40"
        rx="2"
        className="fill-primary/10 stroke-primary/30"
        strokeWidth="1"
      />

      {/* AI processing indicator */}
      <circle cx="200" cy="150" r="12" className="fill-primary/20 stroke-primary" strokeWidth="2">
        <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="150" r="6" className="fill-primary" />

      {/* Connection lines to nodes */}
      <path d="M200 165 L200 200 L120 240" className="stroke-primary/40" strokeWidth="1.5" strokeDasharray="4 2" />
      <path d="M200 165 L200 200 L200 240" className="stroke-primary/40" strokeWidth="1.5" strokeDasharray="4 2" />
      <path d="M200 165 L200 200 L280 240" className="stroke-primary/40" strokeWidth="1.5" strokeDasharray="4 2" />

      {/* Result nodes */}
      <circle cx="120" cy="250" r="16" className="fill-success/20 stroke-success" strokeWidth="2" />
      <path
        d="M114 250 L118 254 L126 246"
        className="stroke-success"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="200" cy="250" r="16" className="fill-warning/20 stroke-warning" strokeWidth="2" />
      <path d="M200 244 L200 252 M200 256 L200 256" className="stroke-warning" strokeWidth="2" strokeLinecap="round" />

      <circle cx="280" cy="250" r="16" className="fill-primary/20 stroke-primary" strokeWidth="2" />
      <rect x="292" y="244" width="12" height="12" rx="2" className="fill-none stroke-primary" strokeWidth="1.5" />

      {/* Floating elements */}
      <rect x="50" y="100" width="50" height="35" rx="3" className="fill-card stroke-border" strokeWidth="1">
        <animate attributeName="y" values="100;95;100" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x="58" y="108" width="30" height="2" rx="1" className="fill-muted" />
      <rect x="58" y="114" width="35" height="2" rx="1" className="fill-muted" />
      <rect x="58" y="120" width="25" height="2" rx="1" className="fill-muted" />

      <rect x="300" y="90" width="50" height="35" rx="3" className="fill-card stroke-border" strokeWidth="1">
        <animate attributeName="y" values="90;85;90" dur="3.5s" repeatCount="indefinite" />
      </rect>
      <rect x="308" y="98" width="30" height="2" rx="1" className="fill-muted" />
      <rect x="308" y="104" width="35" height="2" rx="1" className="fill-muted" />
      <rect x="308" y="110" width="25" height="2" rx="1" className="fill-muted" />
    </svg>
  )
}
