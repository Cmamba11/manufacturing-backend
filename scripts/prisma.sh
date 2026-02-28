#!/usr/bin/env bash
set -euo pipefail

load_env_file() {
  local file="$1"
  [ -f "$file" ] || return 0

  while IFS= read -r line || [ -n "$line" ]; do
    line="${line%$'\r'}"
    case "$line" in
      ''|\#*)
        continue
        ;;
    esac

    local key="${line%%=*}"
    local value="${line#*=}"

    if [ "$key" = "$line" ]; then
      continue
    fi

    if [[ "$value" == \"*\" && "$value" == *\" ]]; then
      value="${value:1:${#value}-2}"
    elif [[ "$value" == \'*\' && "$value" == *\' ]]; then
      value="${value:1:${#value}-2}"
    fi

    export "$key=$value"
  done < "$file"
}

# Local precedence: root .env first, backend/.env overrides it.
load_env_file "../.env"
load_env_file ".env"

if [ "${1:-}" = "" ]; then
  echo "Usage: $0 <prisma command...>"
  echo "Example: $0 generate --schema prisma/schema.prisma"
  exit 1
fi

npx prisma "$@"
