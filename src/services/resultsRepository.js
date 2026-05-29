const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxf7quXvrqYdJ6_kKXl18-ghZht_8VExDkxb9eQ5UF045um_qEQns3QFdwHxAQcCVeQ/exec";
export async function saveAssessmentResult(payload) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...payload
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing]));

  if (GOOGLE_SHEETS_WEB_APP_URL) {
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(record)
    });
  }

  return record;
}
