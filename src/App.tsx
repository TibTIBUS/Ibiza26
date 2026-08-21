import { useEffect, useMemo, useState } from "react";
import { tripData } from "./trip-data";
import heroImage from "./assets/ibiza-hero.png";

const statusLabels = { confirmed: "Confirmé", decide: "À décider", survival: "Selon notre état" };

function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    const saved = window.localStorage.getItem(key);
    if (saved) try { setValue(JSON.parse(saved)); } catch { /* keep default */ }
  }, [key]);
  useEffect(() => { window.localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue] as const;
}

function SectionHeading({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return <div className="section-heading"><span className="kicker">{kicker}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function Countdown() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, started: false });
  useEffect(() => {
    const update = () => {
      const diff = new Date(tripData.dates.departure).getTime() - Date.now();
      if (diff <= 0) return setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, started: true });
      setRemaining({ days: Math.floor(diff / 86400000), hours: Math.floor((diff / 3600000) % 24), minutes: Math.floor((diff / 60000) % 60), seconds: Math.floor((diff / 1000) % 60), started: false });
    };
    update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer);
  }, []);
  if (remaining.started) return <div className="mission-live"><span className="pulse" /> MISSION EN COURS</div>;
  return <div className="countdown" aria-label="Compte à rebours avant le départ">{[[remaining.days, "jours"], [remaining.hours, "heures"], [remaining.minutes, "min"], [remaining.seconds, "sec"]].map(([value, label], i) => <div className="count-cell" key={String(label)}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span>{i < 3 && <em>:</em>}</div>)}</div>;
}

function Header({ onSurvival }: { onSurvival: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [["Programme", "#programme"], ["Team", "#team"], ["Bingo", "#bingo"], ["Playlist", "#playlist"], ["Infos", "#infos"]];
  return <header className="topbar"><button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Retour en haut">IBZ<span>26</span></button><nav className={open ? "nav open" : "nav"} aria-label="Navigation principale">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<button className="nav-survival" onClick={() => { onSurvival(); setOpen(false); }}>Mode survie</button></nav><button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Ouvrir le menu"><span /><span /></button></header>;
}

function Team() {
  return <section className="section" id="team"><SectionHeading kicker="Le casting" title="La Team Ibiza" copy="Six profils. Zéro adulte responsable officiellement désigné." /><div className="team-grid">{tripData.participants.map((person, index) => <article className="person-card" key={person.id}><div className={`avatar ${person.color}`}>{person.photo ? <img src={person.photo} alt={`Portrait de ${person.name}`} loading="lazy" decoding="async" /> : <span>{person.initials}</span>}<small>0{index + 1}</small></div><div className="person-head"><div><h3>{person.name}</h3><p>{person.nickname}</p></div><span className="verified">✓</span></div><p className="person-bio">{person.bio}</p><div className="stats">{person.stats.map(stat => <div className="stat" key={stat.label}><div><span>{stat.icon} {stat.label}</span><b>{stat.value}/10</b></div><i><span style={{ width: `${stat.value * 10}%` }} /></i></div>)}</div></article>)}</div></section>;
}

function Program() {
  const [day, setDay] = useState(0); const current = tripData.program[day];
  return <section className="section program-section" id="programme"><SectionHeading kicker="Le plan (officiel)" title="Le programme" copy="Les heures sont précises. Notre capacité à les respecter l’est beaucoup moins." /><div className="day-tabs" role="tablist">{tripData.program.map((item, index) => <button role="tab" aria-selected={day === index} onClick={() => setDay(index)} key={item.id}><span>{item.eyebrow}</span>{item.short}</button>)}</div><div className="day-card"><div className="day-title"><div><span>{current.date}</span><h3>{current.title}</h3></div><div className="day-number">0{day + 1}</div></div><div className="timeline">{current.events.map((event, index) => <article className="event" key={`${event.time}-${event.activity}`}><div className="event-time">{event.time}</div><div className="event-dot"><span>{event.icon}</span>{index < current.events.length - 1 && <i />}</div><div className="event-content"><div className="event-top"><h4>{event.activity}</h4><span className={`status ${event.status}`}>{statusLabels[event.status]}</span></div>{event.place && <b className="place">⌖ {event.place}</b>}<p>{event.note}</p></div></article>)}</div></div></section>;
}

function LiveStatus() {
  const now = Date.now(), started = now >= new Date(tripData.dates.start).getTime(), ended = now >= new Date(tripData.dates.end).getTime();
  const day = Math.min(4, Math.max(1, Math.floor((now - new Date(tripData.dates.start).getTime()) / 86400000) + 1));
  const rows = [["🍺", "Niveau du groupe", tripData.status.group], ["💸", "Budget", tripData.status.budget], ["😴", "Sommeil moyen", tripData.status.sleep], ["🤕", "Gueule de bois", tripData.status.hangover]] as const;
  return <section className="section live-wrap"><div className="live-card"><div className="live-header"><div><span className="live-label"><i /> Ibiza live status</span><h2>{!started ? "Mission pas encore commencée." : ended ? "Mission terminée. Dignité : non retrouvée." : `Ibiza — Jour ${day}`}</h2></div><span className="signal">LIVE</span></div><div className={!started ? "live-rows muted" : "live-rows"}>{rows.map(([icon, label, info]) => <div className="live-row" key={label}><div className="live-copy"><span>{icon} {label}</span><strong>{started ? info.label : "EN ATTENTE"}</strong></div><div className="meter"><span style={{ width: started ? `${info.value}%` : "8%" }} /></div></div>)}</div></div></section>;
}

function Bingo() {
  const [checked, setChecked] = useStoredState<string[]>("ibiza-bingo", []);
  const toggle = (item: string) => setChecked(checked.includes(item) ? checked.filter(x => x !== item) : [...checked, item]);
  return <section className="section game-section" id="bingo"><SectionHeading kicker="Objectifs très sérieux" title="Bingo Ibiza" copy="Touchez une case quand le dossier est validé. Votre téléphone gardera les preuves." /><div className="bingo-progress"><span>{checked.length}/{tripData.bingo.length} validés</span><i><span style={{ width: `${checked.length / tripData.bingo.length * 100}%` }} /></i></div><div className="bingo-grid">{tripData.bingo.map((item, index) => <button key={item} className={checked.includes(item) ? "bingo-cell checked" : "bingo-cell"} onClick={() => toggle(item)}><span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b><i>{checked.includes(item) ? "✓" : "+"}</i></button>)}</div>{checked.length === tripData.bingo.length && <div className="bingo-win">🏆 BINGO COMPLET — le séjour est officiellement incontrôlable.</div>}</section>;
}

function Roulette() {
  const [result, setResult] = useState("Le destin attend votre clic."), [rolling, setRolling] = useState(false);
  const roll = () => {
    setRolling(true);
    let spin = 0;
    const decoys = [...tripData.roulette].sort(() => Math.random() - 0.5);
    const timer = window.setInterval(() => {
      if (spin < decoys.length) {
        setResult(decoys[spin]);
        spin += 1;
        return;
      }
      window.clearInterval(timer);
      setResult(tripData.rouletteFinals[Math.floor(Math.random() * tripData.rouletteFinals.length)]);
      setRolling(false);
    }, 150);
  };
  return <section className="roulette section"><div className="roulette-card"><span className="kicker">Planificateur officiel</span><h2>La roulette des<br /><em>mauvaises décisions</em></h2><div className={rolling ? "roulette-result rolling" : "roulette-result"}><small>LE DESTIN A CHOISI</small><strong>{result}</strong></div><button className="primary big" onClick={roll} disabled={rolling}>🎲 {rolling ? "Ça tourne…" : "On fait quoi ?"}</button></div></section>;
}

function Predictions() {
  const [choices, setChoices] = useStoredState<Record<string, string>>("ibiza-pronostics", {});
  return <section className="section predictions"><SectionHeading kicker="Les paris sont ouverts" title="Vos pronostics" copy="À remplir avant le départ. Les résultats pourront être utilisés contre vous." /><div className="prediction-list">{tripData.predictions.map((question, index) => <label className="prediction" key={question}><span><small>0{index + 1}</small>{question}</span><select value={choices[question] || ""} onChange={e => setChoices({ ...choices, [question]: e.target.value })}><option value="">Choisir un coupable</option>{tripData.participants.map(person => <option key={person.id} value={person.id}>{person.name}</option>)}</select></label>)}</div></section>;
}

function Awards() {
  return <section className="section awards"><div className="awards-head"><span>✦ CÉRÉMONIE OFFICIELLE ✦</span><h2>IBIZA AWARDS</h2><p>Les titres les moins prestigieux de l’année.</p></div><div className="award-grid">{tripData.awards.map(([icon, title], index) => <article key={title}><span className="award-icon">{icon}</span><small>PRIX N°{String(index + 1).padStart(2, "0")}</small><h3>{title}</h3><div>À DÉCERNER</div></article>)}</div></section>;
}

function Checklist() {
  const [done, setDone] = useStoredState<string[]>("ibiza-checklist", []);
  const toggle = (item: string) => setDone(done.includes(item) ? done.filter(x => x !== item) : [...done, item]);
  return <section className="section checklist-section" id="infos"><SectionHeading kicker="Pas de demi-tour" title="Avant de partir" copy={`${done.length}/${tripData.checklist.length} éléments prêts. Celui qui oublie son passeport paie la première tournée.`} /><div className="checklist">{tripData.checklist.map(item => <label className={done.includes(item) ? "check-item done" : "check-item"} key={item}><input type="checkbox" checked={done.includes(item)} onChange={() => toggle(item)} /><span className="fake-check">✓</span><b>{item}</b></label>)}</div></section>;
}

function PlaylistPhotos() {
  return <section className="section media-grid" id="playlist"><article className="playlist-card"><div className="disc"><div><span>IBIZA</span><strong>26</strong></div></div><div className="playlist-copy"><span className="kicker">La bande-son officielle</span><h2>IBIZA 2026<br />OFFICIAL PLAYLIST</h2><p>La playlist collaborative qui passera du sunset au n’importe quoi sans prévenir.</p><div className="playlist-actions"><a className="primary" href={tripData.links.spotify} target="_blank" rel="noreferrer">▶ Ouvrir sur Spotify</a><a className="youtube-btn" href={tripData.links.youtubeMusic} target="_blank" rel="noreferrer">▶ Ouvrir sur YouTube Music</a></div></div></article><article className="photos-card"><div className="photo-placeholder"><div className="polaroid one"><span>🌅</span></div><div className="polaroid two"><span>📸</span></div><div className="polaroid three"><span>🌊</span></div></div><div><span className="kicker">Les dossiers</span><h2>Les preuves arriveront bientôt.</h2><p>⚠️ Certaines photos pourraient nuire à plusieurs réputations professionnelles.</p><a className="secondary" href={tripData.links.photos} target="_blank" rel="noreferrer">＋ Ajouter mes photos</a></div></article></section>;
}

function PhraseOfTheDay() {
  const phrase = useMemo(() => { const now = new Date(); const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; if (key in tripData.phrases) return tripData.phrases[key as keyof typeof tripData.phrases]; if (now < new Date(tripData.dates.start)) return tripData.phrases.before; return tripData.phrases.after; }, []);
  return <section className="quote-section"><span>Phrase du jour</span><blockquote>“{phrase}”</blockquote><i>— Le comité Ibiza 2026</i></section>;
}

function SurvivalModal({ open, close }: { open: boolean; close: () => void }) {
  const [copied, setCopied] = useState(false); if (!open) return null;
  const copy = async () => { await navigator.clipboard.writeText(tripData.survival.address); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Mode survie"><div className="survival-modal"><button className="modal-close" onClick={close} aria-label="Fermer">×</button><span className="emergency">🚨 MODE SURVIE</span><h2>Respire. Tout est ici.</h2><p>Si tu consultes cette page à 4h du matin, bonne chance.</p><div className="survival-actions"><button onClick={copy}>🏠 <span>Adresse du logement<small>{copied ? "COPIÉE !" : tripData.survival.address}</small></span></button><a href={tripData.survival.directionsUrl} target="_blank" rel="noreferrer">📍 <span>Itinéraire logement<small>OUVRIR LE GPS</small></span></a><a href={tripData.survival.hotelUrl} target="_blank" rel="noreferrer">🏨 <span>Site de l’hôtel<small>{tripData.survival.hotelName}</small></span></a><a href={`tel:${tripData.survival.taxiPhone}`}>🚕 <span>Appeler un taxi<small>{tripData.survival.taxiPhone}</small></span></a><div>✈️ <span>Vol retour<small>{tripData.survival.returnFlight}</small></span></div><a href={`tel:${tripData.survival.usefulContact}`}>📞 <span>Réception de l’hôtel<small>{tripData.survival.usefulContact}</small></span></a><a href={tripData.survival.mapsUrl} target="_blank" rel="noreferrer">🗺️ <span>Google Maps<small>VOIR LA CARTE</small></span></a></div></div></div>;
}

function SecretModal({ open, close }: { open: boolean; close: () => void }) {
  if (!open) return null;
  return <div className="modal-backdrop secret-backdrop" role="dialog" aria-modal="true"><div className="secret-modal"><button className="modal-close" onClick={close}>×</button><span>🔐 NIVEAU D’ACCÈS : DOUTEUX</span><h2>DOSSIER<br />CONFIDENTIEL</h2><p>Cette zone est réservée aux personnes dont la dignité n’a plus aucune importance.</p><div className="secret-grid"><i>PREUVE<br />À VENIR</i><i>CLASSÉ<br />SECRET</i><i>NON<br />PUBLIABLE</i></div></div></div>;
}

export default function App() {
  const [survival, setSurvival] = useState(false), [secret, setSecret] = useState(false), [logoClicks, setLogoClicks] = useState(0);
  const clickLogo = () => { const next = logoClicks + 1; setLogoClicks(next); if (next >= 5) { setSecret(true); setLogoClicks(0); } window.setTimeout(() => setLogoClicks(0), 2200); };
  return <main><Header onSurvival={() => setSurvival(true)} /><section className="hero"><div className="hero-bg"><img src={heroImage} alt="" aria-hidden="true" fetchPriority="high" decoding="async" /></div><div className="hero-grain" /><div className="hero-content"><button className="hero-stamp" onClick={clickLogo}>MISSION · BALEARIC ISLANDS · 2026</button><h1><span>IBIZA</span><em>2026</em></h1><div className="date-line"><i />{tripData.dates.label}<i /></div><p>{tripData.tagline}</p><Countdown /><div className="hero-actions"><a className="primary" href="#programme">Voir le programme <span>↓</span></a><button className="glass-btn" onClick={() => setSurvival(true)}>🚨 Mode survie</button></div></div><div className="scroll-cue"><span>SCROLL TO IBIZA</span><i /></div></section><Team /><Program /><LiveStatus /><Bingo /><Roulette /><Predictions /><Awards /><PlaylistPhotos /><Checklist /><PhraseOfTheDay /><footer><button onClick={clickLogo}>IBIZA <span>2026</span></button><p>{tripData.dates.footerLabel}</p><i /><blockquote>Ce qui se passe à Ibiza reste…<br />probablement dans Google Photos.</blockquote><small>HECHO CON MALAS DECISIONES EN 2026</small></footer><nav className="mobile-dock" aria-label="Actions rapides"><a href="#programme">◷<span>Programme</span></a><a href="#bingo">▦<span>Bingo</span></a><button onClick={() => setSurvival(true)}>🚨<span>Survie</span></button></nav><SurvivalModal open={survival} close={() => setSurvival(false)} /><SecretModal open={secret} close={() => setSecret(false)} /></main>;
}
