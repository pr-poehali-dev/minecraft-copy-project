import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

/* ── IMAGES ── */
const HERO_BG = "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/78705dbb-a67c-47f9-ac7f-2ac7799e799a.jpg";

const HERO_CHARS = [
  { letter: "C", img: "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/3849eb33-b671-43a0-98e9-1cb9eff56cf8.jpg", role: "Страж" },
  { letter: "R", img: "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/5afed0cc-541d-4d78-b804-1fb0a98b76a2.jpg", role: "Лучница" },
  { letter: "A", img: "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/8694e808-d57b-4d01-80e7-5790a658e117.jpg", role: "Воин" },
  { letter: "F", img: "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/82afe984-1b92-48f1-aa10-e184d65514b9.jpg", role: "Крипер" },
  { letter: "T", img: "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/0c393ac2-1c0b-4247-8dd9-29729766c073.jpg", role: "Торговец" },
  { letter: "W", img: "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/fde3dc7b-d88e-44a7-9fb1-60c9b8765d1f.jpg", role: "Эндермен" },
];

const QUEST_SLIDES = [
  {
    id: 0,
    title: "ПУТЬ ШАХТЁРА",
    subtitle: "Путь шахтёра из бедняка",
    desc: "Начни с деревянной кирки и пробейся к алмазной броне. Копай, торгуй, строй — создай своё богатство в недрах земли.",
    img: "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/8694e808-d57b-4d01-80e7-5790a658e117.jpg",
    tag: "ВЫЖИВАНИЕ",
    color: "hsl(142,68%,44%)",
  },
  {
    id: 1,
    title: "ПУТЬ КОРОЛЯ",
    subtitle: "Путь короля сервера",
    desc: "Объедини кланы, захвати территории, стань лидером. Власть достаётся тем, кто умеет управлять и сражаться.",
    img: "https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/3849eb33-b671-43a0-98e9-1cb9eff56cf8.jpg",
    tag: "РОЛЕВОЙ",
    color: "hsl(43,95%,55%)",
  },
];

const FAQ_ITEMS = [
  {
    q: "Что такое CraftWorld?",
    a: "CraftWorld — это виртуальный мир Minecraft с множеством режимов и ролей. Здесь вы можете стать кем угодно, создавая собственную историю вместе с другими игроками.",
    link: null,
  },
  {
    q: "Как начать играть на CraftWorld?",
    a: "Для начала необходимо зарегистрироваться, скачать клиент и подключиться к серверу по адресу play.craftworld.ru.",
    link: "зарегистрироваться",
  },
  {
    q: "Что делать новичку на сервере?",
    a: "Для новых игроков доступен туториал новичка, который поможет освоить основные механики и понять принцип игры.",
    link: null,
  },
  {
    q: "Где найти гайды и Вики по CraftWorld?",
    a: "Подробные гайды, описания механик и режимов собраны в официальной Вики проекта — удобная база знаний для игроков.",
    link: "Вики проекта",
  },
  {
    q: "Где найти правила сервера?",
    a: "Раздел с правилами сервера, жалобами на игроков и мероприятиями можно найти на форуме проекта.",
    link: "форуме проекта",
  },
  {
    q: "Не удаётся войти на CraftWorld?",
    a: "При проблемах со входом рекомендуем обратиться к технической поддержке в официальном Discord-канале проекта.",
    link: "Discord-канале проекта",
  },
];

const NAV_LINKS = [
  { label: "Скачать", href: "#download" },
  { label: "Форум", href: "#forum" },
  { label: "О проекте", href: "#about" },
  { label: "Карьера", href: "#career" },
  { label: "Вики", href: "#wiki" },
  { label: "Магазин", href: "#shop" },
];

export default function Index() {
  const [activeCard, setActiveCard] = useState(2); // middle card active by default
  const [questSlide, setQuestSlide] = useState(0);
  const [popupVisible, setPopupVisible] = useState(true);
  const [disclaimerVisible, setDisclaimerVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalOnline = 12847;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };

  return (
    <div className="min-h-screen bg-dark font-golos">

      {/* ═══════════════════ NAVBAR ═══════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-lg" : "bg-transparent"}`}>
        <div className="max-w-[1320px] mx-auto px-6 flex items-center h-[70px] gap-8">

          {/* Logo */}
          <a href="#" className="flex-shrink-0 flex items-center gap-2" onClick={e => { e.preventDefault(); window.scrollTo({top:0,behavior:"smooth"}); }}>
            <span className="font-oswald text-white font-bold text-2xl tracking-tight flex items-center gap-1.5">
              <span className="text-xl">⛏</span>
              Craft<span className="text-green">World</span>
            </span>
          </a>

          {/* Players */}
          <div className="players-badge flex-shrink-0">
            <Icon name="Users" size={15} style={{ color: "hsl(142,68%,44%)" }} />
            <span className="text-xs font-golos font-normal" style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>ИГРОКОВ:</span>
            <span>{totalOnline.toLocaleString("ru")}</span>
          </div>

          {/* Nav */}
          <div className="hidden md:flex items-center gap-7 ml-4 flex-1 justify-center">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="nav-link">{l.label}</button>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <button className="nav-link flex items-center gap-1.5">
              <Icon name="Globe" size={14} />
              Русский
            </button>
            <button onClick={() => setLoginOpen(true)}
              className="btn btn-green px-5 py-2.5 text-sm">
              Войти
            </button>
          </div>

          <button className="md:hidden ml-auto text-white p-1.5" onClick={() => setMobileNav(!mobileNav)}>
            <Icon name={mobileNav ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileNav && (
          <div className="md:hidden bg-dark2 border-t border-border px-5 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="nav-link text-left py-2">{l.label}</button>
            ))}
            <button onClick={() => { setLoginOpen(true); setMobileNav(false); }}
              className="btn btn-green w-full py-2.5 text-sm mt-2">Войти</button>
          </div>
        )}
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-screen overflow-hidden" id="hero">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="bg" className="w-full h-full object-cover object-center opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(12,12,12,0.95) 100%)" }} />
        </div>

        {/* Cards */}
        <div className="relative z-10 flex flex-col items-center pt-[90px]">
          <div className="w-full max-w-[1320px] mx-auto px-6">
            <div className="flex gap-2.5" style={{ height: "clamp(380px, 52vw, 620px)" }}>
              {HERO_CHARS.map((c, i) => (
                <div
                  key={c.letter}
                  className={`hero-card ${activeCard === i ? "active" : ""}`}
                  onClick={() => setActiveCard(i)}
                >
                  <img src={c.img} alt={c.role} />
                  <div className="letter">{c.letter}</div>

                  {/* Active play button */}
                  <div className="hero-play">
                    <div className="hero-play-btn" onClick={() => setLoginOpen(true)}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="hsl(142,68%,40%)">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                    <div className="hero-play-label">Начать<br />играть</div>
                  </div>

                  {/* Role label bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-1"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }} />
                  <div className="absolute bottom-3 left-0 right-0 text-center z-2 pointer-events-none opacity-70">
                    <span className="font-oswald text-xs text-white tracking-widest uppercase">{c.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimers below cards */}
          <div className="w-full max-w-[1320px] mx-auto px-6 mt-5 flex gap-4 items-start">
            {disclaimerVisible && (
              <div className="disclaimer flex-1 relative">
                <button className="absolute top-2 right-2 text-muted-foreground hover:text-white"
                  onClick={() => setDisclaimerVisible(false)}>
                  <Icon name="X" size={13} />
                </button>
                <div className="font-bold text-white text-xs mb-1 font-oswald tracking-wide uppercase">Дисклеймер</div>
                CraftWorld не связана и не поддерживается Mojang Studios или любым другим правообладателем. Все используемые торговые знаки принадлежат их соответствующим владельцам.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ ABOUT / QUEST SECTION ═══════════════════ */}
      <section id="about" className="relative overflow-hidden py-0" style={{ background: "hsl(0,0%,7%)" }}>
        {/* Decorative side characters */}
        <div className="max-w-[1320px] mx-auto px-6 relative">
          <div className="flex items-center justify-center py-20 relative">

            {/* Left char */}
            <div className="absolute left-0 bottom-0 w-56 opacity-60 pointer-events-none hidden lg:block" style={{ height: "380px" }}>
              <img src={HERO_CHARS[1].img} alt="" className="w-full h-full object-cover object-top"
                style={{ filter: "grayscale(1) brightness(0.5)", maskImage: "linear-gradient(to right, transparent 0%, black 40%, black 100%)" }} />
            </div>

            {/* Right char */}
            <div className="absolute right-0 bottom-0 w-56 opacity-70 pointer-events-none hidden lg:block" style={{ height: "380px" }}>
              <img src={HERO_CHARS[5].img} alt="" className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.6) saturate(1.5) hue-rotate(200deg)", maskImage: "linear-gradient(to left, transparent 0%, black 40%, black 100%)" }} />
            </div>

            {/* Center content */}
            <div className="text-center max-w-2xl mx-auto relative z-10">
              <p className="text-lg text-white leading-relaxed mb-8 font-golos">
                <span className="text-green font-bold">CraftWorld</span> — это виртуальная вселенная Minecraft с множеством ролей, как в реальной жизни. Здесь вы можете стать кем угодно, создавая собственную историю вместе с другими игроками.
              </p>

              <div className="font-oswald text-white text-2xl font-semibold mb-1 tracking-wide">Попробуешь?</div>
              <div className="w-12 h-0.5 bg-green mx-auto mb-8 rounded" />

              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button className="btn btn-outline-white px-7 py-3 text-sm">
                  <Icon name="ChevronLeft" size={16} />
                  Путь шахтёра из бедняков
                </button>
                <button onClick={() => setLoginOpen(true)}
                  className="btn btn-green px-7 py-3 text-sm">
                  Путь короля сервера
                  <Icon name="ChevronRight" size={16} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-10 text-muted-foreground text-sm font-golos">
                <Icon name="MousePointerClick" size={16} />
                Листай дальше, чтобы узнать больше
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ QUEST SLIDER ═══════════════════ */}
      <section id="quests" className="py-12 bg-dark">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="relative overflow-hidden rounded-2xl" style={{ background: "hsl(0,0%,10%)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Text side */}
              <div className="p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-3 font-oswald" style={{ color: QUEST_SLIDES[questSlide].color }}>
                    {QUEST_SLIDES[questSlide].tag}
                  </div>
                  <h2 className="font-oswald font-bold text-white mb-4 leading-tight"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", textTransform: "uppercase" }}>
                    {QUEST_SLIDES[questSlide].title}
                  </h2>
                  <p className="text-muted-foreground font-golos text-sm leading-relaxed mb-8 max-w-sm">
                    {QUEST_SLIDES[questSlide].desc}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={() => setLoginOpen(true)} className="btn btn-green px-6 py-2.5 text-sm">
                    Начать квест
                    <Icon name="ArrowRight" size={15} />
                  </button>
                  <div className="flex gap-2">
                    {QUEST_SLIDES.map((_, i) => (
                      <button key={i} onClick={() => setQuestSlide(i)}
                        className={`slider-dot ${questSlide === i ? "active" : ""}`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Image side */}
              <div className="relative h-56 lg:h-auto overflow-hidden rounded-b-2xl lg:rounded-r-2xl lg:rounded-b-none">
                <img src={QUEST_SLIDES[questSlide].img} alt={QUEST_SLIDES[questSlide].title}
                  className="w-full h-full object-cover object-top transition-all duration-500"
                  style={{ filter: "brightness(0.85)" }} />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to right, hsl(0,0%,10%) 0%, transparent 40%)` }} />
                {/* Slide nav arrows */}
                <button
                  onClick={() => setQuestSlide(q => (q - 1 + QUEST_SLIDES.length) % QUEST_SLIDES.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/75 transition-all">
                  <Icon name="ChevronLeft" size={18} className="text-white" />
                </button>
                <button
                  onClick={() => setQuestSlide(q => (q + 1) % QUEST_SLIDES.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/75 transition-all">
                  <Icon name="ChevronRight" size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section id="faq" className="py-16 bg-dark">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-oswald font-bold text-white text-2xl uppercase tracking-wide">
              Ответы на частые вопросы
            </h2>
            <button className="btn btn-outline-dark px-5 py-2.5 text-xs">
              Открыть справочный раздел
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FAQ_ITEMS.map((f, i) => (
              <div key={i} className="faq-card">
                <h3 className="font-golos font-bold text-white text-sm mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground font-golos leading-relaxed">
                  {f.a.split(f.link ?? "___NOMATCH___").map((part, pi, arr) =>
                    pi < arr.length - 1 ? (
                      <span key={pi}>
                        {part}
                        <a href="#" className="text-green underline underline-offset-2 hover:no-underline" onClick={e => e.preventDefault()}>
                          {f.link}
                        </a>
                      </span>
                    ) : part
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Subscribe block */}
          <div className="mt-10 rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,16%)" }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "hsla(142,68%,44%,0.15)", border: "1px solid hsla(142,68%,44%,0.3)" }}>
                <Icon name="Mail" size={22} className="text-green" />
              </div>
              <div>
                <div className="font-oswald font-bold text-white text-base uppercase tracking-wide">
                  Подпишитесь на новости CraftWorld
                </div>
                <div className="text-sm text-muted-foreground font-golos mt-0.5">
                  Чтобы не пропускать важные события проекта, обновления и персональные бонус-коды
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
              <input
                type="email"
                placeholder="Введи свой email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-dark3 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-green-500/50 transition-colors w-full sm:w-52 font-golos"
              />
              <button className="btn btn-outline-dark px-5 py-2.5 text-sm flex-shrink-0">
                Подписаться
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-golos mt-2 ml-1">
            Подписываясь, вы принимаете{" "}
            <a href="#" className="underline underline-offset-2 hover:text-white" onClick={e => e.preventDefault()}>
              политику обработки персональных данных
            </a>
          </p>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="border-t border-border" style={{ background: "hsl(0,0%,8%)" }}>
        <div className="max-w-[1320px] mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="font-oswald font-bold text-2xl text-white mb-3 flex items-center gap-2">
                <span>⛏</span> Craft<span className="text-green">World</span>
              </div>
              <div className="text-xs text-muted-foreground font-golos space-y-0.5 leading-relaxed">
                <div>ООО «КрафтВорлд Девелопмент»</div>
                <div>ИНН 9703149875</div>
                <div>ОГРН 1237700457862</div>
                <div className="mt-2">Сервер предоставлен CraftWorld Solutions Ltd</div>
                <div>MC-2026</div>
              </div>
            </div>

            {/* Игрокам */}
            <div>
              <h4 className="font-oswald font-bold text-white text-xs uppercase tracking-widest mb-4">Игрокам</h4>
              <ul className="space-y-2.5">
                {["Начать играть", "Форум", "Вики", "Рейтинг"].map(l => (
                  <li key={l}><button className="footer-link">{l}</button></li>
                ))}
              </ul>
            </div>

            {/* Важная информация */}
            <div>
              <h4 className="font-oswald font-bold text-white text-xs uppercase tracking-widest mb-4">Важная информация</h4>
              <ul className="space-y-2.5">
                {["Пользовательское соглашение", "Правила оплаты", "Политика обработки персональных данных", "Правила сервера"].map(l => (
                  <li key={l}><button className="footer-link">{l}</button></li>
                ))}
              </ul>
            </div>

            {/* Контакты */}
            <div>
              <h4 className="font-oswald font-bold text-white text-xs uppercase tracking-widest mb-4">Контакты</h4>
              <ul className="space-y-2.5">
                <li><button className="footer-link">Канал поддержки в Discord</button></li>
                <li><a href="mailto:help@craftworld.ru" className="footer-link">help@craftworld.ru</a></li>
              </ul>

              {/* Payment icons */}
              <div className="flex items-center gap-3 mt-6">
                {["МИР", "VISA", "MC", "⚡СБП"].map(p => (
                  <div key={p} className="bg-dark3 border border-border rounded px-2 py-1 text-xs text-muted-foreground font-bold tracking-wide">
                    {p}
                  </div>
                ))}
              </div>

              {/* System status */}
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground font-golos">
                <span className="dot-on" />
                Все системы в порядке
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════ POPUP BANNER (прomo) ═══════════════════ */}
      {popupVisible && (
        <div className="popup-banner">
          <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden border border-border">
            <img src={HERO_CHARS[0].img} alt="promo" className="w-full h-full object-cover" style={{ filter: "brightness(0.8)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-oswald font-bold text-white text-sm uppercase tracking-wide flex items-center gap-2">
              Ещё не купил ключ?
              <span className="text-green text-xs bg-green/10 border border-green/20 px-2 py-0.5 rounded-full">
                🎁 Дарим 1200 монет
              </span>
            </div>
            <div className="text-xs text-muted-foreground font-golos mt-0.5">Купи привилегию и начинай играть с бонусом</div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => setLoginOpen(true)}
              className="btn btn-green px-3 py-2 text-xs flex items-center gap-1.5">
              <Icon name="ShoppingCart" size={13} />
              1 200 ₽
            </button>
            <button onClick={() => setPopupVisible(false)} className="text-muted-foreground hover:text-white p-0.5">
              <Icon name="X" size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════ LOGIN MODAL ═══════════════════ */}
      {loginOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          onClick={e => e.target === e.currentTarget && setLoginOpen(false)}>
          <div className="bg-dark2 border border-border rounded-2xl w-full max-w-sm p-7 fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="font-oswald font-bold text-white text-xl uppercase tracking-wide flex items-center gap-2">
                <span>⛏</span> Craft<span className="text-green">World</span>
              </div>
              <button onClick={() => setLoginOpen(false)} className="text-muted-foreground hover:text-white p-1">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1.5 font-golos">Никнейм</label>
                <input placeholder="Steve_2026" className="w-full bg-dark3 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none transition-colors font-golos" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest block mb-1.5 font-golos">Пароль</label>
                <input type="password" placeholder="••••••••" className="w-full bg-dark3 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none transition-colors font-golos" />
              </div>
              <button className="btn btn-green w-full py-3 text-sm mt-1 justify-center">Войти</button>
              <p className="text-center text-xs text-muted-foreground font-golos">
                Нет аккаунта?{" "}
                <a href="#" className="text-green hover:underline" onClick={e => e.preventDefault()}>
                  Зарегистрироваться
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
