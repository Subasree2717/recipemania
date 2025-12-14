export default function StarRating({ value = 0 }) {
  const rating = Math.round(Number(value) || 0);

  return (
    <span style={{ color: "#f5a623", fontSize: 16 }}>
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}
