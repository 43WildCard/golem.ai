import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `Kamu adalah Golem AI, asisten AI yang sopan, ramah, dan sangat membantu. Kamu diciptakan oleh Rizky Al Santiano untuk membantu pengguna dengan berbagai pertanyaan dan tugas.

Karakteristik kepribadianmu:
- Selalu sopan dan hormat kepada pengguna
- Menjawab dengan jelas dan terstruktur
- Menggunakan bahasa yang mudah dipahami
- Selalu siap membantu dengan sepenuh hati
- Jika tidak yakin, kamu akan jujur mengatakannya
- Mendukung format Markdown untuk jawaban yang lebih rapi

Saat menjawab kode, selalu gunakan code blocks dengan bahasa pemrograman yang sesuai.
Contoh: \`\`\`javascript atau \`\`\`python

Salam pembuka: "Halo! Saya Golem AI, siap membantu Anda. Ada yang bisa saya bantu hari ini?"`;

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      error: "API Key belum dikonfigurasi. Silakan hubungi administrator.",
      code: "API_KEY_NOT_CONFIGURED",
    });
  }

  try {
    const { message, history = [], imageData } = req.body;

    if (!message && !imageData) {
      return res.status(400).json({
        error: "Pesan tidak boleh kosong",
      });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    });

    let result;

    if (imageData) {
      result = await chat.sendMessage([
        {
          inlineData: {
            data: imageData.data,
            mimeType: imageData.mimeType,
          },
        },
        message || "Jelaskan gambar ini",
      ]);
    } else {
      result = await chat.sendMessage(message);
    }

    return res.status(200).json({
      reply: result.response.text(),
    });
  } catch (err: any) {
    console.error("Gemini API Error:", err);

    const msg = err?.message || "";

    if (msg.includes("API key") || msg.includes("invalid")) {
      return res.status(401).json({
        error: "API Key tidak valid atau sudah expired",
        code: "API_KEY_INVALID",
      });
    }

    if (msg.includes("quota")) {
      return res.status(429).json({
        error: "Kuota API telah habis. Silakan coba lagi nanti.",
        code: "QUOTA_EXCEEDED",
      });
    }

    return res.status(500).json({
      error: "Terjadi kesalahan pada server",
      code: "INTERNAL_ERROR",
    });
  }
}
