#!/usr/bin/env bash
set -euo pipefail

key=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --key)
      key="${2:-}"
      shift 2
      ;;
    -h|--help)
      cat <<'EOF'
Usage:
  bin/palette_one.sh --key <palette_key>

Runs one-key extraction + apply sequence:
  1) python3 bin/batch_palette.py --only <key>
  2) python3 bin/apply_corrections.py --only <key>
EOF
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

if [[ -z "$key" ]]; then
  echo "Missing required --key <palette_key>" >&2
  exit 1
fi

echo "==> batch_palette: $key"
python3 bin/batch_palette.py --only "$key"

echo "==> apply_corrections: $key"
python3 bin/apply_corrections.py --only "$key"

echo "Done: $key"
