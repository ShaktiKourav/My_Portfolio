const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { headers: { "Content-Type": "application/json" }, ...options });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed.");
  return data;
}

export const getProjects = () => request("/projects");
export const getProfile = () => request("/profile");
export const getSkills = () => request("/skills");
export const getExperiences = () => request("/experiences");
export const getPlatforms = () => request("/platforms");
export const getCertificates = () => request("/certificates");
export const sendMessage = (payload) => request("/contact", { method: "POST", body: JSON.stringify(payload) });

export async function adminRequest(path, token, options = {}) {
  const response = await fetch(`${API_URL}/admin${path}`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...options.headers }, ...options });
  const data = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed.");
  return data;
}

export async function loginAdmin(email, password) { return request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }); }

export async function getAdminProfile(token) {
  const response = await fetch(`${API_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Could not load profile.");
  return data;
}

// export async function uploadAdminFile(file, token) {
//   const body = new FormData();
//   body.append("file", file);
//   const response = await fetch(`${API_URL}/uploads`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.message || "Upload failed.");
//   return data;
// }




export async function uploadAdminFile(file, token, folder = "other") {
  const body = new FormData();

  body.append("file", file);
  body.append("folder", folder);

  const response = await fetch(`${API_URL}/uploads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Upload failed.");
  }

  return data;
}

