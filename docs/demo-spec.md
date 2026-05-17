# Billingo MI Iranyitopult Bemutato Spec

## Cel

Egy latvanyos, fiktiv adatokkal mukodo Billingo-inspiralt MI iranyitopult bemutato keszitese a 2026. majus 21-i panelbeszelgetesre.

A bemutato celja nem az, hogy elo Billingo adatokat mutasson, hanem hogy kisvallalkozok szamara kezzelfoghatoan bemutassa:

- az MI kepes penzugyi es szamlazasi adatokbol uzleti helyzetkepet kesziteni,
- priorizalni tudja a legsurgosebb teendoket,
- ugyfelviselkedesi mintazatokat tud felismerni,
- segithet kovetkezo lepeseket es fizetesi emlekezteto szovegeket megfogalmazni,
- a vallalkozonak nem tobb adatot, hanem jobb dontest ad.

## Bemutato alapelvek

- A bemutato nem hasznal elo Billingo API-t.
- Minden adat fiktiv, magyar kisvallalkozoi kontextusba illeszkedo.
- A bemutato legyen projektoron is jol olvashato, vizualisan karakteres, modern es emlekezetes.
- Az MI-jelleg elso korben lehet szabalyalapu vagy elore generaltnak tuno insight, de az UI-nak ugy kell felepulnie, hogy kesobb LLM endpoint kotheto legyen moge.
- A szamokat determinisztikus kod szamolja, az MI-reteg csak ertelmez, priorizal, fogalmaz es javasol.
- A felulet ne legyen tulzsufolt: minden kepernyonek legyen egyetlen vilagos uzleti kerdese.

## Fiktiv ceg

Minta vallalkozas:

**MesterMuhely Studio Kft.**

Profil:

- magyar szolgaltato kisvallalkozas,
- weboldalakat, arculatot, online kampanyokat es automatizalasi tanacsadast keszit,
- vannak egyszeri projektmunkai es visszatero havi dijas ugyfelei,
- tobb ugyfel kesve fizet, nehany ugyfel novekvo, nehany lemorzsolodo,
- a cegvezetonek fontos a penzaramlas, a kintlevoseg es az ugyfelkapcsolatok gyors atlatasa.

## Bemutato adatcsomag

Elvart mennyiseg:

- 25-35 fiktiv partner,
- 120-180 fiktiv szamla,
- 12-15 honapnyi idotav,
- HUF alapu szamlak,
- fizetett, fizetetlen, lejart, sztornozott es piszkozat jellegu tetelek,
- valtozatos fizetesi modok: atutalas, bankkartya, keszpenz, online kartya,
- realisztikus magyar ceg- es vallalkozasnevek.

Elvart fiktiv mintazatok:

- nagy erteku partner, aki sok bevetelt hoz, de rendszeresen kesve fizet,
- uj partner, akinek az utolso 3 honapban gyorsan no a szamlaerteke,
- korabban aktiv partner, aki 90+ napja nem kapott uj szamlat,
- tobb kisebb, regen lejart szamla,
- egy-ket nagy osszegu, azonnali utan kovetest igenylo lejart szamla,
- aktualis honapban beveteli visszaeses vagy eros penzaramlas-kitetettseg,
- hianyos partneradatok, peldaul nincs email cim,
- visszatero havi dijas ugyfelek.

## Fo kepernyok

### 1. MI Radar

Uzleti kerdes:

**Mit lat ma az MI a vallalkozasombol?**

Tartalom:

- nagy MI vezeto osszefoglalo,
- 3-5 legfontosabb insight,
- beveteli lendület vagy visszaeses jelzese,
- kintlevosegi kockazat,
- penzaramlas rovid elorejelzes,
- mai javasolt teendok.

Pass/fail kriteriumok:

- PASS, ha a kepernyo bemutato adatokbol szamolt KPI-okat jelenit meg.
- PASS, ha van legalabb 3 MI-szeru, konkret, uzleti insight.
- PASS, ha van "mai teendok" lista prioritas szerint.
- PASS, ha nincs elo Billingo API hivas.
- FAIL, ha a kepernyo csak altalanos marketing szoveget mutat.
- FAIL, ha az insightok nem kapcsolodnak a fiktiv adatokhoz.

### 2. Penzmozgas

Uzleti kerdes:

**Hol van a penz, mi jott be, mi varhato, hol akad el?**

Tartalom:

- havi beveteli trend,
- aktualis havi es eves bevetel,
- fizetett / fizetetlen / lejart arany,
- kintlevoseg korositasa,
- kovetkezo 30 nap varhato beerkezese,
- penzaramlas kockazati szint.

Pass/fail kriteriumok:

- PASS, ha legalabb ket erdemi vizualizacio van.
- PASS, ha a kintlevoseg lejart napok szerint is ertelmezheto.
- PASS, ha a penzaramlas elorejelzes adatokbol szamolt becslesen alapul.
- FAIL, ha csak a regi iranyitopult KPI-jai vannak ujrarendezve.

### 3. Ugyfelintelligencia

Uzleti kerdes:

**Mely ugyfelek hozzak a stabilitast, a kockazatot vagy a novekedest?**

Tartalom:

- top partnerek bevetel szerint,
- kesve fizeto partnerek,
- novekvo partnerek,
- inaktiv vagy lemorzsolodo partnerek,
- partner health jelzes,
- rovid MI ugyfelprofilok.

Pass/fail kriteriumok:

- PASS, ha minden kiemelt partnerhez van ertelmezheto statusz vagy cimke.
- PASS, ha legalabb egy novekvo, egy kesve fizeto es egy lemorzsolodo partner latszik.
- PASS, ha a ugyfelprofilok nem veletlenszeruek, hanem adatokbol kovetkeznek.
- FAIL, ha ez csak sima ugyfelkartya-lista marad.

### 4. Akciokozpont

Uzleti kerdes:

**Mit csinaljak ma, hogy penz jojjon be vagy kisebb legyen a kockazat?**

Tartalom:

- priorizalt kintlevosegi teendok,
- lejart szamlak magyarazattal,
- MI fizetesi emlekezteto generator,
- hangnemvalaszto: baratsagos, hatarozott, rovid,
- masolhato uzenetszoveg,
- "miert ez a prioritas?" magyarazat.

Pass/fail kriteriumok:

- PASS, ha a legsurgosebb akciok nem pusztan osszeg szerint rendezodnek.
- PASS, ha generalt emlekezteto szoveg tartalmaz partnernevet, szamlaszamot, osszeget es lejarti datumot.
- PASS, ha legalabb 3 hangnem mukodik.
- FAIL, ha az emlekezteto csak altalanos sablonszoveg.

### 5. Szamlak

Uzleti kerdes:

**Hol vannak a konkret bizonylatok es reszletek?**

Tartalom:

- szamla lista,
- keresheto partner es szamlaszam alapjan,
- statusz szerinti szures,
- reszlet modal,
- MI magyarazat egy adott szamlarol,
- bemutato bizonylat gomb helyett biztonsagos helykitolto.

Pass/fail kriteriumok:

- PASS, ha a szamla lista a bemutato adatokbol jon.
- PASS, ha a kereses es szures mukodik.
- PASS, ha a reszletnezet nem probal elo bizonylat-et letolteni.
- FAIL, ha barmilyen elo Billingo letoltes vagy API-hivas megmarad a bemutato modban.

## UI irany

Hangulat:

- premium, modern, "MI iranyitokozpont" jelleg,
- projektoron is eros kontraszt,
- nem tul sotet, nem tul neon,
- visszafogott grafit alap, vilagos tartalomblokkokkal vagy eros kontrasztu panelek,
- penzugyi statuszszinek: zold, borostyan, piros, kek/turkiz,
- nagy, jol olvashato szamok,
- karakteres, de nem villogo vizualis elemek.

Kerulendo:

- tulzsufolt tablak,
- tul sok dekoracio,
- generikus SaaS landing page hangulat,
- eloadason nehezen olvashato apro betuk,
- lila-kek gradient dominancia minden feluleten,
- olyan MI szovegek, amelyek nem mondanak konkretumot.

## Technikai irany

Elso bemutato verzio:

- statikus vagy lokal frontend,
- fiktiv adatmodul,
- nincs elo Billingo API hivas,
- nincs valodi LLM hivas,
- MI insightok szabalynak tuno determinisztikus logikabol vagy fiktiv bemutato generatorbol,
- a jelenlegi Netlify proxy maradhat a repo-ban, de a bemutato UI nem hasznalja.

Kesobbi verzio:

- OpenMI/LLM endpoint,
- read-only Billingo MCP szerver,
- valos adatokra kotheto elemzesi retegek,
- emberi jovahagyast igenylo akciok.

## Ralph Loop tasklista

### Task 1: Bemutato spec letrehozasa

Statusz: kesz.

Pass/fail:

- PASS, ha a spec tartalmazza a celt, bemutato adatvilagot, fo kepernyoket es ellenorzesi kriteriumokat.
- PASS, ha a spec eleg konkret ahhoz, hogy implementacios taskokra bonthato legyen.

### Task 2: Fiktiv adatmodell es bemutato dataset

Statusz: kesz.

Cel:

Letrehozni egy strukturalt bemutato adatforrast, amely helyettesiti a Billingo API-t.

Pass/fail:

- PASS, ha legalabb 25 partner es 120 szamla van.
- PASS, ha a szamlakbol kiolvashatok a tervezett uzleti mintazatok.
- PASS, ha az adatmodell kompatibilis a jelenlegi iranyitopult fontos mezoivel, ahol ez ertelmes.
- FAIL, ha az adatok teljesen randomok es nem tamasztjak ala az MI insightokat.

### Task 3: Bemutato mod bekapcsolasa

Statusz: kesz API-fuggetlen bemutato adatbetoltessel. Megjegyzes: a jelenlegi HTML tovabbra is CDN-rol tolti a React/Babel fajlokat; a teljes internet nelkuli, vendorizalt futtatas a Task 10 ellenorzesi korben kulon dontes.

Cel:

A frontend alapertelmezetten bemutato adatokbol mukodjon.

Pass/fail:

- PASS, ha betolteskor nincs Billingo API hivas.
- PASS, ha a iranyitopult teljesen mukodik internet es API kulcs nelkul.
- FAIL, ha hianyzo env var vagy Billingo API hiba megakasztja a bemutatot.

### Task 4: Uj navigacio es layout

Statusz: kesz alap otnezetes szerkezettel. Bongeszoben ellenorizve: az ot fo nezet latszik, a bemutato adatmodul betolt, es a iranyitopult 171 szamlat / 30 partnert mutat. Megjegyzes: a teljes screenshotos, tobb meretes vizualis ellenorzes a Task 10 teljes vizualis korben tortenjen meg.

Cel:

Atalakitani a feluletet az ot bemutato kepernyos szerkezetre.

Pass/fail:

- PASS, ha elerheto az MI Radar, Penzmozgas, Ugyfelintelligencia, Akciokozpont es Szamlak nezet.
- PASS, ha a navigacio egyertelmu es projektoron is olvashato.
- FAIL, ha a regi Attekintes / Szamlak / Partnerek struktura dominans marad.

### Task 5: MI Radar

Statusz: kesz elso MI-vezeto osszefoglalo valtozattal. Bongeszoben ellenorizve: a nyito nezet betolt, latszik a MI-osszefoglalo, a felismeresek, a mai teendok, es a lathato angol kifejezesek el lettek tavolitva.

Cel:

Megvalositani a nyito, leglatvanyosabb vezetoi cockpit nezetet.

Pass/fail:

- Lasd az MI Radar kepernyo kriteriumait.

### Task 6: Penzmozgas

Statusz: kesz elso onallo penzmozgas nezettel. Tartalmaz 30 napos varhato beerkezest, kintlevoseg-korositast, beveteli trendet, fizetesi allapotot es penzaramlasi ertelmezest. Bongeszoben ellenorizve: a Penzmozgas ful betolt, a blokkok latszanak, es nincs lathato angol kifejezes.

Cel:

Megvalositani a penzugyi es penzaramlas nezetet.

Pass/fail:

- Lasd a Penzmozgas kepernyo kriteriumait.

### Task 7: Ugyfelintelligencia

Statusz: kesz elso onallo ugyfelintelligencia nezettel. Tartalmaz ugyfel-osszefoglalot, legnagyobb ugyfeleket, novekvo ugyfeleket, kesve fizeto ugyfeleket, ujraaktivalhato ugyfeleket es MI ugyfelprofilokat. Bongeszoben ellenorizve: a ful betolt, a fo blokkok latszanak, es nincs lathato angol kifejezes.

Cel:

Megvalositani a partner- es ugyfelviselkedes-elemzo nezetet.

Pass/fail:

- Lasd az Ugyfelintelligencia kepernyo kriteriumait.

### Task 8: Akciokozpont

Statusz: kesz elso onallo akciokozponttal. Tartalmaz rangsorolt mai akciolistat, prioritas-magyarazatot, fizetesi emlekezteto elonezetet, harom magyar hangnemet es szamlaadatokkal kitoltott uzenetet. Bongeszoben ellenorizve: a ful betolt, a hangnemvaltas mukodik, es az emlekezteto tartalmaz ugyfelnevet, szamlaszamot, osszeget es hataridot.

Cel:

Megvalositani a priorizalt teendoket es bemutato emlekezteto generatort.

Pass/fail:

- Lasd az Akciokozpont kepernyo kriteriumait.

### Task 9: Szamlak bemutato nezet

Statusz: kesz bemutatobiztos szamlanezettel. Tartalmaz Szamlatár bevezeto savot, magyar oszlopneveket, MI jelzest a tablaban, szamlaszintu MI magyarazatot a reszletablakban, es elo bizonylatmegnyitas helyett bemutato vedouzenetet. Bongeszoben ellenorizve: a ful betolt, a reszletablak nyilik, a bizonylat gomb nem indit elo letoltest.

Cel:

Atalakitani a szamla listat ugy, hogy bemutato adatokbol mukodjon es ne hasznaljon elo bizonylat/API funkciot.

Pass/fail:

- Lasd a Szamlak kepernyo kriteriumait.

### Task 10: Vizualis es technikai ellenorzes

Statusz: kesz zarokori ellenorzessel. Bongeszoben vegigellenorizve: MI Radar, Penzmozgas, Ugyfelintelligencia, Akciokozpont es Szamlak. A hangnemvaltas mukodik, a szamlareszlet megnyilik, a bemutato bizonylat gomb nem indit elo letoltest, es a desktop MI Radar kepernyokep projektoron is olvashato. Megjegyzes: a jelenlegi bongeszoretegben nem talaltam stabil viewport-atallitasi hivasmodot, ezert a mobil/tablet ellenorzest kesobbi kulon korben erdemes megismetelni.

Cel:

Megnezni, hogy a bemutato stabilan, latvanyosan es hiba nelkul fut.

Pass/fail:

- PASS, ha a HTML/JS szintaktikailag ervenyes.
- PASS, ha helyi szerveren betoltodik.
- PASS, ha desktop mereten projektorra alkalmasan olvashato.
- PASS, ha mobil/tablet mereten nem esik szet.
- PASS, ha nincs konzolhiba a fo user flow soran.
- FAIL, ha a bemutato elo adatforrast, API kulcsot vagy halozati Billingo hivasokat igenyel.

## Elso implementacios dontes

Az elso mukodo verzio legyen stabil, latvanyos es offline/bemutato-biztos. A valodi MI es MCP integracio kesobbi reteg. A panelbemutato kockazatat csokkenti, ha az elso bemutato adat- es UI-szinten mar eros, es nem fugg kulso szolgaltatasok aktualis elerhetosegetol.
