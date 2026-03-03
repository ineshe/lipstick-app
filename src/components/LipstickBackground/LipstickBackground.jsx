import "./LipstickBackground.css";

const LipstickBackground = () => (
  <div className="lipstick-bg-container">
    <svg
      className="lipstick-bg-svg"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMinYMin slice"
    >
      <defs>
        <radialGradient id="RadialGradient">
            <stop offset="0%" stopColor="#f5738f" stopOpacity="0.4"/>
            <stop offset="30%" stopColor="#f5738f" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#f5738f" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <rect
        x="-5"
        y="-10"
        width="25"
        height="25" 
        fill="url(#RadialGradient)"
      />
    </svg>
  </div>
);

export default LipstickBackground;
