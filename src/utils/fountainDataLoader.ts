import { Fountain } from '../types';
import fountainsData from '../data/fountains.json';

// Interfaccia per il GeoJSON del Comune di Milano
interface MilanFountainProperties {
  objectID: string;
  CAP?: string;
  MUNICIPIO?: string;
  ID_NIL?: string;
  NIL?: string;
  LONG_X_4326: number;
  LAT_Y_4326: number;
  Location?: string;
}

interface GeoJSONFeature {
  type: 'Feature';
  properties: MilanFountainProperties;
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
}

interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  name: string;
  features: GeoJSONFeature[];
}

/**
 * Generatore pseudo-random deterministico basato su seed.
 * Produce sempre gli stessi valori per lo stesso seed,
 * così la classifica è stabile e uguale per tutti.
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) & 0xffffffff;
    return (state >>> 0) / 0xffffffff;
  };
}

// Cache per evitare ricalcoli ad ogni render
let cachedFountains: Fountain[] | null = null;

/**
 * Carica i dati delle fontanelle dal file GeoJSON locale
 * Dataset: Comune di Milano - Vedovelle (aggiornato settimanalmente)
 * Fonte: https://dati.comune.milano.it/dataset/ds502_fontanelle-nel-comune-di-milano
 */
export function loadMilanFountains(): Fountain[] {
  if (cachedFountains) return cachedFountains;

  const data = fountainsData as GeoJSONFeatureCollection;

  const fountains: Fountain[] = data.features.map((feature, index) => {
    const props = feature.properties;
    const [lng, lat] = feature.geometry.coordinates;

    // Ogni fontanella ha il suo generatore deterministico basato sull'indice
    const rand = seededRandom(index + 42);

    // Genera nome descrittivo basato sulla zona
    const name = generateFountainName(props, index);

    // Condizione deterministica
    const condition = generateCondition(rand);

    // Check-in e contributi deterministici
    const checkIns = Math.floor(rand() * 500) + 50;
    const contributions = Math.floor(rand() * 50) + 5;

    // Proprietà filtri avanzati deterministiche
    const accessibility = generateAccessibility(rand);
    const waterQuality = generateWaterQuality(rand);
    const hasPetBowl = rand() > 0.7;
    const isRefrigerated = rand() > 0.85;

    return {
      id: props.objectID,
      name,
      lat,
      lng,
      condition,
      checkIns,
      contributions,
      description: generateDescription(props),
      yearInstalled: undefined,
      accessibility,
      waterQuality,
      hasPetBowl,
      isRefrigerated
    };
  });

  console.log(`✅ Caricate ${fountains.length} fontanelle dal Comune di Milano`);
  cachedFountains = fountains;
  return fountains;
}

/**
 * Genera un nome descrittivo per la fontanella basato sulla zona
 */
function generateFountainName(props: MilanFountainProperties, index: number): string {
  // Usa il nome del NIL (quartiere) se disponibile
  if (props.NIL && props.NIL !== 'null' && props.NIL.length > 0) {
    // Alterna tra "Vedovella" e "Drago Verde" per varietà
    const prefix = index % 2 === 0 ? 'Vedovella' : 'Drago Verde';
    return `${prefix} ${formatNILName(props.NIL)}`;
  }

  // Fallback generico
  return `Fontanella Milano #${props.objectID}`;
}

/**
 * Formatta il nome del NIL per renderlo più leggibile
 */
function formatNILName(nil: string): string {
  // Rimuove "Q.RE" e altri prefissi comuni, capitalizza correttamente
  return nil
    .replace(/Q\.RE\s*/gi, '')
    .replace(/PARCO\s*/gi, 'Parco ')
    .split(' ')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}

/**
 * Genera una condizione deterministica ponderata
 * In futuro sarà calcolata dalle segnalazioni degli utenti
 */
function generateCondition(rand: () => number): 'Ottima' | 'Buona' | 'Discreta' {
  const val = rand();
  if (val < 0.35) return 'Ottima';    // 35%
  if (val < 0.75) return 'Buona';     // 40%
  return 'Discreta';                    // 25%
}

/**
 * Genera una descrizione basata sui dati disponibili
 */
function generateDescription(props: MilanFountainProperties): string {
  const parts: string[] = [];

  if (props.NIL && props.NIL !== 'null') {
    parts.push(`Zona: ${formatNILName(props.NIL)}`);
  }

  if (props.MUNICIPIO) {
    parts.push(`Municipio ${props.MUNICIPIO}`);
  }

  if (props.CAP) {
    parts.push(`CAP ${props.CAP}`);
  }

  parts.push('Fontanella pubblica del Comune di Milano');

  return parts.join(' • ');
}

/**
 * Genera un livello di accessibilità deterministico
 * In futuro sarà mappato da dati reali del Comune o segnalazioni utenti
 */
function generateAccessibility(rand: () => number): 'wheelchair' | 'limited' | 'none' {
  const val = rand();
  if (val < 0.6) return 'wheelchair';  // 60% accessibile
  if (val < 0.85) return 'limited';    // 25% parzialmente accessibile
  return 'none';                         // 15% non accessibile
}

/**
 * Genera una qualità dell'acqua deterministica
 * In futuro sarà basato su analisi di laboratorio e segnalazioni utenti
 */
function generateWaterQuality(rand: () => number): 'excellent' | 'good' | 'average' {
  const val = rand();
  if (val < 0.35) return 'excellent';  // 35% eccellente
  if (val < 0.75) return 'good';       // 40% buona
  return 'average';                      // 25% media
}
