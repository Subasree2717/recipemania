import { useEffect, useState } from "react";
import { fetchRecipes, searchRecipes } from "../api";
import StarRating from "./StarRating";
import RecipeDrawer from "./RecipeDrawer";
import Pagination from "./Pagination";

export default function RecipeTable() {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    title: "",
    cuisine: "",
    rating: "",
    calories: "",
    total_time: "",
  });

  const hasFilters = Object.values(filters).some(v => v !== "");

  useEffect(() => {
    loadData();
  }, [page, limit]);

  async function loadData() {
    const res = hasFilters
      ? await searchRecipes({ ...filters, page, limit })
      : await fetchRecipes(page, limit);

    setRecipes(res.data || []);
    setTotal(res.total || 0);
  }

  function handleFilterChange(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function applyFilters() {
    loadData();
  }

  return (
    <div>
      {/* FILTER BAR */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <input placeholder="Title"
          value={filters.title}
          onChange={e => handleFilterChange("title", e.target.value)} />

        <input placeholder="Cuisine"
          value={filters.cuisine}
          onChange={e => handleFilterChange("cuisine", e.target.value)} />

        <input placeholder="Rating >= 4.5"
          value={filters.rating}
          onChange={e => handleFilterChange("rating", e.target.value)} />

        <input placeholder="Calories <= 400"
          value={filters.calories}
          onChange={e => handleFilterChange("calories", e.target.value)} />

        <button onClick={applyFilters}>Search</button>
      </div>

      {/* TABLE */}
      {recipes.length === 0 ? (
        <div style={{background: "#fff",    padding: 40
          
         }}>No recipes found</div>
      ) : (
        <table width="100%">
          <thead>
            <tr>
              <th>Title</th>
              <th>Cuisine</th>
              <th>Rating</th>
              <th>Total Time</th>
              <th>Serves</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map(r => (
              <tr key={r.id} onClick={() => setSelected(r)}>
                <td title={r.title}
                    style={{
                      maxWidth: 280,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                  {r.title}
                </td>
                <td>{r.cuisine || "—"}</td>
                <td><StarRating value={r.rating} /></td>
                <td>{r.total_time ?? "—"}</td>
                <td>{r.serves ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PAGINATION */}
      {total > 0 && (
        <Pagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      )}

      

      {/* DRAWER */}
      {selected && (
        <RecipeDrawer
          recipe={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
