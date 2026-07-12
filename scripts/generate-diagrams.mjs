import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const slugs = [
  "grip-5",
  "tolqyn",
  "moodflix",
  "naeonair-wisdrone",
  "intellichair",
  "buildin",
  "ikumplay",
  "roastivator",
  "dsnsim",
  "aura",
  "learning-structures",
];

const labels = {
  "grip-5": "Input → Process → Transport → Servos",
  "tolqyn": "Audio · Camera · Gyro → Generative Output",
  "moodflix": "Face · Audio · Model → Recommend",
  "naeonair-wisdrone": "ESP32 → Gateway → Frontend",
  "intellichair": "Load Cells · IMU → Metrics → Feedback",
  "buildin": "Wi-Fi → GitHub API → LED States",
  "ikumplay": "Search → Acquire → Separate → Playback",
  "roastivator": "Username → Rules → Roasting Output",
  "dsnsim": "Serial Mode → RF Link → Feedback",
  "aura": "NFC · Weight → Context → Proposed Actions",
  "learning-structures": "Queues · Trees · Linked-Lists",
};

for (const slug of slugs) {
  const dir = join("public", "projects", slug);
  mkdirSync(dir, { recursive: true });
  const label = labels[slug] ?? slug;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="System diagram">
  <rect width="640" height="360" fill="#0d0f13"/>
  <rect x="24" y="24" width="592" height="312" rx="8" fill="#12141a" stroke="#292c33"/>
  <text x="320" y="56" fill="#92959d" font-family="monospace" font-size="12" text-anchor="middle">SYSTEM DIAGRAM</text>
  <line x1="48" y1="72" x2="592" y2="72" stroke="#3b3f49"/>
  <rect x="80" y="140" width="120" height="56" rx="6" fill="#181b22" stroke="#ff6b35"/>
  <rect x="260" y="140" width="120" height="56" rx="6" fill="#181b22" stroke="#7357d8"/>
  <rect x="440" y="140" width="120" height="56" rx="6" fill="#181b22" stroke="#292c33"/>
  <line x1="200" y1="168" x2="260" y2="168" stroke="#7357d8" stroke-width="2"/>
  <line x1="380" y1="168" x2="440" y2="168" stroke="#ff6b35" stroke-width="2"/>
  <text x="320" y="260" fill="#c8c7c2" font-family="sans-serif" font-size="14" text-anchor="middle">${label}</text>
  <text x="320" y="290" fill="#92959d" font-family="monospace" font-size="11" text-anchor="middle">${slug}</text>
</svg>`;
  writeFileSync(join(dir, "system-diagram.svg"), svg, "utf8");
}

console.log(`Generated ${slugs.length} diagrams.`);
