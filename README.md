# gitpp-playground

> A single-page browser playground for the git.pp fold. Edit records, see the closure root, derived state, and conflicts. No build step, no server, no install. Just open the HTML.

## What's in it

- `index.html` — the playground UI. Self-contained, dark theme, runs in any modern browser.
- `src/gitpp.browser.js` — the JS port with `node:crypto` shimmed to `window.crypto` for browser use. Same exports as the Node version.
- `src/gitpp.js` — the original Node version (kept for reference).

## Run it

The playground can't be opened with `file://` because ESM modules need an HTTP origin. Two options:

```bash
# Option 1: Python's built-in server
python3 -m http.server 8000
# then open http://localhost:8000/

# Option 2: serve.sh (provided)
bash serve.sh
```

Or, deploy to GitHub Pages: enable Pages on the repo with `index.html` as the source. The playground will be at `https://<user>.github.io/gitpp-playground/`.

## Examples built-in

- **poc-quilt-1 (live)** — the canonical 8-record set; closure root at `task-c` = `60effe23…fc91d`. Click "Fetch live" to load fresh from the deployment.
- **family-calendar** — 8 records, an override (doctor's appointment trumps soccer), a witness confirming the visit. Teaches class precedence.
- **tournament-scoring** — 10 records, two matches as overrides, a final-standings task. Teaches the per-event keys vs cumulative keys design.
- **service-monitoring** — 9 records, threshold tasks, live-metric witnesses, an on-call override, a derived alert-state task. Teaches the four record kinds in one example.
- **minimal** — a 1-record set, the smallest possible fold.
- **conflict** — two tasks setting the same key + an override. Teaches conflict detection and resolution.
- **orphan** — a record whose parent is missing. Teaches orphan exclusion.

## Try this

1. Click `poc-quilt-1 (live)`. See the closure root and the state.
2. Edit `override-1.effects.config.timeout` from 45 to 99. Click `Run fold`. The state changes; the closure root changes; the verdict becomes MISMATCH.
3. Add a new record at the bottom:
   ```json
   { "id": "tamper", "kind": "task", "parents": ["task-c"], "effects": { "tampered": true } }
   ```
   Click `Run fold`. The closure of `task-c` now includes `tamper`; the closure root changes; the verdict is MISMATCH.
4. Click `orphan` example. Notice the closure is incomplete and the root is missing.

## Why a browser playground?

The fold is a pure function of the record set. The browser can do it. No server roundtrip, no auth, no data leaving the page. You can paste a sensitive record set, run the fold, see the state — and your data never leaves the browser.

The `gitpp-js` port is the same code in both places. The only change for the browser is `import { webcrypto } from "node:crypto"` → `const webcrypto = window.crypto`. Same closure root, same state, same conflicts.
