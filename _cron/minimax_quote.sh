#!/usr/bin/env bash
# Minimax voice quote picker - picks random quote, prepends prefix
QUOTES="$HOME/Documents/www.glyphmatic.us/_cron/quotes.json"
INDEX=$(jot -r 1 0 19)
jq -r ".minimax[$INDEX]" "$QUOTES"
