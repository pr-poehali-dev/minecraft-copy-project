import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "shop", label: "Товары" },
  { id: "rules", label: "Правила" },
  { id: "rating", label: "Рейтинг" },
  { id: "contacts", label: "Контакты" },
];

const SHOP_ITEMS = [
  {
    id: 1,
    name: "VIP",
    tag: "tag-vip",
    tagLabel: "VIP",
    price: 299,
    oldPrice: 499,
    icon: "Crown",
    features: ["Приоритетный вход", "Кастомный префикс", "x1.5 к опыту", "Цветной ник", "5 домов"],
    color: "hsl(43, 96%, 56%)",
    popular: false,
  },
  {
    id: 2,
    name: "PREMIUM",
    tag: "tag-premium",
    tagLabel: "PREMIUM",
    price: 599,
    oldPrice: 899,
    icon: "Gem",
    features: ["Всё из VIP", "x2 к опыту", "Полёт на спавне", "10 домов", "Эксклюзивный скин"],
    color: "hsl(280, 70%, 70%)",
    popular: true,
  },
  {
    id: 3,
    name: "ELITE",
    tag: "tag-popular",
    tagLabel: "ELITE",
    price: 999,
    oldPrice: 1499,
    icon: "Zap",
    features: ["Всё из PREMIUM", "x3 к опыту", "Команда /god", "Безлим. дома", "Личный регион"],
    color: "hsl(142, 70%, 50%)",
    popular: false,
  },
  {
    id: 4,
    name: "Стартовый кит",
    tag: "tag-kit",
    tagLabel: "КИТ",
    price: 99,
    icon: "Package",
    features: ["Алмазный меч", "Алмазная броня", "64 × Стейк", "Зелья удачи × 5", "Стартовый ресурс"],
    color: "hsl(200, 80%, 65%)",
    popular: false,
  },
  {
    id: 5,
    name: "Игровая валюта",
    tag: "tag-kit",
    tagLabel: "МОНЕТЫ",
    price: 149,
    icon: "Coins",
    features: ["10 000 игровых монет", "Пополнение баланса", "Покупка у других игроков", "Без ограничений", "Моментально"],
    color: "hsl(43, 96%, 60%)",
    popular: false,
  },
  {
    id: 6,
    name: "VIP × 30 дней",
    tag: "tag-vip",
    tagLabel: "VIP",
    price: 199,
    icon: "Calendar",
    features: ["Временный VIP", "Все привилегии VIP", "30 дней действия", "Приоритетный вход", "Кастомный префикс"],
    color: "hsl(43, 96%, 56%)",
    popular: false,
  },
];

const RULES = [
  {
    num: "01",
    title: "Уважение к игрокам",
    text: "Запрещены оскорбления, угрозы, дискриминация и любые формы агрессии в отношении других игроков и персонала сервера.",
  },
  {
    num: "02",
    title: "Запрет читов и багов",
    text: "Использование запрещённого ПО, чит-клиентов, эксплойтов и дюпов ведёт к перманентному бану без права обжалования.",
  },
  {
    num: "03",
    title: "Запрет рекламы",
    text: "Реклама сторонних серверов, Discord-серверов и внешних ресурсов в чате запрещена.",
  },
  {
    num: "04",
    title: "Честная игра",
    text: "Гриферство, воровство на мирных серверах и намеренное разрушение построек других игроков запрещены.",
  },
  {
    num: "05",
    title: "Спам и флуд",
    text: "Повторяющиеся сообщения, капслок и бессмысленные символы в чате ведут к муту.",
  },
  {
    num: "06",
    title: "Ник и скин",
    text: "Запрещены никнеймы и скины, содержащие нецензурную лексику, политические и оскорбительные символы.",
  },
];

const TOP_PLAYERS = [
  { rank: 1, name: "ShadowKnight", level: 847, kills: 3241, time: "1204 ч", clan: "Dark" },
  { rank: 2, name: "EmeraldQueen", level: 812, kills: 2987, time: "1089 ч", clan: "Emrld" },
  { rank: 3, name: "StoneWarden", level: 799, kills: 2654, time: "1044 ч", clan: "Stone" },
  { rank: 4, name: "DragonSlayer", level: 776, kills: 2401, time: "978 ч", clan: "Drag" },
  { rank: 5, name: "CraftMaster", level: 754, kills: 2198, time: "923 ч", clan: "Crft" },
  { rank: 6, name: "NightHunter", level: 741, kills: 2043, time: "891 ч", clan: "Nght" },
  { rank: 7, name: "IronForge", level: 728, kills: 1876, time: "854 ч", clan: "Iron" },
  { rank: 8, name: "WolfPack", level: 715, kills: 1754, time: "832 ч", clan: "Wolf" },
  { rank: 9, name: "StarGazer", level: 701, kills: 1632, time: "801 ч", clan: "Star" },
  { rank: 10, name: "RedStone", level: 688, kills: 1521, time: "776 ч", clan: "Red" },
];

function getRankStyle(rank: number) {
  if (rank === 1) return "rank-gold";
  if (rank === 2) return "rank-silver";
  if (rank === 3) return "rank-bronze";
  return "text-muted-foreground";
}

function getRankBadge(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

function getAvatarBg(rank: number) {
  if (rank === 1) return "hsl(43,96%,56%)";
  if (rank === 2) return "#C0C0C0";
  if (rank === 3) return "#CD7F32";
  return "hsl(142,70%,45%)";
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [onlinePlayers] = useState(247);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-1 text-foreground">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-1/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
              <div className="w-9 h-9 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center glow-emerald">
                <span className="text-lg">⛏</span>
              </div>
              <span className="font-oswald text-xl font-bold tracking-widest text-white uppercase">
                Craft<span className="text-emerald">World</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-4 py-2 font-montserrat text-sm tracking-wide rounded transition-all duration-200 ${
                    activeSection === link.id
                      ? "text-emerald bg-emerald-500/10"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow inline-block" />
                <span className="text-emerald font-semibold">{onlinePlayers}</span>&nbsp;онлайн
              </div>
              <button onClick={() => scrollTo("shop")} className="btn-primary px-5 py-2 rounded text-sm">
                Магазин
              </button>
            </div>

            <button
              className="md:hidden text-muted-foreground hover:text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-dark-2 border-t border-border px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-3 py-2 text-sm font-montserrat text-muted-foreground hover:text-white hover:bg-white/5 rounded transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,14,20,0.6) 0%, rgba(10,14,20,0.85) 60%, hsl(220,20%,6%) 100%), url(https://cdn.poehali.dev/projects/90fcf2a9-57ef-4ed5-ba99-9aceb0b8affd/files/e3e3ee63-2fc9-4754-9428-ea1b1502f0d2.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(142,70%,45%) 1px, transparent 1px), linear-gradient(90deg, hsl(142,70%,45%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald text-sm font-montserrat mb-8 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
            СЕРВЕР ОНЛАЙН · {onlinePlayers} ИГРОКОВ
          </div>

          <h1
            className="font-oswald font-bold uppercase tracking-tight leading-none mb-6 text-white"
            style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
          >
            CRAFT<span className="text-emerald glow-emerald-text">WORLD</span>
          </h1>

          <p className="font-montserrat text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Серьёзный Minecraft-сервер с уникальной экономикой, PvP-аренами и активным сообществом.
            Построй свою империю. Покори рейтинг.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("shop")} className="btn-primary px-8 py-3.5 rounded text-base">
              Открыть магазин
            </button>
            <button className="btn-outline px-8 py-3.5 rounded text-base">
              play.craftworld.ru
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-6 max-w-xl mx-auto">
            {[
              { val: "5+", label: "Лет работы" },
              { val: "50K+", label: "Игроков" },
              { val: "247", label: "Онлайн" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-oswald text-3xl font-bold text-emerald">{s.val}</div>
                <div className="font-montserrat text-xs text-muted-foreground mt-1 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-montserrat tracking-widest uppercase">Прокрутите</span>
          <Icon name="ChevronDown" size={18} className="animate-bounce" />
        </div>
      </section>

      {/* ── SHOP ── */}
      <section id="shop" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald font-montserrat text-sm tracking-widest uppercase mb-3">Донат-магазин</p>
            <h2 className="section-title text-white mb-4">Товары и привилегии</h2>
            <div className="divider-emerald mx-auto mb-6" />
            <p className="text-muted-foreground font-montserrat max-w-xl mx-auto">
              Поддержи проект и получи эксклюзивные преимущества. Все покупки активируются мгновенно.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOP_ITEMS.map((item, i) => (
              <div
                key={item.id}
                className={`relative bg-dark-2 border border-border rounded-xl p-6 card-hover animate-fade-in ${
                  item.popular ? "border-purple-500/40" : ""
                }`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {item.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-purple-600 text-white text-xs font-oswald px-4 py-1 rounded-full tracking-wider uppercase">
                      Популярное
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon name={item.icon} fallback="Package" size={22} style={{ color: item.color }} />
                  </div>
                  <span className={`text-xs font-oswald px-3 py-1 rounded-full tracking-wider ${item.tag}`}>
                    {item.tagLabel}
                  </span>
                </div>

                <h3 className="font-oswald text-xl font-semibold text-white mb-4 tracking-wide">{item.name}</h3>

                <ul className="space-y-2 mb-6">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-montserrat text-muted-foreground">
                      <Icon name="Check" size={14} className="text-emerald flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-oswald text-2xl font-bold text-white">
                      {item.price}&nbsp;<span className="text-base text-muted-foreground">₽</span>
                    </div>
                    {item.oldPrice && (
                      <div className="text-sm text-muted-foreground line-through">{item.oldPrice} ₽</div>
                    )}
                  </div>
                  <button className="btn-primary px-5 py-2.5 rounded text-sm">Купить</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground font-montserrat">
            {[
              { icon: "Shield", text: "Безопасная оплата" },
              { icon: "Zap", text: "Моментальная выдача" },
              { icon: "Headphones", text: "Поддержка 24/7" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2">
                <Icon name={b.icon} fallback="Star" size={16} className="text-emerald" />
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RULES ── */}
      <section id="rules" className="py-24 px-4 bg-dark-2">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald font-montserrat text-sm tracking-widest uppercase mb-3">Регламент</p>
            <h2 className="section-title text-white mb-4">Правила сервера</h2>
            <div className="divider-emerald mx-auto mb-6" />
            <p className="text-muted-foreground font-montserrat max-w-xl mx-auto">
              Соблюдение правил обязательно для всех игроков. Незнание не освобождает от ответственности.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RULES.map((rule, i) => (
              <div
                key={rule.num}
                className="flex gap-5 bg-dark-3 rounded-xl p-5 border border-border card-hover animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="font-oswald text-4xl font-bold text-emerald/20 leading-none flex-shrink-0 w-12">
                  {rule.num}
                </div>
                <div>
                  <h3 className="font-oswald text-base font-semibold text-white mb-1.5 tracking-wide">
                    {rule.title}
                  </h3>
                  <p className="font-montserrat text-sm text-muted-foreground leading-relaxed">{rule.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-red-950/30 border border-red-800/40 rounded-xl p-5 flex items-start gap-4">
            <Icon name="AlertTriangle" size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="font-montserrat text-sm text-red-300/80 leading-relaxed">
              Нарушение правил влечёт предупреждение, мут, временный или перманентный бан.
              Администрация оставляет за собой право применять санкции на своё усмотрение.
            </p>
          </div>
        </div>
      </section>

      {/* ── RATING ── */}
      <section id="rating" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald font-montserrat text-sm tracking-widest uppercase mb-3">Таблица лидеров</p>
            <h2 className="section-title text-white mb-4">Рейтинг игроков</h2>
            <div className="divider-emerald mx-auto mb-6" />
            <p className="text-muted-foreground font-montserrat max-w-xl mx-auto">
              Топ-10 лучших игроков сервера. Обновляется каждые 24 часа.
            </p>
          </div>

          <div className="bg-dark-2 rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-border bg-dark-3 text-xs font-montserrat text-muted-foreground uppercase tracking-widest">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4">Игрок</div>
              <div className="col-span-2 text-center">Уровень</div>
              <div className="col-span-2 text-center">Убийства</div>
              <div className="col-span-2 text-center">Время</div>
              <div className="col-span-1 text-center">Клан</div>
            </div>

            {TOP_PLAYERS.map((player, i) => (
              <div
                key={player.rank}
                className={`grid grid-cols-12 gap-2 px-5 py-4 border-b border-border/50 last:border-b-0 transition-all hover:bg-white/[0.02] animate-fade-in ${
                  player.rank <= 3 ? "bg-emerald-500/[0.02]" : ""
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={`col-span-1 text-center font-oswald text-base font-bold ${getRankStyle(player.rank)}`}>
                  {getRankBadge(player.rank)}
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-oswald font-bold"
                    style={{ background: getAvatarBg(player.rank), color: "hsl(220,20%,6%)" }}
                  >
                    {player.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className={`font-montserrat font-semibold text-sm ${player.rank <= 3 ? "text-white" : "text-foreground"}`}>
                    {player.name}
                  </span>
                </div>
                <div className="col-span-2 text-center font-montserrat text-sm">
                  <span className="text-emerald font-semibold">{player.level}</span>
                </div>
                <div className="col-span-2 text-center font-montserrat text-sm text-muted-foreground">
                  {player.kills.toLocaleString()}
                </div>
                <div className="col-span-2 text-center font-montserrat text-sm text-muted-foreground">
                  {player.time}
                </div>
                <div className="col-span-1 text-center font-montserrat text-xs text-muted-foreground">
                  [{player.clan}]
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground font-montserrat mt-4">
            Последнее обновление: сегодня в 06:00 МСК
          </p>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 px-4 bg-dark-2">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald font-montserrat text-sm tracking-widest uppercase mb-3">Связь</p>
            <h2 className="section-title text-white mb-4">Контакты</h2>
            <div className="divider-emerald mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="font-oswald text-lg font-semibold text-white tracking-wide">Реквизиты сервера</h3>
              <div className="space-y-3">
                {[
                  { icon: "Server", label: "Игровой адрес", val: "play.craftworld.ru" },
                  { icon: "Globe", label: "Версия", val: "Java 1.20 · Bedrock" },
                  { icon: "MessageSquare", label: "Discord", val: "discord.gg/craftworld" },
                  { icon: "Send", label: "Telegram", val: "@craftworld_mc" },
                  { icon: "Mail", label: "E-mail", val: "admin@craftworld.ru" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 bg-dark-3 rounded-lg px-4 py-3 border border-border">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} fallback="Circle" size={16} className="text-emerald" />
                    </div>
                    <div>
                      <div className="text-xs font-montserrat text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-montserrat font-medium text-white">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: "MessageSquare", label: "Discord" },
                  { icon: "Send", label: "Telegram" },
                  { icon: "Youtube", label: "YouTube" },
                ].map((s) => (
                  <button key={s.label} className="btn-outline px-4 py-2.5 rounded text-sm flex items-center gap-2">
                    <Icon name={s.icon} fallback="Link" size={15} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-dark-3 rounded-xl border border-border p-6">
              <h3 className="font-oswald text-lg font-semibold text-white mb-5 tracking-wide">Написать нам</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Сообщение отправлено! Мы ответим в ближайшее время.");
                  setContactForm({ name: "", email: "", message: "" });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-montserrat text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Ваш никнейм
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="ShadowKnight"
                    className="w-full bg-dark-2 border border-border rounded-lg px-4 py-2.5 text-sm font-montserrat text-white placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-montserrat text-muted-foreground uppercase tracking-wider block mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="player@mail.ru"
                    className="w-full bg-dark-2 border border-border rounded-lg px-4 py-2.5 text-sm font-montserrat text-white placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-montserrat text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Сообщение
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Опишите ваш вопрос..."
                    rows={4}
                    className="w-full bg-dark-2 border border-border rounded-lg px-4 py-2.5 text-sm font-montserrat text-white placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-3 rounded text-sm">
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-dark-1 border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">⛏</span>
            <span className="font-oswald text-base font-bold tracking-widest text-white uppercase">
              Craft<span className="text-emerald">World</span>
            </span>
          </div>
          <p className="text-xs font-montserrat text-muted-foreground">
            © 2024 CraftWorld. Не аффилирован с Mojang Studios.
          </p>
          <div className="flex items-center gap-2 text-xs font-montserrat text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
            <span className="text-emerald">{onlinePlayers}</span>&nbsp;игроков онлайн
          </div>
        </div>
      </footer>

    </div>
  );
}