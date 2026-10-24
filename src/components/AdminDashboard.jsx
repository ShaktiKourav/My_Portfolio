// import { useCallback, useEffect, useState } from "react";
// import { ImageUp, LogOut, Plus, Save, Trash2, X } from "lucide-react";
// import { adminRequest, getAdminProfile, loginAdmin, uploadAdminFile } from "../services/api";

// const defaults = { profile: { name: "Shakti kourav", headline: "", bio: "", location: "", email: "", photoUrl: "", resumeUrl: "", github: "", linkedin: "", instagram: "", leetcode: "", microsoft: "", cloud: "" }, projects: { title: "", slug: "", category: "", description: "", technologies: "", githubUrl: "", liveUrl: "", published: false, featured: false, order: 0 }, skills: { name: "", category: "Other", proficiency: 50, iconUrl: "", published: true, order: 0 }, certificates: { title: "", issuer: "", issuedDate: "", credentialId: "", credentialUrl: "", published: false, order: 0 }, experiences: { role: "", organisation: "", startDate: "", endDate: "", description: "", technologies: "",certificateImageUrl: "",
//   certificatePdfUrl: "", published: true, order: 0 }, platforms: { name: "", type: "Coding", url: "", description: "", iconUrl: "", published: true, order: 0 } };
// const labels = { profile: "Profile", projects: "Projects", skills: "Skills", certificates: "Certificates", experiences: "Experience", platforms: "Platforms", messages: "Inbox" };
// const textFields = { profile: [["name", "Display name"], ["headline", "Headline"], ["bio", "Biography", "textarea"], ["location", "Location"], ["email", "Public email", "email"], ["github", "GitHub URL"], ["linkedin", "LinkedIn URL"], ["instagram", "Instagram URL"], ["leetcode", "LeetCode URL"], ["microsoft", "Microsoft Learn / profile URL"], ["cloud", "Cloud platform URL"], ["photoUrl", "Profile image URL"], ["resumeUrl", "Resume PDF URL"]], projects: [["title", "Project title"], ["slug", "Slug (e.g. my-project)"], ["category", "Category"], ["description", "Description", "textarea"], ["technologies", "Technologies (comma separated)"], ["imageUrl", "Cover image URL"], ["githubUrl", "GitHub URL"], ["liveUrl", "Live demo URL"], ["order", "Display order", "number"]], skills: [["name", "Skill name"], ["category", "Category"], ["proficiency", "Proficiency (0–100)", "number"], ["order", "Display order", "number"]], certificates: [["title", "Certificate title"], ["issuer", "Issuer"], ["issuedDate", "Issue date", "date"], ["credentialId", "Credential ID"], ["credentialUrl", "Credential URL"], ["imageUrl", "Certificate image URL"], ["fileUrl", "Certificate PDF URL"], ["order", "Display order", "number"]],
//   experiences: [["role", "Role / course"], ["organisation", "Company / institution"], ["startDate", "Start date", "date"], ["endDate", "End date", "date"], ["description", "Description", "textarea"], ["technologies", "Technologies (comma separated)"],
//    ["certificateImageUrl", "Certificate image URL"],
//   ["certificatePdfUrl", "Certificate PDF URL"], ["order", "Display order", "number"]],
//    platforms: [["name", "Platform name (e.g. LeetCode)"], ["type", "Type (e.g. Coding, Social, Cloud)"], ["url", "Platform profile URL", "url"], ["description", "Short description", "textarea"], ["order", "Display order", "number"]] };
// textFields.skills.splice(2, 0, ["iconUrl", "Icon image URL"]);
// textFields.platforms.splice(2, 0, ["iconUrl", "Icon image URL"]);

// function normalise(item, section) { const value = { ...defaults[section], ...item }; if (Array.isArray(value.technologies)) value.technologies = value.technologies.join(", "); if (value.issuedDate) value.issuedDate = value.issuedDate.slice(0, 10); if (value.startDate) value.startDate = value.startDate.slice(0, 10); if (value.endDate) value.endDate = value.endDate.slice(0, 10); return value; }
// function toPayload(form) { const payload = { ...form }; delete payload._id; delete payload.createdAt; delete payload.updatedAt; if ("technologies" in payload) payload.technologies = payload.technologies.split(",").map((value) => value.trim()).filter(Boolean); ["order", "proficiency"].forEach((key) => { if (key in payload) payload[key] = Number(payload[key]); }); return payload; }

// export default function AdminDashboard() {
//   const [token, setToken] = useState(() => sessionStorage.getItem("portfolio_admin_token") || ""); const [login, setLogin] = useState({ email: "", password: "" }); const [section, setSection] = useState("projects"); const [items, setItems] = useState([]); const [form, setForm] = useState(null); const [editingId, setEditingId] = useState(""); const [notice, setNotice] = useState("");
//   const load = useCallback(async () => { try { if (section === "profile") { const data = await getAdminProfile(token); setForm({ ...defaults.profile, ...data, ...(data.socials || {}) }); setItems([]); return; } setItems(await adminRequest(`/${section}`, token)); } catch (error) { setNotice(error.message); } }, [section, token]);
//   // Remote data is loaded whenever the authenticated admin changes a section.
//   // eslint-disable-next-line react-hooks/set-state-in-effect
//   useEffect(() => { if (token) void load(); }, [token, load]);
//   async function signIn(event) { event.preventDefault(); try { const data = await loginAdmin(login.email, login.password); sessionStorage.setItem("portfolio_admin_token", data.token); setToken(data.token); setNotice(""); } catch (error) { setNotice(error.message); } }
//   async function save(event) { event.preventDefault(); try { if (section === "profile") { const { github, linkedin, instagram, leetcode, microsoft, cloud, ...profile } = form; await adminRequest("/profile", token, { method: "PATCH", body: JSON.stringify({ ...profile, socials: { github, linkedin, instagram, leetcode, microsoft, cloud } }) }); setNotice("Profile saved successfully."); return; } const path = editingId ? `/${section}/${editingId}` : `/${section}`; await adminRequest(path, token, { method: editingId ? "PATCH" : "POST", body: JSON.stringify(toPayload(form)) }); setForm(null); setEditingId(""); setNotice("Saved successfully."); await load(); } catch (error) { setNotice(error.message); } }
//   async function upload(event, key) { const file = event.target.files?.[0]; if (!file) return; if (file.size > 4 * 1024 * 1024) { setNotice("File is too large. Choose a file below 4 MB."); return; } try { setNotice(`Uploading ${file.name} to your MongoDB media library…`); const result = await uploadAdminFile(file, token); update(key, result.url); setNotice("Upload complete. Click Save to publish it."); } catch (error) { setNotice(`Upload failed: ${error.message}`); } finally { event.target.value = ""; } }
//   async function remove(id) { if (!window.confirm("Delete this item permanently?")) return; try { await adminRequest(`/${section}/${id}`, token, { method: "DELETE" }); setNotice("Deleted."); await load(); } catch (error) { setNotice(error.message); } }
//   const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
//   const navigation = <div className="flex flex-wrap gap-2">{Object.entries(labels).map(([key, value]) => <button key={key} onClick={() => { setSection(key); setForm(null); }} className={`rounded-lg px-3 py-2 text-sm font-bold ${section === key ? "bg-orange-600 text-white" : "bg-[#211811] text-stone-300"}`}>{value}</button>)}<a href="/" className="inline-flex items-center rounded-lg border border-orange-300/30 px-3 py-2 text-sm font-bold text-orange-300">← View portfolio</a></div>;
//   if (!token) return <main className="min-h-screen bg-[#17130f] px-6 py-16 text-[#f8eee6]"><form onSubmit={signIn} className="mx-auto max-w-md rounded-2xl border border-orange-300/20 bg-[#211811] p-8"><p className="text-sm font-bold uppercase tracking-[.2em] text-orange-400">Portfolio manager</p><h1 className="mt-3 text-3xl font-bold">Admin sign in</h1><div className="mt-7 grid gap-4"><input required type="email" placeholder="Admin email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} className="rounded-lg border border-orange-200/20 bg-[#17130f] p-3" /><input required type="password" placeholder="Password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} className="rounded-lg border border-orange-200/20 bg-[#17130f] p-3" /><button className="rounded-lg bg-orange-600 py-3 font-bold text-white">Sign in</button>{notice && <p className="text-sm text-orange-300">{notice}</p>}</div></form></main>;
//   if (section === "profile") return <main className="min-h-screen bg-[#17130f] p-6 text-[#f8eee6]"><div className="mx-auto max-w-5xl"><header className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-bold tracking-[.2em] text-orange-400">PORTFOLIO MANAGER</p><h1 className="text-3xl font-bold">Profile & resume</h1></div>{navigation}</header>{form && <form onSubmit={save} className="rounded-xl border border-orange-200/20 bg-[#211811] p-6"><div className="grid gap-4 md:grid-cols-2">{textFields.profile.map(([key, label, type = "text"]) => <label key={key} className={type === "textarea" ? "md:col-span-2" : ""}><span className="mb-1 block text-sm text-stone-300">{label}</span>{type === "textarea" ? <textarea rows="5" value={form[key] || ""} onChange={(e) => update(key, e.target.value)} className="w-full rounded-lg border border-orange-200/20 bg-[#17130f] p-3" /> : <input type={type} value={form[key] || ""} onChange={(e) => update(key, e.target.value)} className="w-full rounded-lg border border-orange-200/20 bg-[#17130f] p-3" />}</label>)}</div><div className="mt-5 flex flex-wrap gap-3"><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload profile image<input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => upload(e, "photoUrl")} /></label><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload resume PDF<input hidden type="file" accept="application/pdf" onChange={(e) => upload(e, "resumeUrl")} /></label></div>{notice && <p className="mt-4 text-sm text-orange-300">{notice}</p>}<button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-3 font-bold"><Save size={17} />Save profile</button></form>}</div></main>;
//   if (section === "messages") return <main className="min-h-screen bg-[#17130f] p-6 text-[#f8eee6]"><div className="mx-auto max-w-5xl"><header className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-bold tracking-[.2em] text-orange-400">PORTFOLIO MANAGER</p><h1 className="text-3xl font-bold">Contact inbox</h1></div>{navigation}</header><div className="grid gap-4">{items.map((item) => <article key={item._id} className="rounded-xl border border-orange-200/20 bg-[#211811] p-6"><div className="flex flex-wrap justify-between gap-3"><div><h2 className="font-bold">{item.name}</h2><a className="text-sm text-orange-300" href={`mailto:${item.email}`}>{item.email}</a></div><span className="rounded-full border border-orange-300/25 px-3 py-1 text-xs capitalize text-orange-300">{item.status}</span></div><p className="mt-4 whitespace-pre-wrap text-stone-300">{item.message}</p><div className="mt-5 flex gap-3"><button onClick={async () => { await adminRequest(`/messages/${item._id}`, token, { method: "PATCH", body: JSON.stringify({ status: "read" }) }); await load(); }} className="text-sm font-bold text-orange-300">Mark read</button><button onClick={async () => { await adminRequest(`/messages/${item._id}`, token, { method: "PATCH", body: JSON.stringify({ status: "archived" }) }); await load(); }} className="text-sm font-bold text-stone-400">Archive</button></div></article>)}{!items.length && <p className="rounded-xl border border-dashed border-orange-200/20 p-8 text-stone-400">No contact messages yet.</p>}</div></div></main>;
//   return <main className="min-h-screen bg-[#17130f] text-[#f8eee6]"><header className="border-b border-orange-200/15 px-6 py-5"><div className="mx-auto flex max-w-6xl items-center justify-between"><div><p className="text-sm font-bold tracking-[.2em] text-orange-400">CONTENT STUDIO</p><h1 className="text-xl font-bold">Portfolio Manager</h1></div><div className="flex items-center gap-4"><a href="/" className="rounded-lg border border-orange-300/30 px-3 py-2 text-sm font-bold text-orange-300">← View portfolio</a><button onClick={() => { sessionStorage.removeItem("portfolio_admin_token"); setToken(""); }} className="inline-flex items-center gap-2 text-sm text-stone-300"><LogOut size={17} />Sign out</button></div></div></header><div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[180px_1fr]"><aside className="flex gap-2 overflow-auto lg:flex-col">{Object.entries(labels).map(([key, value]) => <button key={key} onClick={() => { setSection(key); setForm(null); }} className={`rounded-lg px-4 py-3 text-left text-sm font-bold ${section === key ? "bg-orange-600 text-white" : "bg-[#211811] text-stone-300"}`}>{value}</button>)}</aside><section><div className="flex items-center justify-between"><div><p className="text-sm text-stone-400">Manage live portfolio content</p><h2 className="text-3xl font-bold">{labels[section]}</h2></div><button onClick={() => { setEditingId(""); setForm(defaults[section]); }} className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 font-bold"><Plus size={17} />Add new</button></div>{notice && <p className="mt-4 text-sm text-orange-300">{notice}</p>}<div className="mt-7 grid gap-3">{items.map((item) => <article key={item._id} className="flex items-center justify-between rounded-xl border border-orange-200/15 bg-[#211811] p-5"><div><h3 className="font-bold">{item.title || item.name || item.role}</h3><p className="mt-1 text-sm text-stone-400">{item.category || item.issuer || item.organisation}</p></div><div className="flex gap-3"><button onClick={() => { setEditingId(item._id); setForm(normalise(item, section)); }} className="text-sm font-bold text-orange-400">Edit</button><button onClick={() => remove(item._id)} className="text-stone-400 hover:text-red-400"><Trash2 size={18} /></button></div></article>)}{!items.length && <p className="rounded-xl border border-dashed border-orange-200/20 p-8 text-stone-400">No {labels[section].toLowerCase()} yet.</p>}</div>{form && <form onSubmit={save} className="mt-8 rounded-xl border border-orange-200/20 bg-[#211811] p-6"><div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-bold">{editingId ? "Edit" : "Add"} {labels[section].slice(0, -1)}</h3><button type="button" onClick={() => setForm(null)}><X size={20} /></button></div><div className="grid gap-4 md:grid-cols-2">{textFields[section].map(([key, label, type = "text"]) => <label key={key} className={type === "textarea" ? "md:col-span-2" : ""}><span className="mb-1 block text-sm text-stone-300">{label}</span>{type === "textarea" ? <textarea required={key === "description"} rows="4" value={form[key] || ""} onChange={(e) => update(key, e.target.value)} className="w-full rounded-lg border border-orange-200/20 bg-[#17130f] p-3" /> : <input required={["title", "name", "role", "organisation", "issuer", "slug", "category"].includes(key)} type={type} value={form[key] || ""} onChange={(e) => update(key, e.target.value)} className="w-full rounded-lg border border-orange-200/20 bg-[#17130f] p-3" />}</label>)}</div>{["skills", "platforms"].includes(section) && <div className="mt-5 rounded-lg border border-dashed border-orange-200/25 p-4"><p className="mb-3 text-sm text-stone-300">Upload a square PNG, WEBP or JPG icon (maximum 4 MB).</p><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload icon image<input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => upload(event, "iconUrl")} /></label></div>}{["projects", "certificates"].includes(section) && <div className="mt-5 rounded-lg border border-dashed border-orange-200/25 p-4"><p className="mb-3 text-sm text-stone-300">Upload directly to Cloudinary (JPG, PNG, WEBP, or PDF; maximum 8 MB).</p><div className="flex flex-wrap gap-3">{section === "projects" && <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload cover image<input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => upload(event, "imageUrl")} /></label>}


//   {section === "certificates" && <><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload certificate image<input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => upload(event, "imageUrl")} /></label><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload certificate PDF<input hidden type="file" accept="application/pdf" onChange={(event) => upload(event, "fileUrl")} /></label></>}</div></div>}<div className="mt-5 flex gap-6"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />Published (visible publicly)</label>
  
//   {section === "experiences" && (
//   <>
//     <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300">
//       <ImageUp size={16} />
//       Upload experience certificate image

//       <input
//         hidden
//         type="file"
//         accept="image/jpeg,image/png,image/webp"
//         onChange={(event) => upload(event, "certificateImageUrl")}
//       />
//     </label>

//     <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300">
//       <ImageUp size={16} />
//       Upload experience certificate PDF

//       <input
//         hidden
//         type="file"
//         accept="application/pdf"
//         onChange={(event) => upload(event, "certificatePdfUrl")}
//       />
//     </label>
//   </>
// )}
  
//   {section === "projects" && <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />Featured</label>}</div><button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-3 font-bold"><Save size={17} />Save</button></form>}</section></div></main>;
// }








































































import { useCallback, useEffect, useState } from "react";
import { ImageUp, LogOut, Plus, Save, Trash2, X } from "lucide-react";
import { adminRequest, getAdminProfile, loginAdmin, uploadAdminFile } from "../services/api";

const defaults = { profile: { name: "Shakti kourav", headline: "", bio: "", location: "", email: "", photoUrl: "", resumeUrl: "", github: "", linkedin: "", instagram: "", leetcode: "", microsoft: "", cloud: "" }, projects: { title: "", slug: "", category: "", description: "", technologies: "", githubUrl: "", liveUrl: "", published: false, featured: false, order: 0 }, skills: { name: "", category: "Other", proficiency: 50, iconUrl: "", published: true, order: 0 }, certificates: { title: "", issuer: "", issuedDate: "", credentialId: "", credentialUrl: "", published: false, order: 0 }, experiences: { role: "", organisation: "", startDate: "", endDate: "", description: "", technologies: "",certificateImageUrl: "",
  certificatePdfUrl: "", published: true, order: 0 }, platforms: { name: "", type: "Coding", url: "", description: "", iconUrl: "", published: true, order: 0 } };
const labels = { profile: "Profile", projects: "Projects", skills: "Skills", certificates: "Certificates", experiences: "Experience", platforms: "Platforms", messages: "Inbox" };
const textFields = { profile: [["name", "Display name"], ["headline", "Headline"], ["bio", "Biography", "textarea"], ["location", "Location"], ["email", "Public email", "email"], ["github", "GitHub URL"], ["linkedin", "LinkedIn URL"], ["instagram", "Instagram URL"], ["leetcode", "LeetCode URL"], ["microsoft", "Microsoft Learn / profile URL"], ["cloud", "Cloud platform URL"], ["photoUrl", "Profile image URL"], ["resumeUrl", "Resume PDF URL"]], projects: [["title", "Project title"], ["slug", "Slug (e.g. my-project)"], ["category", "Category"], ["description", "Description", "textarea"], ["technologies", "Technologies (comma separated)"], ["imageUrl", "Cover image URL"], ["githubUrl", "GitHub URL"], ["liveUrl", "Live demo URL"], ["order", "Display order", "number"]], skills: [["name", "Skill name"], ["category", "Category"], ["proficiency", "Proficiency (0–100)", "number"], ["order", "Display order", "number"]], certificates: [["title", "Certificate title"], ["issuer", "Issuer"], ["issuedDate", "Issue date", "date"], ["credentialId", "Credential ID"], ["credentialUrl", "Credential URL"], ["imageUrl", "Certificate image URL"], ["fileUrl", "Certificate PDF URL"], ["order", "Display order", "number"]],
  experiences: [["role", "Role / course"], ["organisation", "Company / institution"], ["startDate", "Start date", "date"], ["endDate", "End date", "date"], ["description", "Description", "textarea"], ["technologies", "Technologies (comma separated)"],
   ["certificateImageUrl", "Certificate image URL"],
  ["certificatePdfUrl", "Certificate PDF URL"], ["order", "Display order", "number"]],
   platforms: [["name", "Platform name (e.g. LeetCode)"], ["type", "Type (e.g. Coding, Social, Cloud)"], ["url", "Platform profile URL", "url"], ["description", "Short description", "textarea"], ["order", "Display order", "number"]] };
textFields.skills.splice(2, 0, ["iconUrl", "Icon image URL"]);
textFields.platforms.splice(2, 0, ["iconUrl", "Icon image URL"]);

function normalise(item, section) { const value = { ...defaults[section], ...item }; if (Array.isArray(value.technologies)) value.technologies = value.technologies.join(", "); if (value.issuedDate) value.issuedDate = value.issuedDate.slice(0, 10); if (value.startDate) value.startDate = value.startDate.slice(0, 10); if (value.endDate) value.endDate = value.endDate.slice(0, 10); return value; }
function toPayload(form) { const payload = { ...form }; delete payload._id; delete payload.createdAt; delete payload.updatedAt; if ("technologies" in payload) payload.technologies = payload.technologies.split(",").map((value) => value.trim()).filter(Boolean); ["order", "proficiency"].forEach((key) => { if (key in payload) payload[key] = Number(payload[key]); }); return payload; }

export default function AdminDashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem("portfolio_admin_token") || ""); const [login, setLogin] = useState({ email: "", password: "" }); const [section, setSection] = useState("projects"); const [items, setItems] = useState([]); const [form, setForm] = useState(null); const [editingId, setEditingId] = useState(""); const [notice, setNotice] = useState("");
  const load = useCallback(async () => { try { if (section === "profile") { const data = await getAdminProfile(token); setForm({ ...defaults.profile, ...data, ...(data.socials || {}) }); setItems([]); return; } setItems(await adminRequest(`/${section}`, token)); } catch (error) { setNotice(error.message); } }, [section, token]);
  // Remote data is loaded whenever the authenticated admin changes a section.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (token) void load(); }, [token, load]);
  async function signIn(event) { event.preventDefault(); try { const data = await loginAdmin(login.email, login.password); sessionStorage.setItem("portfolio_admin_token", data.token); setToken(data.token); setNotice(""); } catch (error) { setNotice(error.message); } }
  async function save(event) { event.preventDefault(); try { if (section === "profile") { const { github, linkedin, instagram, leetcode, microsoft, cloud, ...profile } = form; await adminRequest("/profile", token, { method: "PATCH", body: JSON.stringify({ ...profile, socials: { github, linkedin, instagram, leetcode, microsoft, cloud } }) }); setNotice("Profile saved successfully."); return; } const path = editingId ? `/${section}/${editingId}` : `/${section}`; await adminRequest(path, token, { method: editingId ? "PATCH" : "POST", body: JSON.stringify(toPayload(form)) }); setForm(null); setEditingId(""); setNotice("Saved successfully."); await load(); } catch (error) { setNotice(error.message); } }
  async function upload(event, key) { const file = event.target.files?.[0]; if (!file) return; if (file.size > 4 * 1024 * 1024) { setNotice("File is too large. Choose a file below 4 MB."); return; } try { const folder = section === "experiences" ? "experiences"
      : section === "certificates" ? "certificates"
      : section === "projects" ? "projects"
      : section === "profile" ? (key === "resumeUrl" ? "resume" : "profile")
      : ["skills", "platforms"].includes(section) ? "skills"
      : "other";
    setNotice(`Uploading ${file.name}…`);
    const result = await uploadAdminFile(file, token, folder);
    update(key, result.url);
    setNotice("Upload complete. Click Save to publish it."); } catch (error) { setNotice(`Upload failed: ${error.message}`); } finally { event.target.value = ""; } }
  async function remove(id) { if (!window.confirm("Delete this item permanently?")) return; try { await adminRequest(`/${section}/${id}`, token, { method: "DELETE" }); setNotice("Deleted."); await load(); } catch (error) { setNotice(error.message); } }
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const navigation = <div className="flex flex-wrap gap-2">{Object.entries(labels).map(([key, value]) => <button key={key} onClick={() => { setSection(key); setForm(null); }} className={`rounded-lg px-3 py-2 text-sm font-bold ${section === key ? "bg-orange-600 text-white" : "bg-[#211811] text-stone-300"}`}>{value}</button>)}<a href="/" className="inline-flex items-center rounded-lg border border-orange-300/30 px-3 py-2 text-sm font-bold text-orange-300">← View portfolio</a></div>;
  if (!token) return <main className="min-h-screen bg-[#17130f] px-6 py-16 text-[#f8eee6]"><form onSubmit={signIn} className="mx-auto max-w-md rounded-2xl border border-orange-300/20 bg-[#211811] p-8"><p className="text-sm font-bold uppercase tracking-[.2em] text-orange-400">Portfolio manager</p><h1 className="mt-3 text-3xl font-bold">Admin sign in</h1><div className="mt-7 grid gap-4"><input required type="email" placeholder="Admin email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} className="rounded-lg border border-orange-200/20 bg-[#17130f] p-3" /><input required type="password" placeholder="Password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} className="rounded-lg border border-orange-200/20 bg-[#17130f] p-3" /><button className="rounded-lg bg-orange-600 py-3 font-bold text-white">Sign in</button>{notice && <p className="text-sm text-orange-300">{notice}</p>}</div></form></main>;
  if (section === "profile") return <main className="min-h-screen bg-[#17130f] p-6 text-[#f8eee6]"><div className="mx-auto max-w-5xl"><header className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-bold tracking-[.2em] text-orange-400">PORTFOLIO MANAGER</p><h1 className="text-3xl font-bold">Profile & resume</h1></div>{navigation}</header>{form && <form onSubmit={save} className="rounded-xl border border-orange-200/20 bg-[#211811] p-6"><div className="grid gap-4 md:grid-cols-2">{textFields.profile.map(([key, label, type = "text"]) => <label key={key} className={type === "textarea" ? "md:col-span-2" : ""}><span className="mb-1 block text-sm text-stone-300">{label}</span>{type === "textarea" ? <textarea rows="5" value={form[key] || ""} onChange={(e) => update(key, e.target.value)} className="w-full rounded-lg border border-orange-200/20 bg-[#17130f] p-3" /> : <input type={type} value={form[key] || ""} onChange={(e) => update(key, e.target.value)} className="w-full rounded-lg border border-orange-200/20 bg-[#17130f] p-3" />}</label>)}</div><div className="mt-5 flex flex-wrap gap-3"><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload profile image<input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => upload(e, "photoUrl")} /></label><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload resume PDF<input hidden type="file" accept="application/pdf" onChange={(e) => upload(e, "resumeUrl")} /></label></div>{notice && <p className="mt-4 text-sm text-orange-300">{notice}</p>}<button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-3 font-bold"><Save size={17} />Save profile</button></form>}</div></main>;
  if (section === "messages") return <main className="min-h-screen bg-[#17130f] p-6 text-[#f8eee6]"><div className="mx-auto max-w-5xl"><header className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-bold tracking-[.2em] text-orange-400">PORTFOLIO MANAGER</p><h1 className="text-3xl font-bold">Contact inbox</h1></div>{navigation}</header><div className="grid gap-4">{items.map((item) => <article key={item._id} className="rounded-xl border border-orange-200/20 bg-[#211811] p-6"><div className="flex flex-wrap justify-between gap-3"><div><h2 className="font-bold">{item.name}</h2><a className="text-sm text-orange-300" href={`mailto:${item.email}`}>{item.email}</a></div><span className="rounded-full border border-orange-300/25 px-3 py-1 text-xs capitalize text-orange-300">{item.status}</span></div><p className="mt-4 whitespace-pre-wrap text-stone-300">{item.message}</p><div className="mt-5 flex gap-3"><button onClick={async () => { await adminRequest(`/messages/${item._id}`, token, { method: "PATCH", body: JSON.stringify({ status: "read" }) }); await load(); }} className="text-sm font-bold text-orange-300">Mark read</button><button onClick={async () => { await adminRequest(`/messages/${item._id}`, token, { method: "PATCH", body: JSON.stringify({ status: "archived" }) }); await load(); }} className="text-sm font-bold text-stone-400">Archive</button></div></article>)}{!items.length && <p className="rounded-xl border border-dashed border-orange-200/20 p-8 text-stone-400">No contact messages yet.</p>}</div></div></main>;
  return <main className="min-h-screen bg-[#17130f] text-[#f8eee6]"><header className="border-b border-orange-200/15 px-6 py-5"><div className="mx-auto flex max-w-6xl items-center justify-between"><div><p className="text-sm font-bold tracking-[.2em] text-orange-400">CONTENT STUDIO</p><h1 className="text-xl font-bold">Portfolio Manager</h1></div><div className="flex items-center gap-4"><a href="/" className="rounded-lg border border-orange-300/30 px-3 py-2 text-sm font-bold text-orange-300">← View portfolio</a><button onClick={() => { sessionStorage.removeItem("portfolio_admin_token"); setToken(""); }} className="inline-flex items-center gap-2 text-sm text-stone-300"><LogOut size={17} />Sign out</button></div></div></header><div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[180px_1fr]"><aside className="flex gap-2 overflow-auto lg:flex-col">{Object.entries(labels).map(([key, value]) => <button key={key} onClick={() => { setSection(key); setForm(null); }} className={`rounded-lg px-4 py-3 text-left text-sm font-bold ${section === key ? "bg-orange-600 text-white" : "bg-[#211811] text-stone-300"}`}>{value}</button>)}</aside><section><div className="flex items-center justify-between"><div><p className="text-sm text-stone-400">Manage live portfolio content</p><h2 className="text-3xl font-bold">{labels[section]}</h2></div><button onClick={() => { setEditingId(""); setForm(defaults[section]); }} className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 font-bold"><Plus size={17} />Add new</button></div>{notice && <p className="mt-4 text-sm text-orange-300">{notice}</p>}<div className="mt-7 grid gap-3">{items.map((item) => <article key={item._id} className="flex items-center justify-between rounded-xl border border-orange-200/15 bg-[#211811] p-5"><div><h3 className="font-bold">{item.title || item.name || item.role}</h3><p className="mt-1 text-sm text-stone-400">{item.category || item.issuer || item.organisation}</p></div><div className="flex gap-3"><button onClick={() => { setEditingId(item._id); setForm(normalise(item, section)); }} className="text-sm font-bold text-orange-400">Edit</button><button onClick={() => remove(item._id)} className="text-stone-400 hover:text-red-400"><Trash2 size={18} /></button></div></article>)}{!items.length && <p className="rounded-xl border border-dashed border-orange-200/20 p-8 text-stone-400">No {labels[section].toLowerCase()} yet.</p>}</div>{form && <form onSubmit={save} className="mt-8 rounded-xl border border-orange-200/20 bg-[#211811] p-6"><div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-bold">{editingId ? "Edit" : "Add"} {labels[section].slice(0, -1)}</h3><button type="button" onClick={() => setForm(null)}><X size={20} /></button></div><div className="grid gap-4 md:grid-cols-2">{textFields[section].map(([key, label, type = "text"]) => <label key={key} className={type === "textarea" ? "md:col-span-2" : ""}><span className="mb-1 block text-sm text-stone-300">{label}</span>{type === "textarea" ? <textarea required={key === "description"} rows="4" value={form[key] || ""} onChange={(e) => update(key, e.target.value)} className="w-full rounded-lg border border-orange-200/20 bg-[#17130f] p-3" /> : <input required={["title", "name", "role", "organisation", "issuer", "slug", "category"].includes(key)} type={type} value={form[key] || ""} onChange={(e) => update(key, e.target.value)} className="w-full rounded-lg border border-orange-200/20 bg-[#17130f] p-3" />}</label>)}</div>{["skills", "platforms"].includes(section) && <div className="mt-5 rounded-lg border border-dashed border-orange-200/25 p-4"><p className="mb-3 text-sm text-stone-300">Upload a square PNG, WEBP or JPG icon (maximum 4 MB).</p><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload icon image<input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => upload(event, "iconUrl")} /></label></div>}{["projects", "certificates"].includes(section) && <div className="mt-5 rounded-lg border border-dashed border-orange-200/25 p-4"><p className="mb-3 text-sm text-stone-300">Upload directly to Cloudinary (JPG, PNG, WEBP, or PDF; maximum 8 MB).</p><div className="flex flex-wrap gap-3">{section === "projects" && <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload cover image<input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => upload(event, "imageUrl")} /></label>}


  {section === "certificates" && <><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload certificate image<input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => upload(event, "imageUrl")} /></label><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300"><ImageUp size={16} />Upload certificate PDF<input hidden type="file" accept="application/pdf" onChange={(event) => upload(event, "fileUrl")} /></label></>}</div></div>}<div className="mt-5 flex gap-6"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />Published (visible publicly)</label>
  
  {section === "experiences" && (
  <>
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300">
      <ImageUp size={16} />
      Upload experience certificate image

      <input
        hidden
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => upload(event, "certificateImageUrl")}
      />
    </label>

    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-orange-300/30 px-3 py-2 text-sm text-orange-300">
      <ImageUp size={16} />
      Upload experience certificate PDF

      <input
        hidden
        type="file"
        accept="application/pdf"
        onChange={(event) => upload(event, "certificatePdfUrl")}
      />
    </label>
  </>
)}
  
  {section === "projects" && <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />Featured</label>}</div><button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-3 font-bold"><Save size={17} />Save</button></form>}</section></div></main>;
}