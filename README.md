# EpicMeteo - App Meteo React

## Descrizione

EpicMeteo è un'applicazione meteo moderna e reattiva costruita con React e Bootstrap. Fornisce previsioni meteorologiche in tempo reale e previsioni a 7 giorni per qualsiasi città nel mondo, con un'interfaccia utente elegante e intuitiva.

## Demo

Puoi provare l'applicazione live qui: [EpicMeteo](https://epic-meteo-react.vercel.app/)

## Caratteristiche principali

- Ricerca meteo per città e paese
- Geolocalizzazione per ottenere il meteo della posizione corrente
- Visualizzazione delle condizioni meteorologiche attuali
- Previsioni dettagliate per i prossimi 7 giorni
- Sfondo dinamico che cambia in base alle condizioni meteorologiche
- Design reattivo per una perfetta visualizzazione su tutti i dispositivi
- Animazioni fluide per una migliore esperienza utente

## Tecnologie utilizzate

- React 18
- Bootstrap 5
- React Bootstrap
- OpenWeather API per i dati meteorologici
- Pexels API per le immagini di sfondo dinamiche

## Installazione

1. Clona il repository:
   ```
   git clone https://github.com/tuousername/epicmeteo.git
   ```

2. Entra nella directory del progetto:
   ```
   cd epicmeteo
   ```

3. Installa le dipendenze:
   ```
   npm install
   ```

4. Crea un file `.env` nella root del progetto e aggiungi le tue chiavi API:
   ```
   REACT_APP_OPENWEATHER_API_KEY=tua_chiave_api_openweather
   REACT_APP_PEXELS_API_KEY=tua_chiave_api_pexels
   ```

5. Avvia l'applicazione in modalità sviluppo:
   ```
   npm start
   ```

## Struttura del progetto

Il progetto è strutturato come segue:

- `src/components/`: Contiene tutti i componenti React dell'applicazione
- `src/styles/`: Contiene i file CSS per lo styling personalizzato
- `src/__tests__/`: Contiene i file di test per i componenti

I componenti principali includono:

- `WeatherApp.js`: Il componente principale che gestisce lo stato dell'applicazione e le chiamate API
- `SearchForm.js`: Gestisce l'input dell'utente per la ricerca delle città
- `CurrentWeather.js`: Visualizza le condizioni meteorologiche attuali
- `ForecastList.js`: Mostra le previsioni per i prossimi 7 giorni
- `WeatherDetails.js`: Fornisce dettagli aggiuntivi sulle condizioni meteorologiche

## Script disponibili

Nel file `package.json`, troverai i seguenti script:


```17:22:package.json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```


- `npm start`: Avvia l'app in modalità sviluppo
- `npm build`: Crea la versione di produzione dell'app
- `npm test`: Esegue i test dell'applicazione
- `npm run eject`: Espone le configurazioni di Create React App (usa con cautela)

## Test

L'applicazione include una suite di test per garantire la qualità del codice. Puoi eseguire i test con il comando:

```
npm test
```