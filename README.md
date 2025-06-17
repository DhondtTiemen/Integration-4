# 🚀 AbbyStorage Chat App

Een real-time community & chatplatform gebouwd met **Vue 3**, **Vite**, **TailwindCSS**, **Firebase** en **Socket.IO**.

---

## ✅ Systeemvereisten

| Vereiste          | Versie/Opmerking                     |
|-------------------|--------------------------------------|
| OS                | macOS of Windows                     |
| Node.js           | ≥ v18 (aanbevolen: v20)              |
| NPM               | ≥ v9                                 |
| Internet          | Vereist (voor Firebase & Render)     |

---

## 🧠 Projectstructuur

\`\`\`bash
.
├── src/
│   ├── firebase/             # Firebase configuratie
│   ├── views/                # Vue-pagina's
│   ├── components/           # Vue-componenten
│   └── abby-socket-server/   # Socket.io backend (Express + TS)
├── public/
├── vite.config.ts
├── package.json
└── tsconfig.json
\`\`\`

---

## ⚙️ Setup Gids

### 1. Clone project of unzip map

\`\`\`bash
git clone https://github.com/jouwRepo/abbyStorage.git
cd abbyStorage
\`\`\`

### 2. Installeer afhankelijkheden

\`\`\`bash
npm install
\`\`\`

### 3. Start frontend lokaal

\`\`\`bash
npm run dev
\`\`\`

Toegang via: [http://localhost:5173](http://localhost:5173)

---

## 🧠 Backend Socket.IO Server (Render setup)

### Lokale test:

\`\`\`bash
cd src/abby-socket-server
npm install
npm run start
\`\`\`

### Deploy op [Render](https://render.com)

- **Root directory:** \`src/abby-socket-server\`
- **Build command:**  
  \`\`\`bash
  npm install
  \`\`\`
- **Start command:**  
  \`\`\`bash
  npm start
  \`\`\`
- **Port:** \`3001\`  
- **Installeren als web service**
- Zorg ervoor dat \`tsx\` geïnstalleerd is in \`package.json\`

> Als je \`tsx\` nog niet hebt:
\`\`\`bash
npm install tsx --save-dev
\`\`\`

---

## 🔐 Firebase Setup

1. Maak een nieuw Firebase-project op [console.firebase.google.com](https://console.firebase.google.com)
2. Activeer:
   - Firestore Database
   - Firebase Storage
   - Authentication (Email/Password)

3. Voeg deze configuratie toe in \`src/firebase/firebase.ts\`:

\`\`\`ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "JOUW_API_KEY",
  authDomain: "PROJECT.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
\`\`\`

---

## 🌍 Deployment op GitHub Pages (Frontend)

1. Update \`vite.config.ts\`:

\`\`\`ts
export default defineConfig({
  base: '/jouwRepoNaam/',
  // ...
});
\`\`\`

2. Build project:

\`\`\`bash
npm run build
\`\`\`

3. Deploy de \`/dist\` folder via GitHub Pages of Vite-plugin-gh-pages.

---

## 📁 .env (optioneel)

Maak \`.env\` in de root:

\`\`\`bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_APP_ID=your_app_id
\`\`\`

Gebruik \`import.meta.env.VITE_FIREBASE_API_KEY\` in je code.

---

## 🛠 Eerste installatie

\`\`\`bash
npm install
\`\`\`

## 🧪 Lokaal runnen

\`\`\`bash
npm run dev
\`\`\`

## 🌐 Server starten

\`\`\`bash
cd src/abby-socket-server
npm install
npm start
\`\`\`

---

Voor vragen of hulp, neem contact op met de ontwikkelaar van dit project. Succes!
