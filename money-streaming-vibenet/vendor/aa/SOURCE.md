# Vendored EIP-8130 bundle

Copied from `vendor/aa/` in the Base UI source checkout.

- Source repository commit: `89be39d827247329755a958e3299e566a1e4bcdd`
- Source commit date: September 9, 2026
- Upstream `index.js` SHA-256: `bb4e39e7fa8bc381ad56f41cfd2ac791cde449104a7d669d91e76c53d31946f0`
- Vendored `index.js` SHA-256: `feb9957bea38e2920a37dd1deeaa7dc0639e59bdeb141770517e2efbbaf079eb`
- `index.d.ts` SHA-256: `f0346d55bb1b41fb58dd2ac7919d321b3fa96bb262c3082ced07fa1acdb26f71`

The bundle is self-contained because the forked EIP-8130 modules are not yet
available through the configured npm registry. Re-copy the directory from a
current `base-ui` checkout after a protocol/tooling update.

This repository copy adds three comment-only CodeQL suppressions around
upstream hexadecimal-decoding and client-ID utilities. They do not alter the
bundle's runtime behavior.
