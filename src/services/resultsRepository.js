conconst GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzIVtVQmC_8ALq7rEMGmWyZ-fvzY_c1-MCRbo_wqkug-kpDij6nbOJrnqsl0orW/exec";
const STORAGE_KEY = "ca-ai-readiness:results";

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
