# Deploy su GitHub Pages

Guida per pubblicare il press kit su GitHub Pages.

## Cosa è stato configurato

1. **Next.js** – Export statico (`output: 'export'`) e `basePath`/`assetPrefix` per il sotto-path `/chef-edoardo-press-kit`.
2. **GitHub Actions** – Workflow che, a ogni push su `main`, esegue build e deploy su GitHub Pages.

## Passi per il deploy

### 1. Repository

Repo già creato: **user94a/chef-edoardo-press-kit**

### 2. Inizializza Git e collega il repo (se non l’hai già fatto)

```bash
cd /Users/dariocalamandrei/Desktop/chef-edoardo-press-kit
git init
git add .
git commit -m "Initial commit - press kit for GitHub Pages"
git branch -M main
git remote add origin git@github.com:user94a/chef-edoardo-press-kit.git
git push -u origin main
```

### 3. Abilita GitHub Pages con GitHub Actions

GitHub può pubblicare il sito in due modi: da un branch (es. `main`) o **con GitHub Actions**. Noi usiamo il secondo, perché il workflow che abbiamo creato fa build + deploy.

**Cosa fare (passo per passo):**

1. Apri il repo su GitHub: **https://github.com/user94a/chef-edoardo-press-kit**
2. Clicca sulla tab **Settings** (in alto, accanto a Code / Issues / Pull requests).
3. Nella barra laterale sinistra, sotto "Code and automation", clicca **Pages**.
4. Nella sezione **Build and deployment** trovi **Source** (da dove GitHub prende i file da pubblicare).
5. Nel menu a tendina di Source seleziona **GitHub Actions** (non "Deploy from a branch").

Non serve salvare: la scelta viene applicata subito. Da questo momento, quando il workflow "Deploy to GitHub Pages" viene eseguito (automaticamente o a mano), GitHub pubblicherà l’output sul tuo sito.

### 4. Esegui il primo deploy

- **Automatico:** dopo il push su `main`, in **Actions** parte il workflow "Deploy to GitHub Pages"; attendi che finisca (icona verde).
- **Manuale:** vai in **Actions** → clicca "Deploy to GitHub Pages" → **Run workflow** → **Run workflow** (pulsante verde).

### 5. Controlla il risultato

- Dopo qualche minuto il sito sarà disponibile su:
  - **https://user94a.github.io/chef-edoardo-press-kit/**

---

## Il sito non parte (404 / pagina vuota)

Controlla in ordine:

1. **Source in Pages**
   - **Settings** → **Pages** → **Build and deployment** → **Source** deve essere **GitHub Actions** (non "Deploy from a branch").

2. **Workflow eseguito con successo**
   - Vai su **Actions**: https://github.com/user94a/chef-edoardo-press-kit/actions  
   - Apri l’ultima run di **"Deploy to GitHub Pages"**.  
   - Se è **rossa** (fallita), clicca sulla run e controlla quale step è fallito (es. "Install dependencies" o "Build"); il messaggio di errore è lì.  
   - Se non vedi nessuna run, il workflow non è mai partito: fai un nuovo push su `main` (o `master`) oppure **Actions** → "Deploy to GitHub Pages" → **Run workflow**.

3. **Branch giusto**
   - Il workflow parte solo su push a **main** o **master**. Se lavori su un altro branch, fai merge su `main` e push, oppure lancia il workflow a mano da **Actions** → **Run workflow** (usa il branch che ha il codice).

4. **Dopo aver cambiato Source**
   - Se hai appena impostato Source su **GitHub Actions**, esegui una volta il workflow a mano: **Actions** → "Deploy to GitHub Pages" → **Run workflow** → **Run workflow**.

Se il **Build** fallisce (es. errore `pnpm` o `next build`), copia il messaggio di errore dalla tab Actions e usalo per correggere (es. dipendenze o versione Node).

---

## Se il repository ha un nome diverso

Se il repo **non** si chiama `chef-edoardo-press-kit`, modifica `next.config.mjs`:

- `basePath`: `'/NOME-REPO'`
- `assetPrefix`: `'/NOME-REPO/'`

Esempio per un repo `edoardo-press`:

```js
basePath: process.env.NODE_ENV === 'production' ? '/edoardo-press' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/edoardo-press/' : '',
```

Poi l’URL sarà: `https://TUO-USERNAME.github.io/NOME-REPO/`.

## Build in locale

```bash
pnpm install
pnpm run build
```

I file statici sono nella cartella `out/`. Per provarli in locale con lo stesso path di GitHub Pages:

```bash
npx serve out -p 3000
```

Poi apri: **http://localhost:3000/chef-edoardo-press-kit/**
