import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─────────────────────────── DATA ─────────────────────────── */

const SERVERS = [
  {
    id: "survival",
    name: "Выживание",
    label: "SURVIVAL",
    desc: "Классическое выживание с экономикой, кланами и войнами за территорию",
    online: 312,
    max: 500,
    mode: "Survival",
    version: "1.20.4",
    color: "hsl(142,68%,44%)",
    colorDim: "hsla(142,68%,44%,0.15)",
    icon: "🌿",
  },
  {
    id: "anarchy",
    name: "Анархия",
    label: "ANARCHY",
    desc: "Никаких правил, только сила. PvP везде, гриферство разрешено",
    online: 187,
    max: 300,
    mode: "Anarchy",
    version: "1.20.4",
    color: "hsl(0,72%,55%)",
    colorDim: "hsla(0,72%,55%,0.15)",
    icon: "💀",
  },
  {
    id: "roleplay",
    name: "Ролевой",
    label: "ROLEPLAY",
    desc: "Полноценный RP-сервер: профессии, экономика, города и политика",
    online: 243,
    max: 400,
    mode: "RolePlay",
    version: "1.20.4",
    color: "hsl(210,80%,58%)",
    colorDim: "hsla(210,80%,58%,0.15)",
    icon: "🏙",
  },
  {
    id: "creative",
    name: "Творческий",
    label: "CREATIVE",
    desc: "Безграничные ресурсы, WorldEdit и место для великих построек",
    online: 98,
    max: 200,
    mode: "Creative",
    version: "1.20.4",
    color: "hsl(270,60%,60%)",
    colorDim: "hsla(270,60%,60%,0.15)",
    icon: "🏗",
  },
];

const FEATURES = [
  { icon: "Shield", title: "Античит система", desc: "Продвинутая защита от читеров — NCP, Matrix, собственные патчи", color: "hsl(142,68%,44%)" },
  { icon: "Zap", title: "Мощные сервера", desc: "Сервера на выделенных машинах с NVMe SSD, 32 ГБ RAM, аптайм 99.9%", color: "hsl(43,95%,55%)" },
  { icon: "Users", title: "50 000+ игроков", desc: "Крупнейшее RU-сообщество с живым чатом, ивентами и турнирами", color: "hsl(210,80%,58%)" },
  { icon: "Star", title: "Регулярные ивенты", desc: "Еженедельные турниры, сезонные события и уникальные награды", color: "hsl(270,60%,60%)" },
  { icon: "Package", title: "Честный донат", desc: "Никакого pay-to-win. Только косметика, префиксы и удобства", color: "hsl(0,72%,55%)" },
  { icon: "HeadphonesIcon", title: "Поддержка 24/7", desc: "Команда администраторов всегда онлайн. Тикет-система и Discord", color: "hsl(142,68%,44%)" },
];

const TOP_PLAYERS = [
  { rank: 1, name: "ShadowKnight_", kills: 8241, playtime: "2140 ч", level: 847, server: "Анархия", prefix: "ЛЕГЕНДА" },
  { rank: 2, name: "EmeraldQueen", kills: 7128, playtime: "1890 ч", level: 812, server: "Выживание", prefix: "VIP" },
  { rank: 3, name: "xX_DragonFire_Xx", kills: 6904, playtime: "1744 ч", level: 799, server: "Анархия", prefix: "PREMIUM" },
  { rank: 4, name: "StoneWarden", kills: 5312, playtime: "1502 ч", level: 776, server: "Ролевой", prefix: "VIP" },
  { rank: 5, name: "CraftMasterPro", kills: 4987, playtime: "1344 ч", level: 754, server: "Выживание", prefix: "" },
  { rank: 6, name: "NightWalker228", kills: 4401, playtime: "1201 ч", level: 741, server: "Анархия", prefix: "ELITE" },
  { rank: 7, name: "IronForge_RU", kills: 3876, playtime: "1089 ч", level: 728, server: "Творческий", prefix: "VIP" },
  { rank: 8, name: "StarGazerMC", kills: 3544, playtime: "978 ч", level: 715, server: "Выживание", prefix: "" },
  { rank: 9, name: "RedStoneMaster", kills: 3102, playtime: "891 ч", level: 701, server: "Ролевой", prefix: "PREMIUM" },
  { rank: 10, name: "WolfPackLeader", kills: 2980, playtime: "832 ч", level: 688, server: "Анархия", prefix: "" },
];

const SHOP_ITEMS = [
  { id: 1, name: "VIP", emoji: "👑", price: 299, oldPrice: 499, color: "hsl(43,95%,55%)", tag: "ХИТ", perks: ["Префикс [VIP]", "x1.5 опыт", "5 домов", "/hat", "Цветной ник"] },
  { id: 2, name: "PREMIUM", emoji: "💎", price: 599, oldPrice: 899, color: "hsl(210,80%,58%)", tag: "ТОП", perks: ["Префикс [PREMIUM]", "x2 опыт", "10 домов", "Полёт на спавне", "/god арена"] },
  { id: 3, name: "ELITE", emoji: "⚡", price: 999, oldPrice: 1499, color: "hsl(270,60%,60%)", tag: "", perks: ["Префикс [ELITE]", "x3 опыт", "∞ домов", "Личный регион", "Все команды"] },
  { id: 4, name: "ЛЕГЕНДА", emoji: "🔥", price: 1999, oldPrice: 2999, color: "hsl(0,72%,55%)", tag: "RARE", perks: ["Уникальный префикс", "x5 опыт", "Особый скин частиц", "Ник в топе сервера", "Доступ к тест-серверу"] },
];

const NEWS = [
  { id: 1, tag: "ОБНОВЛЕНИЕ", date: "24 мая 2026", title: "Обновление до 1.20.4 — новые биомы и мобы", img: "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/982bde37-eda0-46ec-9379-63391497945d.jpg" },
  { id: 2, tag: "ИВЕНТ", date: "20 мая 2026", title: "Летний турнир по PvP — призовой фонд 15 000 ₽", img: "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/93971d93-689f-4b5f-b109-6220a44400bf.jpg" },
  { id: 3, tag: "АКЦИЯ", date: "15 мая 2026", title: "Скидка 40% на все привилегии до 31 мая", img: "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/e3e3ee63-2fc9-4754-9428-ea1b1502f0d2.jpg" },
];

const TICKER_ITEMS = [
  "⚡ СКИДКА 40% НА ДОНАТ ДО 31 МАЯ",
  "🏆 PVP ТУРНИР — ПРИЗОВОЙ ФОНД 15 000 ₽",
  "🌿 ОБНОВЛЕНИЕ ДО 1.20.4 УЖЕ НА СЕРВЕРАХ",
  "👑 НОВЫЙ РАНГ «ЛЕГЕНДА» — ТОЛЬКО 50 МЕСТ",
  "🎮 ВСЕГО ОНЛАЙН: 840 ИГРОКОВ",
];

const NAV_LEFT = [
  { label: "Серверы", href: "#servers" },
  { label: "Магазин", href: "#shop" },
  { label: "Рейтинг", href: "#top" },
  { label: "Новости", href: "#news" },
  { label: "Правила", href: "#rules" },
];

const RULES_LIST = [
  { n: "1", title: "Уважение", text: "Запрещены оскорбления, угрозы и дискриминация в любой форме." },
  { n: "2", title: "Читы", text: "Любое стороннее ПО, дающее преимущество — перманентный бан." },
  { n: "3", title: "Реклама", text: "Реклама других серверов и ресурсов в чате запрещена." },
  { n: "4", title: "Гриферство", text: "На мирных серверах запрещено разрушать чужие постройки." },
  { n: "5", title: "Дюп/баги", text: "Намеренное использование багов для дюпа предметов — бан." },
  { n: "6", title: "Ник/скин", text: "Ники и скины с оскорбительным/нецензурным содержимым запрещены." },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */
function rankClass(r: number) {
  if (r === 1) return "rank-1";
  if (r === 2) return "rank-2";
  if (r === 3) return "rank-3";
  return "rank-other";
}
function rankBadge(r: number) {
  if (r === 1) return "🥇";
  if (r === 2) return "🥈";
  if (r === 3) return "🥉";
  return `#${r}`;
}
function prefixColor(p: string) {
  if (p === "ЛЕГЕНДА") return "hsl(0,72%,60%)";
  if (p === "ELITE")   return "hsl(270,60%,65%)";
  if (p === "PREMIUM") return "hsl(210,80%,62%)";
  if (p === "VIP")     return "hsl(43,95%,55%)";
  return "transparent";
}

/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function Index() {
  const [activeServer, setActiveServer] = useState(0);
  const [topTab, setTopTab] = useState<"kills"|"playtime"|"level">("kills");
  const [loginOpen, setLoginOpen] = useState(false);
  const [regOpen, setRegOpen]     = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const totalOnline = SERVERS.reduce((s, sv) => s + sv.online, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };

  /* sorted top */
  const sortedTop = [...TOP_PLAYERS].sort((a, b) =>
    topTab === "kills" ? b.kills - a.kills :
    topTab === "level" ? b.level - a.level :
    parseInt(b.playtime) - parseInt(a.playtime)
  );

  return (
    <div className="min-h-screen bg-s1 text-foreground overflow-x-hidden">

      {/* ══════════════════════ TOP TICKER BAR ══════════════════════ */}
      <div className="bg-s2 border-b border-border overflow-hidden h-8 flex items-center">
        <div className="flex-shrink-0 px-4 bg-green text-white text-xs font-bold uppercase tracking-widest h-full flex items-center z-10" style={{ fontFamily: "Oswald, sans-serif" }}>
          НОВОСТИ
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="marquee-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span key={i} className="text-xs font-medium text-muted-foreground px-8 whitespace-nowrap" style={{ fontFamily: "Golos Text, sans-serif" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 px-4 text-xs text-muted-foreground flex items-center gap-1.5 border-l border-border h-full">
          <span className="dot-online" />
          <span className="text-white font-semibold">{totalOnline}</span> онлайн
        </div>
      </div>

      {/* ══════════════════════ NAVBAR ══════════════════════ */}
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-s1/95 backdrop-blur-lg shadow-2xl border-b border-border" : "bg-s2 border-b border-border"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center h-14 gap-6">

          {/* Logo */}
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: "hsla(142,68%,44%,0.15)", border: "1px solid hsla(142,68%,44%,0.35)" }}>⛏</div>
            <span className="font-bold tracking-widest text-white uppercase text-base" style={{ fontFamily: "Oswald, sans-serif" }}>
              Craft<span className="c-green">World</span>
            </span>
          </button>

          {/* Left nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LEFT.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)}
                className="px-3.5 py-1.5 text-sm text-muted-foreground hover:text-white hover:bg-white/5 rounded transition-all"
                style={{ fontFamily: "Golos Text, sans-serif", fontWeight: 500 }}>
                {l.label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <button onClick={() => setLoginOpen(true)}
              className="btn-mc btn-mc-ghost px-4 py-1.5 rounded text-sm">
              Войти
            </button>
            <button onClick={() => setRegOpen(true)}
              className="btn-mc btn-mc-primary px-4 py-1.5 rounded text-sm">
              Регистрация
            </button>
          </div>

          {/* Mobile burger */}
          <button className="md:hidden ml-auto text-muted-foreground hover:text-white p-1.5"
            onClick={() => setMobileNav(!mobileNav)}>
            <Icon name={mobileNav ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileNav && (
          <div className="md:hidden bg-s2 border-t border-border px-4 py-3 flex flex-col gap-1">
            {NAV_LEFT.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)}
                className="text-left px-3 py-2 text-sm text-muted-foreground hover:text-white hover:bg-white/5 rounded transition-all">
                {l.label}
              </button>
            ))}
            <div className="flex gap-2 pt-2 border-t border-border mt-1">
              <button onClick={() => { setLoginOpen(true); setMobileNav(false); }} className="btn-mc btn-mc-ghost flex-1 py-2 rounded text-sm">Войти</button>
              <button onClick={() => { setRegOpen(true); setMobileNav(false); }} className="btn-mc btn-mc-primary flex-1 py-2 rounded text-sm">Регистрация</button>
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section id="hero" ref={heroRef}
        className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden grid-bg"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(8,12,18,0.55) 0%, rgba(8,12,18,0.78) 55%, hsl(216,22%,7%) 100%), url(https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/982bde37-eda0-46ec-9379-63391497945d.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-[0.07] blur-3xl pointer-events-none" style={{ background: "hsl(142,68%,44%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-[0.05] blur-3xl pointer-events-none" style={{ background: "hsl(210,80%,58%)" }} />

        <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-6 tracking-widest uppercase"
            style={{ borderColor: "hsla(142,68%,44%,0.35)", background: "hsla(142,68%,44%,0.1)", color: "hsl(142,68%,60%)", fontFamily: "Golos Text, sans-serif" }}>
            <span className="dot-online" /> {totalOnline} игроков онлайн прямо сейчас
          </div>

          <h1 className="text-white leading-none mb-4 text-glow-green"
            style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(3.2rem,9vw,6.5rem)", fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase" }}>
            CRAFT<span className="c-green">WORLD</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: "Golos Text, sans-serif" }}>
            Крупнейший Minecraft-проект России. Выживание, анархия, ролевой и творческий серверы на одной платформе.
          </p>

          {/* ── SERVER CARDS ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
            {SERVERS.map((sv, i) => {
              const pct = Math.round((sv.online / sv.max) * 100);
              return (
                <button key={sv.id} onClick={() => setActiveServer(i)}
                  className={`server-card text-left p-4 ${activeServer === i ? "active" : ""}`}>
                  <div className="text-2xl mb-2">{sv.icon}</div>
                  <div className="font-bold text-white text-sm mb-0.5 uppercase tracking-wide" style={{ fontFamily: "Oswald, sans-serif" }}>{sv.label}</div>
                  <div className="text-xs text-muted-foreground mb-3" style={{ fontFamily: "Golos Text, sans-serif" }}>{sv.version}</div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="flex items-center gap-1.5 font-semibold" style={{ color: sv.color, fontFamily: "Golos Text, sans-serif" }}>
                      <span className="dot-online" style={{ background: sv.color, boxShadow: `0 0 6px ${sv.color}` }} />
                      {sv.online}
                    </span>
                    <span className="text-muted-foreground">{sv.max}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${sv.color}, ${sv.color}cc)` }} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected server detail */}
          <div className="inline-flex items-center gap-3 bg-s2 border border-border rounded-xl px-5 py-3 mb-8 text-sm"
            style={{ fontFamily: "Golos Text, sans-serif" }}>
            <span className="text-xl">{SERVERS[activeServer].icon}</span>
            <div className="text-left">
              <div className="font-semibold text-white">{SERVERS[activeServer].name}</div>
              <div className="text-muted-foreground text-xs">{SERVERS[activeServer].desc}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setRegOpen(true)} className="btn-mc btn-mc-primary px-8 py-3 rounded text-sm">
              Начать играть бесплатно
            </button>
            <button onClick={() => scrollTo("#shop")} className="btn-mc btn-mc-gold px-8 py-3 rounded text-sm">
              Открыть магазин 🛒
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground">
          <Icon name="ChevronDown" size={18} className="animate-bounce" />
        </div>
      </section>

      {/* ══════════════════════ PROMO BANNER ══════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(38,80%,18%), hsl(43,70%,14%))" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 40px)" }} />
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎁</span>
            <div>
              <div className="font-bold text-white uppercase tracking-wide text-sm" style={{ fontFamily: "Oswald, sans-serif" }}>
                СКИДКА 40% НА ВСЕ ПРИВИЛЕГИИ
              </div>
              <div className="text-xs" style={{ color: "hsl(43,95%,65%)", fontFamily: "Golos Text, sans-serif" }}>
                Осталось 6 дней · До 31 мая 2026
              </div>
            </div>
          </div>
          <button onClick={() => scrollTo("#shop")} className="btn-mc btn-mc-gold px-6 py-2 rounded text-sm flex-shrink-0">
            Воспользоваться скидкой →
          </button>
        </div>
      </div>

      {/* ══════════════════════ WHY WE ══════════════════════ */}
      <section id="servers" className="py-20 px-4 bg-s1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow mb-2">Платформа</div>
            <h2 className="section-title mb-3">Почему CraftWorld?</h2>
            <div className="accent-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="bg-s2 border border-border rounded-xl p-5 transition-all duration-200 hover:border-opacity-40 hover:-translate-y-1"
                style={{ animationDelay: `${i*0.07}s`, ["--hover-border" as string]: f.color }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = f.color + "66")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "")}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: f.color + "18", border: `1px solid ${f.color}30` }}>
                  <Icon name={f.icon} fallback="Star" size={18} style={{ color: f.color }} />
                </div>
                <h3 className="font-semibold text-white mb-1.5 text-sm tracking-wide" style={{ fontFamily: "Oswald, sans-serif" }}>{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "Golos Text, sans-serif" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SHOP ══════════════════════ */}
      <section id="shop" className="py-20 px-4 bg-s2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow mb-2">Донат-магазин</div>
            <h2 className="section-title mb-3">Привилегии и статусы</h2>
            <div className="accent-line mx-auto mb-4" />
            <p className="text-muted-foreground text-sm max-w-lg mx-auto" style={{ fontFamily: "Golos Text, sans-serif" }}>
              Поддержи проект и получи уникальные преимущества. Никакого pay-to-win — только косметика и удобства.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SHOP_ITEMS.map((item) => (
              <div key={item.id} className="bg-s1 border border-border rounded-xl overflow-hidden transition-all duration-25 hover:-translate-y-1.5"
                onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + "66"; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.5), 0 0 0 1px ${item.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}>
                {/* Header */}
                <div className="relative p-5 pb-4 text-center" style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}08)` }}>
                  {item.tag && (
                    <div className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded" style={{ background: item.color + "33", color: item.color, fontFamily: "Oswald, sans-serif", letterSpacing: "0.08em" }}>
                      {item.tag}
                    </div>
                  )}
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <div className="font-bold text-white tracking-widest text-lg uppercase" style={{ fontFamily: "Oswald, sans-serif", color: item.color }}>{item.name}</div>
                </div>
                {/* Perks */}
                <div className="p-4">
                  <ul className="space-y-2 mb-5">
                    {item.perks.map(p => (
                      <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground" style={{ fontFamily: "Golos Text, sans-serif" }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {/* Price */}
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <div className="font-bold text-xl text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
                        {item.price} <span className="text-sm text-muted-foreground font-normal">₽</span>
                      </div>
                      {item.oldPrice && (
                        <div className="text-xs line-through text-muted-foreground">{item.oldPrice} ₽</div>
                      )}
                    </div>
                    {item.oldPrice && (
                      <div className="text-xs font-bold px-2 py-1 rounded" style={{ background: "hsla(142,68%,44%,0.15)", color: "hsl(142,68%,55%)", fontFamily: "Oswald, sans-serif" }}>
                        -{Math.round((1 - item.price / item.oldPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  <button className="btn-mc w-full py-2.5 rounded text-xs"
                    style={{ background: item.color, color: "#000", border: `1px solid ${item.color}aa`, fontFamily: "Oswald, sans-serif", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Купить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ TOP PLAYERS ══════════════════════ */}
      <section id="top" className="py-20 px-4 bg-s1">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-eyebrow mb-2">Рейтинг</div>
            <h2 className="section-title mb-3">Топ игроков</h2>
            <div className="accent-line mx-auto mb-6" />
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-6">
            {(["kills", "playtime", "level"] as const).map(tab => (
              <button key={tab} onClick={() => setTopTab(tab)}
                className={`px-5 py-2 rounded text-xs uppercase tracking-widest font-semibold transition-all ${topTab === tab ? "btn-mc btn-mc-primary" : "btn-mc btn-mc-ghost"}`}
                style={{ fontFamily: "Oswald, sans-serif" }}>
                {tab === "kills" ? "Убийства" : tab === "playtime" ? "Время" : "Уровень"}
              </button>
            ))}
          </div>

          {/* Top 3 podium */}
          <div className="grid grid-cols-3 gap-3 mb-5 max-w-xl mx-auto">
            {[sortedTop[1], sortedTop[0], sortedTop[2]].map((p, podiumIdx) => {
              const realRank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
              const heights = ["h-28", "h-36", "h-24"];
              return (
                <div key={p.rank} className={`bg-s2 border border-border rounded-xl flex flex-col items-center justify-end pb-4 pt-3 ${heights[podiumIdx]} transition-all hover:-translate-y-1`}
                  style={realRank === 1 ? { borderColor: "hsl(43,95%,55%)", boxShadow: "0 0 20px hsla(43,95%,55%,0.2)" } : {}}>
                  <div className="text-2xl mb-1">{rankBadge(realRank)}</div>
                  <div className="font-bold text-white text-xs text-center px-2 truncate w-full text-center" style={{ fontFamily: "Oswald, sans-serif" }}>{p.name}</div>
                  {p.prefix && (
                    <div className="text-xs mt-0.5 px-2 py-0.5 rounded font-bold" style={{ background: prefixColor(p.prefix) + "22", color: prefixColor(p.prefix), fontFamily: "Oswald, sans-serif", fontSize: "0.6rem" }}>[{p.prefix}]</div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "Golos Text, sans-serif" }}>
                    {topTab === "kills" ? p.kills.toLocaleString() + " убийств" : topTab === "playtime" ? p.playtime : `${p.level} ур.`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table */}
          <div className="bg-s2 rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-5 py-2.5 border-b border-border bg-s3 text-xs text-muted-foreground uppercase tracking-widest"
              style={{ fontFamily: "Golos Text, sans-serif" }}>
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4">Игрок</div>
              <div className="col-span-3 text-center">Сервер</div>
              <div className="col-span-4 text-center">{topTab === "kills" ? "Убийства" : topTab === "playtime" ? "Время" : "Уровень"}</div>
            </div>
            {sortedTop.slice(3).map((p, i) => (
              <div key={p.rank}
                className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-border/40 last:border-0 hover:bg-white/[0.02] transition-all"
                style={{ fontFamily: "Golos Text, sans-serif" }}>
                <div className={`col-span-1 text-center text-sm font-bold ${rankClass(i + 4)}`}>{i + 4}</div>
                <div className="col-span-4 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-black flex-shrink-0"
                    style={{ background: "hsl(142,68%,44%)" }}>
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">{p.name}</div>
                    {p.prefix && <div className="text-xs" style={{ color: prefixColor(p.prefix), fontSize: "0.6rem" }}>[{p.prefix}]</div>}
                  </div>
                </div>
                <div className="col-span-3 text-center text-xs text-muted-foreground self-center">{p.server}</div>
                <div className="col-span-4 text-center text-xs font-semibold self-center c-green">
                  {topTab === "kills" ? p.kills.toLocaleString() : topTab === "playtime" ? p.playtime : `${p.level} ур.`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ NEWS ══════════════════════ */}
      <section id="news" className="py-20 px-4 bg-s2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-eyebrow mb-2">Медиа</div>
              <h2 className="section-title">Новости</h2>
              <div className="accent-line mt-3" />
            </div>
            <button className="btn-mc btn-mc-outline px-5 py-2 rounded text-xs hidden sm:block">
              Все новости →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {NEWS.map((n, i) => (
              <div key={n.id} className="news-card cursor-pointer">
                <div className="relative overflow-hidden h-44">
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,12,18,0.85) 0%, transparent 60%)" }} />
                  <div className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded uppercase tracking-widest"
                    style={{ background: "hsla(142,68%,44%,0.85)", color: "#fff", fontFamily: "Oswald, sans-serif" }}>
                    {n.tag}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-2" style={{ fontFamily: "Golos Text, sans-serif" }}>{n.date}</div>
                  <h3 className="font-semibold text-white text-sm leading-snug" style={{ fontFamily: "Oswald, sans-serif" }}>{n.title}</h3>
                  <button className="text-xs c-green mt-3 hover:underline flex items-center gap-1" style={{ fontFamily: "Golos Text, sans-serif" }}>
                    Читать далее <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ RULES ══════════════════════ */}
      <section id="rules" className="py-20 px-4 bg-s1">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow mb-2">Регламент</div>
            <h2 className="section-title mb-3">Правила сервера</h2>
            <div className="accent-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {RULES_LIST.map((r) => (
              <div key={r.n} className="bg-s2 border border-border rounded-xl p-5 flex gap-4 transition-all hover:border-opacity-30 hover:-translate-y-0.5"
                onMouseEnter={e => e.currentTarget.style.borderColor = "hsla(142,68%,44%,0.4)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = ""}>
                <div className="font-bold text-3xl leading-none flex-shrink-0 w-10" style={{ color: "hsla(142,68%,44%,0.22)", fontFamily: "Oswald, sans-serif" }}>
                  {r.n}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>{r.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "Golos Text, sans-serif" }}>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-3 bg-red-950/25 border border-red-800/35 rounded-xl p-4">
            <Icon name="AlertTriangle" size={18} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(0,72%,60%)" }} />
            <p className="text-xs text-red-300/75 leading-relaxed" style={{ fontFamily: "Golos Text, sans-serif" }}>
              Нарушение правил влечёт предупреждение, мут, временный или перманентный бан. Незнание правил не освобождает от ответственности.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer className="bg-s2 border-t border-border">
        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: "hsla(142,68%,44%,0.15)", border: "1px solid hsla(142,68%,44%,0.35)" }}>⛏</div>
              <span className="font-bold tracking-widest text-white uppercase" style={{ fontFamily: "Oswald, sans-serif" }}>
                Craft<span className="c-green">World</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: "Golos Text, sans-serif" }}>
              Крупнейший Minecraft-проект России с 2019 года. 4 сервера, 50 000+ игроков.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground" style={{ fontFamily: "Golos Text, sans-serif" }}>
              <span className="dot-online" /> <span className="text-white font-semibold">{totalOnline}</span> онлайн
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>Навигация</h4>
            <ul className="space-y-2.5">
              {NAV_LEFT.map(l => (
                <li key={l.label}>
                  <button onClick={() => scrollTo(l.href)} className="text-xs text-muted-foreground hover:text-white transition-colors" style={{ fontFamily: "Golos Text, sans-serif" }}>{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Серверы */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>Серверы</h4>
            <ul className="space-y-2.5">
              {SERVERS.map(sv => (
                <li key={sv.id} className="flex items-center gap-2">
                  <span className="dot-online" style={{ background: sv.color, boxShadow: `0 0 5px ${sv.color}` }} />
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "Golos Text, sans-serif" }}>{sv.name}</span>
                  <span className="text-xs ml-auto font-semibold" style={{ color: sv.color, fontFamily: "Golos Text, sans-serif" }}>{sv.online}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>Контакты</h4>
            <ul className="space-y-2.5">
              {[
                { icon: "Server", text: "play.craftworld.ru" },
                { icon: "MessageSquare", text: "Discord" },
                { icon: "Send", text: "Telegram" },
                { icon: "Mail", text: "admin@craftworld.ru" },
              ].map(c => (
                <li key={c.text} className="flex items-center gap-2">
                  <Icon name={c.icon} fallback="Circle" size={13} className="c-green flex-shrink-0" />
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "Golos Text, sans-serif" }}>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border px-4 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "Golos Text, sans-serif" }}>© 2019–2026 CraftWorld. Не аффилирован с Mojang Studios.</p>
          <div className="flex gap-4 text-xs text-muted-foreground" style={{ fontFamily: "Golos Text, sans-serif" }}>
            <button className="hover:text-white transition-colors">Политика конфиденциальности</button>
            <button className="hover:text-white transition-colors">Пользовательское соглашение</button>
          </div>
        </div>
      </footer>

      {/* ══════════════════════ LOGIN MODAL ══════════════════════ */}
      {loginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={e => e.target === e.currentTarget && setLoginOpen(false)}>
          <div className="bg-s2 border border-border rounded-2xl w-full max-w-sm p-7 fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-xl uppercase tracking-wide" style={{ fontFamily: "Oswald, sans-serif" }}>Вход в аккаунт</h2>
              <button onClick={() => setLoginOpen(false)} className="text-muted-foreground hover:text-white p-1"><Icon name="X" size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1.5" style={{ fontFamily: "Golos Text, sans-serif" }}>Никнейм</label>
                <input placeholder="ShadowKnight_" className="w-full bg-s3 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-green-500/50 transition-colors" style={{ fontFamily: "Golos Text, sans-serif" }} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1.5" style={{ fontFamily: "Golos Text, sans-serif" }}>Пароль</label>
                <input type="password" placeholder="••••••••" className="w-full bg-s3 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-green-500/50 transition-colors" style={{ fontFamily: "Golos Text, sans-serif" }} />
              </div>
              <button className="btn-mc btn-mc-primary w-full py-3 rounded text-sm mt-2">Войти</button>
              <p className="text-center text-xs text-muted-foreground pt-1" style={{ fontFamily: "Golos Text, sans-serif" }}>
                Нет аккаунта?{" "}
                <button className="c-green hover:underline" onClick={() => { setLoginOpen(false); setRegOpen(true); }}>Зарегистрироваться</button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════ REGISTER MODAL ══════════════════════ */}
      {regOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={e => e.target === e.currentTarget && setRegOpen(false)}>
          <div className="bg-s2 border border-border rounded-2xl w-full max-w-sm p-7 fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-xl uppercase tracking-wide" style={{ fontFamily: "Oswald, sans-serif" }}>Регистрация</h2>
              <button onClick={() => setRegOpen(false)} className="text-muted-foreground hover:text-white p-1"><Icon name="X" size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1.5" style={{ fontFamily: "Golos Text, sans-serif" }}>Никнейм</label>
                <input placeholder="CoolPlayer2026" className="w-full bg-s3 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-green-500/50 transition-colors" style={{ fontFamily: "Golos Text, sans-serif" }} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1.5" style={{ fontFamily: "Golos Text, sans-serif" }}>E-mail</label>
                <input type="email" placeholder="player@mail.ru" className="w-full bg-s3 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-green-500/50 transition-colors" style={{ fontFamily: "Golos Text, sans-serif" }} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1.5" style={{ fontFamily: "Golos Text, sans-serif" }}>Пароль</label>
                <input type="password" placeholder="••••••••" className="w-full bg-s3 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-green-500/50 transition-colors" style={{ fontFamily: "Golos Text, sans-serif" }} />
              </div>
              <button className="btn-mc btn-mc-primary w-full py-3 rounded text-sm mt-2">Создать аккаунт</button>
              <p className="text-center text-xs text-muted-foreground pt-1" style={{ fontFamily: "Golos Text, sans-serif" }}>
                Уже есть аккаунт?{" "}
                <button className="c-green hover:underline" onClick={() => { setRegOpen(false); setLoginOpen(true); }}>Войти</button>
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
