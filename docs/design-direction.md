# Democrat.ai — Product design direction

## Product audit

Democrat.ai is a source-grounded content repurposing product. Its real journey is:

1. Authenticate through Supabase (Google, GitHub, email/password).
2. Paste a source URL.
3. Extract and summarize the source with Groq.
4. Choose an editorial angle and destination platform.
5. Generate platform-specific copy, hashtags, and keywords.
6. Review, edit, copy, approve, or reject the saved Supabase draft.

The redesign preserves that architecture, API contract, environment setup, middleware, row-level security, and Cloudflare deployment path.

## Directions explored

### A. Editorial command center — selected

Warm paper, near-black ink, signal coral, serif editorial moments, operational typography, visible workflow traces, and motion that communicates processing. Distinctive, credible, and scalable from marketing into the product.

### B. Broadcast studio

High-contrast dark control-room surfaces, waveform graphics, and channel meters. Strong motion potential, but too media-production-specific for blogs and text-heavy workflows.

### C. Intelligent newsroom

Dense newspaper grids, monochrome typography, and red editorial marks. Highly differentiated, but risks making the application feel slower and less approachable.

### D. Modular signal network

Node graphs, dark technical surfaces, and bright routing lines. Excellent for workflow storytelling, but too close to common automation-tool visual language.

## Why direction A won

It best balances product clarity, visual differentiation, accessibility, conversion, and long-term component scalability. The interface can be expressive in marketing while remaining calm and operational inside the authenticated workspace.

## Core system

- **Ink:** `#11110f`
- **Paper:** `#f2efe7`
- **Raised paper:** `#fbfaf6`
- **Signal:** `#ff5b3f`
- **Positive:** `#267a58`
- **Warning:** `#b76520`
- **Danger:** `#c7453d`
- **Typography:** Geist Sans for product UI, Georgia for short editorial emphasis, Geist Mono for operational metadata.
- **Radius:** 10px controls, 16px panels, 24px hero/product stages. Pills only for compact statuses.
- **Motion:** 160–520ms transitions; longer looping motion only for workflow storytelling; all ambient motion disabled under `prefers-reduced-motion`.
