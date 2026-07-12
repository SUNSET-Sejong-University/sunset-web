import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050607",
        }}
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
          <rect x="9" y="9" width="14" height="14" rx="1.5" stroke="#d97a4d" strokeWidth="1.6" />
          <circle cx="16" cy="16" r="2.6" fill="#9fffa3" />
          <path
            d="M9 13H4M9 19H4M28 13H23M28 19H23M13 9V4M19 9V4M13 28V23M19 28V23"
            stroke="#3a4a3f"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
