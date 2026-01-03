#!/usr/bin/env Rscript

# Extract Real-World Glyphs from Text Sources
# Usage: Rscript extract_glyphs.R
# Interactive prompts for block and source URL

library(httr)
library(stringi)

# Unicode block ranges - LIVING SCRIPTS ONLY (from README verified list)
UNICODE_BLOCKS <- list(
  # ============================================================
  # INDIC SCRIPTS - MAJOR (Modern, widely used)
  # ============================================================
  "Devanagari" = c(0x0900, 0x097F),            # Hindi, Marathi, Sanskrit, Nepali
  "Devanagari Extended" = c(0xA8E0, 0xA8FF),
  "Bengali" = c(0x0980, 0x09FF),               # Bengali, Assamese
  "Gurmukhi" = c(0x0A00, 0x0A7F),              # Punjabi
  "Gujarati" = c(0x0A80, 0x0AFF),              # Gujarati
  "Oriya" = c(0x0B00, 0x0B7F),                 # Odia
  "Tamil" = c(0x0B80, 0x0BFF),                 # Tamil
  "Telugu" = c(0x0C00, 0x0C7F),                # Telugu
  "Kannada" = c(0x0C80, 0x0CFF),               # Kannada
  "Malayalam" = c(0x0D00, 0x0D7F),             # Malayalam
  "Sinhala" = c(0x0D80, 0x0DFF),               # Sinhala (Sri Lanka)

  # ============================================================
  # INDIC SCRIPTS - VERIFIED LIVING (from README with evidence)
  # ============================================================
  "Ol Chiki" = c(0x1C50, 0x1C7F),              # Santali - 7.6M speakers
  "Meetei Mayek" = c(0xABC0, 0xABFF),          # Meitei/Manipuri - 1.8M speakers
  "Meetei Mayek Extensions" = c(0xAAE0, 0xAAFF),
  "Warang Citi" = c(0x118A0, 0x118FF),         # Ho language - 1.4M speakers
  "Nag Mundari" = c(0x1E4D0, 0x1E4FF),         # Mundari - 1.1M (Unicode 15.0)
  "Limbu" = c(0x1900, 0x194F),                 # Limbu - 400K speakers
  "Chakma" = c(0x11100, 0x1114F),              # Chakma - 326K speakers
  "Sora Sompeng" = c(0x110D0, 0x110FF),        # Sora - 300-400K speakers
  "Lepcha" = c(0x1C00, 0x1C4F),                # Lepcha/Sikkim - 66K speakers
  "Wancho" = c(0x1E2C0, 0x1E2FF),              # Wancho/Arunachal - 55K (Unicode 12.0)
  "Toto" = c(0x1E290, 0x1E2BF),                # Toto/West Bengal - 1,600 (Unicode 14.0)
  "Masaram Gondi" = c(0x11D00, 0x11D5F),       # Gondi - 2.9M speakers
  "Gunjala Gondi" = c(0x11D60, 0x11DAF),       # Gondi variant

  # ============================================================
  # TIBETAN & RELATED
  # ============================================================
  "Tibetan" = c(0x0F00, 0x0FFF),               # Tibetan

  # ============================================================
  # SOUTHEAST ASIAN (Living)
  # ============================================================
  "Thai" = c(0x0E00, 0x0E7F),
  "Lao" = c(0x0E80, 0x0EFF),
  "Myanmar" = c(0x1000, 0x109F),
  "Myanmar Extended-A" = c(0xAA60, 0xAA7F),
  "Myanmar Extended-B" = c(0xA9E0, 0xA9FF),
  "Khmer" = c(0x1780, 0x17FF),
  "Khmer Symbols" = c(0x19E0, 0x19FF),
  "Tai Le" = c(0x1950, 0x197F),
  "New Tai Lue" = c(0x1980, 0x19DF),
  "Tai Tham" = c(0x1A20, 0x1AAF),              # Lanna
  "Tai Viet" = c(0xAA80, 0xAADF),
  "Kayah Li" = c(0xA900, 0xA92F),
  "Cham" = c(0xAA00, 0xAA5F),

  # ============================================================
  # INDONESIAN/PHILIPPINE (Living)
  # ============================================================
  "Javanese" = c(0xA980, 0xA9DF),
  "Balinese" = c(0x1B00, 0x1B7F),
  "Sundanese" = c(0x1B80, 0x1BBF),
  "Sundanese Supplement" = c(0x1CC0, 0x1CCF),
  "Buginese" = c(0x1A00, 0x1A1F),
  "Rejang" = c(0xA930, 0xA95F),
  "Batak" = c(0x1BC0, 0x1BFF),
  "Tagalog" = c(0x1700, 0x171F),
  "Hanunoo" = c(0x1720, 0x173F),
  "Buhid" = c(0x1740, 0x175F),
  "Tagbanwa" = c(0x1760, 0x177F),

  # ============================================================
  # EAST ASIAN
  # ============================================================
  "CJK Unified Ideographs" = c(0x4E00, 0x9FFF),
  "CJK Unified Ideographs Extension A" = c(0x3400, 0x4DBF),
  "CJK Unified Ideographs Extension B" = c(0x20000, 0x2A6DF),
  "Hiragana" = c(0x3040, 0x309F),
  "Katakana" = c(0x30A0, 0x30FF),
  "Hangul Syllables" = c(0xAC00, 0xD7AF),
  "Hangul Jamo" = c(0x1100, 0x11FF),
  "Bopomofo" = c(0x3100, 0x312F),
  "Bopomofo Extended" = c(0x31A0, 0x31BF),

  # ============================================================
  # MIDDLE EAST / CAUCASUS
  # ============================================================
  "Hebrew" = c(0x0590, 0x05FF),
  "Arabic" = c(0x0600, 0x06FF),
  "Arabic Supplement" = c(0x0750, 0x077F),
  "Arabic Extended-A" = c(0x08A0, 0x08FF),
  "Arabic Extended-B" = c(0x0870, 0x089F),
  "Syriac" = c(0x0700, 0x074F),
  "Thaana" = c(0x0780, 0x07BF),
  "Georgian" = c(0x10A0, 0x10FF),
  "Armenian" = c(0x0530, 0x058F),

  # ============================================================
  # AFRICAN
  # ============================================================
  "Ethiopic" = c(0x1200, 0x137F),
  "Ethiopic Supplement" = c(0x1380, 0x139F),
  "Ethiopic Extended" = c(0x2D80, 0x2DDF),
  "Tifinagh" = c(0x2D30, 0x2D7F),
  "NKo" = c(0x07C0, 0x07FF),
  "Vai" = c(0xA500, 0xA63F),
  "Bamum" = c(0xA6A0, 0xA6FF),
  "Adlam" = c(0x1E900, 0x1E95F),
  "Medefaidrin" = c(0x16E40, 0x16E9F),
  "Mende Kikakui" = c(0x1E800, 0x1E8DF),
  "Bassa Vah" = c(0x16AD0, 0x16AFF),
  "Osmanya" = c(0x10480, 0x104AF),

  # ============================================================
  # OTHER
  # ============================================================
  "Mongolian" = c(0x1800, 0x18AF),
  "Cherokee" = c(0x13A0, 0x13FF),
  "Greek" = c(0x0370, 0x03FF),
  "Cyrillic" = c(0x0400, 0x04FF),
  "Basic Latin" = c(0x0000, 0x007F),
  "Latin-1 Supplement" = c(0x0080, 0x00FF),
  "Latin Extended-A" = c(0x0100, 0x017F),
  "Latin Extended-B" = c(0x0180, 0x024F)
)

# Fetch text from URL
fetch_text <- function(url) {
  cat("Fetching:", url, "\n")
  response <- tryCatch({
    GET(url, timeout(30))
  }, error = function(e) {
    stop("Failed to fetch URL: ", e$message)
  })

  if (status_code(response) != 200) {
    stop("HTTP error: ", status_code(response))
  }

  content(response, as = "text", encoding = "UTF-8")
}

# Extract grapheme clusters (visual "letters") in a Unicode block range
extract_block_chars <- function(text, block_range) {
  # Split into grapheme clusters (keeps combining marks with base chars)
  # This gives us actual visual "letters" not raw codepoints
  clusters <- unique(stri_split_boundaries(text, type = "character")[[1]])

  # Filter: keep cluster if its FIRST codepoint (base char) is in block range
  in_range <- sapply(clusters, function(cluster) {
    codepoints <- utf8ToInt(cluster)
    if (length(codepoints) >= 1) {
      base_cp <- codepoints[1]
      base_cp >= block_range[1] && base_cp <= block_range[2]
    } else {
      FALSE
    }
  })

  clusters[in_range]
}

# Sort clusters by their first (base) codepoint
sort_by_codepoint <- function(chars) {
  # For multi-codepoint clusters, use the first codepoint for sorting
  first_codepoints <- sapply(chars, function(ch) utf8ToInt(ch)[1])
  chars[order(first_codepoints)]
}

# Format output for JS array
format_js_array <- function(chars, per_line = 15) {
  if (length(chars) == 0) return("[]")

  quoted <- paste0("'", chars, "'")
  lines <- split(quoted, ceiling(seq_along(quoted) / per_line))
  formatted_lines <- sapply(lines, function(l) paste0("      ", paste(l, collapse = ", ")))
  paste0("[\n", paste(formatted_lines, collapse = ",\n"), "\n    ]")
}

# Main interactive function
main <- function() {
  cat("\n=== Glyph Extractor ===\n\n")

  # Show available blocks
  cat("Available Unicode blocks:\n")
  block_names <- names(UNICODE_BLOCKS)
  for (i in seq_along(block_names)) {
    cat(sprintf("  %2d. %s\n", i, block_names[i]))
  }

  # Get block selection
  cat("\nEnter block number or name: ")
  block_input <- readline()

  # Parse block selection
  if (grepl("^\\d+$", block_input)) {
    block_idx <- as.integer(block_input)
    if (block_idx < 1 || block_idx > length(block_names)) {
      stop("Invalid block number")
    }
    block_name <- block_names[block_idx]
  } else {
    # Try to match by name
    matches <- grep(block_input, block_names, ignore.case = TRUE, value = TRUE)
    if (length(matches) == 0) {
      stop("No matching block found")
    } else if (length(matches) > 1) {
      cat("Multiple matches found:\n")
      print(matches)
      stop("Please be more specific")
    }
    block_name <- matches[1]
  }

  block_range <- UNICODE_BLOCKS[[block_name]]
  cat(sprintf("\nSelected: %s (U+%04X - U+%04X)\n", block_name, block_range[1], block_range[2]))

  # Get source URL(s)
  cat("\nEnter source URL(s), one per line. Empty line to finish:\n")
  urls <- character()
  repeat {
    url <- readline()
    if (url == "") break
    urls <- c(urls, url)
  }

  if (length(urls) == 0) {
    stop("No URLs provided")
  }

  # Fetch and combine all text
  all_text <- ""
  for (url in urls) {
    tryCatch({
      text <- fetch_text(url)
      all_text <- paste0(all_text, text)
      cat("  Fetched", nchar(text), "characters\n")
    }, error = function(e) {
      cat("  Error:", e$message, "\n")
    })
  }

  # Extract characters
  cat("\nExtracting", block_name, "characters...\n")
  chars <- extract_block_chars(all_text, block_range)
  chars <- sort_by_codepoint(chars)

  cat(sprintf("Found %d unique characters\n\n", length(chars)))

  if (length(chars) > 0) {
    # Show raw characters
    cat("Characters found:\n")
    cat(paste(chars, collapse = " "), "\n\n")

    # Show JS format
    cat("JavaScript array format:\n")
    cat(format_js_array(chars), "\n\n")

    # Save to file
    output_file <- paste0(gsub(" ", "_", tolower(block_name)), "_extracted.txt")
    writeLines(c(
      paste("# Extracted from:", paste(urls, collapse = ", ")),
      paste("# Block:", block_name),
      paste("# Count:", length(chars)),
      "",
      "# Raw characters:",
      paste(chars, collapse = ""),
      "",
      "# Space-separated:",
      paste(chars, collapse = " "),
      "",
      "# JavaScript array:",
      format_js_array(chars)
    ), output_file)

    cat("Saved to:", output_file, "\n")
  }
}

# Run if executed directly
if (!interactive()) {
  main()
} else {
  cat("Run main() to start the glyph extractor\n")
}
