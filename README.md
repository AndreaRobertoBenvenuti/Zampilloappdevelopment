# Zampillo - App per le Fontanelle di Milano

Un'applicazione web progressiva (PWA) per trovare e interagire con le fontanelle pubbliche di Milano, utilizzando dati ufficiali del Comune di Milano.

## Panoramica

Zampillo è un'app mobile-first che aiuta i cittadini milanesi a trovare le vedovelle (fontanelle pubbliche) più vicine, navigare verso di esse e contribuire alla community segnalando problemi o condividendo informazioni.

### Funzionalità Principali

- **Mappa Interattiva**: Visualizza tutte le 719 fontanelle pubbliche di Milano su una mappa Google Maps personalizzata
- **Ricerca e Filtri**: Cerca fontanelle per nome o località
- **Navigazione GPS**: Ottieni indicazioni stradali verso qualsiasi fontanella tramite Google Maps
- **Dettagli Fontanella**: Visualizza informazioni dettagliate incluse condizione, distanza e tempo di percorrenza a piedi
- **Segnalazione Problemi**: Contribuisci alla community segnalando fontanelle non funzionanti o danneggiate
- **Leaderboard Community**: Scopri le fontanelle più popolari e attive della community
- **Chat Community**: Interagisci con altri utenti e condividi informazioni
- **PWA per iOS**: Installabile su iPhone/iPad come app nativa

## Tecnologie Utilizzate

- **Frontend**: React 18.3.1 con TypeScript 5.6.2
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 3.4.17
- **Mappe**: Google Maps JavaScript API con @react-google-maps/api
- **UI Icons**: Lucide React 0.469.0
- **Routing**: React Router DOM 7.1.3

## Installazione

### Prerequisiti

- Node.js (versione 18 o superiore)
- npm o yarn

### Setup Locale

1. Clona il repository:
```bash
git clone https://github.com/AndreaRobertoBenvenuti/Zampilloappdevelopment.git
cd Zampilloappdevelopment
```

2. Installa le dipendenze:
```bash
npm install
```

3. Avvia il server di sviluppo:
```bash
npm run dev
```

4. Apri il browser all'indirizzo mostrato (solitamente `http://localhost:3000`)

### Build per Produzione

```bash
npm run build
npm run preview
```

## Dataset delle Fontanelle

L'app utilizza il dataset ufficiale del **Comune di Milano** contenente 719 fontanelle pubbliche:

- **Fonte**: [Open Data Milano - Fontanelle nel Comune di Milano](https://dati.comune.milano.it/dataset/ds502_fontanelle-nel-comune-di-milano)
- **File**: `src/data/fountains.json` (convertito da GeoJSON)
- **Aggiornamento**: Il dataset viene aggiornato settimanalmente dal Comune di Milano

### Aggiornare il Dataset

Per aggiornare i dati delle fontanelle con l'ultima versione:

1. Scarica il file GeoJSON dal portale Open Data Milano
2. Rinominalo in `fountains.json`
3. Sostituisci il file in `src/data/fountains.json`
4. Riavvia il server di sviluppo

## Utilizzo Mobile (iOS)

Per la migliore esperienza su iPhone/iPad:

1. Apri l'app nel browser Safari
2. Tocca il pulsante Condividi (icona con freccia in alto)
3. Seleziona "Aggiungi a Home"
4. Apri l'app dall'icona sulla Home Screen (non dal browser)

Questo rimuoverà le barre del browser e darà un'esperienza app nativa completa.

## Struttura del Progetto

```
Zampilloappdevelopment/
├── src/
│   ├── components/          # Componenti React
│   │   ├── MapView.tsx      # Vista mappa principale
│   │   ├── FountainDetailView.tsx
│   │   ├── LeaderboardView.tsx
│   │   ├── ChatView.tsx
│   │   ├── ProfileView.tsx
│   │   ├── ReportProblemDialog.tsx
│   │   └── BottomNavigation.tsx
│   ├── data/
│   │   ├── fountains.json   # Dataset fontanelle (719)
│   │   └── mockData.ts      # Dati mock per demo
│   ├── utils/
│   │   └── fountainDataLoader.ts  # Caricamento dati
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Componente root
│   └── main.tsx             # Entry point
├── index.html               # HTML con config PWA
├── vite.config.ts           # Configurazione Vite
├── tailwind.config.js       # Configurazione Tailwind
└── package.json

```

## Caratteristiche del Design

### Palette Colori

- **Primario**: Teal/Verde Acqua (`#14b8a6`) - richiama l'acqua delle fontanelle
- **Secondario**: Ambra (`#f59e0b`) per segnalazioni
- **Accenti**: Blu (`#2563eb`) per posizione utente

### Pattern UX

- **Bottom Sheet**: Preview fontanella che appare dal basso, pattern mobile-first
- **Backdrop Blur**: Effetti di sfocatura moderni per dialoghi e modali
- **Smooth Animations**: Transizioni fluide con Tailwind CSS
- **Touch-Friendly**: Pulsanti e controlli ottimizzati per touch
- **Safe Area Insets**: Supporto per notch iPhone e barre di sistema

### Google Maps Personalizzata

- Stile custom con colori tema dell'app
- Marker personalizzati SVG per fontanelle
- Controlli zoom e ricentraggio custom
- Gesture handling ottimizzato per mobile

## Deploy

L'app può essere deployata su qualsiasi servizio di hosting statico:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop della cartella `dist`
- **GitHub Pages**: Configurazione tramite GitHub Actions
- **Firebase Hosting**: `firebase deploy`

### Variabili d'Ambiente

Crea un file `.env` per configurare la API key di Google Maps (opzionale, già presente nel codice):

```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## Funzionalità Future

- [ ] Autenticazione utenti con Firebase
- [ ] Sistema di gamification con punti e badge
- [ ] Foto delle fontanelle caricate dalla community
- [ ] Filtri avanzati (accessibilità, qualità acqua)
- [ ] Modalità offline con Service Worker
- [ ] Notifiche push per fontanelle preferite
- [ ] Integrazione con sensori IoT per qualità acqua real-time

## Contribuire

Le contribuzioni sono benvenute! Per favore:

1. Forka il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committa le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Pusha sul branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## Credits

- **Design Figma**: [Zampillo App Development](https://www.figma.com/design/2vrvYja8dfUvhNlIUbhSof/Zampillo-App-Development)
- **Dataset**: [Comune di Milano - Open Data](https://dati.comune.milano.it)
- **Icone**: [Lucide Icons](https://lucide.dev)
- **Mappe**: [Google Maps Platform](https://developers.google.com/maps)

## Licenza

Questo progetto è stato sviluppato per scopi educativi.

---

Made with 💧 in Milan
