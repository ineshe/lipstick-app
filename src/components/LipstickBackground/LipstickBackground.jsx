import React from "react";
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
          <stop offset="0%" stop-color="#e681d5" stop-opacity="0.4"/>
          <stop offset="30%" stop-color="#e681d5" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#e681d5" stop-opacity="0"/>
        </radialGradient>

        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />

          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>

          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lighting-color="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>

          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="150"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="spotlight">
          <feFlood
            result="floodFill"
            x="0"
            y="0"
            width="100%"
            height="100%"
            flood-color="black"
            flood-opacity="1" />
          <feBlend in="SourceGraphic" in2="floodFill" mode="screen" />
        </filter>
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
