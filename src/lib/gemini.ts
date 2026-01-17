export async function sendMessage(message: string) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Terjadi kesalahan pada server");
  }

  return data.reply;
}
