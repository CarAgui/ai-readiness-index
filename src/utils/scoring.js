import { dimensions } from "../data/model.js";

export function calculateResults(answers) {
  const dimensionScores = dimensions.map((dimension) => {
    const ids = Object.keys(answers).filter((questionId) => questionId.startsWith(`${dimension.id}-`));
    const answered = ids.length;
    const total = ids.reduce((sum, questionId) => sum + Number(answers[questionId] || 0), 0);
    const average = answered ? total / answered : 0;
    const percentage = Math.round((average / 5) * 100);

    return {
      ...dimension,
      answered,
      total,
      average: Number(average.toFixed(2)),
      percentage,
      indexContribution: Number((percentage * dimension.weight).toFixed(2))
    };
  });

  const answeredValues = Object.values(answers).map(Number);
  const rawAverage = answeredValues.length
    ? answeredValues.reduce((sum, value) => sum + value, 0) / answeredValues.length
    : 0;

  const weightedTotal = dimensionScores.reduce((sum, score) => sum + score.percentage * score.weight, 0);
  const totalWeight = dimensionScores.reduce((sum, score) => sum + score.weight, 0);
  const compositeIndex = Math.round(weightedTotal / totalWeight);
  const profile = getProfile(compositeIndex);
  const benchmark = getBenchmark(compositeIndex);
  const sorted = [...dimensionScores].sort((a, b) => b.percentage - a.percentage);
  const strengths = sorted.slice(0, 3);
  const growthAreas = [...sorted].reverse().slice(0, 3);

  return {
    answeredCount: answeredValues.length,
    rawAverage: Number(rawAverage.toFixed(2)),
    overallPercentage: compositeIndex,
    compositeIndex,
    dimensionScores,
    profile,
    benchmark,
    strengths,
    growthAreas,
    executiveSummary: getExecutiveSummary(compositeIndex, profile, benchmark, strengths, growthAreas),
    interpretation: getInterpretation(compositeIndex, dimensionScores, benchmark),
    recommendations: growthAreas.map((area) => ({
      title: area.name,
      text: area.recommendation
    }))
  };
}

function getProfile(score) {
  if (score >= 86) {
    return {
      name: "AI-Ready Leader",
      level: "Avanzado",
      summary: "Alta preparacion para integrar IA, automatizacion y tecnologia en decisiones, procesos y resultados."
    };
  }

  if (score >= 72) {
    return {
      name: "Digital Accelerator",
      level: "Competente",
      summary: "Base solida de adopcion tecnologica, con oportunidades claras para escalar productividad y automatizacion."
    };
  }

  if (score >= 56) {
    return {
      name: "Emerging Adopter",
      level: "En desarrollo",
      summary: "Tiene fundamentos utiles, pero requiere mayor consistencia, foco y aplicacion practica para capturar valor."
    };
  }

  return {
    name: "Foundation Stage",
    level: "Inicial",
    summary: "Necesita fortalecer habitos, casos de uso y confianza operativa para usar IA y tecnologia con impacto."
  };
}

function getBenchmark(score) {
  const marketAverage = 68;
  const topQuartile = 82;
  const delta = score - marketAverage;

  if (score >= topQuartile) {
    return {
      label: "Top quartile",
      marketAverage,
      topQuartile,
      delta,
      summary: "El resultado se ubica en una zona superior al benchmark de referencia."
    };
  }

  if (score >= marketAverage) {
    return {
      label: "Sobre promedio",
      marketAverage,
      topQuartile,
      delta,
      summary: "El resultado supera el promedio de referencia y puede escalar con mejores sistemas."
    };
  }

  return {
    label: "Bajo benchmark",
    marketAverage,
    topQuartile,
    delta,
    summary: "El resultado esta por debajo del promedio de referencia y requiere priorizar fundamentos."
  };
}

function getExecutiveSummary(score, profile, benchmark, strengths, growthAreas) {
  const top = strengths[0]?.name || "la dimension mas fuerte";
  const priority = growthAreas[0]?.name || "la dimension prioritaria";

  return `El indice compuesto es ${score}%, con perfil ${profile.name} (${profile.level}). ${benchmark.summary} La principal fortaleza es ${top}; la prioridad de desarrollo es ${priority}.`;
}

function getInterpretation(score, dimensionScores, benchmark) {
  const strongest = [...dimensionScores].sort((a, b) => b.percentage - a.percentage)[0];
  const weakest = [...dimensionScores].sort((a, b) => a.percentage - b.percentage)[0];
  const spread = strongest && weakest ? strongest.percentage - weakest.percentage : 0;

  if (!strongest || !weakest) {
    return "Completa la evaluacion para generar una interpretacion automatica confiable.";
  }

  const balance =
    spread <= 12
      ? "El perfil es relativamente balanceado entre dimensiones."
      : `Existe una brecha visible entre ${strongest.name} y ${weakest.name}.`;

  const action =
    score >= 72
      ? `La siguiente palanca es convertir ${weakest.name.toLowerCase()} en un sistema repetible.`
      : `La prioridad inmediata es fortalecer ${weakest.name.toLowerCase()} con acciones pequenas y medibles.`;

  return `${benchmark.summary} ${balance} ${action}`;
}
