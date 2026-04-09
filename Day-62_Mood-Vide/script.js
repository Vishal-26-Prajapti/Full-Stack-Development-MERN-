const moods = [
  {
    id: "focus",
    icon: "◎",
    label: "Focus",
    sub: "Deep work mode",
    name: "Deep Focus",
    tagline: "Locked in, dialed up.",
    genre: "Lo-fi / Ambient",
    tempo: "72–90 BPM",
    energy: "Low–Mid",
    color: "#3a8fd4",
    blob1: "rgba(52,120,200,0.18)",
    blob2: "rgba(20,60,120,0.12)",
    blob3: "rgba(100,160,220,0.08)",
    iconBg: "rgba(52,152,219,0.15)",
    iconColor: "#3a8fd4",
    palette: ["#0C447C","#185FA5","#378ADD","#85B7EB","#B5D4F4"],
    artists: ["Nils Frahm","Ólafur Arnalds","Brian Eno","Tycho","Floating Points"],
    tracks: [
      { name: "Says", artist: "Nils Frahm", dur: "4:12" },
      { name: "Near Light", artist: "Ólafur Arnalds", dur: "3:48" },
      { name: "Awake", artist: "Tycho", dur: "5:21" },
      { name: "Music for Airports 1/1", artist: "Brian Eno", dur: "9:41" },
      { name: "LesAlpx", artist: "Floating Points", dur: "6:02" }
    ]
  },
  {
    id: "hype",
    icon: "⚡",
    label: "Hype",
    sub: "Maximum energy",
    name: "Full Send",
    tagline: "No ceiling, just energy.",
    genre: "Hip-Hop / EDM",
    tempo: "130–160 BPM",
    energy: "Maximum",
    color: "#d85a30",
    blob1: "rgba(220,80,30,0.18)",
    blob2: "rgba(180,50,20,0.12)",
    blob3: "rgba(240,120,60,0.08)",
    iconBg: "rgba(216,90,48,0.15)",
    iconColor: "#d85a30",
    palette: ["#4A1B0C","#993C1D","#D85A30","#F0997B","#F5C4B3"],
    artists: ["Kendrick Lamar","Travis Scott","Skrillex","Fred again..","Dom Dolla"],
    tracks: [
      { name: "HUMBLE.", artist: "Kendrick Lamar", dur: "2:57" },
      { name: "SICKO MODE", artist: "Travis Scott", dur: "5:12" },
      { name: "Rumble", artist: "Skrillex", dur: "3:41" },
      { name: "Lights again..", artist: "Fred again..", dur: "4:18" },
      { name: "Miracle Maker", artist: "Dom Dolla", dur: "5:08" }
    ]
  },
  {
    id: "chill",
    icon: "☁",
    label: "Chill",
    sub: "Soft & easy",
    name: "Sunday Ease",
    tagline: "Soft edges, warm light.",
    genre: "Neo-Soul / Indie R&B",
    tempo: "70–85 BPM",
    energy: "Low",
    color: "#1d9e75",
    blob1: "rgba(20,160,110,0.16)",
    blob2: "rgba(10,100,70,0.12)",
    blob3: "rgba(80,200,150,0.08)",
    iconBg: "rgba(29,158,117,0.15)",
    iconColor: "#1d9e75",
    palette: ["#04342C","#0F6E56","#1D9E75","#5DCAA5","#9FE1CB"],
    artists: ["Jorja Smith","Frank Ocean","Sault","Leon Bridges","Daniel Caesar"],
    tracks: [
      { name: "Blue Light", artist: "Jorja Smith", dur: "3:21" },
      { name: "Ivy", artist: "Frank Ocean", dur: "4:09" },
      { name: "Wildfires", artist: "Sault", dur: "5:03" },
      { name: "River", artist: "Leon Bridges", dur: "4:18" },
      { name: "Best Part", artist: "Daniel Caesar", dur: "3:28" }
    ]
  },
  {
    id: "sad",
    icon: "◌",
    label: "Sad",
    sub: "Introspective",
    name: "Beautiful Ache",
    tagline: "Feel it all the way through.",
    genre: "Indie Folk / Alt",
    tempo: "55–75 BPM",
    energy: "Very Low",
    color: "#7f77dd",
    blob1: "rgba(100,80,210,0.16)",
    blob2: "rgba(60,50,160,0.12)",
    blob3: "rgba(150,130,230,0.08)",
    iconBg: "rgba(127,119,221,0.15)",
    iconColor: "#7f77dd",
    palette: ["#26215C","#534AB7","#7F77DD","#AFA9EC","#CECBF6"],
    artists: ["Bon Iver","Phoebe Bridgers","Elliott Smith","Sufjan Stevens","Julien Baker"],
    tracks: [
      { name: "Holocene", artist: "Bon Iver", dur: "5:38" },
      { name: "Moon Song", artist: "Phoebe Bridgers", dur: "3:39" },
      { name: "Between the Bars", artist: "Elliott Smith", dur: "2:21" },
      { name: "Death With Dignity", artist: "Sufjan Stevens", dur: "4:06" },
      { name: "Faith Healer", artist: "Julien Baker", dur: "4:46" }
    ]
  },
  {
    id: "romantic",
    icon: "♡",
    label: "Romantic",
    sub: "Golden hour",
    name: "Golden Hour",
    tagline: "Warmth you want to stay in.",
    genre: "Jazz / Soft Pop",
    tempo: "80–100 BPM",
    energy: "Mid",
    color: "#ba7517",
    blob1: "rgba(200,130,20,0.16)",
    blob2: "rgba(160,90,10,0.12)",
    blob3: "rgba(240,160,40,0.08)",
    iconBg: "rgba(186,117,23,0.15)",
    iconColor: "#ba7517",
    palette: ["#412402","#854F0B","#BA7517","#EF9F27","#FAC775"],
    artists: ["Chet Baker","Melody Gardot","Rex Orange County","Novo Amor","Ricky Montgomery"],
    tracks: [
      { name: "Almost Blue", artist: "Chet Baker", dur: "3:03" },
      { name: "Deep Within the Corners", artist: "Melody Gardot", dur: "4:17" },
      { name: "Loving Is Easy", artist: "Rex Orange County", dur: "3:02" },
      { name: "From Gold", artist: "Novo Amor", dur: "3:29" },
      { name: "This December", artist: "Ricky Montgomery", dur: "3:58" }
    ]
  },
  {
    id: "angry",
    icon: "▲",
    label: "Angry",
    sub: "Channel the fire",
    name: "Controlled Rage",
    tagline: "Channel it, don't waste it.",
    genre: "Metal / Punk / Rap",
    tempo: "140–180 BPM",
    energy: "Intense",
    color: "#c43c3c",
    blob1: "rgba(200,40,40,0.18)",
    blob2: "rgba(140,20,20,0.12)",
    blob3: "rgba(230,80,80,0.08)",
    iconBg: "rgba(180,40,40,0.15)",
    iconColor: "#c43c3c",
    palette: ["#501313","#A32D2D","#E24B4A","#F09595","#F7C1C1"],
    artists: ["Run the Jewels","Bring Me the Horizon","Rage Against the Machine","Code Orange","Turnstile"],
    tracks: [
      { name: "Legend Has It", artist: "Run the Jewels", dur: "2:54" },
      { name: "Mantra", artist: "Bring Me the Horizon", dur: "3:30" },
      { name: "Killing in the Name", artist: "RATM", dur: "5:13" },
      { name: "Swallowing the Rabbit", artist: "Code Orange", dur: "3:01" },
      { name: "Generator", artist: "Turnstile", dur: "2:42" }
    ]
  },
  {
    id: "party",
    icon: "✦",
    label: "Party",
    sub: "Peak hours",
    name: "Main Stage",
    tagline: "Peak hours, peak life.",
    genre: "House / Afrobeats / Pop",
    tempo: "120–130 BPM",
    energy: "High",
    color: "#c44d7a",
    blob1: "rgba(200,60,120,0.16)",
    blob2: "rgba(140,30,80,0.12)",
    blob3: "rgba(230,100,150,0.08)",
    iconBg: "rgba(196,77,122,0.15)",
    iconColor: "#c44d7a",
    palette: ["#4B1528","#993556","#D4537E","#ED93B1","#F4C0D1"],
    artists: ["Burna Boy","Doja Cat","Peggy Gou","Kaytranada","Rema"],
    tracks: [
      { name: "Last Last", artist: "Burna Boy", dur: "3:36" },
      { name: "Need to Know", artist: "Doja Cat", dur: "3:34" },
      { name: "Nanana", artist: "Peggy Gou", dur: "6:01" },
      { name: "Dysfunctional", artist: "Kaytranada", dur: "3:12" },
      { name: "Calm Down", artist: "Rema", dur: "3:34" }
    ]
  },
  {
    id: "nostalgia",
    icon: "◈",
    label: "Nostalgic",
    sub: "Dreamy rewind",
    name: "Rewind",
    tagline: "Back when everything felt infinite.",
    genre: "Indie / Dream Pop / 80s",
    tempo: "90–110 BPM",
    energy: "Mid",
    color: "#888780",
    blob1: "rgba(130,130,120,0.16)",
    blob2: "rgba(80,80,75,0.12)",
    blob3: "rgba(160,160,150,0.08)",
    iconBg: "rgba(136,135,128,0.15)",
    iconColor: "#aaa9a0",
    palette: ["#2C2C2A","#5F5E5A","#888780","#B4B2A9","#D3D1C7"],
    artists: ["The Cure","Mazzy Star","Mac DeMarco","Cigarettes After Sex","Real Estate"],
    tracks: [
      { name: "Close to Me", artist: "The Cure", dur: "3:49" },
      { name: "Fade Into You", artist: "Mazzy Star", dur: "4:58" },
      { name: "Chamber of Reflection", artist: "Mac DeMarco", dur: "4:52" },
      { name: "Nothing's Gonna Hurt You", artist: "Cigarettes After Sex", dur: "4:25" },
      { name: "It's Real", artist: "Real Estate", dur: "3:19" }
    ]
  }
];

let current = null;

function setBlobs(m) {
  document.getElementById('blob1').style.background = m.blob1;
  document.getElementById('blob1').style.opacity = 1;
  document.getElementById('blob2').style.background = m.blob2;
  document.getElementById('blob2').style.opacity = 1;
  document.getElementById('blob3').style.background = m.blob3;
  document.getElementById('blob3').style.opacity = 1;
}

function clearBlobs() {
  ['blob1','blob2','blob3'].forEach(id => {
    document.getElementById(id).style.opacity = 0;
  });
}

function renderGrid() {
  document.getElementById('moodGrid').innerHTML = moods.map(m => `
    <button class="mood-btn${current === m.id ? ' active' : ''}"
      onclick="selectMood('${m.id}')"
      style="${current === m.id
        ? `background: linear-gradient(135deg, ${m.color}18 0%, ${m.color}08 100%); border-color: ${m.color}55;`
        : ''}">
      <div style="
        position: absolute; inset: 0; border-radius: 16px; opacity: 0;
        background: linear-gradient(135deg, ${m.color}15 0%, ${m.color}06 100%);
        transition: opacity 0.3s;
      " class="mood-hover-bg"></div>
      <div class="mood-icon-wrap" style="background: ${m.iconBg}; color: ${m.iconColor};">
        ${m.icon}
      </div>
      <span class="mood-label">${m.label}</span>
      <span class="mood-sub">${m.sub}</span>
    </button>
  `).join('');

  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.querySelector('.mood-hover-bg').style.opacity = 1;
    });
    btn.addEventListener('mouseleave', () => {
      btn.querySelector('.mood-hover-bg').style.opacity = 0;
    });
  });
}

function renderPanel(m) {
  document.getElementById('vibeInner').innerHTML = `
    <div class="vibe-top">
      <div class="vibe-title-block">
        <span class="vibe-genre-badge">${m.genre}</span>
        <div class="vibe-name" style="color: ${m.color};">${m.name}</div>
        <div class="vibe-tagline">${m.tagline}</div>
      </div>
      <div class="vibe-palette">
        ${m.palette.map(c => `<div class="palette-dot" style="background:${c};" title="${c}"></div>`).join('')}
      </div>
    </div>

    <div class="vibe-stats">
      <div class="stat-block">
        <span class="stat-label">Tempo</span>
        <span class="stat-val">${m.tempo}</span>
      </div>
      <div class="stat-block">
        <span class="stat-label">Energy</span>
        <span class="stat-val">${m.energy}</span>
      </div>
      <div class="stat-block">
        <span class="stat-label">Tracks</span>
        <span class="stat-val">${m.tracks.length} songs</span>
      </div>
    </div>

    <div class="vibe-body">
      <div>
        <p class="section-heading">Artists</p>
        <div class="artist-chips">
          ${m.artists.map(a => `<span class="artist-chip">${a}</span>`).join('')}
        </div>
      </div>
      <div>
        <p class="section-heading">Playlist</p>
        <div class="track-list">
          ${m.tracks.map((t, i) => `
            <div class="track-row">
              <span class="track-num">${String(i+1).padStart(2,'0')}</span>
              <div class="track-info">
                <div class="track-name">${t.name}</div>
                <div class="track-artist">${t.artist}</div>
              </div>
              <span class="track-dur">${t.dur}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function selectMood(id) {
  const panel = document.getElementById('vibePanel');
  if (current === id) {
    current = null;
    panel.classList.remove('open');
    clearBlobs();
  } else {
    current = id;
    const m = moods.find(x => x.id === id);
    renderPanel(m);
    panel.classList.add('open');
    setBlobs(m);
    setTimeout(() => {
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
  renderGrid();
}

renderGrid();