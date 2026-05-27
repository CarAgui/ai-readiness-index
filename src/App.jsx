import { useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  ExternalLink,
  Globe2,
  Send,
  ShieldCheck,
  TriangleAlert,
  Users
} from "lucide-react";
import { BrandHeader } from "./components/BrandHeader.jsx";
import { RadarChart } from "./components/RadarChart.jsx";
import { ScoreBar } from "./components/ScoreBar.jsx";
import { dimensions, questions, scaleLabels } from "./data/model.js";
import { calculateResults } from "./utils/scoring.js";
import { saveAssessmentResult } from "./services/resultsRepository.js";

const initialParticipant = JSON.parse(localStorage.getItem("ca-ai-readiness:participant") || "null");
const initialAnswers = JSON.parse(localStorage.getItem("ca-ai-readiness:answers") || "{}");
const logoPath = "/ca-consultoria-logo.png";
const linkedinUrl = "https://cr.linkedin.com/in/carlos-aguirre-b778a516";
const identityHighlights = [
  {
    icon: BriefcaseBusiness,
    title: "Estrategia y ejecucion",
    text: "Consultoria enfocada en convertir estrategia, cultura y liderazgo en resultados tangibles."
  },
  {
    icon: Users,
    title: "Talento y equipos",
    text: "Acompanamiento para maximizar talento, trabajo en equipo, servicio, cambio y coaching organizacional."
  },
  {
    icon: Award,
    title: "Trayectoria internacional",
    text: "Experiencia con organizaciones y equipos de alto desempeno en Latinoamerica, el Caribe y Estados Unidos."
  }
];

export default function App() {
  const [step, setStep] = useState(initialParticipant ? "assessment" : "intro");
  const [participant, setParticipant] = useState(initialParticipant);
  const [answers, setAnswers] = useState(initialAnswers);
  const [saveStatus, setSaveStatus] = useState("idle");
  const results = useMemo(() => calculateResults(answers), [answers]);
  const completed = Object.keys(answers).length === questions.length;

  function reset() {
    localStorage.removeItem("ca-ai-readiness:participant");
    localStorage.removeItem("ca-ai-readiness:answers");
    setParticipant(null);
    setAnswers({});
    setSaveStatus("idle");
    setStep("intro");
  }

  function saveParticipant(nextParticipant) {
    localStorage.setItem("ca-ai-readiness:participant", JSON.stringify(nextParticipant));
    setParticipant(nextParticipant);
    setStep("assessment");
  }

  function answer(questionId, value) {
    const nextAnswers = { ...answers, [questionId]: value };
    localStorage.setItem("ca-ai-readiness:answers", JSON.stringify(nextAnswers));
    setAnswers(nextAnswers);
  }

  async function finish() {
    const payload = buildPayload(participant, answers, results);
    setSaveStatus("saving");

    try {
      await saveAssessmentResult(payload);
      setSaveStatus("saved");
      setStep("results");
    } catch (error) {
      console.error("No se pudo guardar el resultado", error);
      setSaveStatus("error");
      setStep("results");
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <BrandHeader onReset={reset} />
      {step === "intro" ? <Intro onStart={() => setStep("register")} /> : null}
      {step === "register" ? <Register onSubmit={saveParticipant} /> : null}
      {step === "assessment" ? (
        <Assessment answers={answers} completed={completed} onAnswer={answer} onFinish={finish} saveStatus={saveStatus} />
      ) : null}
      {step === "results" ? (
        <Results participant={participant} results={results} answers={answers} saveStatus={saveStatus} onRetake={reset} />
      ) : null}
    </div>
  );
}

function Intro({ onStart }) {
  return (
    <>
    <section className="bg-ink text-white">
      <div className="page-shell grid min-h-[calc(100vh-69px)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <img
            className="mb-8 h-24 w-auto sm:h-28"
            src={logoPath}
            alt="Carlos Aguirre Consultoria Internacional"
          />
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Nueva medicion ejecutiva</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-none sm:text-6xl lg:text-7xl">
            AI Readiness Index
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            Una evaluacion ejecutiva creada por Carlos Aguirre para medir preparacion frente a inteligencia artificial,
            productividad, automatizacion y adopcion tecnologica.
          </p>
          <p className="mt-5 max-w-2xl border-l-4 border-gold pl-5 text-xl font-black leading-8 text-white">
            Estrategia, coaching, cambio y tecnologia aplicada para que las organizaciones pasen de la teoria a la accion.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              className="inline-flex items-center gap-2 text-sm font-bold text-gold underline-offset-4 hover:underline"
              href="https://carlosaguirrecoach.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Globe2 size={17} /> carlosaguirrecoach.com
            </a>
            <a
              className="inline-flex items-center gap-2 text-sm font-bold text-white/82 underline-offset-4 hover:text-gold hover:underline"
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ExternalLink size={16} />
            </a>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="executive-button" type="button" onClick={onStart}>
              Comenzar evaluacion <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="surface p-5 text-ink">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-black/50">Modelo estadistico</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              ["20", "Preguntas"],
              ["8", "Dimensiones"],
              ["1-5", "Likert"]
            ].map(([value, label]) => (
              <div key={label} className="bg-ink p-4 text-white">
                <p className="text-3xl font-black text-gold">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/62">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3">
            {[
              "Puntajes por dimension e indice compuesto",
              "Radar chart, benchmark e interpretacion automatica",
              "Resultados guardables en Google Sheets"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 border border-black/10 p-4">
                <span className="flex h-10 w-10 items-center justify-center bg-gold text-ink">
                  <ShieldCheck size={19} />
                </span>
                <span className="font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section className="bg-white">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">Nueva medicion de CA Consultoria Internacional</p>
            <h2 className="mt-4 text-4xl font-black">Carlos Aguirre P.</h2>
            <p className="mt-4 text-lg leading-8 text-black/68">
              Socio Director de la firma Consultora Carlos Aguirre, enfocada en maximizar el talento en las
              organizaciones. Consultor en estrategia, trabajo en equipo, servicio al cliente, gestion del cambio,
              disrupcion empresarial, liderazgo, cultura organizacional y coaching.
            </p>
            <p className="mt-4 leading-7 text-black/62">
              Esta herramienta conecta esa experiencia con un diagnostico practico de AI readiness: menos teoria,
              mas lectura ejecutiva y siguientes pasos claros.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                className="secondary-button"
                href="https://carlosaguirrecoach.com/mi-historia"
                target="_blank"
                rel="noreferrer"
              >
                Conocer mi historia <ExternalLink size={16} />
              </a>
              <a
                className="executive-button"
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                Ver LinkedIn <ExternalLink size={16} />
              </a>
            </div>
          </div>
          <div className="grid gap-4">
            {identityHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="border border-black/10 p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-ink text-gold">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="font-black">{item.title}</h3>
                      <p className="mt-2 leading-7 text-black/62">{item.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

function Register({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", position: "" });

  function submit(event) {
    event.preventDefault();
    onSubmit({ ...form, createdAt: new Date().toISOString() });
  }

  return (
    <section className="page-shell">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="surface bg-ink p-8 text-white">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Registro</p>
          <h1 className="mt-4 text-4xl font-black">Datos para el reporte y Google Sheets.</h1>
          <p className="mt-4 leading-7 text-white/68">
            La evaluacion guarda fecha, nombre, correo, empresa, cargo, respuestas, puntajes y perfil final.
          </p>
        </div>
        <form className="surface p-6 sm:p-8" onSubmit={submit}>
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-black">
              Nombre
              <input required className="input-field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Correo
              <input required type="email" className="input-field" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Empresa
              <input required className="input-field" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Cargo
              <input required className="input-field" value={form.position} onChange={(event) => setForm({ ...form, position: event.target.value })} />
            </label>
          </div>
          <button className="executive-button mt-6 w-full" type="submit">
            Entrar al assessment
          </button>
        </form>
      </div>
    </section>
  );
}

function Assessment({ answers, completed, onAnswer, onFinish, saveStatus }) {
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / questions.length) * 100);

  return (
    <section className="page-shell">
      <div className="sticky top-[69px] z-20 -mx-4 border-b border-black/10 bg-paper/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Cuestionario</p>
            <h1 className="text-2xl font-black">20 preguntas - escala Likert 1 a 5</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-black">{answered}/{questions.length} completadas</span>
            <button className="executive-button" type="button" onClick={onFinish} disabled={!completed || saveStatus === "saving"}>
              {saveStatus === "saving" ? <Send size={17} /> : null}
              Ver dashboard
            </button>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10">
          <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-8 grid gap-8">
        {dimensions.map((dimension) => {
          const items = questions.filter((question) => question.dimension === dimension.id);

          return (
            <section key={dimension.id} className="surface p-5 sm:p-6">
              <div className="border-b border-black/10 pb-4">
                <h2 className="text-2xl font-black">{dimension.name}</h2>
                <p className="mt-2 leading-7 text-black/62">{dimension.definition}</p>
              </div>
              <div className="mt-5 grid gap-5">
                {items.map((question) => (
                  <article key={question.id} className="grid gap-4 border-b border-black/10 pb-5 last:border-0 last:pb-0 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <p className="font-bold leading-7">{question.text}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-black/42">
                        Escala de {question.scaleType === "frequency" ? "frecuencia" : "acuerdo"} 1-5
                      </p>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          title={scaleLabels[value - 1]}
                          className={`h-11 w-11 rounded-md border text-sm font-black transition ${
                            answers[question.id] === value
                              ? "border-ink bg-ink text-gold"
                              : "border-black/15 bg-white text-ink hover:border-ink"
                          }`}
                          onClick={() => onAnswer(question.id, value)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

function Results({ participant, results, saveStatus, onRetake }) {
  return (
    <section className="page-shell">
      <div className="surface overflow-hidden">
        <div className="bg-ink p-6 text-white sm:p-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
            <div>
              <img
                className="mb-6 h-20 w-auto"
                src={logoPath}
                alt="Carlos Aguirre Consultoria Internacional"
              />
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">Nueva medicion ejecutiva</p>
              <h1 className="mt-3 text-4xl font-black">AI Readiness Index</h1>
              <p className="mt-3 text-white/68">
                {participant?.name} - {participant?.company} - {participant?.position}
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <a className="inline-block text-sm font-bold text-gold underline-offset-4 hover:underline" href="https://carlosaguirrecoach.com/" target="_blank" rel="noreferrer">
                  carlosaguirrecoach.com
                </a>
                <a className="inline-block text-sm font-bold text-white/75 underline-offset-4 hover:text-gold hover:underline" href={linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="flex gap-3 no-print">
              <button className="secondary-button border-white/20 bg-transparent text-white hover:bg-white hover:text-ink" type="button" onClick={onRetake}>
                Repetir
              </button>
              <button className="executive-button" type="button" onClick={() => window.print()}>
                <Download size={17} /> PDF
              </button>
            </div>
          </div>
        </div>

        <div className="border-b border-black/10 bg-white px-6 py-4 sm:px-8">
          <p className="flex items-center gap-2 text-sm font-bold text-black/70">
            {saveStatus === "saving" ? <Send size={17} /> : null}
            {saveStatus === "saved" ? <CheckCircle2 size={17} className="text-green-700" /> : null}
            {saveStatus === "error" ? <TriangleAlert size={17} className="text-red-700" /> : null}
            {saveStatus === "saved" ? "Resultado guardado." : null}
            {saveStatus === "error" ? "Resultado local guardado. Revisa la URL de Google Sheets para el envio remoto." : null}
          </p>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 xl:grid-cols-[0.9fr_1.1fr]">
          <section>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black/50">Perfil automatico</p>
            <h2 className="mt-3 text-4xl font-black">{results.profile.name}</h2>
            <p className="mt-4 text-lg leading-8 text-black/68">{results.profile.summary}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["Indice compuesto", `${results.compositeIndex}%`],
                ["Benchmark", results.benchmark.label],
                ["Vs promedio", `${results.benchmark.delta >= 0 ? "+" : ""}${results.benchmark.delta} pts`]
              ].map(([label, value]) => (
                <div key={label} className="bg-gold p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-black/60">{label}</p>
                  <p className="mt-2 text-3xl font-black">{value}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="mx-auto aspect-square w-full max-w-[440px]">
            <RadarChart scores={results.dimensionScores} />
          </section>
        </div>

        <div className="grid gap-8 border-t border-black/10 p-6 sm:p-8 lg:grid-cols-2">
          <section>
            <h2 className="text-2xl font-black">Puntajes por dimension</h2>
            <div className="mt-5 grid gap-4">
              {results.dimensionScores.map((score) => (
                <ScoreBar key={score.id} label={score.name} value={score.percentage} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black">Resumen ejecutivo</h2>
            <p className="mt-4 leading-7 text-black/68">{results.executiveSummary}</p>
            <h3 className="mt-6 text-xl font-black">Interpretacion automatica</h3>
            <p className="mt-3 leading-7 text-black/68">{results.interpretation}</p>
          </section>
        </div>

        <div className="border-t border-black/10 p-6 sm:p-8">
          <h2 className="text-2xl font-black">Recomendaciones</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {results.recommendations.map((item) => (
              <article key={item.title} className="border border-black/10 p-4">
                <h3 className="font-black">{item.title}</h3>
                <p className="mt-2 leading-7 text-black/62">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="border-t border-black/10 bg-ink p-6 text-white sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <img className="h-16 w-auto" src={logoPath} alt="Carlos Aguirre Consultoria Internacional" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Nueva medicion desarrollada por</p>
              <h2 className="mt-2 text-2xl font-black">Carlos Aguirre / CA Consultoria Internacional</h2>
              <p className="mt-2 leading-7 text-white/66">
                Estrategia, coaching, cultura, cambio y tecnologia aplicada para acelerar la ejecucion organizacional.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                className="secondary-button border-white/20 bg-transparent text-white hover:bg-white hover:text-ink"
                href="https://carlosaguirrecoach.com/"
                target="_blank"
                rel="noreferrer"
              >
                Sitio web <ExternalLink size={16} />
              </a>
              <a
                className="executive-button"
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function buildPayload(participant, answers, results) {
  return {
    participant: {
      name: participant?.name || "",
      email: participant?.email || "",
      company: participant?.company || "",
      position: participant?.position || ""
    },
    answers: questions.map((question) => ({
      id: question.id,
      dimension: question.dimension,
      question: question.text,
      scaleType: question.scaleType,
      answer: answers[question.id] || ""
    })),
    scores: results.dimensionScores.map((score) => ({
      id: score.id,
      name: score.name,
      total: score.total,
      average: score.average,
      percentage: score.percentage
    })),
    finalProfile: {
      profile: results.profile.name,
      level: results.profile.level,
      compositeIndex: results.compositeIndex,
      overallPercentage: results.overallPercentage,
      benchmark: results.benchmark.label,
      executiveSummary: results.executiveSummary,
      interpretation: results.interpretation
    }
  };
}
