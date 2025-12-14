import RecipeTable from "./components/RecipeTable";

export default function App() {
  return (
    <div>
      {/* HEADER */}
      <header style={{
          position: "sticky",
  top: 0,
  background: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid #e7d7c1",
  padding: "16px 24px",
  zIndex: 10
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 600 }}>
          🍽️ Recipe Collection
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14 }}>
          Browse • Filter • Discover Recipes
        </p>
      </header>

      {/* CONTENT */}
      <main style={{
        maxWidth: 1280,
        margin: "24px auto",
        padding: "0 24px"
      }}>
        <RecipeTable />
      </main>
    </div>
  );
}
