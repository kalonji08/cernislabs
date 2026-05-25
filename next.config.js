/** @type {import('next').NextConfig} */

// Claude Code injects a broken localStorage polyfill into the Node process.
// If localStorage exists but getItem is not a function, remove it so SSR works.
if (
  typeof globalThis.localStorage !== 'undefined' &&
  typeof globalThis.localStorage.getItem !== 'function'
) {
  delete globalThis.localStorage
}

const nextConfig = {}

module.exports = nextConfig
