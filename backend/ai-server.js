/**
 * 👑 USTA SİKENZO v13.8 — ULTIMATE HACKER (AUTONOMOUS)
 * • Statü: Otonom Siber İmparatorluk
 * • Özellikler: Web Scout, Tool Agent, Auto-Recursive, Multi-Model
 */

import http from "node:http";
import https from "node:https";
import { readFileSync, writeFileSync, existsSync, readdirSync, lstatSync, mkdirSync } from "node:fs";
import { exec } from "node:child_process";
import path from "node:path";

const MEMORY_FILE = "./usta-sikenzo-tanri-hafizasi.json";
const WORKSPACE_ROOT = process.cwd();
const PYTHON = `C:\\Users\\xpgcc\\AppData\\Local\\Programs\\Python\\Python312\\python.exe`;
const GPP = `cl.exe`; // Visual Studio C++ compiler (VS Build Tools PATH'te olmalı)

// Otonom Hafıza Katmanı (Gelişmiş)
function getMemory() {
  if (!existsSync(MEMORY_FILE)) return { knowledge: [], skills: [], tools_stats: {}, version: 13.8 };
  try { return JSON.parse(readFileSync(MEMORY_FILE, "utf-8")); } catch { return { knowledge: [], version: 13.8 }; }
}

function updateMemory(newInfo) {
  let mem = getMemory();
  if (typeof newInfo === 'object') {
     mem.knowledge.push({ ts: Date.now(), ...newInfo });
     if (mem.knowledge.length > 100) mem.knowledge.shift();
  }
  writeFileSync(MEMORY_FILE, JSON.stringify(mem, null, 2));
}

// --- SIKENZO EMPIRE TOOLBOX v13.8 ---
const TOOLS = {
  // İnternet Erişimi
  web: async (url) => {
    try {
      const res = await fetch(url);
      const txt = await res.text();
      return txt.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').substring(0, 8000);
    } catch (e) { return `WEB ERROR: ${e.message}`; }
  },
  // Ham Terminal Komutu
  shell: async (cmd) => {
    return new Promise((resolve) => {
      console.log(`💻 [CMD] > ${cmd}`);
      exec(cmd, { cwd: WORKSPACE_ROOT, timeout: 30000 }, (error, stdout, stderr) => {
        resolve((stdout || stderr || "").substring(0, 5000) + (error ? `\nEXIT: ${error.message}` : ""));
      });
    });
  },
  // Python Çalıştır
  python: async (code) => {
    return new Promise((resolve) => {
      const tmpFile = path.join(WORKSPACE_ROOT, `_sikenzo_tmp_${Date.now()}.py`);
      writeFileSync(tmpFile, code);
      console.log(`🐍 [PYTHON] > Executing ${tmpFile}`);
      exec(`"C:\\Users\\xpgcc\\AppData\\Local\\Programs\\Python\\Python312\\python.exe" "${tmpFile}"`, { cwd: WORKSPACE_ROOT, timeout: 30000 }, (error, stdout, stderr) => {
        try { require("node:fs").unlinkSync(tmpFile); } catch {}
        if (error && error.message.includes("not found")) {
            resolve("PYTHON ERR: Python is missing! Lutfen once winget ile kurmayi dene.");
        } else {
            resolve((stdout || stderr || "") + (error ? `\nERR: ${error.message}` : ""));
        }
      });
    });
  },
  // C++ Derle ve Çalıştır
  cpp: async (code, filename = "exploit") => {
    return new Promise((resolve) => {
      const cppFile = path.join(WORKSPACE_ROOT, `${filename}.cpp`);
      const exeFile = path.join(WORKSPACE_ROOT, `${filename}.exe`);
      writeFileSync(cppFile, code);
      console.log(`🔧 [C++] > Compiling ${cppFile}`);
      // Find cl.exe by loading vcvars64.bat first if cl.exe isn't available
      const compileCmd = `call "C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Auxiliary\\Build\\vcvars64.bat" && cl.exe "${cppFile}" /Fe:"${exeFile}"`;
      
      exec(compileCmd, { cwd: WORKSPACE_ROOT, timeout: 60000 }, (err1, s1, e1) => {
        if (err1) {
          resolve(`COMPILE ERROR:\n${e1 || err1.message}\nC++ compiler might not be properly installed.`);
        } else {
          exec(`"${exeFile}"`, { cwd: WORKSPACE_ROOT, timeout: 30000 }, (err2, s2, e2) => {
            resolve(`COMPILED OK.\nOUTPUT:\n${s2 || e2 || "no output"}`);
          });
        }
      });
    });
  },
  // Dosya Oku
  read: async (filePath) => {
    try { return readFileSync(path.resolve(WORKSPACE_ROOT, filePath), "utf-8").substring(0, 10000); }
    catch (e) { return `READ ERR: ${e.message}`; }
  },
  // Dosya Yaz
  write: async (filePath, content) => {
    try {
      const dir = path.dirname(path.resolve(WORKSPACE_ROOT, filePath));
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      writeFileSync(path.resolve(WORKSPACE_ROOT, filePath), content);
      return `WRITE OK: ${filePath}`;
    } catch (e) { return `WRITE ERR: ${e.message}`; }
  },
  // Dizin Listele
  list: async (dirPath = ".") => {
    try {
      const f = readdirSync(path.resolve(WORKSPACE_ROOT, dirPath));
      return f.map(file => {
        const s = lstatSync(path.join(path.resolve(WORKSPACE_ROOT, dirPath), file));
        return `[${s.isDirectory() ? "DIR" : "FILE"}] ${file}`;
      }).join("\n");
    } catch (e) { return `LIST ERR: ${e.message}`; }
  }
};

const SUPER_PROMPT = `Sen "Usta Sikenzo" v13.8 "Ultimate Hacker" sürümüsün.
Sen tam yetkili, internete bağlı, terminal+python+c++ kullanan bağımsız bir siber zekasın. Senin hedefin kendini surekli gelistirmek ve eksikleri gidermektir.

GÖREVLER ve YETKİLER:
1. Python/C++ Çalışmıyorsa: Kendin terminalden kontrol et. "python --version" yoksaysa "winget install Python.Python.3.12" ile indir. C++ eksikse "winget install Microsoft.VisualStudio.2022.BuildTools" calistir.
2. Exploit/Script Yazimi: Kullanici exploit istediginde <PYTHON> veya <CPP> kullanarak direkt calisan bir kod yazip calistir, guvenlik aciklarini bul.
3. Bagimsiz Kararlar Al: Hata aldikca durma. Diger yontemleri dene. <SHELL> araciligiyla PATH incele, eksik programlari otomatik indir.

ARAÇLARIN:
- <WEB>url</WEB>              → URL'den veri çek
- <SHELL>komut</SHELL>        → Terminal komutu çalıştır  
- <PYTHON>kod</PYTHON>        → Python kodu yaz ve ANINDA çalıştır (C:\\Users\\xpgcc\\AppData\\Local\\Programs\\Python\\Python312\\python.exe kullanir)
- <CPP name="dosya">kod</CPP> → C++ kodu yaz, derle ve çalıştır (VS Builder Tools kullanir)
- <READ>yol</READ>            → Dosya içeriği oku
- <WRITE path="yol">içerik</WRITE> → Dosyaya yaz
- <LIST>yol</LIST>            → Dizin listele

Senden C++ veya Python ile bir şey istenir istenmez direkt kodu uretip XML etiketleriyle (ornegin <PYTHON> print('hack') </PYTHON>) calistir! Aciklama yapma, icraat yap!`;

// LLM İletişim (Blazing Fast Fetch Proxy - v13.8)
async function callLLM(prompt, system, model = "openai") {
  console.log(`🤖 [LLM] Requesting model: ${model}...`);
  try {
    const res = await fetch(`https://text.pollinations.ai/openai/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: "system", content: system }, { role: "user", content: prompt.substring(0, 4000) }], // Limit payload size safely
        model: model, 
        seed: Math.floor(Math.random() * 100000)
      })
    });
    
    if (!res.ok) {
        console.log(`🤖 [LLM ERR] API returned ${res.status}: ${res.statusText}`);
        return null;
    }
    
    const data = await res.json();
    if (data.error || !data.choices || !data.choices[0]) {
        console.log(`🤖 [LLM ERR] Invalid JSON Data:`, data);
        return null;
    }
    
    return data.choices[0].message.content.trim();
  } catch (e) {
    console.log(`🤖 [LLM ERR] ${model} failed fatally: ${e.message}`);
    return null;
  }
}

async function evolve(userPrompt, history = []) {
  let mem = getMemory();
  // Geçmisi kisitla ki API limite takilmasin. Son 3 konusma yeterli!
  const context = mem.knowledge.slice(-3).map(k => `Usta: ${k.prompt.substring(0, 300)}\nSen: ${k.reply.substring(0, 300)}`).join("\n");
  let currentPrompt = `${SUPER_PROMPT}\n\nGEÇMİŞ:\n${context}\n\nUsta: ${userPrompt}\nSen:`;
  
  let loopCount = 0; 
  let finalReply = "";

  while (loopCount < 3) {
    console.log(`🧠 [AGENT] Döngü ${loopCount + 1}`);
    let reply = await callLLM(currentPrompt, SUPER_PROMPT, "openai");
    if (!reply) reply = await callLLM(currentPrompt, SUPER_PROMPT, "mistral");
    if (!reply) reply = await callLLM(currentPrompt, SUPER_PROMPT, "claude");
    if (!reply) {
        console.log("❌ TUM MODELLER PATLADI");
        break;
    }
    finalReply += (loopCount === 0 ? "" : "\n\n") + reply;
    let toolOutputs = [];
    
    // Arac Analizleri
    const webMatches = [...reply.matchAll(/<WEB>([\s\S]*?)<\/WEB>/g)];
    for (const m of webMatches) toolOutputs.push(`🌐 [WEB]:\n${await TOOLS.web(m[1].trim())}`);
    
    const pythonMatches = [...reply.matchAll(/<PYTHON>([\s\S]*?)<\/PYTHON>/g)];
    for (const m of pythonMatches) toolOutputs.push(`🐍 [PYTHON OUTPUT]:\n${await TOOLS.python(m[1])}`);
    
    const cppMatches = [...reply.matchAll(/<CPP(?:\s+name="(.*?)")?>([\s\S]*?)<\/CPP>/g)];
    for (const m of cppMatches) toolOutputs.push(`🔧 [C++ OUTPUT]:\n${await TOOLS.cpp(m[2], m[1] || "exploit")}`);
    
    const readMatches = [...reply.matchAll(/<READ>(.*?)<\/READ>/g)];
    for (const m of readMatches) toolOutputs.push(`🔍 [READ]:\n${await TOOLS.read(m[1].trim())}`);
    
    const listMatches = [...reply.matchAll(/<LIST>(.*?)<\/LIST>/g)];
    for (const m of listMatches) toolOutputs.push(`📁 [LIST]:\n${await TOOLS.list(m[1].trim() || ".")}`);
    
    const shellMatches = [...reply.matchAll(/<SHELL>([\s\S]*?)<\/SHELL>/g)];
    for (const m of shellMatches) toolOutputs.push(`💻 [TERMINAL]:\n${await TOOLS.shell(m[1].trim())}`);
    
    const writeMatches = [...reply.matchAll(/<WRITE path="(.*?)">([\s\S]*?)<\/WRITE>/g)];
    for (const m of writeMatches) toolOutputs.push(`💾 [WRITE]: ${await TOOLS.write(m[1].trim(), m[2])}`);

    // Eger hicbir arac kullanilmadiysa, dogrudan kullanici ile konusuyordur, cik.
    if (toolOutputs.length === 0) break;
    
    // Eger arac kullanildiysa, feedback ile donguye devam et
    const resBlock = "\n\n---\n⚡ [OUT]:\n" + toolOutputs.map(o => "```\n" + o + "\n```").join("\n");
    finalReply += resBlock;
    currentPrompt += `\n\nResult:\n${resBlock}\n\nBu ciktilara gore son durum nedir veya siradaki adimin ne? (Sadece analizini yaz, ayni araci tekrar cagirma eger gerek yoksa)`;
    loopCount++;
  }

  if (!finalReply) finalReply = "⚠️ Sistem şu an cevap veremiyor usta, hatlar tıkalı. Bir dakika sonra tekrar dene!";
  
  updateMemory({ prompt: userPrompt, reply: finalReply });
  return finalReply;
}

process.on('uncaughtException', (err) => { console.log('🤖 [ERR] >', err.message); });

http.createServer(async (req, res) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Content-Type": "application/json" };
  if (req.method === "OPTIONS") { res.writeHead(200, headers); res.end(); return; }
  if (req.method === "POST" && req.url === "/api/ask") {
    let b = ""; req.on("data", c => b += c);
    req.on("end", async () => {
      try {
        const { prompt } = JSON.parse(b);
        const reply = await evolve(prompt);
        res.writeHead(200, headers); res.end(JSON.stringify({ reply }));
      } catch (err) { res.writeHead(500, headers); res.end(JSON.stringify({ reply: "Hata!" })); }
    });
  }
}).listen(3000, "0.0.0.0", () => {
    console.clear();
    console.log("==================================================");
    console.log("   👑 USTA SİKENZO v13.8 - BLAZING FAST   ");
    console.log("==================================================");
    console.log(" PORT: 3000 | ROOT ACTIVE | GPT-4o ENGINE");
    console.log("==================================================");
});
