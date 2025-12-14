import { useState } from "react";
import StarRating from "./StarRating";

export default function RecipeDrawer({ recipe, onClose }) {
  const [open, setOpen] = useState(false);
  if (!recipe) return null;

  const n = recipe.nutrients || {};

  return (
    <div style={{
      position: "fixed",
  top: 0,
  right: 0,
  height: "100%",
  width: 420,
  background: "#ffffff",
  boxShadow: "-12px 0 40px rgba(0,0,0,0.2)",
  padding: 24,
  zIndex: 1000,
  overflowY: "auto",
  animation: "slideIn 0.25s ease"
    }}>
      <button onClick={onClose} style={{ float: "right" }}>Close</button>

      <h2>{recipe.title}</h2>
      <p>{recipe.cuisine} <StarRating value={recipe.rating} /></p>

      <p><b>Description:</b> {recipe.description || "—"}</p>

      <p>
        <b>Total Time:</b> {recipe.total_time ?? "—"} mins
        <button onClick={() => setOpen(!open)} style={{ marginLeft: 8 }}>
          {open ? "Hide" : "Show"}
        </button>
      </p>

      {open && (
        <>
          <p>Cook Time: {recipe.cook_time ?? "—"}</p>
          <p>Prep Time: {recipe.prep_time ?? "—"}</p>
        </>
      )}

      <h4>Nutrition</h4>
      <table>
        <tbody>
          {[
            "calories","carbohydrateContent","cholesterolContent","fiberContent",
            "proteinContent","saturatedFatContent","sodiumContent",
            "sugarContent","fatContent"
          ].map(k => (
            <tr key={k}>
              <td><b>{k}</b></td>
              <td>{n[k] ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
    
  );
}
<style>
{`
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
`}
</style>