# ![JVC Logo](public/assets/logo.svg)

## Kaip keisti turinį

Visas svetainės turinys saugomas JSON failuose ir lengvai redaguojamas per GitHub.

* **Kontaktai**: `public/data/contact.json`
* **Parduotuvės**: `public/data/stores.json`
* **Prekyvietės**: `public/data/marketplaces.json`
* **Vertimai**: `public/locales/{en,lt,lv}.json`

---

### 1. Redaguokite JSON

1. Atidarykite failą, pavyzdžiui `public/data/contact.json`.
2. Pakeiskite tekstą, nuorodas ar paveikslėlių kelius.
3. Išsaugokite.

### 2. Vietinė peržiūra

```bash
npm install
npm start
```

Atidarykite `http://localhost:3000` ir įsitikinkite, kad pakeitimai matomi.

### 3. Diegimas į GitHub Pages

1. Sukomituokite ir publikuokite pakeitimus:

   ```bash
   ```

git add .
git commit -m "Atnaujintas turinys"
git push

````
2. Paleiskite diegimo skriptą:
   ```bash
npm run deploy
````

3. Svetainė atnaujinama adresu `https://laverna-jvc.github.io/`.

---

#### Pastabos

* Norėdami pridėti naują kalbą, sukurkite `public/locales/<kodas>.json` ir užpildykite vertimus.
* JSON failuose naudokite sintaksę be klaidų, kitaip turinys nebus įkrautas.
