import { Fountain } from '../types';

// URL del dataset del Comune di Milano - proviamo diverse alternative
// Dataset: https://dati.comune.milano.it/dataset/ds502_fontanelle-nel-comune-di-milano
const MILAN_FOUNTAINS_URLS = [
  // Prova 1: API CKAN JSON
  'https://dati.comune.milano.it/api/3/action/datastore_search?resource_id=7cd0e1d2-7c3e-447d-9cfc-7bf44ab87d79&limit=1000',
  // Prova 2: Download diretto CSV (convertiremo se necessario)
  'https://dati.comune.milano.it/dataset/2e71c0e0-a67f-4f4c-9962-3cf6581fc29b/resource/7cd0e1d2-7c3e-447d-9cfc-7bf44ab87d79/download/fontanelle.geojson',
];

// Interfaccia per la risposta CKAN API
interface CKANResponse {
  success: boolean;
  result: {
    records: Array<{
      _id: number;
      ID_FONTANELLA?: string | number;
      TIPO?: string;
      UBICAZIONE?: string;
      INDIRIZZO?: string;
      QUARTIERE?: string;
      NIL?: string;
      MUNICIPIO?: number;
      ANNO_INSTALLAZIONE?: number;
      Latitudine?: number;
      Longitudine?: number;
      Location?: string; // formato "POINT (lng lat)"
      [key: string]: any;
    }>;
  };
}

/**
 * Carica i dati delle fontanelle dal Comune di Milano
 */
export async function loadMilanFountains(): Promise<Fountain[]> {
  try {
    let response;
    let data: CKANResponse;

    // Prova a caricare i dati da ogni URL fino a quando non ne trova uno che funziona
    for (const url of MILAN_FOUNTAINS_URLS) {
      response = await fetch(url);
      if (response.ok) {
        data = await response.json();
        if (data.success) {
          break;
        }
      }
    }

    if (!data || !data.success) {
      throw new Error('Nessun URL di dati valido trovato');
    }

    // Converti dati in formato Fountain
    const fountains: Fountain[] = data.result.records.map((record, index) => {
      const [lng, lat] = parseLocation(record.Location);
      const props = record;

      // Genera nome descrittivo
      const name = generateFountainName(props, index);
      
      // Condizione casuale per ora (potrebbe essere calcolata da altri dati)
      const condition = generateCondition();
      
      // Check-in e contributi casuali (in futuro da database)
      const checkIns = Math.floor(Math.random() * 2000) + 100;
      const contributions = Math.floor(Math.random() * 100) + 10;

      return {
        id: String(props.ID_FONTANELLA || `fountain-${index + 1}`),
        name,
        lat,
        lng,
        condition,
        checkIns,
        contributions,
        description: generateDescription(props),
        yearInstalled: props.ANNO_INSTALLAZIONE
      };
    });

    console.log(`✅ Caricate ${fountains.length} fontanelle dal Comune di Milano`);
    return fountains;

  } catch (error) {
    console.error('❌ Errore nel caricamento delle fontanelle:', error);
    // Fallback ai dati mock in caso di errore
    return getFallbackFountains();
  }
}

/**
 * Estrae le coordinate da una stringa di posizione nel formato "POINT (lng lat)"
 */
function parseLocation(location: string | undefined): [number, number] {
  if (location && location.startsWith('POINT')) {
    const coords = location.match(/\(([^)]+)\)/)?.[1]?.split(' ');
    if (coords && coords.length === 2) {
      return [parseFloat(coords[0]), parseFloat(coords[1])];
    }
  }
  // Fallback a coordinate centrali di Milano
  return [9.1895, 45.4641];
}

/**
 * Genera un nome descrittivo per la fontanella
 */
function generateFountainName(props: any, index: number): string {
  // Prova a usare ubicazione o indirizzo
  if (props.UBICAZIONE && props.UBICAZIONE !== 'null' && props.UBICAZIONE.length > 0) {
    return `Vedovella ${props.UBICAZIONE}`;
  }
  
  if (props.INDIRIZZO && props.INDIRIZZO !== 'null' && props.INDIRIZZO.length > 0) {
    return `Drago Verde ${props.INDIRIZZO}`;
  }

  if (props.QUARTIERE && props.QUARTIERE !== 'null') {
    return `Vedovella ${props.QUARTIERE}`;
  }

  if (props.NIL && props.NIL !== 'null') {
    return `Fontanella ${props.NIL}`;
  }

  // Fallback
  return `Vedovella Milano #${index + 1}`;
}

/**
 * Genera una condizione casuale ponderata
 */
function generateCondition(): 'Ottima' | 'Buona' | 'Discreta' {
  const rand = Math.random();
  if (rand < 0.6) return 'Ottima';  // 60%
  if (rand < 0.9) return 'Buona';   // 30%
  return 'Discreta';                 // 10%
}

/**
 * Genera una descrizione basata sui dati disponibili
 */
function generateDescription(props: any): string {
  const parts: string[] = [];

  if (props.TIPO && props.TIPO !== 'null') {
    parts.push(`Tipo: ${props.TIPO}`);
  }

  if (props.QUARTIERE && props.QUARTIERE !== 'null') {
    parts.push(`Quartiere: ${props.QUARTIERE}`);
  }

  if (props.MUNICIPIO) {
    parts.push(`Municipio ${props.MUNICIPIO}`);
  }

  if (props.INDIRIZZO && props.INDIRIZZO !== 'null') {
    parts.push(`Ubicata in ${props.INDIRIZZO}`);
  }

  if (props.ANNO_INSTALLAZIONE) {
    parts.push(`Installata nel ${props.ANNO_INSTALLAZIONE}`);
  }

  return parts.length > 0 
    ? parts.join('. ') + '.'
    : 'Fontanella pubblica storica di Milano.';
}

/**
 * Dati di fallback in caso di errore di rete
 */
function getFallbackFountains(): Fountain[] {
  return [
    {
      id: '1',
      name: 'Vedovella Duomo',
      lat: 45.4641,
      lng: 9.1895,
      condition: 'Ottima',
      checkIns: 1523,
      contributions: 89,
      description: 'Storica vedovella del 1932 situata vicino al Duomo',
      yearInstalled: 1932
    },
    {
      id: '2',
      name: 'Drago Verde Brera',
      lat: 45.4720,
      lng: 9.1880,
      condition: 'Ottima',
      checkIns: 1287,
      contributions: 67,
      description: 'Fontanella iconica nel quartiere artistico di Brera',
      yearInstalled: 1928
    },
    {
      id: '3',
      name: 'Vedovella Parco Sempione',
      lat: 45.4730,
      lng: 9.1750,
      condition: 'Buona',
      checkIns: 2341,
      contributions: 134,
      description: 'Una delle più amate dai runner del parco',
      yearInstalled: 1920
    },
    {
      id: '4',
      name: 'Drago Verde Navigli',
      lat: 45.4495,
      lng: 9.1765,
      condition: 'Ottima',
      checkIns: 1876,
      contributions: 95,
      description: 'Punto di ritrovo della comunità dei Navigli',
      yearInstalled: 1935
    },
    {
      id: '5',
      name: 'Vedovella Porta Venezia',
      lat: 45.4765,
      lng: 9.2050,
      condition: 'Buona',
      checkIns: 1654,
      contributions: 78,
      description: 'Fontanella storica vicino ai Giardini Pubblici',
      yearInstalled: 1925
    }
  ];
}