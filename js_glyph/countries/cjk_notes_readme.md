# CJK Display Notes

This document preserves the research and discussion about why CJK countries (China, Japan, Korea, Taiwan) display **components** rather than complete characters, along with suggested display notes in each language.

---

## Quick Reference

| Language | Full Characters | Components Shown | Reason |
|----------|----------------|------------------|--------|
| **Korean** | 11,172 Hangul Syllables | Jamo (자모) | Show combinatorial logic |
| **Japanese** | ~3,000 Kanji + Kana | Hiragana, Katakana, Strokes | Show phonetic grid + stroke physics |
| **Chinese** | 90,000+ Ideographs | Strokes, Radicals, Components | Show construction logic |

---

# Japanese (日本語)

## Background Discussion

Japanese is unique because Hiragana and Katakana do not have "building block" equivalents like Hangul Jamo. In Japanese, the "syllable" is the atomic unit. You cannot technically type a consonant like "K" and a vowel like "A" separately and have them snap together into か (ka) in modern Unicode text.

However, for a display that focuses on the construction of the language, you can reference the **Gojūon (五十音, "Fifty Sounds")** grid and the strokes that form them.

Since modern Japanese kana aren't "combined" from smaller parts like Hangul, the "components" story is usually about how they were originally fragments or simplifications of complex Kanji.

## Key Technical Terms

| Term | Japanese | Meaning |
|------|----------|---------|
| **Gojūon** | 五十音 | "Fifty Sounds" — The 5×10 grid that organizes Japanese phonetics. This is the "map" of the Japanese alphabet. |
| **Hitsujun** | 筆順 | Stroke order. Unlike English, where stroke order is flexible, Japanese characters must be written in a precise sequence to be considered correct. |
| **Kana** | 仮名 | Collective term for Hiragana + Katakana |
| **Danpen** | 断片 | "Fragments" — The word Katakana (片仮名) literally means "fragmentary kana" because they were created from pieces (fragments) of more complex Kanji. |

### The Three Stroke Types

In Japanese calligraphy and font design, every line ends in one of three ways:

| Type | Japanese | Description |
|------|----------|-------------|
| **Tome** | 留め | A firm stop |
| **Hane** | 跳ね | An upward hook or flick |
| **Harai** | 払い | A tapered sweep or brush-off |

## Unicode Blocks for Japanese "Components"

If you are looking for the "DNA" of the script rather than the words, these are the relevant blocks:

- **Hiragana**: U+3040–U+309F (Standard syllables)
- **Katakana**: U+30A0–U+30FF (Standard syllables)
- **Katakana Phonetic Extensions**: U+31F0–U+31FF (Small characters used for specific sounds like the Ainu language)
- **CJK Strokes**: U+31C0–U+31EF (These strokes are shared with Chinese and are used to build the kana as well)
- **Kana Supplement (Archaic/Hentaigana)**: U+1B000–U+1B0FF (If you want to show the historical "building blocks" that evolved from Kanji)

## Why This Fits the "No Syllables" Theme

While Japanese doesn't have a "Johap-hyeong" (combinatorial) system like Korea, explaining that you are showing the **fragments** (Katakana origins) and the **stroke physics** (Tome/Hane/Harai) allows you to maintain the same "building block" theme used for Korean and Chinese.

**Note:** There isn't a Wansung-hyeong equivalent for Kana because the entire syllabary is only about 46 basic characters each—unlike the 11,172 Korean syllables or 90,000+ Chinese characters.

## Philosophical Note

- In **Korean**, we show Jamo (logic/science)
- In **Chinese**, we show Radicals (meaning/taxonomy)
- In **Japanese**, the story is about **Evolution** — Katakana were literally fragments (片 *kata*) taken from complex Kanji

## Suggested Display Notes for Japan

### Option 1: Focus on Gojūon and Stroke Order

**Japanese:**
> "本展示は、膨大な文字数を網羅するのではなく、日本語の構成美を伝えるため、五十音 (Gojūon) の基本構造とそれを形作る 筆順 (Hitsujun - Stroke Order) に焦点を当てています。文字を単なる完成された図形としてではなく、点と線の組み合わせによる『構築』として表現しています。"

**English:**
> "Instead of covering a vast number of characters, this display focuses on the basic structure of the Gojūon (Fifty Sounds) and the Hitsujun (Stroke Order) that forms them, in order to convey the constructive beauty of Japanese. It represents characters not merely as finished shapes, but as a 'construction' through the combination of dots and lines."

### Option 2: Focus on Katakana Fragments and Brush Techniques

**Japanese:**
> "本展示は、膨大な**全文字(Full Characters)**を網羅するのではなく、日本語の構成美である 五十音(Gojūon) とその根源に焦点を当てています。漢字の一部を切り取って生まれたカタカナ(Katakana)の『断片』や、日本語特有の筆致を形作る筆順(Hitsujun)と三つの筆使い(Tome, Hane, Harai)を展示することで、一文字に宿る構築の論理を表現しています。"

**English:**
> "Instead of covering a vast number of complete characters, this display focuses on the Gojūon (the Fifty Sounds) and their origins—the aesthetic foundation of Japanese. By showcasing the 'fragments' of Katakana (which were born by taking pieces of Kanji) and the stroke order (Hitsujun) along with the three essential brush techniques (Tome, Hane, Harai), it represents the logic of construction dwelling within a single character."

### Future Consideration

Would you like to include the Unicode ranges for the historical "source" Kanji that eventually became the Hiragana and Katakana characters being displayed?

---

# Korean (한국어)

## Background Discussion

### Q: What is the equivalent to Hangul words in Korean? Hanja but in Hangul? Or just Jamo?

The term is **Hanja-eo (한자어)**, which translates to "Sino-Korean words". These are words that originate from Chinese characters (Hanja) but are written using the Korean alphabet (Hangul) in modern usage.

While **Jamo (자모)** refers only to the individual letters of the alphabet (the consonants and vowels), **Hanja-eo** represents the specific category of vocabulary derived from Chinese roots.

#### Key Characteristics of Hanja-eo

- **The "Hanja in Hangul" Equivalence:** In modern Korea, about 50% to 60% of the total vocabulary consists of Hanja-eo. While they have a Chinese character origin, they are almost exclusively written in Hangul in everyday life.
- **Meaning vs. Sound:** Hangul represents the sound of the word, while the underlying Hanja represents the meaning. For example, the word for "school" is written as 학교 (hak-gyo), which is the Hangul phonetic spelling of the Hanja characters 學校.
- **Formal vs. Native:** Hanja-eo is typically used for more formal, academic, or abstract concepts.
  - Sino-Korean (Hanja-eo): 국가 (guk-ga, 國家) for "country" in formal contexts
  - Native Korean: 나라 (nara) for "country" in casual conversation

#### Examples of Hanja-eo Written in Hangul

| Hangul | Hanja | Meaning |
|--------|-------|---------|
| 부모 (bumo) | 父母 | Parents |
| 학생 (haksaeng) | 學生 | Student |
| 행복 (haengbok) | 幸福 | Happiness |
| 도서관 (doseogwan) | 圖書館 | Library |
| 생일 (saengil) | 生日 | Birthday |

### Q: Unicode has a large set of Korean glyphs which aren't Jamo. What would I call those?

In Unicode, the large set of Korean glyphs that are "pre-built" into full syllable blocks (instead of individual letters) are officially called **Hangul Syllables**.

While Jamo (자모) are the individual building blocks—like consonants and vowels—Hangul Syllables are the "finished" characters you see most often in modern digital text.

#### Key Terms for These Glyphs

| Term | Description |
|------|-------------|
| **Hangul Syllables** (Official Unicode Term) | The massive block of 11,172 characters (U+AC00 to U+D7AF) representing every possible modern combination of Korean letters |
| **Precomposed Syllables** | Technical term for a single character that is "pre-made" from multiple components. For example, 감 (gam) is a single "precomposed" glyph, even though it's made of three Jamo (ㄱ, ㅏ, ㅁ) |
| **Wansung-hyeong (완성형)** | Traditional Korean computer term for "Complete/Precomposed Type." This was the older standard that led to the current Unicode "Hangul Syllables" block |

#### Comparison: Jamo vs. Syllables

| Feature | Hangul Jamo (Alphabet) | Hangul Syllables (Full Blocks) |
|---------|------------------------|-------------------------------|
| Example | ㄱ, ㅏ, ㄴ (Separate) | 간 (Single character) |
| Quantity | ~256 (including archaic ones) | 11,172 (modern combinations) |
| Usage | Building blocks for fonts/keyboards | Standard text for web and apps |
| Unicode Block | U+1100–U+11FF | U+AC00–U+D7AF |

**Fun Fact:** If you type on a modern Korean keyboard, the software is actually taking your Jamo inputs and instantly swapping them out for the corresponding Hangul Syllable from the Unicode table as you complete each block.

## Key Terminology

| Term | Korean | Meaning |
|------|--------|---------|
| **Wansung-hyeong** | 완성형 | "Complete form" — precomposed syllables. Using this term immediately signals to a Korean speaker that you are talking about the "finished" 11,172 blocks rather than the individual letters. |
| **Johap-hyeong** | 조합형 | "Combinatorial form" — building from Jamo. Literally means "combinatorial type." It is the method of creating Korean characters by combining individual Jamo on the fly. |
| **Jamo** | 자모 | Individual letters (consonants + vowels) |
| **Guseong Yoseo** | 구성 요소 | "Components" or "constituent elements." Best phrase when explaining you're showing the parts of the language rather than the full syllables. |
| **Geul-ja-su** | 글자 수 | "Number of glyphs/characters." Useful for explaining the technical limitation. |

### Historical Context

In the 1990s, there was a "standards war" in Korea between **Wansung-hyeong** (precomposed blocks) and **Johap-hyeong** (조합형, "combinatorial form"). By saying your display focuses on the components, you are essentially describing a Johap-hyeong approach, which is often preferred by linguists and font designers who want to showcase the scientific "building block" nature of Hangul.

## Unicode Blocks

- **Hangul Jamo**: U+1100–U+11FF (what we show)
- **Hangul Compatibility Jamo**: U+3130–U+318F (alternative)
- **Hangul Syllables**: U+AC00–U+D7AF (what we exclude)

## Suggested Display Notes for Korea

### Option 1: Basic Version

**Korean:**
> "본 디스플레이는 방대한 글자 수로 인해 **완성형 한글(Unicode Syllables)**을 포함하지 않으며, 단어 중심이 아닌 언어의 구성 요소인 **한글 자모(Jamo)**를 표현하는 데 중점을 두었습니다."

**English:**
> "This display does not include complete Hangul (Unicode Syllables) due to the massive number of glyphs, and focuses on representing Hangul Jamo, the components of the language, rather than words."

### Option 2: Technical Version (Explicitly References Johap-hyeong)

**Korean:**
> "본 디스플레이는 완성형(Wansung-hyeong) 방식의 방대한 글자 수 대신, 한글의 본질적인 구성 원리인 조합형(Johap-hyeong) 방식에 기반하여 **자모(Jamo)**를 표현하는 데 중점을 두었습니다."

**English:**
> "Instead of the massive number of characters in the Wansung-hyeong (Complete form) method, this display focuses on representing Jamo based on the Johap-hyeong (Combinatorial form) method, which is the essential constructive principle of Hangul."

### Option 3: Full Display Version (Recommended)

**Korean:**
> "본 디스플레이는 방대한 양의 완성형(Wansung-hyeong) 음절 대신, 한글의 본질적인 구성 원리인 조합형(Johap-hyeong) 방식에 따라 **자모(Jamo)**를 표현하는 데 중점을 두었습니다. 이는 단어의 형태보다 언어를 이루는 개별 요소들의 유기적인 결합 방식을 보여주기 위함입니다."

**English:**
> "Instead of the massive volume of Wansung-hyeong (Precomposed) syllables, this display focuses on representing Jamo according to the Johap-hyeong (Combinatorial) method, which is the essential constructive principle of Hangul. This is intended to showcase the organic combination of individual elements that form the language, rather than just the final shapes of words."

### Why Option 3 Works Best

- **The "Core Principle" (본질적인 구성 원리):** This phrasing makes the exclusion of the 11,172 Unicode syllables feel like a curatorial choice rather than a technical limitation.
- **Wansung-hyeong (완성형) vs. Johap-hyeong (조합형):** These are the exact technical terms used in Korean typography and computing history. Using them signals to a Korean reader that you understand the "DNA" of their script.
- **Organic Combination (유기적인 결합):** This emphasizes the "scientific" and "building-block" nature of Hangul, which is a source of great cultural pride.

### Technical Reference

- **Excluded:** Unicode Block U+AC00–U+D7AF (Hangul Syllables)
- **Included:** Unicode Block U+1100–U+11FF (Hangul Jamo) or U+3130–U+318F (Compatibility Jamo)

---

# Chinese (中文)

## Background Discussion

For Chinese, the equivalent concept to "precomposed syllables" is the **CJK Unified Ideographs** (the complete characters). The equivalent to "Jamo" or building blocks is **Hanzi Bùjiàn (汉字部件, character components)** and **Bùshǒu (部首, radicals)**.

In Unicode, while there isn't a "Johap-hyeong" method that lets you combine radicals on the fly to generate characters in standard text, you can reference the **Ideographic Description Characters (IDCs)** and **Kangxi Radicals** as the fundamental building blocks.

## Key Terminology

| Term | Chinese | Meaning |
|------|---------|---------|
| **Quánzìfú** | 全字符 | "Complete characters" — what we exclude |
| **Bǐhuà** | 笔画 / 筆畫 | Strokes |
| **Bùshǒu** | 部首 | Radicals |
| **Bùjiàn** | 部件 | Components |
| **Chāijiě zǔhé** | 拆解组合 | "Deconstruct and combine" — the combinatorial method |
| **Bǐshùn** | 笔顺 | Stroke order — considered the "DNA" of the character in Chinese calligraphy |

## Comparison with Korean and Japanese

| Concept | Korean Term | Chinese Term | Unicode Equivalent |
|---------|-------------|--------------|-------------------|
| Complete Character | Wansung-hyeong (완성형) | Quánzìfú (全字符) | CJK Unified Ideographs |
| Building Block | Jamo (자모) | Bùjiàn (部件) | Kangxi Radicals / Strokes |
| The Radical | Busu (부수) | Bùshǒu (部首) | Radical blocks (e.g., U+2F00) |
| Combinatorial Method | Johap-hyeong (조합형) | Chāijiě zǔhé (拆解组合) | Ideographic Description Characters |

## Why This Is the "Equivalent"

- **The Problem of Scale:** Like the 11,172 Hangul syllables, there are over 90,000 CJK characters in Unicode.
- **The Structural Logic:** Just as Hangul combines Jamo, Chinese characters are built from Bùjiàn (components) that often carry semantic or phonetic meaning.
- **Display Logic:** By choosing to show the components, you are presenting the "Lego bricks" of the language, making the display about the mechanics of writing rather than a dictionary of words.

## Three Levels of Building Blocks

Since the display includes strokes, these are the three levels being shown:

| Level | Chinese | Term | Description |
|-------|---------|------|-------------|
| 1 (Atomic) | 笔画 | Bǐhuà (Strokes) | The 8–30+ basic pen/brush movements (e.g., 横, 竖, 点) |
| 2 (Functional) | 部件 | Bùjiàn (Components) | The "building blocks" made of multiple strokes (e.g., 亻, 讠) |
| 3 (Categorical) | 部首 | Bùshǒu (Radicals) | Components used to index characters in a dictionary (e.g., 氵 for water) |
| 4 (Finished) | 全字符 | Quánzìfú (Full Characters) | The ~100,000 complete Unicode ideographs |

## Unicode Blocks

- **CJK Strokes**: U+31C0–U+31EF
- **Kangxi Radicals**: U+2F00–U+2FDF (214 traditional radicals)
- **CJK Radicals Supplement**: U+2E80–U+2EFF
- **Ideographic Description Characters**: U+2FF0–U+2FFF (for describing composition)
- **CJK Unified Ideographs**: U+4E00–U+9FFF (what we largely exclude)

## Historical Context for the Display

Using the word "Organically" (有机) or "Logic" (逻辑) in your description is very fitting for a display that includes strokes. In Chinese calligraphy, the order and way strokes are combined (known as **Bǐshùn** or stroke order) is considered the "DNA" of the character. By showing the strokes, you are inviting the viewer to see the "assembly instructions" of the Chinese writing system.

## Suggested Display Notes for China

### Option 1: Without Strokes

**Simplified Chinese:**
> "本展示因汉字数量庞大，未采用全字符(CJK Unified Ideographs)，而是侧重于展现汉字的构成核心——部件(Bùjiàn)与部首(Bùshǒu)。此举旨在揭示汉字从基础元素到复杂字形的拆解与组合逻辑。"

**English:**
> "Due to the vast number of Chinese characters, this display does not use complete characters (CJK Unified Ideographs), but instead focuses on showcasing the core of Hanzi construction: Components (Bùjiàn) and Radicals (Bùshǒu). This is intended to reveal the logic of deconstructing and combining basic elements into complex character forms."

### Option 2: With Strokes (Recommended)

**Simplified Chinese:**
> "本展示不包含海量的全字符 (CJK Unified Ideographs)，而是侧重于汉字最基础的构成逻辑。通过展示**笔画 (Bǐhuà)**、**部首 (Bùshǒu)** 与 **部件 (Bùjiàn)**，本显示旨在揭示汉字如何从最基本的点、横、竖、撇，逐步有机结合成复杂字形的过程。"

**Traditional Chinese:**
> "本展示不包含海量的全字元 (CJK Unified Ideographs)，而是側重於漢字最基礎的構成邏輯。透過展示**筆畫 (Bǐhuà)**、**部首 (Bùshǒu)** 與 **部件 (Bùjiàn)**，本顯示旨在揭示漢字如何從最基本的點、橫、豎、撇，逐步有機結合成複雜字形的過程。"

**English:**
> "This display does not include the massive volume of complete characters (CJK Unified Ideographs), but instead focuses on the most fundamental constructive logic of Hanzi. By showcasing Strokes (Bǐhuà), Radicals (Bùshǒu), and Components (Bùjiàn), it aims to reveal the process of how basic elements—like dots, horizontal lines, vertical lines, and sweeps—organically combine into complex character forms."

---

# Taiwan (臺灣)

## Notes

Taiwan uses **Traditional Chinese** characters and **Bopomofo (注音符號)** for phonetic notation (unlike Mainland China which uses Pinyin).

The display note should use **Traditional Chinese** script. See "Option 2: With Strokes" above for the Traditional Chinese version.

---

# Cross-Language Comparison

| Concept | Korean | Japanese | Chinese |
|---------|--------|----------|---------|
| **Complete Set** | Wansung-hyeong (완성형) | Full Kanji set | Quánzìfú (全字符) |
| **Building Blocks** | Jamo (자모) | Kana + Strokes | Bùjiàn (部件) |
| **Organizational System** | Johap-hyeong (조합형) | Gojūon (五十音) | Bùshǒu (部首) |
| **Atomic Unit** | Consonant/Vowel | Stroke | Stroke |
| **Scale Problem** | 11,172 syllables | ~3,000 Kanji | 90,000+ ideographs |

---

# Implementation Notes

For the Glyphmatic flags display, each CJK country file should:

1. Include the relevant **component blocks** (strokes, radicals, kana, jamo)
2. **Exclude** the massive precomposed character sets
3. Add a `note` property with the appropriate display text from above

This approach:
- Keeps file sizes manageable
- Shows the "DNA" of each writing system
- Maintains consistency with the project's goal of displaying **components, not words**
