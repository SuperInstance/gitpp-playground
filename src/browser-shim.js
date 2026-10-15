// browser-shim.js — re-exports gitpp.js with node:crypto shimmed to window.crypto
// Used by the playground's index.html (which can't use node: imports).

// Stub node:crypto for the browser
const webcrypto = window.crypto;
const subtle = webcrypto.subtle;

// Re-export gitpp.js's exports, but with node:crypto replaced
// The simplest way: import the source, override webcrypto before running.
// But we can't easily intercept the import. So we do a string replacement
// at load time, then eval.

// Read the source as a string from the page (it'll be loaded as a <script> tag with type=module)
// Actually, simpler: just have the playground import gitpp.js normally and
// have gitpp.js handle the missing node:crypto.

// We provide a shim that the browser-only build can use.
export { webcrypto, subtle };
