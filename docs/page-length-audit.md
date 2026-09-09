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
