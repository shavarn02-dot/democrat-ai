#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/public/media/frames" "$ROOT/public/media"

curl -L --fail --silent --show-error \
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=82' \
  -o "$ROOT/public/media/analytics-screen.jpg"
curl -L --fail --silent --show-error \
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82' \
  -o "$ROOT/public/media/studio-workspace.jpg"

for i in $(seq -w 0 59); do
  n=$((10#$i))
  angle=$((n * 3))
  cat > "$ROOT/public/media/frames/frame-$i.svg" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0b0b"/>
      <stop offset="0.55" stop-color="#17120f"/>
      <stop offset="1" stop-color="#080808"/>
    </linearGradient>
    <radialGradient id="glow" cx="${angle}%" cy="35%" r="55%">
      <stop offset="0" stop-color="#ff694d" stop-opacity="0.85"/>
      <stop offset="0.28" stop-color="#b33221" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#0b0b0b" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="42"/></filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <circle cx="$((200 + n * 11))" cy="230" r="280" fill="url(#glow)" filter="url(#blur)"/>
  <path d="M-80 580 C 230 $((400 + n * 2)) 360 $((760 - n * 2)) 700 560 S 1100 $((370 + n * 2)) 1380 520" fill="none" stroke="#ff6b4f" stroke-opacity=".32" stroke-width="2"/>
  <path d="M-60 620 C 260 $((440 + n * 2)) 430 $((820 - n * 2)) 760 600 S 1120 $((410 + n * 2)) 1360 560" fill="none" stroke="#f5f3ed" stroke-opacity=".12" stroke-width="1"/>
  <g fill="#f5f3ed" fill-opacity=".7"><circle cx="910" cy="180" r="3"/><circle cx="1060" cy="280" r="2"/><circle cx="760" cy="120" r="2"/></g>
</svg>
SVG
done

ffmpeg -y -hide_banner -loglevel error -framerate 12 -i "$ROOT/public/media/frames/frame-%02d.svg" \
  -vf 'format=yuv420p,scale=1280:-2' -t 5 -movflags +faststart "$ROOT/public/media/editorial-pulse.mp4"
rm -rf "$ROOT/public/media/frames"
printf 'Created local media assets in public/media\n'
