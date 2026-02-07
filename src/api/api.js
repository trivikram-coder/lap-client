export const predictLoan = async (data) => {
  const res = await fetch("http://localhost:5000/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
