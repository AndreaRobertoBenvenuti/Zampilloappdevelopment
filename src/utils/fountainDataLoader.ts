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
 * Carica i dati delle fontanelle dal file GeoJSON locale
 * Dataset: Comune di Milano - Vedovelle (aggiornato settimanalmente)
 * Fonte: https://dati.comune.milano.it/dataset/ds502_fontanelle-nel-comune-di-milano
 */
export function loadMilanFountains(): Fountain[] {
  const data = fountainsData as GeoJSONFeatureCollection;

  const fountains: Fountain[] = data.features.map((feature, index) => {
    const props = feature.properties;
    const [lng, lat] = feature.geometry.coordinates;

    // Genera nome descrittivo basato sulla zona
    const name = generateFountainName(props, index);

    // Condizione casuale per ora (in futuro potrebbe essere calcolata da segnalazioni utenti)
    const condition = generateCondition();

    // Check-in e contributi iniziali casuali (in futuro verranno dal database utenti)
    const checkIns = Math.floor(Math.random() * 500) + 50;
    const contributions = Math.floor(Math.random() * 50) + 5;

    // Proprietà filtri avanzati (casuali per ora, in futuro dal database)
    const accessibility = generateAccessibility();
    const waterQuality = generateWaterQuality();
    const hasPetBowl = Math.random() > 0.7; // 30% hanno ciotola per animali
    const isRefrigerated = Math.random() > 0.85; // 15% hanno acqua refrigerata

    return {
      id: props.objectID,
      name,
      lat,
      lng,
      condition,
      checkIns,
      contributions,
      description: generateDescription(props),
      yearInstalled: undefined, // Non disponibile nel dataset
      accessibility,
      waterQuality,
      hasPetBowl,
      isRefrigerated
    };
  });

  console.log(`✅ Caricate ${fountains.length} fontanelle dal Comune di Milano`);
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
 * Genera una condizione casuale ponderata
 * In futuro sarà calcolata dalle segnalazioni degli utenti
 */
function generateCondition(): 'Ottima' | 'Buona' | 'Discreta' {
  const rand = Math.random();
  if (rand < 0.7) return 'Ottima';  // 70%
  if (rand < 0.95) return 'Buona';  // 25%
  return 'Discreta';                 // 5%
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
 * Genera un livello di accessibilità casuale
 * In futuro sarà mappato da dati reali del Comune o segnalazioni utenti
 */
function generateAccessibility(): 'wheelchair' | 'limited' | 'none' {
  const rand = Math.random();
  if (rand < 0.6) return 'wheelchair';  // 60% accessibile
  if (rand < 0.85) return 'limited';    // 25% parzialmente accessibile
  return 'none';                         // 15% non accessibile
}

/**
 * Genera una qualità dell'acqua casuale
 * In futuro sarà basato su analisi di laboratorio e segnalazioni utenti
 */
function generateWaterQuality(): 'excellent' | 'good' | 'average' {
  const rand = Math.random();
  if (rand < 0.75) return 'excellent';  // 75% eccellente
  if (rand < 0.95) return 'good';       // 20% buona
  return 'average';                      // 5% media
}
