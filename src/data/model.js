export const scaleLabels = [
  "Nunca o casi nunca",
  "Pocas veces",
  "A veces",
  "Frecuentemente",
  "Siempre o casi siempre"
];

export const dimensions = [
  {
    id: "ai_usage",
    name: "Uso de IA",
    shortName: "IA",
    definition: "Uso intencional, responsable y verificable de inteligencia artificial en tareas reales.",
    weight: 1,
    recommendation: "Define casos de uso prioritarios, crea prompts base y valida exactitud, sesgos y riesgos antes de usar resultados."
  },
  {
    id: "productivity",
    name: "Productividad",
    shortName: "Product.",
    definition: "Capacidad de usar tecnologia para producir mejor, mas rapido y con mayor consistencia.",
    weight: 1,
    recommendation: "Crea plantillas, flujos repetibles y metricas simples de ahorro de tiempo o mejora de calidad."
  },
  {
    id: "time_management",
    name: "Gestion del tiempo",
    shortName: "Tiempo",
    definition: "Priorizacion, foco y administracion de energia para ejecutar trabajo de alto valor.",
    weight: 1,
    recommendation: "Bloquea tiempo para tareas clave, automatiza recordatorios y revisa semanalmente donde se pierde capacidad operativa."
  },
  {
    id: "continuous_learning",
    name: "Aprendizaje continuo",
    shortName: "Aprend.",
    definition: "Disciplina para aprender, experimentar y actualizar habilidades frente al cambio tecnologico.",
    weight: 1,
    recommendation: "Reserva un bloque semanal de aprendizaje aplicado y documenta pruebas, prompts y aprendizajes utiles."
  },
  {
    id: "automation",
    name: "Automatizacion",
    shortName: "Autom.",
    definition: "Identificacion, simplificacion y automatizacion de procesos repetitivos o manuales.",
    weight: 1,
    recommendation: "Selecciona un proceso frecuente, documenta pasos, elimina friccion y prueba una automatizacion de bajo riesgo."
  },
  {
    id: "change_openness",
    name: "Apertura al cambio",
    shortName: "Cambio",
    definition: "Disposicion conductual para probar nuevas formas de trabajar y ajustar habitos.",
    weight: 1,
    recommendation: "Trabaja pilotos pequenos, conversaciones de adopcion y acuerdos para reducir resistencia al cambio."
  },
  {
    id: "tech_adoption",
    name: "Adopcion tecnologica",
    shortName: "Adopcion",
    definition: "Capacidad de incorporar herramientas nuevas con criterio de valor, seguridad y escalabilidad.",
    weight: 1,
    recommendation: "Define criterios de adopcion: impacto, facilidad, seguridad, responsable, costo y siguiente decision."
  },
  {
    id: "practical_application",
    name: "Aplicacion practica",
    shortName: "Practica",
    definition: "Conversion de conocimiento tecnologico en mejoras visibles, pilotos y resultados concretos.",
    weight: 1,
    recommendation: "Elige un reto operativo, desarrolla un piloto con IA o automatizacion y mide impacto en 30 dias."
  }
];

export const questions = [
  {
    id: "ai_usage-1",
    dimension: "ai_usage",
    text: "Uso herramientas de IA para apoyar tareas reales de mi trabajo, no solo por curiosidad.",
    scaleType: "frequency"
  },
  {
    id: "ai_usage-2",
    dimension: "ai_usage",
    text: "Verifico la exactitud, privacidad y posibles riesgos antes de usar una respuesta generada por IA.",
    scaleType: "frequency"
  },
  {
    id: "ai_usage-3",
    dimension: "ai_usage",
    text: "Puedo identificar casos de uso donde la IA generaria valor para mi rol o equipo.",
    scaleType: "agreement"
  },
  {
    id: "productivity-1",
    dimension: "productivity",
    text: "Uso herramientas digitales, prompts o plantillas para producir entregables con mayor velocidad.",
    scaleType: "frequency"
  },
  {
    id: "productivity-2",
    dimension: "productivity",
    text: "Mido si la tecnologia mejora mi productividad en tiempo, calidad o consistencia.",
    scaleType: "frequency"
  },
  {
    id: "productivity-3",
    dimension: "productivity",
    text: "Tengo flujos de trabajo claros para reducir retrabajo y decisiones repetidas.",
    scaleType: "agreement"
  },
  {
    id: "time_management-1",
    dimension: "time_management",
    text: "Protejo bloques de foco para tareas que requieren analisis, creatividad o decisiones importantes.",
    scaleType: "frequency"
  },
  {
    id: "time_management-2",
    dimension: "time_management",
    text: "Uso tecnologia para priorizar, dar seguimiento y evitar que lo urgente absorba todo mi tiempo.",
    scaleType: "frequency"
  },
  {
    id: "time_management-3",
    dimension: "time_management",
    text: "Reviso semanalmente que actividades deberia delegar, eliminar o automatizar.",
    scaleType: "frequency"
  },
  {
    id: "continuous_learning-1",
    dimension: "continuous_learning",
    text: "Dedico tiempo de forma regular a aprender nuevas herramientas, tendencias o metodos de trabajo.",
    scaleType: "frequency"
  },
  {
    id: "continuous_learning-2",
    dimension: "continuous_learning",
    text: "Comparto aprendizajes, buenas practicas o errores utiles con otras personas.",
    scaleType: "frequency"
  },
  {
    id: "continuous_learning-3",
    dimension: "continuous_learning",
    text: "Experimento con tecnologias nuevas en pequena escala antes de adoptarlas o descartarlas.",
    scaleType: "frequency"
  },
  {
    id: "automation-1",
    dimension: "automation",
    text: "Identifico procesos manuales que podrian automatizarse parcial o totalmente.",
    scaleType: "frequency"
  },
  {
    id: "automation-2",
    dimension: "automation",
    text: "He usado integraciones, formularios, hojas de calculo, scripts o plataformas no-code para ahorrar pasos.",
    scaleType: "frequency"
  },
  {
    id: "change_openness-1",
    dimension: "change_openness",
    text: "Cuando aparece una herramienta nueva, busco entender su utilidad antes de rechazarla.",
    scaleType: "frequency"
  },
  {
    id: "change_openness-2",
    dimension: "change_openness",
    text: "Me adapto con rapidez cuando cambian los procesos, sistemas o formas de trabajo.",
    scaleType: "agreement"
  },
  {
    id: "tech_adoption-1",
    dimension: "tech_adoption",
    text: "Evaluo nuevas tecnologias considerando impacto, seguridad, costo y facilidad de adopcion.",
    scaleType: "frequency"
  },
  {
    id: "tech_adoption-2",
    dimension: "tech_adoption",
    text: "Puedo explicar a otros el valor practico de adoptar una tecnologia nueva.",
    scaleType: "agreement"
  },
  {
    id: "practical_application-1",
    dimension: "practical_application",
    text: "Convierto aprendizajes tecnologicos en pilotos, mejoras o acciones concretas.",
    scaleType: "frequency"
  },
  {
    id: "practical_application-2",
    dimension: "practical_application",
    text: "Mis pruebas con IA o tecnologia terminan en decisiones, mejoras o resultados medibles.",
    scaleType: "frequency"
  }
];
