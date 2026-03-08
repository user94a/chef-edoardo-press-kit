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

- Nel repo: **Settings** → **Pages**.
- In **Build and deployment**, sezione **Source** scegli **GitHub Actions**.

### 4. Esegui il primo deploy

- Il workflow parte automaticamente a ogni push su `main`.
- Per lanciarlo a mano: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

### 5. Controlla il risultato

- Dopo qualche minuto il sito sarà disponibile su:
  - **https://user94a.github.io/chef-edoardo-press-kit/**

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
