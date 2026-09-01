import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Braces,
  CheckCircle2,
  Code2,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  Send,
  Terminal,
  Wrench,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import calculatorImage from "@/assets/projects/ai-calculator-showcase.jpg";
import sanskariImage from "@/assets/projects/sanskari-ai-showcase.jpg";
import studymateImage from "@/assets/projects/studymate-ai-showcase.jpg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  education,
  portfolioLinks,
  projects,
  certifications,
  type Certification,
  skillGroups,
  type Project,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anmol Kumar — Python Developer & AI Engineer" },
      {
        name: "description",
        content:
          "Explore Anmol Kumar's Python, AI, and desktop software projects, technical skills, education, and developer journey.",
      },
      { property: "og:title", content: "Anmol Kumar — Developer Portfolio" },
      {
        property: "og:description",
        content: "Python developer and aspiring AI engineer building intelligent, automation-first software.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Education", "education"],
  ["Certificates", "certifications"],
  ["Contact", "contact"],
] as const;

const skillIcons = [Code2, Braces, Wrench, Database, Terminal];

function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -62%", threshold: [0.05, 0.3, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="technical-grid min-h-screen text-foreground">
      <SiteHeader activeSection={activeSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function SiteHeader({
  activeSection,
  menuOpen,
  setMenuOpen,
}: {
  activeSection: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="mx-auto max-w-6xl border border-border/80 bg-background/85 shadow-2xl backdrop-blur-xl">
        <div className="grid h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-3 sm:flex sm:h-16 sm:justify-between sm:px-4">
          <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="Anmol Kumar, home">
            <span className="grid size-8 shrink-0 place-items-center border border-primary/60 font-mono text-xs text-primary">
              AK
            </span>
            <span className="truncate font-mono text-[11px] uppercase tracking-[0.22em] text-mist">
              Anmol Kumar
            </span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative px-2.5 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  activeSection === id ? "text-primary" : "text-mist hover:text-foreground"
                }`}
              >
                {label}
                {activeSection === id && <span className="absolute inset-x-2 bottom-0 h-px bg-primary" />}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-1 sm:flex">
            <Button variant="ghost" size="icon" asChild aria-label="GitHub profile">
              <a href={portfolioLinks.github} target="_blank" rel="noreferrer">
                <Github />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="LinkedIn profile">
              <a href={portfolioLinks.linkedin} target="_blank" rel="noreferrer">
                <Linkedin />
              </a>
            </Button>
            <Button variant="terminal" size="sm" asChild>
              <a href={portfolioLinks.resume} target="_blank" rel="noreferrer">
                Resume <Download />
              </a>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="border-t border-border p-3 sm:hidden" aria-label="Mobile navigation">
            <div className="grid grid-cols-2 gap-px bg-border">
              {navItems.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`bg-background px-4 py-3 font-mono text-xs uppercase tracking-widest ${
                    activeSection === id ? "text-primary" : "text-mist"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="terminal" size="sm" className="flex-1" asChild>
                <a href={portfolioLinks.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>
              </Button>
              <Button variant="terminal" size="sm" className="flex-1" asChild>
                <a href={portfolioLinks.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative mx-auto flex min-h-[92vh] max-w-6xl scroll-mt-24 items-center px-6 pb-20 pt-32 sm:pt-36">
      <div className="w-full">
        <div className="reveal mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-primary sm:text-xs sm:tracking-[0.3em]">
          <span className="pulse-signal size-2 shrink-0 rounded-full bg-primary" />
          Available for internships / opportunities
        </div>
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_21rem]">
          <div className="min-w-0">
            <p className="reveal mb-3 font-mono text-xs uppercase tracking-[0.24em] text-mist [animation-delay:80ms]">Hi, I'm</p>
            <h1 className="reveal font-display text-[clamp(3.5rem,11vw,8rem)] font-bold leading-[0.82] tracking-normal text-foreground [animation-delay:120ms]">
              ANMOL<br />
              <span className="text-signal-glow text-primary">KUMAR</span>
            </h1>
            <p className="reveal mt-8 max-w-2xl font-display text-xl font-medium leading-snug text-foreground sm:text-2xl [animation-delay:180ms]">
              Building intelligent software with Python, AI &amp; modern technology.
            </p>
            <p className="reveal mt-4 text-sm text-mist sm:text-base [animation-delay:220ms]">
              BCA Student <span className="text-primary">•</span> Python Developer <span className="text-primary">•</span> Aspiring AI Engineer
            </p>
            <div className="reveal mt-9 flex flex-wrap gap-3 [animation-delay:280ms]">
              <Button variant="signal" size="command" asChild>
                <a href="#projects">View my work <ArrowUpRight /></a>
              </Button>
              <Button variant="terminal" size="command" asChild>
                <a href={portfolioLinks.resume} target="_blank" rel="noreferrer">Download resume <Download /></a>
              </Button>
              <Button variant="link" className="font-mono text-xs uppercase tracking-widest" asChild>
                <a href="#contact">Let's connect →</a>
              </Button>
            </div>
          </div>
          <div className="hidden border-l border-border pl-7 lg:block">
            <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-mist">
              <span>Developer node</span><span className="text-primary">Online</span>
            </div>
            <div className="relative aspect-square overflow-hidden border border-border bg-surface/80">
              <div className="absolute inset-8 border border-primary/20" />
              <div className="absolute inset-16 border border-violet/20" />
              <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-primary bg-primary/10 shadow-signal" />
              <div className="absolute inset-x-5 bottom-5 font-mono text-[9px] uppercase leading-5 tracking-widest text-mist">
                <p>&gt; focus: applied ai</p>
                <p>&gt; primary: python</p>
                <p className="text-primary">&gt; status: building_</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
          {[
            ["BCA", "2025 — 2028"],
            ["8.81", "Current CGPA"],
            ["03", "Major projects"],
            ["Python", "Primary language"],
          ].map(([value, label]) => (
            <div key={label} className="bg-surface/90 px-4 py-5 sm:px-5">
              <div className="font-mono text-xl text-primary sm:text-2xl">{value}</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-mist sm:text-[10px]">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ number, title, meta }: { number: string; title: string; meta: string }) {
  return (
    <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="font-mono text-xs text-primary">{number}</span>
        <h2 className="truncate font-mono text-xs uppercase tracking-[0.22em] text-primary sm:tracking-[0.3em]">{title}</h2>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-mist">{meta}</span>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-28 border-t border-border/70 px-6 py-20 sm:py-24">
      <SectionHeading number="01" title="About / current focus" meta="Profile" />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl">
            I’m a BCA student who turns ideas into working programs — with a deliberate focus on
            <span className="text-primary"> Python and applied AI.</span>
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-mist">
            Based in Patna, Bihar, I build voice assistants, automation tools, and useful desktop applications. I’m developing the engineering fundamentals to create dependable AI-powered software.
          </p>
        </div>
        <aside className="border-l border-border pl-6 md:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">Currently learning</p>
          <div className="mt-5 grid grid-cols-2 gap-px bg-border">
            {["Python", "C", "DSA", "Git / GitHub", "AI", "Machine Learning"].map((item) => (
              <div key={item} className="bg-background px-3 py-3 font-mono text-xs text-foreground">{item}</div>
            ))}
          </div>
          <div className="mt-6 space-y-2 font-mono text-[10px] uppercase tracking-widest text-mist">
            <p><span className="text-primary">Base</span> Patna, Bihar, India</p>
            <p><span className="text-primary">Mode</span> Student → Developer</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-28 border-t border-border/70 px-6 py-20 sm:py-24">
      <SectionHeading number="02" title="Technology ecosystem" meta="Capabilities" />
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => {
          const Icon = skillIcons[index % skillIcons.length] ?? Code2;
          return (
            <article key={group.category} className="group min-h-52 bg-surface p-5 transition-colors hover:bg-secondary">
              <Icon className="size-5 text-primary transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true" />
              <h3 className="mt-8 font-mono text-xs uppercase tracking-widest text-foreground">{group.category}</h3>
              <ul className="mt-5 space-y-2">
                {group.skills.map((skill) => <li key={skill} className="text-sm text-mist">{skill}</li>)}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-28 border-t border-border/70 px-6 py-20 sm:py-24">
      <SectionHeading number="03" title="Selected case studies" meta="03 builds" />
      <div className="space-y-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, reverse }: { project: Project; reverse: boolean }) {
  const image =
    project.image === "sanskari"
      ? sanskariImage
      : project.image === "studymate"
        ? studymateImage
        : calculatorImage;
  return (
    <article className="group grid overflow-hidden border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-signal md:grid-cols-2">
      <div className={`flex flex-col justify-between p-6 sm:p-8 ${reverse ? "md:order-2" : ""}`}>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-mist">Case {project.number} — {project.label}</div>
          <h3 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">{project.title}</h3>
          <p className="mt-5 leading-relaxed text-mist">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech, i) => (
              <span key={tech} className={`border px-2.5 py-1 font-mono text-[10px] ${i === 0 ? "border-primary/40 text-primary" : "border-border text-foreground"}`}>{tech}</span>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ProjectDialog project={project} image={image} />
          <Button variant="terminal" size="sm" asChild>
            <a href={project.repository} target="_blank" rel="noreferrer">GitHub <Github /></a>
          </Button>
        </div>
      </div>
      <div className={`overflow-hidden border-t border-border bg-background p-3 md:border-t-0 ${reverse ? "md:order-1 md:border-r" : "md:border-l"}`}>
        <img
          src={image}
          alt={project.imageAlt}
          loading="lazy"
          width={1280}
          height={960}
          className="h-full min-h-72 w-full object-cover grayscale-[18%] transition-transform duration-500 group-hover:scale-[1.025]"
        />
      </div>
    </article>
  );
}

function ProjectDialog({ project, image }: { project: Project; image: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="signal" size="sm">Case study <ArrowUpRight /></Button></DialogTrigger>
      <DialogContent className="max-h-[88vh] max-w-3xl overflow-y-auto border-border bg-background p-0 text-foreground shadow-2xl sm:rounded-none">
        <img src={image} alt="" loading="lazy" width={1280} height={960} className="aspect-[16/7] w-full object-cover" />
        <div className="p-6 sm:p-8">
          <DialogHeader>
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">Case {project.number}</p>
            <DialogTitle className="font-display text-3xl">{project.title}</DialogTitle>
            <DialogDescription className="text-mist">{project.summary}</DialogDescription>
          </DialogHeader>
          <div className="mt-8 grid gap-7 sm:grid-cols-2">
            <CaseBlock title="Problem" copy={project.problem} />
            <CaseBlock title="Solution" copy={project.solution} />
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary">Key features</h4>
              <ul className="mt-3 space-y-2 text-sm text-mist">
                {project.features.map((feature) => <li key={feature} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{feature}</li>)}
              </ul>
            </div>
            <CaseBlock title="What I learned" copy={project.learned} />
          </div>
          <Button variant="terminal" size="command" className="mt-8" asChild>
            <a href={project.repository} target="_blank" rel="noreferrer">View repository <Github /></a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CaseBlock({ title, copy }: { title: string; copy: string }) {
  return <div><h4 className="font-mono text-[10px] uppercase tracking-widest text-primary">{title}</h4><p className="mt-3 text-sm leading-relaxed text-mist">{copy}</p></div>;
}

function Journey() {
  const steps = ["Student", "Programming", "Python", "Projects", "AI / ML", "Software development"];
  return (
    <section className="border-y border-border/70 bg-surface/55">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading number="04" title="My developer journey" meta="Progression" />
        <ol className="grid gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => (
            <li key={step} className="relative bg-background px-4 py-6">
              <span className="font-mono text-[10px] text-primary">0{index + 1}</span>
              <p className="mt-4 font-display text-sm font-medium text-foreground">{step}</p>
              {index < steps.length - 1 && <span className="absolute -right-1.5 top-1/2 z-10 hidden -translate-y-1/2 bg-border px-1 font-mono text-primary lg:block">→</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 sm:py-24">
      <SectionHeading number="05" title="Education" meta="Timeline" />
      <ol>
        {education.map((item, index) => (
          <li key={item.date} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-5 pb-10 last:pb-0 sm:grid-cols-[10rem_1.25rem_minmax(0,1fr)]">
            <time className="hidden pt-0.5 font-mono text-[10px] uppercase tracking-widest text-primary sm:block">{item.date}</time>
            <div className="flex flex-col items-center">
              <span className={`size-3 shrink-0 rounded-full ${index === 0 ? "pulse-signal bg-primary" : index === 1 ? "bg-violet" : "bg-mist"}`} />
              {index < education.length - 1 && <span className="mt-2 w-px flex-1 bg-border" />}
            </div>
            <div className="pb-2">
              <time className="font-mono text-[10px] uppercase tracking-widest text-primary sm:hidden">{item.date}</time>
              <h3 className="mt-1 font-display text-xl font-semibold text-foreground sm:mt-0">{item.title}</h3>
              <p className="mt-1 text-sm text-foreground">{item.place}</p>
              <p className="mt-1 text-sm text-mist">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <article
          role="button"
          tabIndex={0}
          className="group cursor-pointer border border-border bg-surface p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
        >
          <div className="flex items-center justify-between"><Award className="size-5 text-primary" /><span className="font-mono text-[10px] text-mist">// 0{index + 1}</span></div>
          <h3 className="mt-8 font-display font-semibold leading-snug text-foreground">{cert.title}</h3>
          <p className="mt-3 text-xs leading-relaxed text-mist">{cert.detail}</p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-primary">View certificate →</p>
        </article>
      </DialogTrigger>
      <DialogContent className="max-h-[88vh] max-w-3xl overflow-y-auto border-border bg-background p-6 text-foreground sm:rounded-none">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{cert.title}</DialogTitle>
          <DialogDescription className="text-mist">{cert.detail}</DialogDescription>
        </DialogHeader>
        {cert.image && !failed ? (
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="mt-4 w-full border border-border"
          />
        ) : (
          <p className="mt-6 border border-dashed border-border p-8 text-center font-mono text-xs uppercase tracking-widest text-mist">
            Certificate image coming soon
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl scroll-mt-28 border-t border-border/70 px-6 py-20 sm:py-24">
      <SectionHeading number="06" title="Credentials" meta="04 records" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, index) => (
          <CertificationCard key={cert.title} cert={cert} index={index} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.sendForm("service_uzy3khp", "template_16s0grs", form, {
        publicKey: "3sHymfO2y8zllXZ_G",
      });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-28 border-t border-border/70 px-6 py-20 sm:py-28">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary"><span>07</span><span>// Transmit</span></div>
          <h2 className="mt-6 max-w-xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">Let's build something meaningful.</h2>
          <p className="mt-5 max-w-md leading-relaxed text-mist">I'm open to internship opportunities, collaborations and interesting software projects.</p>
          <div className="mt-9 space-y-4 font-mono text-xs">
            <ContactLink icon={Github} label="GitHub" href={portfolioLinks.github} value="github.com/Anmolkumar108" />
            <ContactLink icon={Linkedin} label="LinkedIn" href={portfolioLinks.linkedin} value="in/anmol-singh-361b90343" />
            <ContactLink icon={Mail} label="Email" href={portfolioLinks.email} value="akanmolbhumihar09@gmail.com" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="border border-border bg-surface p-5 sm:p-7" aria-label="Contact Anmol Kumar">
          <div className="grid gap-5">
            <Field label="Name" name="name" type="text" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
            <Field label="Subject" name="subject" type="text" placeholder="Project or opportunity" />
            <label className="font-mono text-[10px] uppercase tracking-widest text-mist">
              Message
              <textarea name="message" required rows={5} placeholder="What would you like to build?" className="mt-2 w-full resize-none border border-border bg-background px-4 py-3 font-sans text-sm normal-case text-foreground outline-none transition-colors placeholder:text-mist/50 focus:border-primary" />
            </label>
            <Button type="submit" variant="signal" size="command" disabled={status === "sending"}>
              {status === "sending" ? "Transmitting..." : "Send message"} <Send />
            </Button>
            <p className={`min-h-5 font-mono text-[10px] uppercase tracking-widest ${status === "error" ? "text-destructive" : "text-primary"}`} role="status" aria-live="polite">
              {status === "sent" && "Message transmitted successfully."}
              {status === "error" && "Transmission failed. Please use the email link."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder: string }) {
  return (
    <label className="font-mono text-[10px] uppercase tracking-widest text-mist">
      {label}
      <input name={name} type={type} required placeholder={placeholder} className="mt-2 h-12 w-full border border-border bg-background px-4 font-sans text-sm normal-case text-foreground outline-none transition-colors placeholder:text-mist/50 focus:border-primary" />
    </label>
  );
}

function ContactLink({ icon: Icon, label, href, value }: { icon: typeof Github; label: string; href: string; value: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="grid grid-cols-[1.25rem_4.5rem_minmax(0,1fr)] items-center gap-3 text-mist transition-colors hover:text-primary">
      <Icon className="size-4" /><span className="text-primary">{label}</span><span className="truncate">{value}</span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto grid max-w-6xl gap-5 px-6 py-9 text-center sm:grid-cols-[minmax(0,1fr)_auto] sm:text-left">
        <div className="min-w-0">
          <p className="font-display font-semibold text-foreground">Anmol Kumar</p>
          <p className="mt-1 text-xs text-mist">BCA Student • Python Developer • Aspiring AI Engineer</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-widest text-mist sm:justify-end">
          <a href={portfolioLinks.github} className="hover:text-primary">GitHub</a>
          <a href={portfolioLinks.linkedin} className="hover:text-primary">LinkedIn</a>
          <a href={portfolioLinks.email} className="hover:text-primary">Email</a>
          <span>© 2026 Anmol Kumar</span>
        </div>
      </div>
    </footer>
  );
}