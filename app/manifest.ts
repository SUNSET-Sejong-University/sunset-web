import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SUNSET",
    short_name: "SUNSET",
    description: "Student-built systems after sunset",
    start_url: "/en",
    display: "standalone",
    background_color: "#08090c",
    theme_color: "#08090c",
    lang: "en",
  };
}
