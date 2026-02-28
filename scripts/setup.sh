#!/usr/bin/env bash
set -euo pipefail

SKIP_INSTALL=false

for arg in "$@"; do
  case "$arg" in
    --skip-install)
      SKIP_INSTALL=true
      ;;
    *)
      echo "Unknown option: $arg"
      echo "Usage: $0 [--skip-install]"
      exit 1
      ;;
  esac
done

if [ "$SKIP_INSTALL" = false ]; then
  echo "[backend/setup] Installing backend dependencies..."
  npm install
else
  echo "[backend/setup] Skipping dependency install (--skip-install)."
fi

echo "[backend/setup] Generating Prisma client..."
npm run prisma:generate

echo "[backend/setup] Pushing Prisma schema to database..."
npm run db:push

echo "[backend/setup] Done."
