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
    >
      <defs>
        <clipPath id="lipstick-clip" clipPathUnits="objectBoundingBox">
          <path d="m17 2q-15-4-17 10 2 8 13 12 11-10 4-22z" />
        </clipPath>

        <filter id="lipstick-bg-blur" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.05"
            numOctaves="2"
            result="turbulence"
            seed="2">
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G">
          </feDisplacementMap>
        </filter>

        <filter id="turbulence-displacement"
                x="0" y="0"
                width="100%" height="100%">
          <feTurbulence type="turbulence"
                        baseFrequency="0.05"
                        numOctaves="2"
                        result="noise" />
          <feDisplacementMap in="SourceGraphic"
                              in2="noise"
                              scale="20"
                              xChannelSelector="R"
                              yChannelSelector="G" />
        </filter>

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
      </defs>
    </svg>
    <div className="glass-div"></div>
  </div>
);

export default LipstickBackground;
