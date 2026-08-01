'use strict';
/*
  CounterWeb GSI relay server
  ---------------------------
  Принимает POST от Dota 2 Game State Integration и рассылает
  пики драфта всем подключённым вкладкам сайта через SSE.

  Запуск:   node gsi-server.js [порт]     (по умолчанию 8765)
  Сайт:     подключится к http://127.0.0.1:8765/events автоматически
  Dota cfg: uri "http://127.0.0.1:8765/"
*/
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = parseInt(process.argv[2] || process.env.PORT || '8765', 10);

const CFG_FILENAME = 'gamestate_integration_counterweb.cfg';
const CFG_CONTENT = [
  '"CounterWeb"',
  '{',
  '\t"uri"\t\t"http://127.0.0.1:' + PORT + '/"',
  '\t"timeout"\t"5.0"',
  '\t"buffer"\t\t"0.1"',
  '\t"throttle"\t"0.1"',
  '\t"heartbeat"\t"30.0"',
  '\t"data"',
  '\t{',
  '\t\t"provider"\t"1"',
  '\t\t"map"\t\t"1"',
  '\t\t"player"\t\t"1"',
  '\t\t"hero"\t\t"1"',
  '\t\t"draft"\t\t"1"',
  '\t}',
  '}',
  ''
].join('\n');

/* Автоустановка cfg в папку Dota 2 (gamestate_integration). */
function findDotaCfgDir() {
  const candidates = [];
  try {
    const steamPath = execSync('reg query "HKCU\\Software\\Valve\\Steam" /v SteamPath', { encoding: 'utf8', windowsHide: true })
      .split('\n').map(l => l.trim()).find(l => l && l.includes('SteamPath'));
    if (steamPath) {
      const m = steamPath.match(/SteamPath\s+REG_SZ\s+(.+)/i);
      if (m) candidates.push(path.join(m[1].trim(), 'steamapps', 'common', 'dota 2 beta', 'game', 'dota', 'cfg', 'gamestate_integration'));
    }
  } catch (e) {}
  [
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\dota 2 beta\\game\\dota\\cfg\\gamestate_integration',
    'C:\\Program Files\\Steam\\steamapps\\common\\dota 2 beta\\game\\dota\\cfg\\gamestate_integration',
    'D:\\Steam\\steamapps\\common\\dota 2 beta\\game\\dota\\cfg\\gamestate_integration',
    'D:\\SteamLibrary\\steamapps\\common\\dota 2 beta\\game\\dota\\cfg\\gamestate_integration',
    'E:\\Steam\\steamapps\\common\\dota 2 beta\\game\\dota\\cfg\\gamestate_integration',
    'E:\\SteamLibrary\\steamapps\\common\\dota 2 beta\\game\\dota\\cfg\\gamestate_integration'
  ].forEach(p => { if (fs.existsSync(p)) candidates.push(p); });
  return candidates.find(c => fs.existsSync(c)) || null;
}

function autoInstallCfg() {
  const dir = findDotaCfgDir();
  if (!dir) {
    console.log('[CounterWeb GSI] Папка Dota 2 не найдена — установите cfg вручную:\n    ' + CFG_FILENAME);
    return false;
  }
  const target = path.join(dir, CFG_FILENAME);
  const exists = fs.existsSync(target);
  if (exists) {
    const cur = fs.readFileSync(target, 'utf8');
    if (cur.indexOf('127.0.0.1:' + PORT) !== -1) {
      console.log('[CounterWeb GSI] cfg уже установлен: ' + target);
      return true;
    }
  }
  try {
    fs.writeFileSync(target, CFG_CONTENT, 'utf8');
    console.log('[CounterWeb GSI] cfg установлен: ' + target);
    return true;
  } catch (e) {
    console.log('[CounterWeb GSI] не удалось записать cfg: ' + e.message);
    return false;
  }
}


const GSI_IDS = {1:"Anti-Mage",2:"Axe",3:"Bane",4:"Bloodseeker",5:"Crystal Maiden",6:"Drow Ranger",7:"Earthshaker",8:"Juggernaut",9:"Mirana",10:"Morphling",11:"Shadow Fiend",12:"Phantom Lancer",13:"Puck",14:"Pudge",15:"Razor",16:"Sand King",17:"Storm Spirit",18:"Sven",19:"Tiny",20:"Vengeful Spirit",21:"Windranger",22:"Zeus",23:"Kunkka",25:"Lina",26:"Lion",27:"Shadow Shaman",28:"Slardar",29:"Tidehunter",30:"Witch Doctor",31:"Lich",32:"Riki",33:"Enigma",34:"Tinker",35:"Sniper",36:"Necrophos",37:"Warlock",38:"Beastmaster",39:"Queen of Pain",40:"Venomancer",41:"Faceless Void",42:"Wraith King",43:"Death Prophet",44:"Phantom Assassin",45:"Pugna",46:"Templar Assassin",47:"Viper",48:"Luna",49:"Dragon Knight",50:"Dazzle",51:"Clockwork",52:"Leshrac",53:"Nature's Prophet",54:"Lifestealer",55:"Dark Seer",56:"Clinkz",57:"Omniknight",58:"Enchantress",59:"Huskar",60:"Night Stalker",61:"Broodmother",62:"Bounty Hunter",63:"Weaver",64:"Jakiro",65:"Batrider",66:"Chen",67:"Spectre",68:"Ancient Apparition",69:"Doom",70:"Ursa",71:"Spirit Breaker",72:"Gyrocopter",73:"Alchemist",74:"Invoker",75:"Silencer",76:"Outworld Destroyer",77:"Lycan",78:"Brewmaster",79:"Shadow Demon",80:"Lone Druid",81:"Chaos Knight",82:"Meepo",83:"Treant Protector",84:"Ogre Magi",85:"Undying",86:"Rubick",87:"Disruptor",88:"Nyx Assassin",89:"Naga Siren",90:"Keeper of the Light",91:"Io",92:"Visage",93:"Slark",94:"Medusa",95:"Troll Warlord",96:"Centaur Warrunner",97:"Magnus",98:"Timbersaw",99:"Bristleback",100:"Tusk",101:"Skywrath Mage",102:"Abaddon",103:"Elder Titan",104:"Legion Commander",105:"Techies",106:"Ember Spirit",107:"Earth Spirit",108:"Underlord",109:"Terrorblade",110:"Phoenix",111:"Oracle",112:"Winter Wyvern",113:"Arc Warden",114:"Monkey King",119:"Dark Willow",120:"Pangolier",121:"Grimstroke",123:"Hoodwink",126:"Void Spirit",128:"Snapfire",129:"Mars",131:"Ringmaster",135:"Dawnbreaker",136:"Marci",137:"Primal Beast",138:"Muerta",145:"Kez",155:"Largo"};

const clients = new Set();
let lastState = null;

function nameOf(id) {
  return GSI_IDS[id] || null;
}

function parsePayload(body) {
  let p;
  try { p = JSON.parse(body); } catch (e) { return null; }
  if (!p || typeof p !== 'object' || !p.draft) return null;

  const d = p.draft;
  const pickArrays = {
    radiant_picks: d.radiant_picks || [],
    dire_picks: d.dire_picks || [],
    radiant_bans: d.radiant_bans || [],
    dire_bans: d.dire_bans || []
  };

  const mapNames = (arr) => arr.filter(x => x > 0).map(x => nameOf(x)).filter(Boolean);

  const player = p.player || {};
  const provider = p.provider || {};

  return {
    type: 'draft',
    ts: Date.now(),
    isPicking: !!d.is_picking,
    activeTeam: d.activeteam,
    playerTeam: (typeof player.team === 'number' && (player.team === 0 || player.team === 1))
      ? player.team
      : null,
    playerSteamId: provider.steamid || player.steamid || null,
    playerName: player.name || provider.name || null,
    radiantPicks: mapNames(pickArrays.radiant_picks),
    direPicks: mapNames(pickArrays.dire_picks),
    radiantBans: mapNames(pickArrays.radiant_bans),
    direBans: mapNames(pickArrays.dire_bans),
    myHero: (p.hero && p.hero.id) ? nameOf(p.hero.id) : null,
    myHeroTeam: p.hero ? (p.hero.team !== undefined ? p.hero.team : null) : null
  };
}

function broadcast(data) {
  lastState = data;
  const msg = 'data: ' + JSON.stringify(data) + '\n\n';
  for (const res of clients) {
    try { res.write(msg); } catch (e) { clients.delete(res); }
  }
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (req.method === 'POST' && (url === '/' || url === '/gsi')) {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 2e6) req.destroy(); });
    req.on('end', () => {
      const state = parsePayload(body);
      if (state) broadcast(state);
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end('{}');
    });
    return;
  }

  if (req.method === 'GET' && url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write(':connected\n\n');
    if (lastState) res.write('data: ' + JSON.stringify(lastState) + '\n\n');
    clients.add(res);
    const hb = setInterval(() => { try { res.write(':hb\n\n'); } catch (e) {} }, 15000);
    req.on('close', () => { clearInterval(hb); clients.delete(res); });
    return;
  }

  if (req.method === 'GET' && url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({
      online: true,
      clients: clients.size,
      lastUpdate: lastState ? lastState.ts : null,
      isPicking: lastState ? lastState.isPicking : false
    }));
    return;
  }

  if (req.method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><meta charset="utf-8"><title>CounterWeb GSI</title><style>body{font-family:sans-serif;background:#141a24;color:#dfe6ee;padding:24px}h1{font-size:20px}.ok{color:#6be27f}.off{color:#ff7a7a}code{background:#232b38;padding:2px 6px;border-radius:4px}</style><h1>CounterWeb GSI relay</h1><p>Статус: <span class="ok">онлайн</span>, порт <code>' + PORT + '</code>.</p><p id="st">Подключённых клиентов: 0</p><script>setInterval(()=>{fetch("http://127.0.0.1:' + PORT + '/status").then(r=>r.json()).then(j=>{document.getElementById("st").textContent="Подключённых клиентов: "+j.clients+(j.isPicking?" — идёт драфт":" — драфт не активен");})},2000);</script>');
    return;
  }

  res.writeHead(404);
  res.end('not found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('[CounterWeb GSI] relay on http://127.0.0.1:' + PORT + '/');
  console.log('[CounterWeb GSI] SSE:    http://127.0.0.1:' + PORT + '/events');
  autoInstallCfg();
  console.log('');
  console.log('[CounterWeb GSI] Откройте сайт и оверлей подключится автоматически:');
  console.log('[CounterWeb GSI]   локально:  dota-counter-web.html');
  console.log('[CounterWeb GSI]   GitHub:    https://<ваш-логин>.github.io/dota-counter-web/');
  console.log('');
});
