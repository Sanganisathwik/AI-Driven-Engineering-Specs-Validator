"use client"

export function ProcessingAnimation() {
  return (
    <div className="relative w-32 h-32">
      {/* Outer ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" className="stroke-muted" strokeWidth="2" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className="stroke-primary"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="283"
          strokeDashoffset="70"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Middle ring */}
      <svg className="absolute inset-0 w-full h-full rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          className="stroke-primary/30"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="220"
          strokeDashoffset="50"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 50 50"
            to="0 50 50"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Inner pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 animate-pulse" />
        <div
          className="absolute w-8 h-8 rounded-full bg-primary/40 animate-ping"
          style={{ animationDuration: "1.5s" }}
        />
        <div className="absolute w-4 h-4 rounded-full bg-primary" />
      </div>
    </div>
  )
}
