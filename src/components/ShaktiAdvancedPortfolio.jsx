import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Award,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Command,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  Menu,
  Send,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import {
  getCertificates,
  getExperiences,
  getPlatforms,
  getProfile,
  getProjects,
  getSkills,
  sendMessage,
} from "../services/api";
import "./ShaktiAdvancedPortfolio.css";

/*
  PUBLIC PORTFOLIO
  ----------------
  Architecture:
    Admin Portal -> API -> Database -> Public Portfolio

  This component intentionally contains NO portfolio project/skill/certificate
  content. Public content comes from the existing API service only.

  - Existing API functions are preserved.
  - Arrays and common {data/items/results} response shapes are supported.
  - Explicit draft/private/unpublished records are hidden from the public page.
  - Public data refreshes on first load, tab visibility return and every 30s.
  - UI follows the uploaded portfolio reference: burgundy/red-black theme,
    pill navigation, editorial hero, consistent product cards and service cards.
*/

const NAV = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Explore", "explore"],
  ["Contact", "contact"],
];

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.results)) return value.results;
  return [];
}

function unwrapObject(value) {
  if (!value || typeof value !== "object") return {};
  if (value.data && typeof value.data === "object" && !Array.isArray(value.data)) {
    return value.data;
  }
  if (value.profile && typeof value.profile === "object") return value.profile;
  return value;
}

function firstValue(object, keys, fallback = "") {
  for (const key of keys) {
    const value = object?.[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }
  return fallback;
}

function localMedia(url) {
  if (!url) return "";
  const value = String(url).trim();
  if (!value) return "";

  if (/^data:/i.test(value) || /^blob:/i.test(value)) return value;
  if (/^https?:\/\//i.test(value) && !/\/api\/uploads\//i.test(value)) return value;

  return value.replace(/^https?:\/\/[^/]+(\/api\/uploads\/)/i, "$1");
}

function initials(name) {
  const value = String(name || "").trim();
  if (!value) return "SK";
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function isPublicRecord(item) {
  if (!item || typeof item !== "object") return false;

  if (item.published === false || item.isPublished === false) return false;
  if (item.visible === false || item.isVisible === false) return false;

  const status = String(item.status || item.visibility || "").trim().toLowerCase();
  if (["draft", "private", "hidden", "unpublished", "archived", "inactive"].includes(status)) {
    return false;
  }

  return true;
}

function publicArray(value) {
  return asArray(value).filter(isPublicRecord);
}

function normalizeProfile(value) {
  const profile = unwrapObject(value);

  return {
    ...profile,
    name: firstValue(profile, ["name", "fullName", "displayName"], ""),
    headline: firstValue(profile, ["headline", "title", "role", "designation"], ""),
    bio: firstValue(profile, ["bio", "about", "description", "summary"], ""),
    email: firstValue(profile, ["email", "mail"], ""),
    location: firstValue(profile, ["location", "city", "address"], ""),
    education: firstValue(profile, ["education", "degree", "qualification"], ""),
    photoUrl: localMedia(
      firstValue(profile, ["photoUrl", "photo", "imageUrl", "avatar", "profileImage"])
    ),
    resumeUrl: localMedia(
      firstValue(profile, ["resumeUrl", "resume", "cvUrl", "cv"])
    ),
    socials: {
      ...(profile.socials || {}),
      github: firstValue(
        profile.socials || profile,
        ["github", "githubUrl"],
        ""
      ),
      linkedin: firstValue(
        profile.socials || profile,
        ["linkedin", "linkedinUrl"],
        ""
      ),
      instagram: firstValue(
        profile.socials || profile,
        ["instagram", "instagramUrl"],
        ""
      ),
    },
  };
}

function normalizeProject(item) {
  const tech = firstValue(item, ["tech", "technologies", "technology", "stack"], []);

  return {
    ...item,
    title: firstValue(item, ["title", "name"], "Untitled Project"),
    category: firstValue(item, ["category", "type", "group"], "PROJECT"),
    description: firstValue(item, ["description", "summary", "overview"], ""),
    imageUrl: localMedia(
      firstValue(item, [
        "imageUrl",
        "image",
        "thumbnail",
        "thumbnailUrl",
        "coverImage",
        "coverUrl",
      ])
    ),
    tech: Array.isArray(tech)
      ? tech
      : String(tech || "")
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
    githubUrl: firstValue(item, ["githubUrl", "github", "repoUrl", "repository"], ""),
    liveUrl: firstValue(item, ["liveUrl", "demoUrl", "websiteUrl", "url"], ""),
  };
}

function normalizeSkill(item) {
  const proficiency = Number(
    firstValue(item, ["proficiency", "percentage", "level", "progress"], 0)
  );

  return {
    ...item,
    name: firstValue(item, ["name", "title", "skill"], "Technology"),
    category: firstValue(item, ["category", "type", "group"], "Technology"),
    iconUrl: localMedia(firstValue(item, ["iconUrl", "iconImage", "imageUrl"], "")),
    proficiency: Number.isFinite(proficiency)
      ? Math.max(0, Math.min(100, proficiency))
      : 0,
  };
}

function normalizeExperience(item) {
  return {
    ...item,
    role: firstValue(item, ["role", "title", "position"], "Experience"),
    organisation: firstValue(
      item,
      ["organisation", "organization", "company", "companyName"],
      ""
    ),
    description: firstValue(item, ["description", "summary", "details"], ""),
    startDate: firstValue(item, ["startDate", "from", "date"], ""),
    endDate: firstValue(item, ["endDate", "to"], ""),
  };
}

function normalizeCertificate(item) {
  return {
    ...item,
    title: firstValue(item, ["title", "name"], "Certificate"),
    issuer: firstValue(
      item,
      ["issuer", "organization", "organisation", "provider"],
      ""
    ),
    credentialUrl: firstValue(
      item,
      ["credentialUrl", "url", "verificationUrl", "verifyUrl"],
      ""
    ),
    fileUrl: localMedia(
      firstValue(item, ["fileUrl", "file", "certificateUrl", "documentUrl"])
    ),
    imageUrl: localMedia(
      firstValue(item, [
        "imageUrl",
        "image",
        "thumbnail",
        "thumbnailUrl",
        "preview",
        "certificateImage",
      ])
    ),
  };
}

function normalizePlatform(item) {
  return {
    ...item,
    name: firstValue(item, ["name", "title", "platform"], "Platform"),
    description: firstValue(item, ["description", "summary", "type"], ""),
    url: firstValue(item, ["url", "link", "profileUrl"], ""),
    iconUrl: localMedia(firstValue(item, ["iconUrl", "iconImage", "imageUrl"], "")),
  };
}


function SectionTitle({ number, eyebrow, title, copy }) {
  return (
    <div className="sa-title">
      <div className="sa-section-mark">
        <span>{number}</span>
        <i />
      </div>
      <p className="sa-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className="sa-title-copy">{copy}</p> : null}
    </div>
  );
}

function TechVisual({ profile, skills }) {
  const labels = skills.slice(0, 5).map((skill) => skill.name).filter(Boolean);

  return (
    <aside className="sa-hero-visual" aria-label="Developer profile">
      <div className="sa-portrait-shell">
        <div className="sa-orbit orbit-one" />
        <div className="sa-orbit orbit-two" />
        <div className="sa-portrait">
          {profile.photoUrl ? (
            <img src={profile.photoUrl} alt={profile.name || "Profile"} />
          ) : (
            <span>{initials(profile.name)}</span>
          )}
        </div>
        <span className="sa-portrait-glow" />
      </div>

      {labels.map((name, index) => (
        <span className={`sa-float f${index + 1}`} key={`${name}-${index}`}>
          {name}
        </span>
      ))}
    </aside>
  );
}

function ProjectModal({ project, close }) {
  if (!project) return null;

  return (
    <div className="sa-modal-backdrop" onMouseDown={close}>
      <article
        className="sa-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="sa-modal-head">
          <span>PROJECT / DETAILS</span>
          <button className="sa-close" onClick={close} aria-label="Close">
            <X />
          </button>
        </div>

        {project.imageUrl ? (
          <img className="sa-modal-image" src={project.imageUrl} alt={project.title} />
        ) : null}

        <p className="sa-eyebrow">{project.category || "PROJECT"}</p>
        <h2>{project.title}</h2>
        <p>{project.description || "No project description has been published yet."}</p>

        <div className="sa-tags">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <footer className="sa-modal-links">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <FaGithub /> Source <ArrowUpRight />
            </a>
          ) : null}
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              <ExternalLink /> Live demo <ArrowUpRight />
            </a>
          ) : null}
        </footer>
      </article>
    </div>
  );
}

export default function ShaktiAdvancedPortfolio() {
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [apiWarning, setApiWarning] = useState("");
  const [lastSync, setLastSync] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const loadPortfolio = async (silent = false) => {
    if (!silent) setLoading(true);

    try {
      const responses = await Promise.allSettled([
        getProfile(),
        getProjects(),
        getSkills(),
        getExperiences(),
        getCertificates(),
        getPlatforms(),
      ]);

      const [
        profileResult,
        projectsResult,
        skillsResult,
        experienceResult,
        certificatesResult,
        platformsResult,
      ] = responses;

      let failed = 0;

      if (profileResult.status === "fulfilled") {
        setProfile(normalizeProfile(profileResult.value));
      } else {
        failed += 1;
      }

      if (projectsResult.status === "fulfilled") {
        setProjects(publicArray(projectsResult.value).map(normalizeProject));
      } else {
        failed += 1;
      }

      if (skillsResult.status === "fulfilled") {
        setSkills(publicArray(skillsResult.value).map(normalizeSkill));
      } else {
        failed += 1;
      }

      if (experienceResult.status === "fulfilled") {
        setExperience(publicArray(experienceResult.value).map(normalizeExperience));
      } else {
        failed += 1;
      }

      if (certificatesResult.status === "fulfilled") {
        setCertificates(publicArray(certificatesResult.value).map(normalizeCertificate));
      } else {
        failed += 1;
      }

      if (platformsResult.status === "fulfilled") {
        setPlatforms(publicArray(platformsResult.value).map(normalizePlatform));
      } else {
        failed += 1;
      }

      if (failed === responses.length) {
        setApiWarning("Portfolio API is unavailable. No static portfolio content is being shown.");
      } else if (failed > 0) {
        setApiWarning("Some published portfolio data could not be loaded.");
      } else {
        setApiWarning("");
      }

      setLastSync(new Date());
    } catch {
      setApiWarning("Portfolio API is unavailable. No static portfolio content is being shown.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const initialLoad = async () => {
      if (!active) return;
      await loadPortfolio(false);
    };

    initialLoad();

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") loadPortfolio(true);
    }, 30000);

    const onVisibility = () => {
      if (document.visibilityState === "visible") loadPortfolio(true);
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      active = false;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };

    const shortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
        setCommandQuery("");
      }

      if (event.key === "Escape") {
        setCommandOpen(false);
        setSelected(null);
        setMenu(false);
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("keydown", shortcut);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("keydown", shortcut);
    };
  }, []);

  const go = (id) => {
    setMenu(false);
    setCommandOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filters = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(projects.map((project) => project.category).filter(Boolean))
      ),
    ],
    [projects]
  );

  const visibleProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const commandItems = useMemo(() => {
    const query = commandQuery.trim().toLowerCase();
    if (!query) return NAV;

    return NAV.filter(([label]) => label.toLowerCase().includes(query));
  }, [commandQuery]);

  const submit = async (event) => {
    event.preventDefault();
    setFormStatus("Sending…");

    try {
      const result = await sendMessage({
        name: form.name,
        email: form.email,
        message: form.subject
          ? `[${form.subject}] ${form.message}`
          : form.message,
      });

      setFormStatus(result?.message || "Message sent successfully.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setFormStatus("Could not send the message right now. Please use the email link.");
    }
  };

  const displayName = profile.name || "Portfolio";
  const nameParts = displayName.trim().split(/\s+/);
  const firstName = nameParts.shift() || displayName;
  const restName = nameParts.join(" ");

  return (
    <div className="sa-site">
      <div className="sa-progress" style={{ width: `${progress}%` }} />
      <div className="sa-noise" />
      <div className="sa-glow glow-a" />
      <div className="sa-glow glow-b" />

      {loading ? (
        <div className="sa-loader">
          <strong>SK</strong>
          <span>LOADING PUBLISHED CONTENT</span>
          <i />
        </div>
      ) : null}

      <header className="sa-nav">
        <button className="sa-logo" onClick={() => go("home")} aria-label="Home">
          {initials(profile.name)}
        </button>

        <nav className="sa-desktop-nav">
          {NAV.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="sa-nav-actions">
          <button
            className="sa-command"
            onClick={() => setCommandOpen(true)}
            aria-label="Open command palette"
          >
            <Command />
            <kbd>Ctrl K</kbd>
          </button>

          {profile.resumeUrl ? (
            <a className="sa-resume" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              Resume <Download />
            </a>
          ) : null}

          <button
            className="sa-menu"
            onClick={() => setMenu((value) => !value)}
            aria-label="Menu"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {menu ? (
        <nav className="sa-mobile-nav">
          {NAV.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </nav>
      ) : null}

      <main>
        <section id="home" className="sa-hero">
          <div className="sa-hero-index" aria-hidden="true">
            <span>01</span>
            <i />
            <small>PORTFOLIO / {new Date().getFullYear()}</small>
          </div>
          <div className="sa-hero-copy">
            <p className="sa-kicker"><b>●</b> AVAILABLE FOR SELECTED WORK</p>

            <h1>
              {firstName} {restName ? <em>{restName}</em> : null}
            </h1>

            <h2>{profile.headline || "Building digital products through code."}</h2>

            <p className="sa-hero-description">
              {profile.bio || "Profile information will appear here when published from the Admin Portal."}
            </p>

            <div className="sa-actions">
              <button className="sa-primary" onClick={() => go("projects")}>
                View my projects <ArrowUpRight />
              </button>

              {profile.resumeUrl ? (
                <a className="sa-secondary" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  Download resume <Download />
                </a>
              ) : null}
            </div>

            <div className="sa-socials">
              {profile.socials?.github ? (
                <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
              ) : null}
              {profile.socials?.linkedin ? (
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              ) : null}
              {profile.email ? (
                <a href={`mailto:${profile.email}`} aria-label="Email">
                  <Mail />
                </a>
              ) : null}
            </div>

            {lastSync ? (
              <p className="sa-sync">
                LIVE CONTENT · SYNCED {lastSync.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            ) : null}
          </div>

          <TechVisual profile={profile} skills={skills} />

          <div className="sa-hero-stats" aria-label="Published portfolio summary">
            <div><strong>{String(projects.length).padStart(2, "0")}</strong><span>PROJECTS</span></div>
            <div><strong>{String(skills.length).padStart(2, "0")}</strong><span>TOOLS</span></div>
            <div><strong>{String(certificates.length).padStart(2, "0")}</strong><span>CREDENTIALS</span></div>
            <button onClick={() => go("about")}>SCROLL TO EXPLORE <ChevronRight /></button>
          </div>
        </section>

        <section id="about" className="sa-section">
          <SectionTitle
            number="01"
            eyebrow="ABOUT ME"
            title="A developer focused on building useful things."
            copy={profile.bio}
          />

          <div className="sa-about-grid">
            <article className="sa-editorial">
              <span className="sa-card-label">PROFILE</span>
              <h3>{profile.name || "Profile"}</h3>
              <p>{profile.headline || "Headline will appear from Admin."}</p>
              {profile.location ? <small>{profile.location}</small> : null}
            </article>

            <div className="sa-info-stack">
              <article>
                <GraduationCap />
                <div>
                  <small>EDUCATION</small>
                  <strong>{profile.education || "Not published yet"}</strong>
                </div>
              </article>

              <article>
                <Braces />
                <div>
                  <small>FOCUS</small>
                  <strong>{profile.headline || "Not published yet"}</strong>
                </div>
              </article>

              <article>
                <Check />
                <div>
                  <small>LOCATION</small>
                  <strong>{profile.location || "Not published yet"}</strong>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="skills" className="sa-section">
          <SectionTitle
            number="02"
            eyebrow="TECHNOLOGIES"
            title="Tools I use to turn ideas into products."
            copy="Technology cards are rendered from the published Admin data."
          />

          {skills.length ? (
            <div className="sa-skill-product-grid">
              {skills.map((skill, index) => (
                <article className="sa-skill-product" key={skill._id || skill.id || `${skill.name}-${index}`}>
                  <div className="sa-skill-visual">
                    {skill.iconUrl ? <img src={skill.iconUrl} alt="" /> : <Code2 aria-hidden="true" />}
                    <span className="sa-product-badge">{skill.category}</span>
                    <span className="sa-product-index">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="sa-skill-body">
                    <p className="sa-product-eyebrow">{skill.category}</p>
                    <h3>{skill.name}</h3>
                    <div className="sa-skill-meter">
                      <i style={{ width: `${skill.proficiency}%` }} />
                    </div>
                    <small>{skill.proficiency}% PROFICIENCY</small>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="sa-empty">No published technologies are available.</div>
          )}
        </section>

        <section id="projects" className="sa-section">
          <SectionTitle
            number="03"
            eyebrow="SELECTED WORK"
            title="Projects built with purpose."
            copy="A consistent three-column product-card system keeps every project visually balanced."
          />

          {filters.length > 1 ? (
            <div className="sa-filters">
              {filters.map((item) => (
                <button
                  key={item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : null}

          {visibleProjects.length ? (
            <div className="sa-product-grid">
              {visibleProjects.map((project, index) => (
                <article className="sa-product-card" key={project._id || project.id || `${project.title}-${index}`}>
                  <div className="sa-product-media">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} loading="lazy" />
                    ) : (
                      <div className="sa-product-placeholder">
                        <Code2 />
                        <span>PROJECT</span>
                      </div>
                    )}
                    <span className="sa-product-badge">{project.category}</span>
                    <span className="sa-product-index">{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="sa-product-body">
                    <p className="sa-product-eyebrow">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p className="sa-product-description">
                      {project.description || "Project details have not been published yet."}
                    </p>

                    {project.tech.length ? (
                      <div className="sa-product-tags">
                        {project.tech.slice(0, 6).map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    ) : null}

                    <footer>
                      <button className="sa-product-action primary" onClick={() => setSelected(project)}>
                        Details <ChevronRight />
                      </button>
                      {project.githubUrl ? (
                        <a className="sa-product-action" href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
                          <FaGithub />
                        </a>
                      ) : null}
                      {project.liveUrl ? (
                        <a className="sa-product-action" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Live demo">
                          <ExternalLink />
                        </a>
                      ) : null}
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="sa-empty">No published projects are available.</div>
          )}
        </section>

        <section id="experience" className="sa-section">
          <SectionTitle
            number="04"
            eyebrow="EXPERIENCE"
            title="Learning by building."
            copy="Experience and milestones come directly from published Admin entries."
          />

          {experience.length ? (
            <div className="sa-timeline">
              {experience.map((item, index) => (
                <article key={item._id || item.id || `${item.role}-${index}`}>
                  <time>
                    {item.startDate ? new Date(item.startDate).getFullYear() : "—"}
                  </time>
                  <div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.role}</h3>
                    <b>{item.organisation}</b>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="sa-empty">No published experience entries are available.</div>
          )}
        </section>

        <section id="explore" className="sa-section">
          <SectionTitle
            number="05"
            eyebrow="CREDENTIALS & NETWORK"
            title="Credentials, platforms and places to explore."
          />

          <div className="sa-explore-grid">
            <div>
              <div className="sa-subheading">
                <span>01</span>
                <h3>Certificates</h3>
              </div>

              {certificates.length ? (
                <div className="sa-certificate-grid">
                  {certificates.map((certificate, index) => (
                    <article className="sa-certificate-card" key={certificate._id || certificate.id || `${certificate.title}-${index}`}>
                      <div className="sa-certificate-preview">
                        {certificate.imageUrl ? (
                          <img src={certificate.imageUrl} alt={certificate.title} loading="lazy" />
                        ) : (
                          <div className="sa-certificate-placeholder">
                            <Award />
                          </div>
                        )}
                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="sa-certificate-body">
                        <small>CREDENTIAL</small>
                        <h3>{certificate.title}</h3>
                        <p>{certificate.issuer || "Issuer not published"}</p>
                        {certificate.credentialUrl || certificate.fileUrl ? (
                          <a
                            className="sa-certificate-link"
                            href={certificate.credentialUrl || certificate.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Verify credential <ArrowUpRight />
                          </a>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="sa-empty">No published certificates are available.</div>
              )}
            </div>

            <div>
              <div className="sa-subheading">
                <span>02</span>
                <h3>On the web</h3>
              </div>

              {platforms.length ? (
                <div className="sa-platform-list">
                  {platforms.map((platform, index) => (
                    <a
                      className="sa-platform"
                      href={platform.url || "#"}
                      target={platform.url ? "_blank" : undefined}
                      rel={platform.url ? "noreferrer" : undefined}
                      key={platform._id || platform.id || `${platform.name}-${index}`}
                    >
                      <div className="sa-platform-visual">
                        {platform.iconUrl ? <img src={platform.iconUrl} alt="" /> : <Code2 aria-hidden="true" />}
                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div>
                        <small>ONLINE PROFILE</small>
                        <b>{platform.name}</b>
                        <span>{platform.description || "Profile"}</span>
                      </div>
                      <ArrowUpRight />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="sa-direct-links">
                  {profile.socials?.github ? (
                    <a href={profile.socials.github} target="_blank" rel="noreferrer">
                      <FaGithub /> GitHub <ArrowUpRight />
                    </a>
                  ) : null}
                  {profile.socials?.linkedin ? (
                    <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                      <FaLinkedin /> LinkedIn <ArrowUpRight />
                    </a>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="sa-section sa-contact">
          <div className="sa-contact-copy">
            <p className="sa-eyebrow">06 / GET IN TOUCH</p>
            <h2>Let’s build something <em>together.</em></h2>
            <p>
              Have an idea, collaboration or opportunity? Send a message through the portfolio.
            </p>

            {profile.email ? (
              <a className="sa-email" href={`mailto:${profile.email}`}>
                <Mail /> {profile.email}
              </a>
            ) : null}

            {apiWarning ? <div className="sa-data-note">{apiWarning}</div> : null}
          </div>

          <form className="sa-contact-form" onSubmit={submit}>
            <label>
              Name
              <input
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>

            <label>
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </label>

            <label>
              Subject
              <input
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
              />
            </label>

            <label>
              Message <small>{form.message.length}/800</small>
              <textarea
                required
                maxLength={800}
                rows={5}
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
              />
            </label>

            {formStatus ? <p className="sa-form-status">{formStatus}</p> : null}

            <button className="sa-primary" type="submit">
              Send message <Send />
            </button>
          </form>
        </section>
      </main>

      <footer className="sa-footer">
        <div>
          <button className="sa-logo" onClick={() => go("home")}>{initials(profile.name)}</button>
        </div>
        <div className="sa-footer-copy">
          <b>{profile.name || "Portfolio"}</b>
          <span>{profile.headline || "Public portfolio"}</span>
        </div>
        <nav>
          {NAV.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>
        <a href="/admin" className="sa-admin-link">Admin <ArrowUpRight /></a>
        <small>© {new Date().getFullYear()} {profile.name || "Portfolio"}</small>
      </footer>

      {commandOpen ? (
        <div className="sa-command-layer" onMouseDown={() => setCommandOpen(false)}>
          <section onMouseDown={(event) => event.stopPropagation()}>
            <header>
              <Command />
              <input
                autoFocus
                value={commandQuery}
                onChange={(event) => setCommandQuery(event.target.value)}
                placeholder="Search sections…"
              />
              <button onClick={() => setCommandOpen(false)} aria-label="Close">
                <X />
              </button>
            </header>

            {commandItems.map(([label, id]) => (
              <button key={id} onClick={() => go(id)}>
                Go to {label} <ChevronRight />
              </button>
            ))}

            {profile.socials?.github ? (
              <a href={profile.socials.github} target="_blank" rel="noreferrer">
                Open GitHub <ArrowUpRight />
              </a>
            ) : null}
          </section>
        </div>
      ) : null}

      <ProjectModal project={selected} close={() => setSelected(null)} />
    </div>
  );
}
