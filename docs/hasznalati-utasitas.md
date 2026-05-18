# Billingo MI irányítópult - Használati utasítás

## Mire való ez a fejlesztés?

Ez a Billingo MI irányítópult egy bemutató célú, fiktív adatokkal működő üzleti döntéstámogató felület. A célja az, hogy kisvállalkozóknak kézzelfoghatóan megmutassa: a számlázási adatokból nem csak táblázatokat és listákat lehet készíteni, hanem értelmezhető üzleti helyzetképet, pénzmozgási előrejelzést, ügyfélmintázatokat és konkrét napi teendőket is.

Fontos: ez a demó nem használ élő Billingo adatokat. Minden cég, ügyfél, számla, összeg és fizetési minta fiktív. Emiatt bátran bemutatható nyilvános eseményen is.

A fejlesztés három szinten hasznos:

1. Bemutatóként: látványosan megmutatja, hogyan tud az MI üzleti döntéstámogatást adni.
2. Termékötletként: megmutatja, milyen irányba lehet továbbfejleszteni egy Billingo-alapú vezetői felületet.
3. Későbbi éles rendszer alapjaként: ugyanaz a logika később valós Billingo adatokkal, olvasási jogosultságú kapcsolati kulccsal is működtethető.

## Kinek érdemes megmutatni?

Elsősorban olyan kisvállalkozóknak, akik:

- számláznak, de nem nézik rendszeresen az adataikat,
- nem tudják pontosan, hol akad el a pénz,
- késve fizető ügyfelekkel küzdenek,
- szeretnék látni, mely ügyfelek értékesek, kockázatosak vagy újraaktiválhatók,
- nem akarnak bonyolult riportokat olvasni, csak érthető következő lépéseket szeretnének.

Nem könyvelői rendszerként kell bemutatni, hanem vezetői asszisztensként: olyan felületként, amely segít észrevenni, értelmezni és rangsorolni a fontos dolgokat.

## Mit kell hangsúlyozni a bemutatón?

A legfontosabb üzenet:

> Az MI nem attól hasznos, hogy varázslatos dolgokat mond, hanem attól, hogy a meglévő üzleti adatokból jobb döntéseket és jobb következő lépéseket segít kihozni.

Érdemes külön kiemelni:

- az adatok fiktívek, ezért biztonságosan mutathatók,
- a számok determinisztikusan számolt adatokból jönnek,
- az MI-szerű réteg értelmez, priorizál, magyaráz és szöveget fogalmaz,
- az éles verzióban minden emberi jóváhagyással történne,
- a cél nem az, hogy még több adat legyen a vállalkozó előtt, hanem hogy kevesebb zajból gyorsabb döntés szülessen.

## Indítás és elérés

Publikus bemutató oldal:

https://billingo-mi-demo-daroczi.netlify.app

Helyi futtatás fejlesztéshez:

```bash
python3 -m http.server 8765
```

Ezután böngészőben:

```text
http://127.0.0.1:8765/
```

A jelenlegi demó React és Babel könyvtárakat külső kiszolgálóról tölt. Ezért a publikus Netlify oldalon internetkapcsolat szükséges. A fiktív Billingo-adatok viszont a projekt saját `js/demoData.js` fájljából jönnek, nem élő adatkapcsolatból.

## Bemutató előtti ellenőrzőlista

Ezt érdemes csütörtökön, 2026. május 21-én a beszélgetés előtt végigvenni.

1. Nyisd meg a publikus oldalt: https://billingo-mi-demo-daroczi.netlify.app
2. Ellenőrizd, hogy a bal oldali menüben ez az öt fül látszik:
   - MI Radar
   - Pénzmozgás
   - Ügyfélintelligencia
   - Akcióközpont
   - Számlák
3. Az MI Radar tetején látszódjon:
   - 171 számla
   - 30 ügyfél
   - bemutató mód
4. Az Akcióközpontban az első javasolt tétel legyen:
   - Borbála Rendezvényház Kft.
   - MM-24165
   - 680 000 Ft
   - 21 napja lejárt
5. A Számlák fülön a `Lejárt` szűrő pontosan 3 tételt adjon.
6. A Számlák fülön a `Fizetetlen` szűrő pontosan 10 tételt adjon.
7. A `Megnyitás` gomb nyisson részletablakot.
8. A `Bemutató bizonylat megnyitása` gomb ne töltsön le valódi bizonylatot, hanem figyelmeztessen, hogy bemutató módban nincs élő bizonylatmegnyitás.
9. Projektoron vagy nagy kijelzőn ellenőrizd, hogy a fontos számok és szövegek olvashatók.

Ha ezek rendben vannak, a demó bemutatható.

## A fő nézetek használata

### 1. MI Radar

Üzleti kérdés:

**Mit lát ma az MI a vállalkozásomból?**

Ezt érdemes elsőként megmutatni, mert ez adja a legerősebb nyitóélményt. Itt nem egy számlalista jelenik meg, hanem vezetői helyzetkép.

Mit mutat?

- vezetői összefoglalót,
- kockázati szintet,
- legfontosabb felismeréseket,
- mai teendőket,
- havi és éves bevételi mutatókat,
- kintlévőséget,
- fizetési rátát,
- lejárt számlák összegét.

Hogyan érdemes magyarázni?

Mondd el, hogy egy kisvállalkozó gyakran nem azt kérdezi, hogy "hány számlám van?", hanem azt, hogy "mire kell ma figyelnem?". Az MI Radar erre válaszol. Kiemeli, hogy a vállalkozás pénzügyi képe alapvetően erős, de a kintlévőség kezelése most fontos.

Bemutatási mondat:

> Itt nem nyers adatokat nézünk, hanem egy vezetői összefoglalót. A rendszer rögtön megmondja, hogy mi a legfontosabb pénzügyi kockázat és mi legyen a következő lépés.

### 2. Pénzmozgás

Üzleti kérdés:

**Hol van a pénz, mi jött be, mi várható, és hol akad el?**

Ezt akkor mutasd, amikor a közönség már érti, hogy nem egyszerű számlalistáról van szó. Itt a pénzáramlás kap főszerepet.

Mit mutat?

- havi bevételi trendet,
- 30 napos várható beérkezést,
- összes kintlévőséget,
- lejárt állományt,
- fizetési állapotot,
- kintlévőség korosítását,
- legfontosabb nyitott tételeket.

Mire jó?

- segít látni, hogy mennyi pénz várható rövid távon,
- megmutatja, mennyi pénz akadt el lejárt számlákban,
- segít eldönteni, kinek kell először szólni,
- pénzügyi fegyelmet ad olyan vállalkozóknak is, akik nem szeretnek riportokat nézegetni.

Bemutatási mondat:

> Ez a nézet abban segít, hogy ne csak azt lássuk, mennyi volt a bevétel, hanem azt is, hogy mi várható be, és hol kell utánanyúlni a pénznek.

### 3. Ügyfélintelligencia

Üzleti kérdés:

**Mely ügyfelek hozzák a stabilitást, a kockázatot vagy a növekedést?**

Ez a nézet különösen hasznos kisvállalkozóknak, mert sokan érzésből kezelik az ügyfeleiket. Itt az adat segít megmutatni, hogy ki értékes, ki növekszik, ki fizet késve, és kit lehetne újraaktiválni.

Mit mutat?

- legnagyobb ügyfeleket,
- növekvő ügyfeleket,
- késve fizető ügyfeleket,
- újraaktiválható ügyfeleket,
- MI ügyfélprofilokat,
- hiányzó kapcsolati adatokat.

Mire jó?

- segít eldönteni, kikre érdemes több figyelmet fordítani,
- jelzi, hol lehet bevételnövekedés,
- jelzi, hol van fizetési kockázat,
- segít észrevenni a lemorzsolódó ügyfeleket,
- megmutatja, ha az automatizált utánkövetéshez hiányzik például a levélcím.

Bemutatási mondat:

> Itt az MI nem csak azt mondja meg, ki fizetett sokat, hanem azt is, hogy milyen mintázat látszik az ügyfél viselkedésében.

### 4. Akcióközpont

Üzleti kérdés:

**Mit csináljak ma, hogy pénz jöjjön be vagy kisebb legyen a kockázat?**

Ez a demó egyik legerősebb része. Itt válik egyértelművé, hogy az MI nem csak elemez, hanem teendővé alakítja az adatokat.

Mit mutat?

- rangsorolt mai akciólistát,
- lejárt és fizetetlen számlák prioritását,
- magyarázatot, hogy miért fontos az adott tétel,
- fizetési emlékeztető szöveget,
- három hangnemet:
  - Barátságos
  - Határozott
  - Rövid

Miért fontos?

A legtöbb vállalkozó nem azért nem követi a kintlévőséget, mert nem tudja, hogy kellene. Hanem mert kényelmetlen, időigényes, és mindig van sürgősebbnek tűnő feladat. Az Akcióközpont ezt bontja le konkrét, azonnal használható lépésekre.

Bemutatási mondat:

> Ez már nem riport, hanem napi munkalista. A rendszer megmondja, kivel kell kezdeni, miért pont vele, és még egy udvarias emlékeztetőt is megfogalmaz.

Mit érdemes élőben megmutatni?

1. Nyisd meg az Akcióközpontot.
2. Mutasd meg az első tételt: Borbála Rendezvényház Kft.
3. Olvasd fel a `Miért fontos?` magyarázatot.
4. Mutasd meg a fizetési emlékeztetőt.
5. Válts a három hangnem között.
6. Mondd el, hogy éles rendszerben ezt emberi jóváhagyás után lehetne elküldeni.

### 5. Számlák

Üzleti kérdés:

**Miből dolgoznak a vezetői nézetek?**

Ez az operatív háttérnézet. Nem ezzel érdemes kezdeni, mert önmagában kevésbé látványos, de nagyon fontos a hitelesség miatt. Itt látszik, hogy a felsőbb nézetek konkrét számlákból és konkrét ügyfelekből számolnak.

Mit mutat?

- számlalistát,
- ügyfélnevet,
- számlaszámot,
- dátumokat,
- összeget,
- státuszt,
- MI jelzést,
- részletablakot,
- számlaszintű MI magyarázatot.

Hogyan érdemes használni?

- A `Lejárt` szűrővel megmutatható a 3 késedelmes nyitott tétel.
- A `Fizetetlen` szűrővel megmutatható a 10 még nem lejárt, de nyitott tétel.
- A keresőben ügyfélre vagy számlaszámra lehet keresni.
- A `Megnyitás` gombbal megnyílik a részletablak.
- A részletablakban látszik, hogy az adott számla miért fontos.

Bemutatási mondat:

> Ez a bizonyíték-réteg. Ha valaki megkérdezi, miből számolta ezt a rendszer, itt megmutatható a konkrét számla.

## Javasolt bemutatási sorrend csütörtökre

Ne a Számlák nézettel kezdj. Az túl operatív. A jó sorrend:

1. MI Radar - nagy kép, azonnali hatás.
2. Pénzmozgás - hol van a pénz.
3. Akcióközpont - mit kell ma tenni.
4. Ügyfélintelligencia - kik a fontos ügyfelek.
5. Számlák - honnan jönnek az adatok.

Ha kevés idő van, elég ez a három:

1. MI Radar
2. Akcióközpont
3. Számlák

Ez a rövid verzió jól mutatja az MI értékét:

- értelmez,
- rangsorol,
- cselekvést javasol,
- visszavezethető konkrét adatra.

## Milyen üzleti problémákra ad választ?

### Kintlévőség kezelése

A rendszer megmutatja, mely számlák lejártak, mekkora összegről van szó, és melyiket érdemes először kezelni.

Használati helyzet:

- heti pénzügyi áttekintés,
- hétfő reggeli teendőlista,
- hónap végi kintlévőség-kezelés.

### Pénzáramlás tervezése

A rendszer megmutatja, mennyi pénz várható a következő 30 napban, és mennyi az elakadt pénz.

Használati helyzet:

- költségek tervezése,
- adófizetés előtti áttekintés,
- beszállítói fizetések előtti döntés.

### Ügyfélminőség elemzése

A rendszer nem csak bevétel alapján nézi az ügyfeleket, hanem mintázatok alapján is.

Használati helyzet:

- melyik ügyféllel érdemes többet foglalkozni,
- kinek érdemes új ajánlatot adni,
- kit kell óvatosabban kezelni fizetési szempontból.

### Kommunikáció gyorsítása

Az Akcióközpont fizetési emlékeztetőt fogalmaz, amit az éles verzióban jóváhagyás után lehetne használni.

Használati helyzet:

- késedelmes fizetés udvarias kezelése,
- pénzügyi adminisztráció gyorsítása,
- kellemetlen levelek megírásának megkönnyítése.

## Mire nem való ez a demó?

Ez fontos, mert a bemutatón is tisztán kell kommunikálni.

Ez a demó nem:

- könyvelőprogram,
- hivatalos pénzügyi kimutatás,
- élő Billingo riport,
- automatikus behajtási rendszer,
- emberi jóváhagyás nélküli levélküldő rendszer,
- jogi vagy adótanácsadó eszköz.

A demó célja az üzleti lehetőség bemutatása. A későbbi éles verzióban külön kell kezelni az adatvédelmet, jogosultságokat, hiteles adatkapcsolatot, naplózást és emberi jóváhagyást.

## Éles verzióban hogyan működhetne?

Későbbi éles rendszerhez két irány van:

1. Egy Billingo adatkapcsolatos, egy fiókos verzió, amelyet más vállalkozóknak is át lehet adni.
2. Egy saját, több Billingo fiókos verzió, amely például Tamás és Krisztina külön Billingo fiókját együtt vagy külön is tudja elemezni.

Az éles verzióban javasolt működés:

- csak olvasási jogosultságú Billingo kapcsolati kulcs,
- külön ügyféladat-kezelési szabályok,
- választható időszak,
- egy vagy több Billingo fiók kiválasztása,
- MI elemzés valós adatokra,
- emberi jóváhagyás minden külső kommunikáció előtt,
- naplózás arról, milyen adatból milyen javaslat készült.

## Jó bemutatói mondatok

Ezeket érdemes saját stílusban használni.

> A legtöbb kisvállalkozónak nem az a baja, hogy nincs adata, hanem az, hogy nincs ideje értelmezni.

> Ez a rendszer nem még egy táblázatot ad, hanem megmondja, mire kell ma figyelni.

> Az MI itt nem helyetted dönt, hanem előkészíti a döntést.

> A számlázási adatokban benne van a vállalkozás története: kik fizetnek jól, kik késnek, hol nő a bevétel, hol akad el a pénz.

> Az éles verzióban nem az a cél, hogy az MI automatikusan leveleket küldözgessen, hanem hogy emberi jóváhagyással gyorsítsa a munkát.

## Gyakori kérdések

### Élő Billingo adatokat mutat?

Nem. Ez a demó fiktív adatokat használ. Ez szándékos, mert nyilvános eseményen nem akarunk valódi ügyfél- vagy számlaadatokat mutatni.

### Valódi MI dolgozik mögötte?

A jelenlegi demóban az elemzések determinisztikus logikából és előkészített mintázatokból jönnek. A felület viszont úgy van felépítve, hogy később valódi nyelvi modell köthető mögé.

### Miért hasznos így is?

Mert a bemutató nem a modell technikai működéséről szól, hanem az üzleti felhasználási mintáról: hogyan lehet számlaadatokból döntéstámogatást, teendőlistát és kommunikációs segítséget készíteni.

### Elküldi az emlékeztető levelet?

Nem. A demó csak megfogalmazza a szöveget. Éles verzióban is emberi jóváhagyás kellene a küldés előtt.

### Mi történik, ha rákattintok a bizonylat megnyitására?

Bemutató módban nem nyit meg valódi bizonylatot. Figyelmeztető üzenetet ad, hogy fiktív adatokkal fut.

## Hibaelhárítás bemutató közben

### Nem tölt be az oldal

Ellenőrizd az internetkapcsolatot. A demóoldal Netlify-n fut, és a felület külső könyvtárakat is betölt.

### Nem látszanak a grafikonok vagy furcsán néz ki a felület

Frissítsd az oldalt. Ha projektoron van, próbáld meg 90-110 százalékos böngészőnagyítással.

### Nem frissült a legutóbbi verzió

Nyiss inkognitóablakot, vagy frissíts teljes újratöltéssel. Ha fejlesztés után vagyunk, ellenőrizni kell a Netlify közzététel állapotát.

### Valaki azt kérdezi, hogy ez már megvehető-e

Javasolt válasz:

> Ez most bemutató verzió. A következő lépés egy éles, olvasási jogosultságú Billingo adatkapcsolattal működő változat, először egyfiókos verzióban, utána többfiókos elemzéssel.

## Csütörtöki rövid forgatókönyv

Ha 3-5 perced van:

1. Nyisd meg az MI Radart.
2. Mondd el: "Ez a vállalkozás mai pénzügyi helyzetképe."
3. Mutasd meg a 13 nyitott számlát és a kockázati szintet.
4. Menj az Akcióközpontba.
5. Mutasd meg a Borbála Rendezvényház Kft. lejárt számláját.
6. Válts a fizetési emlékeztető hangnemei között.
7. Menj a Számlák nézetbe.
8. Szűrj `Lejárt` státuszra.
9. Mondd el: "Ezért hiteles: a vezetői javaslat visszavezethető konkrét számlára."

Ha 10-15 perced van:

1. MI Radar
2. Pénzmozgás
3. Akcióközpont
4. Ügyfélintelligencia
5. Számlák
6. Zárásként: hogyan lehet ebből éles, előfizetéses termék.

## Következő fejlesztési javaslatok

Bemutató után ezek lennének a logikus következő lépések:

1. Netlify automatikus GitHub közzététel véglegesítése.
2. Egyfiókos Billingo adatkapcsolatos éles verzió olvasási jogosultsággal.
3. Saját többfiókos verzió Tamás és Krisztina Billingo fiókjához.
4. Valódi nyelvi modell bekötése magyarázatokra, levélszövegekre és kérdés-válasz funkcióra.
5. Ügyfélenkénti előfizetéses átadható verzió.
6. Kezelőfelület kapcsolati kulcs, időszak és fiókválasztás kezelésére.
