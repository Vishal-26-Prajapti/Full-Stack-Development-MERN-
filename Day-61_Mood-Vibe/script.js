const moods = [
  { icon: "◎", label: "Focus", sub: "Deep work mode", color: "#3a8fd4" },
  { icon: "⚡", label: "Hype", sub: "Maximum energy", color: "#d85a30" },
  { icon: "☁", label: "Chill", sub: "Soft & easy", color: "#1d9e75" },
  { icon: "◌", label: "Sad", sub: "Introspective", color: "#7f77dd" },
  { icon: "♡", label: "Romantic", sub: "Golden hour", color: "#ba7517" },
  { icon: "▲", label: "Angry", sub: "Channel the fire", color: "#c43c3c" },
  { icon: "✦", label: "Party", sub: "Peak hours", color: "#c44d7a" },
  { icon: "◈", label: "Nostalgic", sub: "Dreamy rewind", color: "#888780" },
];

function renderGrid() {
  const grid = document.getElementById("moodGrid");

  grid.innerHTML = moods
    .map(
      (m) => `
    <div class="mood-btn">
      <div class="mood-icon-wrap"
        style="background:${m.color}20; color:${m.color};">
        ${m.icon}
      </div>
      <span class="mood-label">${m.label}</span>
      <span class="mood-sub">${m.sub}</span>
    </div>
  `,
    )
    .join("");
}

renderGrid();
