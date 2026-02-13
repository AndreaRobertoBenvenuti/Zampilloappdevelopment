# 🌊 Zampillo - App Fontanelle Storiche di Milano

![Zampillo](https://img.shields.io/badge/Version-1.0.0-teal)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-teal)

**Zampillo** è un'applicazione mobile-first che promuove l'uso sostenibile delle fontanelle pubbliche storiche di Milano, conosciute come **"Vedovelle"** o **"Draghi Verdi"**. L'app integra mapping interattivo, gamification completa, social networking e gestione eventi per creare una community attiva attorno al patrimonio storico milanese.

---

## 📋 Indice

1. [🎯 Panoramica](#-panoramica)
2. [✨ Funzionalità Principali](#-funzionalità-principali)
3. [📱 Architettura dell'App](#-architettura-dellapp)
4. [🗺️ Sezione 1: Mappa Vedovelle](#️-sezione-1-mappa-vedovelle)
5. [🏆 Sezione 2: Community](#-sezione-2-community)
6. [👤 Sezione 3: Profilo Utente](#-sezione-3-profilo-utente)
7. [💬 Sezione 4: Chat Vedovelle](#-sezione-4-chat-vedovelle)
8. [🎮 Sistema di Gamification](#-sistema-di-gamification)
9. [🛠️ Tecnologie Utilizzate](#️-tecnologie-utilizzate)
10. [📂 Struttura del Progetto](#-struttura-del-progetto)

---

## 🎯 Panoramica

### Mission
Promuovere la **sostenibilità ambientale** e la **valorizzazione del patrimonio storico** milanese attraverso:

- 🌱 **Riduzione plastica monouso** - Meno bottiglie, più fontanelle
- 🏛️ **Scoperta patrimonio storico** - Le vedovelle dal 1931
- 👥 **Community engagement** - Connetti utenti green-minded
- 🎯 **Gamification motivante** - Livelli, punti, sfide, badge

### Target Utenti
- 🏃 **Sportivi e runner** - Punti idratazione gratuiti
- 🌍 **Eco-consapevoli** - Riduzione impatto ambientale
- 🎒 **Turisti curiosi** - Scoperta autentica di Milano
- 👨‍👩‍👧 **Famiglie** - Educazione ambientale bambini
- 📚 **Appassionati di storia** - Architettura urbana milanese

### Design Philosophy
- **📱 Mobile-First**: Ottimizzata per uso in movimento
- **🎨 Palette Teal/Green**: Ispirata ai "draghi verdi" storici
- **🧭 Bottom Navigation**: Accesso rapido alle 4 sezioni
- **♿ Accessibile**: Scrollbar moderna e UX intuitiva

---

## ✨ Funzionalità Principali

### 🗺️ **Mappa Interattiva**
- Mappa custom Milano creata in Figma
- 8 fontanelle con marker cliccabili
- Zoom dinamico (0.6x - 2.5x)
- Drag & Pan fluidi
- **Schermata dettagli completa** per ogni fontanella
- Ricerca per nome
- Geolocalizzazione utente

### 🏆 **Gamification Completa**
- Sistema livelli progressivi (1-20+)
- Punti guadagnati da azioni
- Sfide settimanali, mensili, speciali
- Badge e achievement
- Leaderboard fontanelle e utenti
- Streak giornalieri
- Moltiplicatori punti

### 👥 **Social & Community**
- Chat dedicate per ogni fontanella
- Sistema unione/uscita chat dinamico
- Profili utenti pubblici
- Eventi community (50+ mock)
- Calendario eventi integrato
- Filtri avanzati

### 📊 **Tracking & Analytics**
- Statistiche personali dettagliate
- Check-in storici
- Distanza percorsa
- Litri plastica risparmiati
- Contributi community
- Progress sfide in tempo reale

### 🚨 **Segnalazioni**
- Report problemi fontanelle
- 6 tipologie issue
- Descrizione testuale opzionale
- Feedback conferma invio
- Contributo alla manutenzione

---

## 📱 Architettura dell'App

### Layout Globale

```
┌─────────────────────────────────────┐
│         TopBar Globale              │
│  [Logo Zampillo]      [⚙️ Settings] │
├─────────────────────────────────────┤
│                                     │
│      Contenuto Dinamico             │
│      (4 Sezioni Principali)         │
│                                     │
│                                     │
├─────────────────────────────────────┤
│       Bottom Navigation             │
│  [🗺️ Mappa] [🏆 Community]          │
│  [💬 Chat]   [👤 Profilo]           │
└─────────────────────────────────────┘
```

### 🧭 Bottom Navigation (4 Sezioni)

1. **🗺️ Mappa** - Home, fontanelle interattive
2. **🏆 Community** - Leaderboard fontanelle/utenti
3. **💬 Chat** - Conversazioni fontanelle
4. **👤 Profilo** - Statistiche e badge personali

### 🎨 Design System

**Colori Principali:**
- Teal: `#14b8a6` - Primary brand
- Green: `#10b981` - Secondary accent
- Gradient: `from-teal-600 to-green-600`

**Componenti UI:**
- Scrollbar moderna trasparente (teal gradient 40%)
- Border radius arrotondati (10px)
- Shadow sottili per depth
- Animazioni smooth (0.3s transitions)

---

## 🗺️ Sezione 1: Mappa Vedovelle

### Overview
La **home dell'app** - una mappa interattiva di Milano con fontanelle storiche georeferenziate.

### Componenti Principali

#### 🗾 Mappa Interattiva
- **Base**: Immagine custom Figma di Milano
- **Zoom Iniziale**: 1.2x (vista ottimale)
- **Range Zoom**: 0.6x - 2.5x
- **Controlli**: Pulsanti +/- e recenter
- **Interazioni**: Touch drag, pinch zoom

#### 📍 Marker Fontanelle (8 totali)
Fontanelle georeferenziate:
1. **Vedovella del Duomo** (Centro)
2. **Vedovella di Brera** (Brera)
3. **Vedovella dei Navigli** (Navigli)
4. **Vedovella di Sempione** (Sempione)
5. **Vedovella di Porta Venezia** (Porta Venezia)
6. **Vedovella di Città Studi** (Città Studi)
7. **Vedovella dell'Isola** (Isola)
8. **Vedovella di Lambrate** (Lambrate)

#### 🔍 Barra di Ricerca
- Input testuale
- Filtro real-time fontanelle
- Icona lente di ricerca

### Popup Marker (Click rapido)

Contenuto visualizzato:
- 📌 **Nome fontanella**
- 🎨 **Badge condizione** (Ottima/Buona/Discreta)
- 👥 **Check-in totali**
- ⭐ **Contributi community**
- 🔗 **Pulsante "Vedi Dettagli"**

### 📄 Schermata Dettagli Fontanella (Full-Screen)

#### Struttura Completa

**1. Header con Gradient**
- Nome fontanella (h1)
- Pulsante Back (← Mappa)
- Distanza dall'utente (es. "250m")
- Badge condizione colorato

**2. Grid Statistiche (4 Cards)**
- **Check-in**: Totale visite
- **Contributi**: Segnalazioni/foto
- **Chat**: Numero membri attivi
- **Eventi**: Eventi in programma

**3. Tabs Informazioni**

**Tab: Info**
- 📜 Storia fontanella (testo lungo)
- 📅 Anno installazione
- 🏛️ Quartiere
- 📐 Tipo architettonico

**Tab: Qualità**
- 💧 Qualità acqua (score/10)
- 🌡️ Temperatura
- 💨 Pressione
- ✅ Certificazioni

**Tab: Servizi**
- ♿ Accessibilità
- 🚻 Servizi igienici vicini
- 🅿️ Parcheggi
- 🚇 Trasporti pubblici

**4. Action Buttons (Grid 2x2)**
- **Check-in** (+15 punti) - Segna visita
- **Chat** - Unisciti alla conversazione
- **Segnala** - Report problema
- **Condividi** - Share location

**5. Eventi in Programma**
- Lista eventi associati alla fontanella
- Data, ora, tipo evento
- Numero partecipanti
- Pulsante "Partecipa"

**6. Attività Recenti**
- Ultimi 5 check-in
- Avatar utente
- Nome utente
- Timestamp relativo (es. "2h fa")

### 🚨 Sistema Segnalazione Problemi

#### Dialog "Segnala un Problema"

**Trigger**: Pulsante "Segnala" nella schermata dettagli

**Contenuto:**

1. **Header**
   - Icona AlertCircle
   - Titolo: "Segnala un Problema"
   - Nome fontanella

2. **Tipo Problema (Grid 2x3)**
   - 🚫 **Non Funzionante**
   - 💧 **Bassa Pressione**
   - 🧹 **Sporca/Non Pulita**
   - 🔨 **Danneggiata**
   - ❓ **Mancante**
   - 📝 **Altro**

3. **Descrizione (Optional)**
   - Textarea multilinea
   - Placeholder: "Aggiungi dettagli..."
   - 4 righe

4. **Info Box**
   - Background blu chiaro
   - Messaggio: "Le segnalazioni aiutano la community e il Comune di Milano..."

5. **Action Buttons**
   - Annulla (grigio)
   - Invia Segnalazione (teal, disabled se no tipo)

**Post-Invio:**
- ✅ Dialog conferma con CheckCircle
- Messaggio: "Segnalazione Inviata!"
- Auto-close dopo 2s
- Reset form

---

## 🏆 Sezione 2: Community

### Overview
Classifica **fontanelle** più amate e **utenti** più attivi di Milano.

### Layout

#### Tabs Superiori
1. **🗺️ Fontanelle** - Leaderboard vedovelle
2. **👥 Utenti** - Leaderboard community

### Tab: Classifica Fontanelle

#### Cards Fontanelle (Cliccabili)

**Contenuto Card:**
- 🏅 **Posizione**: 🥇🥈🥉 o numero
- 📌 **Nome fontanella**
- 👥 **Check-in totali**
- ⭐ **Contributi community**
- 🎨 **Badge condizione** (Ottima/Buona/Discreta)

**Top 3 Evidenziate:**
- Border ambra
- Background gradient ambra chiaro

**Interazione:**
- **Click card** → Apre **FountainDetailView** completa
- Mostra tutte info, statistiche, eventi, attività
- Possibilità check-in e segnalazioni
- Pulsante Back → Torna alla leaderboard

**Ordinamento:**
- Decrescente per check-in totali

### Tab: Classifica Utenti

#### Cards Utenti (Cliccabili)

**Contenuto Card:**
- 🏅 **Posizione**: 🥇🥈🥉 o numero
- 👤 **Avatar** (initial letter circolare)
- 📛 **Nome utente**
- 🏆 **Badge livello** (es. "Livello 12")
- 💎 **Punti totali**
- 📊 **Check-in totali**

**Top 3 Evidenziate:**
- Border ambra
- Background gradient ambra chiaro

**Interazione:**
- **Click card** → Apre **UserProfileView**
- Mostra profilo pubblico utente
- Statistiche, badge, attività recenti
- Action buttons: Segui + Messaggio
- Pulsante Back → Torna alla leaderboard

**Ordinamento:**
- Decrescente per punti totali

### 👤 Profilo Utente Pubblico (Altri Utenti)

#### Differenze vs Profilo Personale

**Visibile:**
- ✅ Avatar e info base (nome, username, livello)
- ✅ Pulsanti azione (Segui, Messaggio)
- ✅ Statistiche principali (punti, check-in, streak, badge count)
- ✅ Badge guadagnati
- ✅ Info aggiuntive (fontanella preferita, contributi, etc.)
- ✅ Attività recenti (ultimi 3 eventi)

**Non Visibile:**
- ❌ Impostazioni profilo
- ❌ Cronologia completa check-in
- ❌ Sfide personali
- ❌ Informazioni private
- ❌ Statistiche dettagliate riservate

#### Struttura UserProfileView

**1. Header Gradient**
- Pulsante Back (top-left)
- Avatar grande (24h x 24w)
- Nome utente (h1)
- Username (@handle)
- Badge livello (es. "Livello 12")

**2. Action Buttons (2 col)**
- **Segui** (border teal, bg white)
- **Messaggio** (bg teal, text white)

**3. Statistiche Grid (2x2)**
- **Punti totali** (teal gradient bg)
- **Check-in** (blue gradient bg)
- **Giorni consecutivi** (purple gradient bg)
- **Badge guadagnati** (amber gradient bg)

**4. Badge Section**
- Lista badge sbloccati
- Icona emoji badge
- Nome + descrizione

**5. Informazioni**
- Fontanella preferita
- Contributi totali
- Segnalazioni utili
- Membro dal (data)

**6. Attività Recenti**
- Ultimi 3 eventi
- Tipo azione (check-in, contributo)
- Nome fontanella
- Timestamp relativo

---

## 👤 Sezione 3: Profilo Utente

### Overview
Dashboard personale con **statistiche**, **badge**, **sfide** e **progress tracking**.

### Header Profilo

**Componenti:**
- **Avatar** - Immagine profilo circolare
- **Nome** - Display name
- **Livello** - Badge con icona Trophy
- **Barra XP** - Progress verso livello successivo
  - Testo: "Livello 12 → 13"
  - Barra: Percentuale completamento
  - Punti: "2,450 / 2,500 XP"

### Statistiche Principali (Grid)

**6 Cards Statistiche:**

1. **🏃 Check-in Totali**
   - Numero visite fontanelle
   - Icona Users

2. **🗺️ Fontanelle Visitate**
   - Numero unico fontanelle
   - Icona MapPin

3. **📏 Distanza Percorsa**
   - Km totali camminati
   - Icona Navigation

4. **💧 Litri Risparmiati**
   - Litri plastica evitati
   - Icona Droplet
   - **Impatto ambientale**

5. **⭐ Contributi Community**
   - Segnalazioni/foto/eventi
   - Icona Star

6. **🔥 Streak Corrente**
   - Giorni consecutivi check-in
   - Icona Flame

### Badge & Achievement

**Griglia 3x3 Badge:**

**Categorie:**
- 🏃 **Esplorazione**: Runner, Esploratore, Avventuriero
- 🌱 **Sostenibilità**: Eco-Warrior, Ambientalista, Zero Waste
- 👥 **Community**: Sociale, Networker, Influencer
- 🎯 **Gamification**: Streak 7, Streak 30, Top 10

**Stati Badge:**
- **Sbloccato**: Icona a colori + nome
- **Bloccato**: Grigio + lucchetto + requisiti

**Tooltip Hover:**
- Come sbloccare
- Progresso attuale (X/Y)
- Ricompensa

### Sfide Attive

**3 Tipologie:**

**Sfide Settimanali** (Reset Lunedì)
- Visita 5 fontanelle diverse
- Fai 10 check-in
- Partecipa a 1 evento
- Ricompensa: +100 punti

**Sfide Mensili** (Reset 1° mese)
- Visita tutte le fontanelle del centro
- Fai 30 check-in
- Organizza 1 evento
- Ricompensa: +300 punti + Badge

**Sfide Speciali** (Permanenti)
- Visita tutte le 50 fontanelle
- Percorri 100km
- Fai 1000 check-in
- Ricompensa: +1000 punti + Titolo

**Visual Progress:**
- Barra completamento
- Percentuale (es. "60%")
- X/Y items
- Timer countdown (sfide temporali)

### Pulsante Modifica Profilo

**Funzionalità:**
- Cambia avatar
- Modifica nome
- Bio personale
- Privacy settings

---

## 💬 Sezione 4: Chat Vedovelle

### Overview
Sistema di **chat dedicate** per ogni fontanella, con gestione dinamica unione/uscita.

### Layout Chat View

#### Struttura a 2 Sezioni

**1. LE TUE CHAT** (Top - Chat Unite)
- Chat a cui l'utente è già unito
- **Visibili:**
  - Nome fontanella
  - Ultimo messaggio preview
  - Timestamp messaggio
  - Numero membri
  - Badge "🎉 Eventi" (se presenti)
- **Click**: Apre ChatRoom completa

**Separatore Visivo**
- Border 8px grigio chiaro
- Separazione netta sezioni

**2. SCOPRI CHAT** (Bottom - Chat Disponibili)
- Chat non ancora unite
- **Visibili:**
  - Nome fontanella
  - Numero membri
  - Badge "🎉 Eventi" (se presenti)
  - ❌ NO ultimo messaggio
  - ❌ NO timestamp
- **Click**: Apre Dialog conferma unione

### Filtri Scopri Chat

**1. Filtro Quartiere:**
- Tutti
- Centro, Brera, Navigli, Sempione
- Porta Venezia, Città Studi, Isola

**2. Filtro Tipo:**
- Tutte
- Con Eventi
- Attive (messaggi recenti)

**Applicazione Real-time:**
- Filtro istantaneo
- No refresh necessario

### Flusso Unione Chat

**Step 1:** Click su chat in "Scopri Chat"

**Step 2:** Dialog conferma appare
- Header teal con icona UserPlus
- Nome chat
- Numero membri
- Badge eventi (se presenti)
- Quartiere
- Messaggio informativo

**Step 3:** Click "Unisciti"
- Chat aggiunta a `joinedChatIds` (state)
- **Aggiornamento automatico:**
  - Chat rimossa da "Scopri Chat"
  - Chat aggiunta a "Le Tue Chat"
  - Counter aggiornati
- Dialog chiude
- +10 punti gamification

**Step 4:** Chat accessibile
- Visibile in "Le Tue Chat"
- Click apre ChatRoom
- Messaggi leggibili
- Possibilità scrivere

### ChatRoom (Chat Aperta)

**Header:**
- Nome fontanella
- Pulsante Back
- Info membri

**Area Messaggi:**
- Cronologia scrollabile
- Avatar utenti circolari
- Bubble differenziate:
  - **Utente corrente**: Teal, allineato destra
  - **Altri utenti**: Grigio, allineato sinistra
- Timestamp relativo
- Scroll automatico a ultimi

**Input Messaggio:**
- Campo testo
- Pulsante Send
- Support emoji (future)
- Indicatore "sta scrivendo..."

**Features:**
- Messaggistica real-time (mock)
- Notifiche nuovi messaggi
- Condivisione posizione
- Condivisione foto

### Creazione Nuova Chat

**Trigger:** Pulsante "+" in header Chat View

**Form Full-Screen:**

**Campi Obbligatori:**
1. **Nome Chat*** - Input testo
2. **Categoria*** - Dropdown (Generale, Manutenzione, Eventi, Sport, Social)
3. **Quartiere*** - Dropdown con icona MapPin

**Campi Opzionali:**
4. **Descrizione** - Textarea multiline
5. **Chat con Eventi** - Checkbox toggle

**Info Box:**
- Background teal
- Icona Users
- Messaggio: "Diventi amministratore automaticamente"

**Azioni:**
- Annulla (grigio)
- Crea Chat (teal gradient)

**Post-Creazione:**
- Chat creata (mock)
- Aggiunta a "Le Tue Chat"
- Badge "Admin"
- +50 punti
- Toast conferma

### Calendario Eventi

**Accesso:** FAB (Floating Action Button) icona Calendar in Chat View

**Schermata Full-Screen:**

#### Top Bar Custom
- Icona Calendar
- Titolo: "Eventi Community"
- Sottotitolo: "Scopri gli eventi Zampillo"
- Pulsante Close (X)

#### Calendario Mese
- Griglia settimane standard
- Giorni numerati
- **Giorni con eventi**: Pallino teal sotto numero
- Navigazione frecce mese prev/next
- Mese e anno corrente

#### Lista Eventi Sotto Calendario

**Raggruppamento per Giorno:**
- **Header Giorno**:
  - Data formattata: "Sabato 21 Dicembre"
  - Badge numero eventi giorno

**Card Evento:**
- Badge tipo evento (colorato):
  - 🧹 Pulizia (green)
  - 🚶 Passeggiata (blue)
  - 🤝 Incontro (purple)
  - 📚 Workshop (orange)
- Titolo evento
- Orario (es. "10:00 - 12:00")
- Nome fontanella
- Quartiere
- Numero partecipanti (es. "24 partecipanti")
- Descrizione breve (2 righe)
- Pulsante "Partecipa"

#### Filtri Eventi

**3 Filtri Dropdown:**
1. **Mese**: Dicembre 2025, Gennaio 2026, Febbraio 2026, Marzo 2026
2. **Quartiere**: Tutti, Centro, Brera, Navigli, etc.
3. **Tipo**: Tutti, Pulizia, Passeggiata, Incontro, Workshop

**50 Eventi Mock:**
- Dicembre 2025: 6 eventi
- Gennaio 2026: 15 eventi
- Febbraio 2026: 14 eventi
- Marzo 2026: 15 eventi
- Frequenza: 2-3 eventi/settimana

---

## 🎮 Sistema di Gamification

### Sistema Livelli

**Progressione 1-20+:**

| Livelli | Titolo | Punti Richiesti |
|---------|--------|-----------------|
| 1-3 | 🌱 Novizio | 0-300 |
| 4-6 | 🚶 Esploratore | 300-800 |
| 7-9 | 🏃 Avventuriero | 800-1,500 |
| 10-12 | ⭐ Veterano | 1,500-2,500 |
| 13-15 | 🏆 Maestro | 2,500-4,000 |
| 16-18 | 👑 Campione | 4,000-6,000 |
| 19-20 | 💎 Leggenda | 6,000+ |

**Level Up Rewards:**
- Badge esclusivo
- Titolo personalizzato
- Avatar frame speciale
- Boost punti temporaneo (+20% 24h)

### Sistema Punti

**Azioni Base:**
- ✅ Check-in fontanella: **+15 pt**
- 💬 Messaggio chat: **+2 pt**
- 📸 Condividi foto: **+10 pt**
- 🚨 Segnala problema: **+25 pt**

**Azioni Community:**
- 🏗️ Crea chat: **+50 pt**
- 🤝 Unisciti chat: **+10 pt**
- 🎯 Partecipa evento: **+20 pt**
- ✔️ Conferma partecipazione: **+30 pt**

**Sfide:**
- 🏅 Completa sfida settimanale: **+100 pt**
- 🏆 Completa sfida mensile: **+300 pt**
- 🌟 Completa sfida speciale: **+500-1,000 pt**

**Bonus:**
- 🔥 Streak 7 giorni: **+50 pt**
- 🥇 Top 3 settimanale: **+200 pt**
- 👍 Contributo accettato: **+40 pt**

**Moltiplicatori:**
- **Weekend Boost**: x1.5 (Sabato-Domenica)
- **Event Boost**: x2 durante eventi
- **Streak Multiplier**: x1.2 ogni 7 giorni (max x2)
- **Birthday Boost**: x3 nel giorno compleanno

### Sfide

#### Sfide Settimanali (Reset Lunedì)
1. **Esploratore Urbano**
   - Visita 5 fontanelle diverse
   - Ricompensa: +100 punti

2. **Idratazione Consapevole**
   - Fai 10 check-in
   - Ricompensa: +150 punti

3. **Socializzatore**
   - Partecipa a 1 evento
   - Ricompensa: +80 punti

4. **Contribuisci**
   - Scrivi 20 messaggi chat
   - Ricompensa: +120 punti

#### Sfide Mensili (Reset 1° mese)
1. **Tour Completo**
   - Visita tutte fontanelle centro (5)
   - Ricompensa: +300 punti + Badge

2. **Maratoneta**
   - Fai 30 check-in
   - Ricompensa: +400 punti

3. **Organizzatore**
   - Crea e organizza 1 evento
   - Ricompensa: +500 punti + Titolo

4. **Community Leader**
   - Raggiungi 100 interazioni
   - Ricompensa: +600 punti

#### Sfide Speciali (Permanenti)
1. **Collezionista Completo**
   - Visita tutte le 50 fontanelle Milano
   - Ricompensa: +1,000 pt + Badge Oro + Titolo "Maestro Vedovelle"

2. **Esploratore Instancabile**
   - Percorri 100km tra fontanelle
   - Ricompensa: +800 pt + Badge "Runner Leggendario"

3. **Guardiano delle Fontanelle**
   - Fai 1,000 check-in totali
   - Ricompensa: +1,500 pt + Avatar Frame Speciale

4. **Fotografo Documentarista**
   - Condividi foto 30 fontanelle diverse
   - Ricompensa: +700 pt + Galleria Personale

5. **Top Contributor**
   - Ottieni 100 contributi accettati
   - Ricompensa: +2,000 pt + Ruolo Moderatore

### Badge System

**🏃 Esplorazione:**
- Runner (10 check-in)
- Esploratore (10 fontanelle)
- Avventuriero (25 fontanelle)
- Maestro (50 fontanelle)

**🌱 Sostenibilità:**
- Eco-Warrior (100L risparmiati)
- Ambientalista (500L)
- Guardiano Verde (1,000L)
- Zero Waste Hero (30gg no plastica)

**👥 Community:**
- Sociale (3 chat unite)
- Networker (10 chat)
- Influencer (100 messaggi)
- Community Leader (5 eventi organizzati)

**🎯 Gamification:**
- Streak 7 (7 giorni consecutivi)
- Streak 30 (30 giorni)
- Top 10 (entra top 10 leaderboard)
- Campione (Livello 15)
- Leggenda (Livello 20)

**🏆 Speciali:**
- Early Adopter (primi 100 utenti)
- Completista (tutte sfide mensili)
- Perfezionista (100% achievement)
- Beta Tester (partecipato beta)

---

## 🛠️ Tecnologie Utilizzate

### Frontend Stack
- **React 18+** - UI component-based library
- **TypeScript 5+** - Type safety
- **Tailwind CSS 4.0** - Utility-first styling

### Librerie
- **lucide-react** - Icon library (verificare icone disponibili)
- **date-fns** - Date manipulation (calendario eventi)
- **React Hooks** - useState, useEffect, custom hooks

### Design & Assets
- **Figma** - UI/UX design + mappa custom
- **figma:asset** - Import scheme per immagini raster
- **Relative imports** - SVG da `/imports`

### Architettura
- **Component-based** - Riutilizzabilità
- **Type-safe** - TypeScript interfaces
- **State management** - React useState
- **Mock data** - Simulazione backend

### Styling Features
- **Mobile-first** - Design priorità smartphone
- **Responsive** - Breakpoint tablet/desktop
- **CSS Custom Properties** - Tokens in `globals.css`
- **Gradient palette** - Teal/Green theme
- **Custom scrollbar** - Moderna, trasparente, teal gradient (40% opacity)
- **Animations** - Smooth transitions (0.3s)

---

## 📂 Struttura del Progetto

```
zampillo/
├── public/
│   └── [assets statici]
│
├── imports/
│   ├── svg-wg56ef214f (SVG marker fontanelle)
│   └── [altri SVG Figma]
│
├── components/
│   ├── figma/
│   │   └── ImageWithFallback.tsx (Protected - no edit)
│   │
│   ├── MapView.tsx               # Mappa interattiva + marker
│   ├── FountainDetailView.tsx    # Schermata dettagli fontanella
│   ├── ReportProblemDialog.tsx   # Dialog segnalazione problema
│   │
│   ├── LeaderboardView.tsx       # Community leaderboard
│   ├── UserProfileView.tsx       # Profilo pubblico altri utenti
│   │
│   ├── ProfileView.tsx           # Profilo personale
│   │
│   ├── ChatView.tsx              # Lista chat + filtri
│   ├── ChatRoom.tsx              # Singola chat aperta
│   ├── CreateChatModal.tsx       # Creazione nuova chat
│   ├── EventsModal.tsx           # Calendario eventi 50+
│   │
│   ├── SettingsView.tsx          # Impostazioni app
│   ├── TopBar.tsx                # Barra superiore globale
│   └── BottomNavigation.tsx      # Navigazione inferiore
│
├── data/
│   └── mockData.ts               # Dati mock (fontanelle, utenti, chat, eventi)
│
├── types/
│   └── index.ts                  # TypeScript interfaces
│
├── styles/
│   └── globals.css               # Stili globali + tokens + scrollbar custom
│
├── App.tsx                       # Root component
├���─ main.tsx                      # Entry point
└── README.md                     # Documentazione completa
```

### File Principali

**`/App.tsx`**
- Root component
- State globale (activeView)
- Rendering TopBar + Contenuto + BottomNav
- Switch tra 4 sezioni

**`/components/MapView.tsx`**
- Mappa interattiva Figma
- Gestione zoom, pan, drag
- 8 marker fontanelle
- Popup rapido
- Trigger FountainDetailView

**`/components/FountainDetailView.tsx`**
- Schermata full-screen dettagli fontanella
- 3 tabs: Info, Qualità, Servizi
- Grid statistiche
- Action buttons (Check-in, Chat, Segnala, Condividi)
- Eventi in programma
- Attività recenti

**`/components/ReportProblemDialog.tsx`**
- Dialog segnalazione problemi
- 6 tipologie issue con emoji
- Textarea descrizione opzionale
- Conferma invio con animazione
- Auto-reset form

**`/components/LeaderboardView.tsx`**
- 2 tabs: Fontanelle, Utenti
- Cards cliccabili
- Top 3 evidenziate con medaglie
- Trigger FountainDetailView (fontanelle)
- Trigger UserProfileView (utenti)
- Ordinamento decrescente

**`/components/UserProfileView.tsx`**
- Profilo pubblico altri utenti
- Header gradient + avatar
- Action buttons (Segui, Messaggio)
- Statistiche grid (4 cards)
- Badge guadagnati
- Info aggiuntive
- Attività recenti (ultimi 3)

**`/components/ProfileView.tsx`**
- Profilo personale
- Header XP + livello
- Statistiche dettagliate (6 cards)
- Badge 3x3 grid
- Sfide attive (settimanali, mensili, speciali)
- Progress tracking

**`/components/ChatView.tsx`**
- 2 sezioni: "Le Tue Chat" / "Scopri Chat"
- Separatore visivo 8px
- Filtri quartiere e tipo
- Dialog unione chat
- State management chat unite
- FAB calendario eventi

**`/components/ChatRoom.tsx`**
- Chat singola aperta
- Header + Back button
- Area messaggi scrollabile
- Bubble differenziate (utente vs altri)
- Input messaggio
- Timestamp relativo

**`/components/CreateChatModal.tsx`**
- Form full-screen creazione chat
- Campi obbligatori: Nome, Categoria, Quartiere
- Opzionali: Descrizione, Checkbox Eventi
- Info box admin
- Validazione + feedback

**`/components/EventsModal.tsx`**
- Calendario mese scrollabile
- 50 eventi mock (Dic 2025 - Mar 2026)
- Lista eventi raggruppati per giorno
- Filtri: Mese, Quartiere, Tipo
- Card evento dettagliate
- Pulsante Partecipa

**`/components/SettingsView.tsx`**
- Schermata full-screen impostazioni
- 8 sezioni: Account, Notifiche, Mappa, Privacy, Preferenze, About, Supporto, Azioni
- Toggle settings
- Gestione privacy

**`/data/mockData.ts`**
- 8 fontanelle complete
- 5 utenti leaderboard
- Chat associate
- 50 eventi distribuiti
- Messaggi chat
- Attività recenti

**`/types/index.ts`**
- Interface Fountain
- Interface User
- Interface Chat
- Interface Event
- Interface Message
- Type definitions

**`/styles/globals.css`**
- CSS custom properties (tokens)
- Tailwind 4.0 theme
- Typography base
- **Custom scrollbar moderna**:
  - Width: 6px
  - Track: rgba gray-200 (30% opacity)
  - Thumb: teal gradient (40% opacity)
  - Hover: teal gradient (70% opacity)
  - Border radius: 10px
  - Smooth transition: 0.3s
  - Support: Webkit (Chrome/Safari/Edge) + Firefox

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## 📊 Dati Mock

### Fontanelle (8)
- ID, Nome, Quartiere, Lat/Lng
- Condizione, Anno installazione
- Check-in, Contributi, Chat membri
- Storia, Descrizione, Tipo

### Utenti (5)
- ID, Nome, Livello, Punti
- Check-in totali, Fontanelle visitate
- Badge guadagnati

### Chat (8)
- ID, Nome fontanella
- Quartiere, Membri
- Messaggi, Eventi associati
- Categoria

### Eventi (50+)
- Data (Dic 2025 - Mar 2026)
- Tipo (Pulizia, Passeggiata, Incontro, Workshop)
- Fontanella, Quartiere
- Partecipanti, Descrizione

---

## 🎨 Color Palette

```css
/* Primary */
--teal-600: #14b8a6
--green-600: #10b981

/* Gradients */
background: linear-gradient(135deg, #14b8a6, #10b981)

/* Condition Badges */
--green-500: #10b981  /* Ottima */
--blue-500: #3b82f6   /* Buona */
--yellow-500: #eab308 /* Discreta */

/* UI Elements */
--gray-50: #f9fafb
--gray-200: #e5e7eb
--gray-500: #6b7280
--gray-900: #111827
```

---

## 📝 Note Implementazione

### Protected Files
Non modificare:
- `/components/figma/ImageWithFallback.tsx`

### Import Scheme
**Raster Images:**
```tsx
import img from "figma:asset/abc123.png"
```

**SVG Files:**
```tsx
import svgPaths from "./imports/svg-wg56ef214f"
```

### Lucide Icons
Verificare disponibilità icone prima di importare:
```tsx
import { MapPin, Trophy, Users } from 'lucide-react'
```

### TypeScript
Usare sempre types per props, state, data:
```tsx
interface FountainDetailViewProps {
  fountain: Fountain;
  distance: number;
  onBack: () => void;
}
```

---

## 🌟 Future Enhancements

Vedi sezione dedicata "Idee per Prossime Implementazioni" per roadmap completa.

---

## 📄 License

© 2025 Zampillo - Tutti i diritti riservati

---

## 👥 Credits

- **Design**: Figma Custom Map
- **Icons**: Lucide React
- **Framework**: React + TypeScript + Tailwind
- **Concept**: Promozione sostenibilità Milano

---

**Versione**: 2.0.0  
**Ultimo Aggiornamento**: Dicembre 2025  
**Status**: ✅ Completato
