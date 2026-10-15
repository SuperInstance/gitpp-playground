#!/usr/bin/env bash
# serve.sh — serve the playground on http://localhost:8000/
set -e
PORT="${PORT:-8000}"
echo "Serving gitpp-playground on http://localhost:${PORT}/"
echo "Press Ctrl-C to stop."
exec python3 -m http.server "$PORT" --bind 127.0.0.1
