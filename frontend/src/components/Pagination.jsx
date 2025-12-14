export default function Pagination({ page, limit, total, onPageChange, onLimitChange }) {
  const pages = Math.ceil(total / limit);

  return (
    <div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 20,
  padding: 16,
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
 }}>
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page} / {pages}
      </span>

      <button disabled={page === pages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>

      <select value={limit} onChange={e => onLimitChange(Number(e.target.value))}>
        {[15, 20, 25, 30, 50].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
    </div>
  );
}
