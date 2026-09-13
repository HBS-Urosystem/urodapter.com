# Oldalhosszúság-audit és homepage-újrasúlyozás

**Készült: 2026-09-09.** Forrás: `0831/5. clinician journey page.docx`,
`0831/2. website architecture.docx`, valamint a `localhost:5199` dev szerveren mért tényleges
oldalmagasságok.

**Kiváltó kérdés:** indokolt-e a `/clinicians` oldal hosszúsága a kliens docx alapján, és mit
érdemes áthelyezni a homepage-re.

**Rövid válasz:** a hosszúság **indokolt** — az oldal docx-hű, nincs rajta kitalált szekció. A
valódi probléma nem a klinikus oldal terjedelme, hanem hogy (a) az architektúra-doksi „csak kurált
highlightok + Support Center link" szabálya a Section 3-ban nem érvényesül, (b) az evidence- és
testimonial-tömeg háromszor szerepel az oldalak között, és (c) a homepage alul van terhelve ahhoz
képest, amit az architektúra-doksi ráoszt.

> Ez a dokumentum **elemzés, nem végrehajtott változás.** A 4. pont javaslatai egy későbbi körre
> szólnak; a komponens- és content-fájlok a doksi írásakor változatlanok.

> **Frissítés — 2026-09-13.** Az 1. pont mérései elavultak: hat szekció `AutoAccordion`-re állt
> át (design system §6a), lásd a 6. pontot a lap alján. **Klinikus oldal: 7 105 → 5 947 px
> asztali** (7,9 → 6,6 képernyő), **12 726 → 9 719 px mobil** (15,7 → 12,0 képernyő).
> **Páciens oldal: 5 479 → 5 110 px asztali**, **10 256 → 8 760 px mobil** (12,6 → 10,8 képernyő). Az 1. pont
> (`ProofStats` bekötése a homepage-re) és a kereszt-duplikáció (3. pont) **továbbra is nyitott**.

---

## 1. Mérési adatok

Vite dev szerver, `localhost:5199`, teljes dokumentummagasság (`scrollHeight`) 1280×900 és
375×812 nézetben.

| Oldal | Asztali | képernyő | Mobil | képernyő |
|---|---:|---:|---:|---:|
| `/` | 2 877 px | 3,2 | 4 591 px | 5,7 |
| `/patients` | 5 479 px | 6,1 | 10 256 px | 12,6 |
| `/clinicians` | **7 105 px** | **7,9** | **12 756 px** | **15,7** |

### A klinikus oldal szekciónként

Asztali (1280×900), a hídsávokkal együtt:

| # | Blokk | px | a lap %-a |
|---|---|---:|---:|
| 1 | `ClinicalValue` — hero 433 + fejléc 73 + 2 × 233 kártyacsoport | 1 172 | 16,5 |
| – | bridge (arrow) | 177 | 2,5 |
| 2 | `ClinicalEvidence` — Lovász 343 + Pothoven/Buford 394 | 967 | 13,6 |
| – | bridge (quote) | 342 | 4,8 |
| 3 | **`SocialProof`** | **1 375** | **19,4** |
| – | bridge (arrow) | 177 | 2,5 |
| 4 | `Implementation` | 820 | 11,5 |
| – | bridge (quote) | 343 | 4,8 |
| 5 | `NextSteps` | 470 | 6,6 |
| 6 | `SupportClosing` | 563 | 7,9 |
| | **négy hídsáv összesen** | **1 039** | **14,6** |

A `SocialProof` belső bontása: fejléc ~87 · klinikus idézetek 276 + disclaimer 16 + Support Center
kártya 136 · „Trusted Worldwide" számok 149 · páciens idézetek 237 + második Support Center kártya
134 (a maradék a `mt-12` térközök).

Két megfigyelés a számokból:

- A **`SocialProof` a lap legnagyobb szekciója** — nagyobb, mint az evidence, és nagyobb, mint az
  implementation. Ez fordítva van, mint amit a klinikus journey Step 5–7 súlyozása indokolna.
- A **négy hídsáv 1 039 px**, a lap 14,6%-a. Ez a szeparációs rendszer ára; nem hiba, de érdemes
  tudni, hogy a lap egyhetede tudatosan üres átvezetés.

---

## 2. Docx-megfelelés — indokolt-e a hosszúság?

**Igen.** A docx mind a hat szekciója megvan, egy az egyben, és nincs a lapon olyan blokk, ami ne
lenne a docx-ben.

| docx | Oldalon | Komponens |
|---|---|---|
| Section 1 – Clinical Value for You and Your Patients | ✓ | `clinicians/ClinicalValue.svelte` |
| Section 2 – What the Clinical Evidence Shows (3 tanulmány) | ✓ | `clinicians/ClinicalEvidence.svelte` |
| Section 3 – Social proof (klinikus idézetek · számok · páciens idézetek) | ✓ | `clinicians/SocialProof.svelte` |
| Section 4 – Implementation (indikációk · workflow · tanulási út) | ✓ | `clinicians/Implementation.svelte` |
| Section 5 – What happens next? (3 CTA szint) | ✓ | `clinicians/NextSteps.svelte` |
| Section 6 – Dive deep + closing | ✓ | `clinicians/SupportClosing.svelte` |

A 0831 átszervezés már el is végezte a nagy rövidítést: nyolc szekcióból hat lett, a `WhatIsIt` és
a `Mechanism` parkolva a [`src/lib/content/clinicians.ts`](../src/lib/content/clinicians.ts) végén,
a `ClinicianHero` / `ClinicalBenefits` / `Indications` / `EvidenceApprovals` / `Adoption` pedig
törölve. Részletek: [clinician-journey-page-plan.md](clinician-journey-page-plan.md).

### Amit a forrásdokumentumok kérnek, és nem valósult meg

Ezek a legitim rövidítési pontok — nem a docx túllépése, hanem a docx **be nem tartása**:

1. **Section 1 tömörítés.** A docx maga írja: *„To increase readability on mobile version, the 3-3
   cards/group can be placed on a shared box (1 box for the 3 patient benefit, 1 box for the
   clinician benefit)"*, illetve *„The boxes with the 3-3 cards can be sliders as well to save
   space."* A slider ellentmond a [design-system.md](design-system.md) §6-nak (rácsok, nem
   sliderek — az idézetek maradjanak láthatók), de a **közös doboz** opció nyitva áll, és épp a
   mobilnézetre lett kitalálva, ahol a lap 15,7 képernyő.

2. **„Selected, curated highlights" — az architektúra-doksi alapszabálya.** A
   `2. website architecture.docx` szerint a journey oldalak *„only share limited, selected
   information, while referring to the Support Center as the place of the detailed, structured and
   complete set of information"*, és példának épp ezt hozza: *„Selected patient story → Read more
   patient stories → links to Support Center / Testimonials"*. A `SocialProof` ma **két teljes,
   háromelemű testimonial-szettet** és **két külön Support Center kártyát** visz — ez nem
   „selected".

3. **Kliens komment a docx-ben** (Kéri András, 2026-09-02) pontosan ezt kifogásolja a páciens
   idézeteknél: *„Ez szerintem így nem jó! Jobb lenne, ha ide más testimonial-ek kerülnének
   (praktikusan clinician testimonial-ek, ha lehet), mint a páciens journey-hez. De ha ugyanaz,
   akkor viszont legyen teljesen ugyanaz — legalábbis nekem furcsa, hogy 3 megegyezik, és a
   pácienseknél van egy negyedik."*

4. **Ugyanő az országszámról:** *„Erről szerintem csak az IBSA-nak van adata, hogy pontosan hány
   országban forgalmazzák."*

---

## 3. Kereszt-duplikáció

Ez az audit fő lelete. Ugyanaz a bizonyíték- és tanúságtétel-tömeg több oldalon is teljes
terjedelmében szerepel:

| Tartalom | `/` | `/patients` | `/clinicians` |
|---|:--:|:--:|:--:|
| Lovász 2019 · Pothoven 2025 · Buford 2025 | – | ✓ | ✓ |
| Kathy · Sue · Reka páciens idézetek | – | ✓ (+ Piotr) | ✓ szó szerint |
| Dr. Parekattil idézet | ✓ (hero) | ✓ | ✓ |
| Dr. Karabinos idézet | – | ✓ | ✓ |
| „1 000 000+ procedures" | ✓ (hero strip) | – | ✓ (StatCard) |

Az architektúra-doksi kimondja: *„Every piece of content should have one primary home in the
Support Center."* Ez ma nem teljesül — és amíg a Support Center útvonal nem létezik, nem is tud
teljesülni. A duplikáció így részben strukturális adósság, nem szerkesztői hiba.

---

## 4. A homepage hiánya — mit helyezzünk át?

Az architektúra-doksi homepage-elemlistája:

> Hero identifiers · Key benefits · **Selected credibility statements: 1 million+ uses, Scientific
> proof, Testimonial** · How Does it Work · „Choose Your Journey"

és a négy megválaszolandó kérdés: *What is UroDapter? · Why should I care? · **Can I trust it?** ·
Where should I go next?*

A homepage ma a **„Can I trust it?"** kérdésre csak a hero négy chipjével felel („1,000,000+ /
Scientifically validated / Available internationally / CE marked") — szám, forrás és hivatkozás
nélkül. Ez a leggyengébben megválaszolt a négy közül, és emiatt a bizalomépítés terhe teljes
egészében a journey oldalakra csúszik.

**A hiányzó blokk már fel van építve, csak nincs bekötve:**
[`src/lib/components/home/ProofStats.svelte`](../src/lib/components/home/ProofStats.svelte), a
`proof` és a `bridgeProof` export a [`src/lib/content/home.ts`](../src/lib/content/home.ts)-ben
készen áll — a `+page.svelte` egyszerűen nem importálja. (Ugyanez igaz a `Voices`, `WhatItIs` és
`PersonaSection` komponensekre, azok a pre-0831 build maradékai.)

### Javaslatok, prioritási sorrendben

**1. Credibility-számok a homepage-re — ez a tulajdonképpeni áthelyezés.**
A parkolt `ProofStats` bekötése a `KeyBenefits` és a `HowItWorks` közé, a meglévő `bridgeProof`
híddal. Ez az architektúra-doksi „1 million+ uses" + „Scientific proof" eleme. Tartalmi
finomítás a parkolt `proof.stats`-on:

| Kártya | Teendő |
|---|---|
| `1,000,000+ procedures` | marad (forrás: Urosystem, 2025) |
| `98% / 100%` | marad, de a forrás legyen **Lovász, *Int J Urol*, 2019 — 270 patients**, ahogy a `clinicians.ts` idézi, nem az „evaluation pack information" |
| `85 countries` | **kivenni** — a homepage nem közöl országszámot (lásd 5. pont) |
| `ISO 13485` | marad |

**2. A klinikus oldal „Trusted Worldwide" StatCard-triójának zsugorítása.**
Ha a szám a homepage-re kerül, itt duplikáció. Vagy egy soros megerősítés a Section 3 introjában,
vagy a `1,000,000+` kártya egyedül. A „30+ Countries" kártya mindenképp kikerül.

**3. Páciens idézetek 3 → 1 a klinikus oldalon.**
A klinikus szempontjából legrelevánsabb egyetlen idézet marad, a többi a meglévő
„Read all patient testimonials →" sávra megy. Ez megfelel az architektúra „selected patient story"
elvének, és részben megválaszolja a kliens kommentjét.
*Nyitott:* a kliens másik felvetése — teljesen más, klinikus-fókuszú idézetek — **új, jóváhagyott
idézeteket igényel tőle**.

**4. A Section 3 két Support Center kártyája eggyé olvadhat** (klinikus + páciens tanúságtételek
egy sávban). A `SupportCenterCard` már paraméterezett, nem igényel új komponenst.

**5. Section 1: a 3-3 benefit kártya közös dobozban**, ahogy a docx maga javasolja — nem
sliderként.

### Amit nem szabad elmozdítani

`ClinicalEvidence` (Step 5), `Implementation` (Step 7), `NextSteps` (Step 8), `SupportClosing`
(Step 9). Ezek a klinikus oldal létjogosultsága; az architektúra-doksi kifejezetten a journey
oldalra rendeli őket. Együtt a lap ~40%-a, és ott is kell maradniuk.

### Várható hatás

A 2–5. pont megvalósulásával nagyságrendileg **−400…−600 px asztali** (7 105 → ~6 500, azaz 7,9 →
~7,2 képernyő) és **−900…−1 400 px mobil**. A homepage ezzel párhuzamosan ~2 900-ról ~3 500 px-re
nő. **A cél a kiegyensúlyozás, nem a puszta rövidítés:** a klinikus oldal attól lesz jobb, hogy a
bizalomépítés egy része a homepage-en már megtörtént, mire a látogató ideér.

---

## 5. Nyitott elemek

1. **Országszám.** Három érték van forgalomban: **30+** (klinikus docx), **85**
   (IBSA / iAluadapter®, a parkolt `proof` blokkban), **50+** (a régi hero). Kliens komment
   szerint erre csak az IBSA-nak van adata.
   **Döntés (2026-09-09): sehol nem közlünk számot**, amíg a kliens nem rögzít egyet — ez
   megegyezik a [home-page-plan.md](home-page-plan.md) „Still open" 1. pontjával. A homepage-en
   marad az „Available internationally", és a klinikus oldalról is kikerül a „30+ Countries".
2. **Alternatív, klinikus-fókuszú páciens idézetek** — a kliens 2026-09-02-i kommentje szerint;
   tőle várt.
3. **`#support` továbbra is placeholder.** Minden „read more" link egy kártyára görget, nem
   tartalomra. Amíg nincs valódi Support Center útvonal, a 3. pont kereszt-duplikációja csak
   csökkenthető, megszüntetni nem lehet.

---

## 6. Mi valósult meg — `AutoAccordion` *(2026-09-13)*

A rövidítés nem a 4. pont tartalom-áthelyezéseivel indult, hanem egy **prezentációs**
változással: minden olyan szekció, ami "több párhuzamos blokk, mindegyik saját vizuállal"
szerkezetű, egyszerre egy elemet mutat, a többi egy kattintásra marad. A minta a Whoop
"Built to be worn 24/7" moduljából jön; a feltételeket a
[design-system.md §6a](design-system.md) rögzíti.

### Klinikus oldal

| Szekció | Asztali | Mobil |
|---|---:|---:|
| `ClinicalValue` (Section 1) | 1 172 → **1 052** px | 2 265 → **1 717** px |
| `ClinicalEvidence` (Section 2) | 967 → **533** px | 1 931 → **1 134** px |
| `SocialProof` (Section 3) | 1 375 → **1 058** px | 3 019 → **2 083** px |
| `Implementation` (Section 4) | 820 → **532** px | 1 723 → **998** px |
| **Oldal összesen** | 7 105 → **5 947** px (7,9 → 6,6 képernyő) | 12 726 → **9 719** px (15,7 → 12,0 képernyő) |

### Páciens oldal

| Szekció | Asztali | Mobil |
|---|---:|---:|
| `WhyChoose` (Section 1) | 1 188 → **1 231** px | 2 016 → **1 793** px |
| `PatientStories` (Section 2) | 729 → **731** px | 1 930 → **1 430** px |
| `EvidenceOutcomes` (Section 3) | 1 273 → **859** px | — |
| **Oldal összesen** | 5 479 → **5 110** px | 10 256 → **8 760** px (12,6 → 10,8 képernyő) |

A páciens oldal Section 1–2 nyeresége **kizárólag mobilra szól** — asztalin a Section 1
kifejezetten *nőtt* 43 px-szel. Tudatos csere: az asztali oldal 5,7 képernyővel eleve rendben
volt, a mobil 12,6-tal nem. A Section 4 (`NextSteps`) szándékosan **nem** akkordeon: a három CTA
a konverziós út, mindegyik kártya maga egy `<a>` — kettőt interakció mögé tenni pont az ellen
dolgozna, amiért a szekció létezik.

Mérve `localhost:5199`-en, 1280×900 és 375×812 nézetben, ugyanúgy, mint az 1. pont alapmérése.
Az oldalmagasság **minden elemnél azonos** (a panelek egy rácscellában vannak egymásra rakva),
így a lap nem ugrik, amíg az akkordeon lépked.

### Amit a 4. pont javaslataiból ez megoldott

- **1. pont (Section 1 tömörítés).** Megvalósult, méghozzá a docx saját mondata szerint: a
  *group* lett az akkordeon eleme, a három benefit pedig a panel — "1 box for the 3 patient
  benefit, 1 box for the clinician benefit … can be sliders as well to save space".
- **4. pont (a két Support Center kártya).** Nem olvadtak össze — ahhoz a kliensnek kell
  megmondania, melyik szöveg marad —, de egymás mellé kerültek, ami ~135 px-et hoz.

### Ami továbbra is nyitott

- **3. pont — kereszt-duplikáció.** Változatlan: a Lovász / Pothoven / Buford tanulmányok és a
  klinikus idézetek továbbra is két oldalon szerepelnek. Az akkordeon a *hosszt* csökkenti, a
  *duplikációt* nem — minden tartalom benne marad a DOM-ban (szándékosan: keresők és AEO
  számára a szekció nem lett szegényebb, csak rövidebb). Ez csak a Support Center útvonallal
  oldható meg.
- **4. pont 3. javaslata — páciens idézetek 3 → 1 a klinikus oldalon.** Az akkordeon elrejti a
  tömegüket, de mind a hat idézet ott van. A tényleges válogatás kliens-jóváhagyást igényel.
- **A `ProofStats` bekötése a homepage-re** (4. pont 1. javaslata).

### A mérés, ami kétszer megmentette a munkát

Egy fejléc-sor ~60 px ikonchippel, ~46 px anélkül, plusz ~56 px a pause-gomb. Egy négyelemű
lista tehát 296 / 251 px, **mielőtt** a panel egyáltalán számítana — egy 4-oszlopos kártyarács
(208 px asztali) ellenében az akkordeon **hosszabb**. Ez kétszer derült ki mérésből, nem
becslésből: a klinikus Section 1 első verziója (6 elem) 22 px-et hozott és újra kellett építeni
(2 elem = 2 csoport), a páciens `WhyChoose` pedig csak azért éri meg, mert a fejlécéről lekerült
az ikonchip.

### Ismert szépséghiba

A páciens Section 3 harmadik panelje a meglévő `ClinicianQuotes` manuális slidert tartalmazza —
slider egy akkordeon-panelen belül. Működik (a slider manuális, az akkordeon pedig megáll az
első interakcióra), de érdemes visszatérni rá: ha a három idézet önálló akkordeon-elem lesz, a
beágyazás megszűnik, cserébe a `ClinicianQuotes` komponens nyugdíjazható.

### Nyitott kérdés a kliens felé

A Section 2 három docx-címkéje most fejlécként, normál szedéssel jelenik meg, ahol eddig verzál
"eyebrow" volt — így láthatóvá vált, hogy az első Title Case, a másik kettő sentence case:

- "Published Clinical Series — Feasibility at Scale"
- "Real-world clinical experience — Patient acceptance"
- "International expert review — Professional recognition"

A szöveg docx-hű, ezért **nem nyúltunk hozzá**. Ha a kliens egységesíti, egy sor a
`clinicians.ts`-ben.
