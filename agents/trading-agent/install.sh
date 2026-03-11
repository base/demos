#!/usr/bin/env bash

set -euo pipefail

REPO_URL="${TRADING_AGENT_REPO_URL:-https://github.com/base/demos.git}"
REPO_REF="${TRADING_AGENT_REPO_REF:-master}"
PACKAGE_PATH="${TRADING_AGENT_PACKAGE_PATH:-agents/trading-agent}"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required but was not found on PATH." >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "node is required but was not found on PATH." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required but was not found on PATH." >&2
  exit 1
fi

workdir="$(mktemp -d)"

cleanup() {
  rm -rf "$workdir"
}

trap cleanup EXIT

echo "Fetching trading-agent scaffold..."
clone_branch() {
  local ref="$1"
  git clone --depth 1 --branch "$ref" "$REPO_URL" "$workdir/repo" >/dev/null 2>&1
}

if ! clone_branch "$REPO_REF"; then
  if [ "$REPO_REF" = "master" ]; then
    echo "Falling back to main..."
    clone_branch "main"
  else
    echo "Failed to clone branch '$REPO_REF' from $REPO_URL." >&2
    exit 1
  fi
fi

cd "$workdir/repo"

cd "$PACKAGE_PATH"

echo "Installing dependencies..."
npm install

echo "Building CLI..."
npm run build

echo "Launching scaffold..."
node dist/index.js "$@"
