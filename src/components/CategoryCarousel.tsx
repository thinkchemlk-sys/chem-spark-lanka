import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const categories = [
  {
    label: "Physical Chemistry",
    color: "#22d3ee",
    image: "/carousel-chemistry-lab.jpg",
  },
  {
    label: "Organic Chemistry",
    color: "#facc15",
    image: "/carousel-models.jpg",
  },
  {
    label: "Inorganic Chemistry",
    color: "#a78bfa",
    image: "/carousel-chalkboard.jpg",
  },
  {
    label: "Lab Practicals",
    color: "#34d399",
    image: "/carousel-chemistry-lab.jpg",
  },
  {
    label: "A/L Past Papers",
    color: "#fb7185",
    image: "/carousel-study.jpg",
  },
  {
    label: "Chemical Equilibrium",
    color: "#60a5fa",
    image: "/carousel-chalkboard.jpg",
  },
  {
    label: "Exam Technique",
    color: "#f97316",
    image: "/carousel-study.jpg",
  },
  {
    label: "MCQ Practice",
    color: "#22d3ee",
    image: "/carousel-study.jpg",
  },
  {
    label: "Group Study",
    color: "#facc15",
    image: "/carousel-models.jpg",
  },
  {
    label: "University Pathway",
    color: "#f472b6",
    image: "/carousel-chalkboard.jpg",
  },
];

const MoleculeOverlay = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-20 mix-blend-screen"
    viewBox="0 0 200 280"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <g stroke="white" strokeWidth="1" fill="none">
      <circle cx="40" cy="60" r="6" fill="white" fillOpacity="0.6" />
      <circle cx="100" cy="40" r="6" fill="white" fillOpacity="0.6" />
      <circle cx="160" cy="80" r="6" fill="white" fillOpacity="0.6" />
      <circle cx="70" cy="140" r="6" fill="white" fillOpacity="0.6" />
      <circle cx="140" cy="170" r="6" fill="white" fillOpacity="0.6" />
      <circle cx="50" cy="220" r="6" fill="white" fillOpacity="0.6" />
      <circle cx="130" cy="240" r="6" fill="white" fillOpacity="0.6" />
      <line x1="40" y1="60" x2="100" y2="40" />
      <line x1="100" y1="40" x2="160" y2="80" />
      <line x1="40" y1="60" x2="70" y2="140" />
      <line x1="160" y1="80" x2="140" y2="170" />
      <line x1="70" y1="140" x2="140" y2="170" />
      <line x1="70" y1="140" x2="50" y2="220" />
      <line x1="140" y1="170" x2="130" y2="240" />
      <line x1="50" y1="220" x2="130" y2="240" />
    </g>
  </svg>
);

const bullets = [
  "All 14 NIE syllabus units covered in full",
  "Recap papers every week to recall prior week lessons",
  "Structured notes and past paper practice every week",
  "Physical classes in Nugegoda and Pannipitiya",
  "Online classes accessible from anywhere",
  "Ease of access to class recordings through an organized learning management system (LMS)",
];

const CategoryCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const hoveredRef = useRef(false);

  const loopItems = [...categories, ...categories];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const isMobile = () => window.matchMedia("(max-width: 639px)").matches;
    const singleSetWidth = () => track.scrollWidth / 2;

    const tick = () => {
      if (!hoveredRef.current && !isMobile()) {
        offsetRef.current += 0.6;
        const w = singleSetWidth();
        if (offsetRef.current >= w) offsetRef.current -= w;
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative w-full pt-24 md:pt-32 pb-16 bg-primary text-primary-foreground overflow-hidden">


      {/* Carousel: full-bleed on desktop, 2x5 grid on mobile */}
      <div className="hidden sm:block w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ width: "max-content" }}
        >
          {loopItems.map((c, i) => (
            <div
              key={`${c.label}-${i}`}
              onMouseEnter={() => (hoveredRef.current = true)}
              onMouseLeave={() => (hoveredRef.current = false)}
              className="relative shrink-0 overflow-hidden group cursor-pointer"
              style={{ width: 200, height: 280 }}
            >
              <div
                className="absolute top-0 left-0 right-0 z-20"
                style={{ height: 3, backgroundColor: c.color }}
              />
              <img
                src={c.image}
                alt={c.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              <MoleculeOverlay />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h3 className="text-white font-bold text-lg leading-snug">
                  {c.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile grid */}
      <div className="grid grid-cols-2 sm:hidden w-full">
        {categories.map((c) => (
          <div
            key={c.label}
            className="relative overflow-hidden"
            style={{ height: 160 }}
          >
            <div
              className="absolute top-0 left-0 right-0 z-20"
              style={{ height: 3, backgroundColor: c.color }}
            />
            <img
              src={c.image}
              alt={c.label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            <MoleculeOverlay />
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <h3 className="text-white font-bold text-sm leading-snug">
                {c.label}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column callout */}
      <div className="px-6 md:px-12 mt-14 grid gap-8 md:grid-cols-2 md:gap-16 max-w-6xl">
        <h3 className="text-[28px] font-bold leading-tight text-white">
          Chemistry Learning Made Clear
        </h3>
        <ul className="space-y-4">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-white/90">
              <CheckCircle2
                className="h-6 w-6 shrink-0 mt-0.5"
                style={{ color: "#22d3ee" }}
                fill="#22d3ee"
                stroke="hsl(var(--primary))"
              />
              <span className="text-base leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CategoryCarousel;
