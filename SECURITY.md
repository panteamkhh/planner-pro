# Security Policy

## Reporting a vulnerability

This is a fully offline client-side app with no server, no accounts and no
network requests, so the attack surface is minimal. Still, if you find a
security issue (for example an XSS vector or a data-leak risk), please report it
privately:

- Open a **private** security advisory on GitHub, or
- Email the maintainer listed on the profile.

Please do not disclose it publicly before it is fixed. We aim to respond within
a few days.

## Data

All data stays in the browser's `localStorage` on the user's own device. Nothing
is transmitted anywhere. Clearing site data or browser data removes everything;
use **Settings → Export JSON** to keep a backup.
