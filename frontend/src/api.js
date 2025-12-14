import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function fetchRecipes(page = 1, limit = 15) {
  const res = await axios.get(
    `${API_BASE}/api/recipes?page=${page}&limit=${limit}`
  );
  return res.data;
}

export async function searchRecipes(params) {
  const clean = {};

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      clean[k] = v;
    }
  });

  const query = new URLSearchParams(clean).toString();
  const res = await axios.get(
    `${API_BASE}/api/recipes/search?${query}`
  );
  return res.data;
}
