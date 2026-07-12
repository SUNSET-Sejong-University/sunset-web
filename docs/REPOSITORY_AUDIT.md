# SUNSET Repository Audit

## 1. Purpose

This document is the factual baseline for public website content.

It records:

- what each repository actually implements;
- how confidently that behavior is verified;
- known limitations;
- public treatment;
- repositories that should be combined or excluded.

The website must not make stronger claims than this audit.

When repository access is available, verify the current default branch before implementation and update this file with exact evidence paths. Do not copy secret values into this document.

## 2. Status vocabulary

- **Concept** — primarily a proposal or design direction
- **Prototype** — partial implementation or experimental path
- **Working Prototype** — end-to-end behavior exists but is not production-grade
- **Completed** — project scope appears substantially finished
- **Learning Archive** — coursework or data-structure practice
- **Archived/Internal** — not suitable as a public project story

## 3. Public grouping

### Flagship

- GRIP-5
- Tolqyn
- MoodFlix
- NaeonAir / WisDrone

### Supporting

- Intellichair
- BuildIn
- IKUMPlay
- roastivator
- DSNSim

### Incubator

- aura

### Learning archive

- Queues
- Trees
- Linked-Lists

### Excluded/internal

- dummy-files
- pixel-231a6fa7a5be46149da33813796eea22
- separate public listing for wisdrone-ai-drone

---

## 4. Repository records

## GRIP-5

**Public project name:** GRIP-5  
**Tier:** Flagship  
**Recommended status:** Working Prototype  
**Template:** Systems  
**Confidence:** High  
**Public:** Yes

### Verified purpose

Gesture-responsive prosthetic-hand prototype that converts hand-tracking landmarks into five finger states and controls servo-driven hardware.

### Verified implementation

- Webcam frame input
- MediaPipe hand tracking
- 21 hand landmarks
- Joint-angle calculation
- Mapping from angle to finger openness
- Exponential moving average smoothing
- Quantization into discrete finger states
- Five-character state format
- Serial or UDP transport
- Arduino-side parsing
- Five-servo control
- Proportional/eased servo movement
- Rock-paper-scissors demonstration behavior

### Important evidence paths

- `gesture_logic.py`
- `main.py`
- `mcu/mcu.ino`
- repository README and diagrams where accurate

### Limitations and risks

- Hardcoded network credentials were observed in firmware.
- Packet validation and integrity checks are limited.
- Authentication is not evident.
- Tests are limited or absent.
- Callback/global-state structure is prototype-oriented.
- No medical validation or clinical outcome evidence.

### Public-content rules

Allowed:

- describe the hand-tracking-to-servo pipeline;
- describe it as a working engineering prototype;
- use architecture diagrams;
- show real hardware/media when available.

Prohibited:

- clinical claims;
- accessibility-benefit claims not supported by testing;
- medical-device language;
- publication of credential values.

---

## MoodFlix

**Public project name:** MoodFlix  
**Tier:** Flagship  
**Recommended status:** Prototype  
**Template:** Editorial/Research  
**Confidence:** High  
**Public:** Yes

### Verified purpose

Multimodal movie-recommendation research prototype combining visual, audio, environmental, and model-generated context.

### Verified implementation

- React client
- Webcam/environment/audio capture direction
- Python server
- Raw HTTP server endpoints
- DeepFace facial-emotion analysis
- Librosa audio-feature extraction
- Local Ollama/TinyLlama usage
- Random Forest component trained from logged data
- TMDB enrichment
- Custom request/response format
- CSV-backed logging and synchronization paths

### Important evidence paths

- `server.py`
- `aiengine.py`
- client application source
- package manifests
- README where consistent with code

### Limitations and risks

- Missing or fragile imports were observed.
- CSV merge/schema handling is brittle.
- Manual request parsing and global state reduce reliability.
- Wildcard CORS was observed.
- Error serialization may fail.
- Authentication is not evident.
- The architecture is research-prototype quality, not production-service quality.

### Public-content rules

Allowed:

- explain the multimodal pipeline;
- distinguish facial, audio, local-model, and recommendation components;
- label it research prototype;
- show limitations clearly.

Prohibited:

- production recommendation-platform claims;
- claims that all modules are robust or fully deployed;
- unsupported recommendation-accuracy metrics.

---

## Intellichair

**Public project name:** Intellichair  
**Tier:** Supporting  
**Recommended status:** Prototype  
**Template:** Systems  
**Confidence:** High  
**Public:** Yes

### Verified purpose

Smart-chair sensing prototype that estimates seated balance and posture-related signals from four load cells and an IMU.

### Verified implementation

- Four load cells
- HX711 interfaces
- Left/right normalization
- Symmetry Index calculation
- Center of Pressure calculation
- BMI270/BMM150 IMU usage
- Accelerometer-angle calculation
- Buzzer feedback
- BLE service/characteristic concept in firmware

### Important evidence paths

- main firmware file
- README
- hardware diagrams when present

### Limitations and risks

- BLE initialization, advertising, and characteristic updates appear incomplete.
- Division-by-zero handling may be missing when total load is zero.
- Center of Pressure may be calculated but not meaningfully used.
- Warning thresholds require technical review.
- No clinical validation.
- “Distress alert” or health-monitoring claims may exceed implementation.

### Public-content rules

Allowed:

- describe the sensing concept;
- show signal calculations;
- call it a physical-computing prototype.

Prohibited:

- clinical-grade or health-diagnostic language;
- claiming completed BLE behavior without verification;
- safety-alert claims not implemented.

---

## Tolqyn

**Public project name:** Tolqyn  
**Tier:** Flagship  
**Recommended status:** Working Prototype  
**Template:** Cinematic  
**Confidence:** High  
**Public:** Yes

### Verified purpose

Audio-responsive and sensor-influenced generative visual system built in Processing P3D.

### Verified implementation

- Processing P3D
- Approximately 3,000 visual nodes
- Node/edge relationships
- FFT analysis
- Beat detection
- Procedural musical behavior
- Webcam frame-difference centroid
- Gyroscope input
- Camera/orientation fusion
- UDP/serial interaction
- Real-time generative output

### Important evidence paths

- `Tolqyn.pde`
- visual output assets
- README
- demo videos or screenshots

### Limitations and risks

- Large monolithic sketch.
- Heavy per-pixel and graph-like computation.
- Potentially expensive sorting or farthest-node operations.
- Thread-per-note behavior may be fragile.
- Rotation-unit handling needs review.
- Prototype performance may vary by hardware.

### Public-content rules

Allowed:

- media-led case study;
- explain audio/camera/gyro interaction;
- describe it as experimental generative computing.

Prohibited:

- presenting monolithic prototype structure as production architecture;
- fake visual renders when real output exists.

---

## roastivator

**Public project name:** roastivator  
**Tier:** Supporting  
**Recommended status:** Working Prototype  
**Template:** Editorial  
**Confidence:** High  
**Public:** Yes

### Verified purpose

Web application that analyzes public GitHub profile/repository signals and generates humorous roasting output.

### Verified implementation

- Next.js
- React
- TypeScript
- Framer Motion
- Step-based input/loading/result flow
- Rules based on commit messages
- Rules based on repository names
- Rules based on activity, stars, forks, followers, and emojis
- Error-boundary and hook structure
- Jest configuration or tests

### Important evidence paths

- `package.json`
- `src/app/page.tsx`
- `src/components/GitHubRoaster.tsx`
- `src/hooks/useRoasting.ts`

### Limitations and risks

- Core output is deterministic/rule-based rather than model-backed AI.
- Random selection may make repeated results inconsistent.
- Existing design may use familiar generic gradients.
- Public GitHub API behavior and rate limits may affect usage.

### Public-content rules

Allowed:

- describe it as a rules-based GitHub analyzer;
- show the interaction flow;
- discuss playful interface design.

Prohibited:

- calling it AI unless a real model path is verified.

---

## pixel-231a6fa7a5be46149da33813796eea22

**Tier:** Excluded/Internal  
**Recommended status:** Archived/Internal  
**Confidence:** Medium  
**Public:** No

### Verified state

- UUID-like repository name
- Large repository footprint
- Minimal useful public documentation
- No reliable standalone project identity confirmed

### Public-content rules

- Exclude from all public routes.
- Do not invent a name, description, or purpose.
- Keep only in internal audit.
- Recommend rename, documentation, privatization, or archival after review.

---

## Queues

**Public project name:** Queues  
**Tier:** Learning  
**Recommended status:** Learning Archive  
**Template:** Editorial archive  
**Confidence:** Medium  
**Public:** Yes, only inside a grouped learning archive

### Verified state

- Small data-structure practice repository
- Minimal README
- Limited public project narrative

### Public-content rules

- Do not feature independently.
- Group with Trees and Linked-Lists.
- Present as learning material, not a major software project.

---

## BuildIn

**Public project name:** BuildIn  
**Tier:** Supporting  
**Recommended status:** Working Prototype  
**Template:** Systems  
**Confidence:** High  
**Public:** Yes

### Verified purpose

Physical GitHub Actions build-status indicator using an Arduino MKR WiFi 1010 and four LEDs.

### Verified implementation

- Wi-Fi connection
- GitHub API request
- Latest workflow-run polling
- State mapping for queued/running/success/failure
- Four LED outputs
- Manual JSON/string extraction
- Repository-specific configuration

### Important evidence paths

- `src/main/main.ino`
- README
- hardware image or wiring diagram

### Limitations and risks

- Hardcoded organization/repository configuration.
- Repository ID path may be fixed.
- Polling interval is too aggressive for reusable production use.
- Manual response parsing is brittle.
- Token storage on device needs careful handling.
- Reconnect, backoff, and rate-limit logic are limited.

### Public-content rules

Allowed:

- emphasize physical feedback for CI status;
- show the API-to-LED system flow.

Prohibited:

- enterprise CI-infrastructure claims;
- exposing token or secret-header details.

---

## aura

**Public project name:** aura  
**Tier:** Incubator  
**Recommended status:** Concept  
**Template:** Editorial/Concept  
**Confidence:** Medium  
**Public:** Yes

### Verified purpose

Physical-first automation concept using NFC and weight-sensing “Pucks” to trigger contextual software or smart-home actions.

### Verified direction

- NFC interaction
- Weight-sensing object state
- Context-aware action concept
- Proposed Slack integration
- Proposed Spotify integration
- Proposed Home Assistant integration
- Proposed Notion integration
- Proposed ESP32-S3 and PN532-class hardware
- Proposed PWA

### Limitations and risks

- Implementation evidence is limited.
- Most behavior appears conceptual or proposed.
- Business and feasibility discussion may exceed built functionality.

### Public-content rules

Allowed:

- publish as incubator concept;
- distinguish proposed architecture from implementation;
- use concept/system diagrams labeled clearly.

Prohibited:

- presenting integrations as working;
- using product-launch language.

---

## Trees

**Public project name:** Trees  
**Tier:** Learning  
**Recommended status:** Learning Archive  
**Confidence:** Medium  
**Public:** Yes, only inside grouped learning archive

### Verified state

- Data-structure practice
- Minimal documentation

### Public-content rules

- Group with Queues and Linked-Lists.
- Do not feature independently.

---

## IKUMPlay

**Public project name:** IKUMPlay  
**Tier:** Supporting  
**Recommended status:** Working Prototype  
**Template:** Editorial/Creative software  
**Confidence:** High  
**Public:** Yes

### Verified purpose

Terminal-based karaoke application combining song search, media preparation, source separation, synchronized lyrics, playback, and terminal visualization.

### Verified implementation

- Spotify search through Spotipy
- yt-dlp acquisition path
- Docker/Spleeter fallback
- Synced lyrics/LRC parsing
- pygame playback
- Rich terminal interface
- Spectrogram/visualizer behavior
- Keyboard controls
- Cleanup logic

### Important evidence paths

- `main.py`
- package/dependency files
- README
- terminal screenshots or demo

### Limitations and risks

- Hardcoded Spotify credentials were observed.
- A committed virtual environment was observed.
- Repository size is inflated by generated/dependency artifacts.
- Shell redirection and OS behavior may be brittle.
- Cleanup can fail and leave files.
- External media/service availability affects operation.
- Copyright and platform terms require careful public wording.

### Public-content rules

Allowed:

- describe the technical media pipeline;
- show terminal UI;
- discuss external-service dependencies.

Prohibited:

- exposing client credentials;
- implying Spotify/YouTube endorsement;
- implying guaranteed media legality or availability.

---

## dummy-files

**Tier:** Excluded/Internal  
**Recommended status:** Internal  
**Confidence:** Medium  
**Public:** No

### Verified state

- Support/internal-looking repository
- No strong standalone story
- Minimal public documentation

### Public-content rules

- Exclude from public pages.
- Keep only in audit.
- Recommend privatization or documentation if still needed.

---

## DSNSim

**Public project name:** DSNSim  
**Tier:** Supporting  
**Recommended status:** Prototype  
**Template:** Editorial/Systems  
**Confidence:** High  
**Public:** Yes

### Verified purpose

Arduino-based educational radio demonstration inspired by uplink/downlink concepts associated with deep-space communication.

### Verified implementation

- Serial command mode switching
- Uplink transmit mode
- Downlink receive mode
- Basic fixed-message transmission
- LED feedback
- Servo sweep representing a dish
- 433 MHz RF components

### Important evidence paths

- main firmware file
- README
- hardware imagery

### Limitations and risks

- No realistic DSN protocol.
- No telemetry/command protocol.
- No error correction.
- No signal/noise model.
- No link-budget or orbital simulation.
- Fixed payload behavior.

### Public-content rules

Allowed:

- call it an educational RF demonstration inspired by DSN concepts.

Prohibited:

- calling it a realistic Deep Space Network simulator;
- implying aerospace-grade communications.

---

## wisdrone-interface

**Combined public project:** NaeonAir / WisDrone  
**Tier:** Combined flagship component  
**Recommended status:** Prototype  
**Confidence:** High  
**Separate public page:** No

### Verified purpose

React/Vite frontend for drone-system monitoring and interaction.

### Verified implementation

- React
- Vite
- TypeScript
- Device context/provider
- Map container
- Device editor
- Video stream display
- Data panel
- WebSocket gateway URL configuration
- Selected-device stream behavior
- Mapbox GL and Three.js dependencies

### Important evidence paths

- `package.json`
- `src/App.tsx`
- related components
- README

### Limitations and risks

- README may still be default Vite starter text.
- It is not a complete standalone product.
- Visual and deployment maturity require review.

### Public-content rules

- Combine into the NaeonAir/WisDrone case study.
- Do not create a separate flagship card.

---

## Linked-Lists

**Public project name:** Linked-Lists  
**Tier:** Learning  
**Recommended status:** Learning Archive  
**Confidence:** Medium  
**Public:** Yes, only inside grouped learning archive

### Verified state

- Data-structure practice
- Minimal documentation

### Public-content rules

- Group with Queues and Trees.
- Do not feature independently.

---

## NaeonAir

**Public project name:** NaeonAir / WisDrone  
**Tier:** Flagship  
**Recommended status:** Working Prototype or Prototype after current verification  
**Template:** Systems  
**Confidence:** High  
**Public:** Yes

### Verified purpose

UAV/AIoT crowd-management prototype combining camera streaming, ground-control routing, telemetry, frontend monitoring, and experimental AI/Mobius integration.

### Verified implementation

- ESP32-CAM capture
- Wi-Fi connection
- WebSocket image streaming
- Python WebSocket ground gateway
- Drone connection tracking by device ID
- Frontend subscription routing
- Binary frame forwarding
- Periodic frame forwarding to an AI service
- Mobius bridge/integration experiments
- TCP telemetry path for Pico-related data
- React/Vite monitoring interface
- Device map/editor/stream/data surfaces
- GPS/flight-controller/servo-oriented architecture

### Important evidence paths

- `ground-control/gateway.py`
- `avionics/esp32cam/esp32cam.ino`
- `wisdrone-interface/src/App.tsx`
- related configuration and documentation

### Limitations and risks

- Hardcoded hotspot credentials and local addresses were observed.
- No evident TLS/authentication for stream transport.
- Project naming drifts between NaeonAir and WisDrone.
- Some AI behavior is off-device or incomplete.
- Ground-service dependencies are prototype-oriented.
- Safety, privacy, and legal requirements for drone/crowd use are substantial.
- “On-device AI” claims are not supported by verified implementation.

### Public-content rules

Allowed:

- show the end-to-end camera/gateway/frontend topology;
- distinguish implemented streaming from experimental AI reporting;
- combine related repositories into one case study;
- disclose incomplete components.

Prohibited:

- exposing credentials or infrastructure addresses;
- claiming completed on-device AI;
- claiming public-safety readiness;
- implying approved operational deployment.

---

## wisdrone-ai-drone

**Combined public project:** NaeonAir / WisDrone  
**Tier:** Incomplete component  
**Recommended status:** Prototype/Incomplete  
**Confidence:** High  
**Separate public page:** No

### Verified implementation

- FastAPI image upload
- Timestamped image persistence
- Local public-image URL construction
- Inference-call path
- Report forwarding to Mobius

### Limitations and risks

- Core inference implementation appears empty or incomplete.
- It is not a finished AI service.
- Local URLs and assumptions may not be deployment-ready.

### Public-content rules

- Include only as an incomplete backend component in the combined drone case study.
- Never call the AI inference complete.
- Never publish as a separate flagship.

---

## 5. Combined public project list

Recommended public slugs:

```text
grip-5
tolqyn
moodflix
naeonair-wisdrone
intellichair
buildin
ikumplay
roastivator
dsnsim
aura
learning-structures
```

The grouped learning page may combine Queues, Trees, and Linked-Lists.

## 6. Organization verification

**GitHub organization:** [SUNSET-Sejong-University](https://github.com/SUNSET-Sejong-University)

Verified 2026-06-26 via GitHub API. The organization exposes 17 public repositories matching the audit list:

`GRIP-5`, `Tolqyn`, `MoodFlix`, `NaeonAir`, `wisdrone-interface`, `wisdrone-ai-drone`, `Intellichair`, `BuildIn`, `IKUMPlay`, `roastivator`, `DSNSim`, `aura`, `Queues`, `Trees`, `Linked-Lists`, `dummy-files`, `pixel-231a6fa7a5be46149da33813796eea22`.

Default branches observed as `main` for sampled repositories during verification.

## 7. Owner-confirmed facts

> **Source:** Project-owner confirmation (2026-06-26). These facts supplement repository audit evidence and may appear on the public website when localized.

### Organization identity

- **Full name:** Sejong University Network for Science & Engineering Thinkers
- **Abbreviation:** SUNSET
- **Location:** Seoul, South Korea
- **Public contact email:** prithwisd@sju.ac.kr
- **GitHub organization:** SUNSET-Sejong-University

### Organization metrics (owner-confirmed)

- **17** public repositories in the organization
- **10+** students involved across cohorts
- **6+** active hardware builds
- **5** hardware platforms in active use
- **2024** — year of first commits (present as GitHub activity on timeline, not as “founded”)

Independent-status disclaimer remains required on all public surfaces.

### Contributors (owner-confirmed)

| Name | Association |
|---|---|
| Prithwis Das | Founding contributor |
| Azizbek Arzikulov | Organization member |
| Basnet Prashant | GRIP-5 |
| Kang Naeon | NaeonAir |
| Choi Hyong Chan | NaeonAir · MoodFlix |
| Shipulin Arslan | MoodFlix |
| Myint Myat Aung | MoodFlix |
| 최종우 | Intellichair |

Use “Contributor” only when a more specific association is not listed above.

## 8. Required current verification before publishing

Before final content freeze, verify:

- current default branch for every public repository;
- current repository descriptions and topics;
- public licenses;
- contributor names;
- real media availability;
- whether any project has a public demo;
- whether project-specific dates or course contexts are directly documented;
- whether credentials remain in history;
- whether repository names changed;
- whether NaeonAir/WisDrone terminology has been standardized.

Record unresolved facts as unknown. Do not fill them with plausible guesses.
