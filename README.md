# AI Readiness Index

Plataforma principal para CA Consultoria Internacional / Carlos Aguirre Coach.

Web visible en la app:

https://carlosaguirrecoach.com/

## Que incluye

- Branding profesional con logo oficial, Carlos Aguirre Coach y web visible.
- Diseno ejecutivo en negro, blanco y amarillo.
- React + Vite + Tailwind CSS.
- Cuestionario de 20 preguntas con escala Likert 1-5.
- Escalas de frecuencia y acuerdo segun el tipo de pregunta.
- 8 dimensiones definidas:
  - Uso de IA
  - Productividad
  - Gestion del tiempo
  - Aprendizaje continuo
  - Automatizacion
  - Apertura al cambio
  - Adopcion tecnologica
  - Aplicacion practica
- Puntajes por dimension.
- Indice compuesto porcentual.
- Perfil automatico.
- Radar chart, graficos por dimension, interpretacion, recomendaciones y resumen ejecutivo.
- Guardado local y envio opcional a Google Sheets.
- Preparado para GitHub y Vercel.

Nota importante: 8 dimensiones x 3 preguntas son 24 preguntas. Para respetar el requisito de 20 preguntas, este proyecto usa una distribucion de 2 a 3 preguntas por dimension. Si se necesita exactamente 3 preguntas por dimension, se deben usar 24 preguntas.

## Como correr el proyecto

1. Instala dependencias:

```bash
npm install
```

2. Corre el proyecto:

```bash
npm run dev
```

3. Abre la URL que Vite muestre, normalmente:

```txt
http://localhost:5173
```

## Como conectar Google Sheets

La app usa una URL de Google Apps Script. No pongas claves privadas dentro de React.

### Paso 1: Crear el Google Sheet

1. Abre https://sheets.google.com/
2. Crea una hoja nueva.
3. Nombra el archivo, por ejemplo: `AI Readiness Results`.
4. Cambia el nombre de la pestana a `Resultados`.

### Paso 2: Crear Apps Script

1. En Google Sheets entra a `Extensiones` > `Apps Script`.
2. Borra el codigo inicial.
3. Pega este codigo:

```javascript
const SHEET_NAME = "Resultados";

const HEADERS = [
  "Fecha",
  "ID",
  "Nombre",
  "Correo",
  "Empresa",
  "Cargo",
  "Perfil final",
  "Indice compuesto",
  "Benchmark",
  "Resumen ejecutivo",
  "Interpretacion",
  "Puntajes",
  "Respuestas"
];

function doPost(e) {
  const sheet = getSheet();
  const data = JSON.parse(e.postData.contents);
  const participant = data.participant || {};
  const finalProfile = data.finalProfile || {};

  sheet.appendRow([
    data.createdAt || new Date().toISOString(),
    data.id || "",
    participant.name || "",
    participant.email || "",
    participant.company || "",
    participant.position || "",
    finalProfile.profile || "",
    finalProfile.compositeIndex || "",
    finalProfile.benchmark || "",
    finalProfile.executiveSummary || "",
    finalProfile.interpretation || "",
    JSON.stringify(data.scores || []),
    JSON.stringify(data.answers || [])
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  return sheet;
}
```

4. Haz clic en `Guardar`.
5. Haz clic en `Implementar` > `Nueva implementacion`.
6. En tipo, elige `Aplicacion web`.
7. Configura:
   - Ejecutar como: `Yo`
   - Quien tiene acceso: `Cualquier usuario`
8. Haz clic en `Implementar`.
9. Acepta los permisos.
10. Copia la URL de la aplicacion web.

### Paso 3: Pegar la URL en el proyecto

1. Copia `.env.example` y crea un archivo llamado `.env`.
2. Dentro de `.env`, pega:

```bash
VITE_GOOGLE_SHEETS_WEB_APP_URL=PEGA_AQUI_TU_URL
```

3. Reinicia el servidor:

```bash
npm run dev
```

## Como subir a GitHub

1. Inicializa Git:

```bash
git init
```

2. Agrega los archivos:

```bash
git add .
```

3. Crea el primer commit:

```bash
git commit -m "Initial AI Readiness Index"
```

4. Crea un repositorio nuevo en GitHub.
5. Copia la URL del repositorio.
6. Conecta y sube:

```bash
git remote add origin TU_URL_DE_GITHUB
git branch -M main
git push -u origin main
```

## Como desplegar en Vercel

1. Entra a https://vercel.com/
2. Haz clic en `Add New Project`.
3. Importa el repositorio de GitHub.
4. Vercel detectara Vite.
5. Configura:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. En `Environment Variables`, agrega:

```txt
VITE_GOOGLE_SHEETS_WEB_APP_URL
```

con la URL de Google Apps Script.

7. Haz clic en `Deploy`.

## Verificacion

Antes de subir a GitHub o Vercel, corre:

```bash
npm run build
```

Si el build termina sin errores, el proyecto esta listo para desplegar.
