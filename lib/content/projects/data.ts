import { repoUrl } from "@/lib/content/site";
import type { Project } from "@/lib/content/types";

const diagram = (slug: string, enAlt: string, koAlt: string) =>
  ({
    path: `/projects/${slug}/system-diagram.svg`,
    alt: { en: enAlt, ko: koAlt },
    kind: "diagram" as const,
    caption: {
      en: "System diagram derived from verified repository architecture.",
      ko: "검증된 저장소 아키텍처를 바탕으로 한 시스템 다이어그램.",
    },
  }) satisfies Project["media"][number];

export const projects = [
  {
    slug: "grip-5",
    number: 1,
    name: "GRIP-5",
    tier: "flagship",
    status: "working-prototype",
    categories: ["robotics", "embedded", "ai-experiment"],
    layout: "systems",
    repositories: [{ name: "GRIP-5", url: repoUrl("GRIP-5") }],
    summary: {
      en: "Gesture-responsive prosthetic-hand prototype mapping hand-tracking landmarks to five servo-driven finger states.",
      ko: "손 추적 랜드마크를 다섯 개의 서보 구동 손가락 상태로 매핑하는 제스처 반응형 의수 손 프로토타입.",
    },
    problem: {
      en: "Can webcam hand tracking drive a five-finger hardware prototype with stable discrete finger states?",
      ko: "웹캠 손 추적으로 안정적인 이산 손가락 상태를 가진 다섯 손가락 하드웨어 프로토타입을 구동할 수 있는가?",
    },
    implementation: {
      en: [
        "Webcam frame input with MediaPipe hand tracking and 21 landmarks",
        "Joint-angle calculation mapped to finger openness with EMA smoothing",
        "Quantization into a five-character discrete state format",
        "Serial or UDP transport to Arduino firmware",
        "Five-servo proportional movement and rock-paper-scissors demo behavior",
      ],
      ko: [
        "MediaPipe 손 추적과 21개 랜드마크를 사용한 웹캠 프레임 입력",
        "EMA 스무딩으로 손가락 개방도에 매핑되는 관절 각도 계산",
        "다섯 문자 이산 상태 형식으로 양자화",
        "Arduino 펌웨어로의 Serial 또는 UDP 전송",
        "다섯 서보 비례 이동 및 가위바위보 시연 동작",
      ],
    },
    architecture: {
      en: [
        "Python capture and gesture logic on a host machine",
        "Transport layer sends quantized finger states to MCU",
        "Arduino parses packets and drives five servos",
      ],
      ko: [
        "호스트 머신에서 Python 캡처 및 제스처 로직",
        "전송 계층이 양자화된 손가락 상태를 MCU로 전송",
        "Arduino가 패킷을 파싱하고 다섯 서보 구동",
      ],
    },
    decisions: {
      en: [
        "Discrete five-character states simplify MCU parsing over continuous angles",
        "Exponential moving average reduces jitter before quantization",
        "UDP/serial dual path supports lab prototyping flexibility",
      ],
      ko: [
        "이산 다섯 문자 상태는 연속 각도보다 MCU 파싱을 단순화",
        "지수 이동 평균이 양자화 전 지터 감소",
        "UDP/serial 이중 경로로 실험실 프로토타이핑 유연성 지원",
      ],
    },
    limitations: {
      en: [
        "Hardcoded network credentials were observed in firmware and must not be published",
        "Packet validation and authentication are limited",
        "Tests are limited or absent; structure is prototype-oriented",
        "No medical validation or clinical outcome evidence",
      ],
      ko: [
        "펌웨어에서 하드코딩된 네트워크 자격 증명이 관찰되었으며 공개하면 안 됨",
        "패킷 검증 및 인증이 제한적",
        "테스트가 제한적이거나 없으며 구조는 프로토타입 지향",
        "의료 검증 또는 임상 결과 근거 없음",
      ],
    },
    technologies: [
      "Python",
      "MediaPipe",
      "Arduino",
      "Servo control",
      "Serial/UDP",
    ],
    contributors: [],
    relatedSlugs: ["intellichair", "naeonair-wisdrone"],
    media: [
      diagram(
        "grip-5",
        "GRIP-5 signal path from hand tracking to servos",
        "GRIP-5 손 추적에서 서보까지의 신호 경로",
      ),
    ],
    labels: ["implemented", "experimental"],
  },
  {
    slug: "tolqyn",
    number: 2,
    name: "Tolqyn",
    tier: "flagship",
    status: "working-prototype",
    categories: ["creative-coding", "ai-experiment"],
    layout: "cinematic",
    repositories: [{ name: "Tolqyn", url: repoUrl("Tolqyn") }],
    summary: {
      en: "Audio-responsive generative visual system in Processing P3D with sensor-influenced node behavior.",
      ko: "센서 영향을 받는 노드 동작을 갖춘 Processing P3D 기반 오디오 반응형 생성형 비주얼 시스템.",
    },
    problem: {
      en: "How can live audio, camera motion, and gyroscope input shape a real-time generative visual field?",
      ko: "라이브 오디오, 카메라 모션, 자이로스코프 입력이 실시간 생성형 비주얼 필드를 어떻게 형성할 수 있는가?",
    },
    implementation: {
      en: [
        "Processing P3D sketch with approximately 3,000 visual nodes and edge relationships",
        "FFT analysis and beat detection driving procedural musical behavior",
        "Webcam frame-difference centroid and gyroscope input",
        "Camera/orientation fusion with UDP/serial interaction paths",
      ],
      ko: [
        "약 3,000개의 비주얼 노드와 엣지 관계를 갖춘 Processing P3D 스케치",
        "FFT 분석 및 비트 감지로 절차적 음악적 동작 구동",
        "웹캠 프레임 차분 중심 및 자이로스코ope 입력",
        "UDP/serial 상호작용 경로를 통한 카메라/방향 융합",
      ],
    },
    architecture: {
      en: [
        "Input layer: audio FFT, webcam motion, gyroscope",
        "Graph layer: nodes and edges with generative updates",
        "Output layer: real-time P3D rendering",
      ],
      ko: [
        "입력 계층: 오디오 FFT, 웹캠 모션, 자이로스코pe",
        "그래프 계층: 생성형 업데이트를 갖춘 노드와 엣지",
        "출력 계층: 실시간 P3D 렌더링",
      ],
    },
    decisions: {
      en: [
        "Monolithic P3D sketch keeps the experiment self-contained",
        "Beat detection triggers procedural note behavior",
        "Multi-source fusion prioritizes expressive output over modular services",
      ],
      ko: [
        "모놀리식 P3D 스케치로 실험을 자체 포함",
        "비트 감지가 절차적 음표 동작 트리거",
        "다중 소스 융합은 모듈형 서비스보다 표현적 출력 우선",
      ],
    },
    limitations: {
      en: [
        "Large monolithic sketch with heavy per-pixel computation",
        "Thread-per-note behavior may be fragile",
        "Performance varies significantly by hardware",
      ],
      ko: [
        "픽셀 단위 연산이 많은 대형 모놀리식 스케치",
        "노트당 스레드 동작이 불안정할 수 있음",
        "하드웨어에 따라 성능 편차가 큼",
      ],
    },
    technologies: ["Processing P3D", "FFT", "UDP/Serial"],
    contributors: [],
    relatedSlugs: ["moodflix", "aura"],
    media: [
      diagram(
        "tolqyn",
        "Tolqyn audio and sensor inputs to generative output",
        "Tolqyn 오디오 및 센서 입력에서 생성형 출력까지",
      ),
    ],
    labels: ["implemented", "experimental"],
  },
  {
    slug: "moodflix",
    number: 3,
    name: "MoodFlix",
    tier: "flagship",
    status: "prototype",
    categories: ["ai-experiment", "web"],
    layout: "editorial",
    repositories: [{ name: "MoodFlix", url: repoUrl("MoodFlix") }],
    summary: {
      en: "Multimodal movie-recommendation research prototype combining visual, audio, environmental, and model-generated context.",
      ko: "시각, 오디오, 환경, 모델 생성 컨텍스트를 결합한 멀티모달 영화 추천 연구 프로토타입.",
    },
    problem: {
      en: "Can facial emotion, audio features, and local model context improve movie recommendations in a research setting?",
      ko: "연구 환경에서 얼굴 감정, 오디오 특징, 로컬 모델 컨텍스트가 영화 추천을 개선할 수 있는가?",
    },
    implementation: {
      en: [
        "React client with webcam, environment, and audio capture direction",
        "Python raw HTTP server endpoints",
        "DeepFace facial-emotion analysis and Librosa audio-feature extraction",
        "Local Ollama/TinyLlama usage with Random Forest component from logged data",
        "TMDB enrichment and CSV-backed logging paths",
      ],
      ko: [
        "웹캠, 환경, 오디오 캡처 방향의 React 클라이언트",
        "Python raw HTTP 서버 엔드포인트",
        "DeepFace 얼굴 감정 분석 및 Librosa 오디오 특징 추출",
        "로그 데이터 기반 Random Forest와 로컬 Ollama/TinyLlama 사용",
        "TMDB 보강 및 CSV 기반 로깅 경로",
      ],
    },
    architecture: {
      en: [
        "Client capture modules send multimodal payloads",
        "Server orchestrates emotion, audio, and model inference",
        "Recommendation layer merges logged features with TMDB metadata",
      ],
      ko: [
        "클라이언트 캡처 모듈이 멀티모달 페이로드 전송",
        "서버가 감정, 오디오, 모델 추론 조율",
        "추천 계층이 로그된 특징과 TMDB 메타데이터 병합",
      ],
    },
    decisions: {
      en: [
        "Raw HTTP server keeps the research stack lightweight",
        "CSV logging supports offline model experimentation",
        "Local Ollama path avoids external model hosting during development",
      ],
      ko: [
        "Raw HTTP 서버로 연구 스택 경량화",
        "CSV 로깅으로 오프라인 모델 실험 지원",
        "로컬 Ollama 경로로 개발 중 외부 모델 호스팅 회피",
      ],
    },
    limitations: {
      en: [
        "Missing or fragile imports were observed in the codebase",
        "CSV merge and schema handling is brittle",
        "Wildcard CORS and manual request parsing reduce reliability",
        "Research-prototype quality, not production-service quality",
      ],
      ko: [
        "코드베이스에서 누락되거나 불안정한 import 관찰",
        "CSV 병합 및 스키마 처리가 취약",
        "와일드카드 CORS 및 수동 요청 파싱으로 신뢰성 저하",
        "연구 프로토타입 수준이며 프로덕션 서비스 품질 아님",
      ],
    },
    technologies: [
      "React",
      "Python",
      "DeepFace",
      "Librosa",
      "Ollama",
      "Random Forest",
    ],
    contributors: [],
    relatedSlugs: ["tolqyn", "ikumplay"],
    media: [
      diagram(
        "moodflix",
        "MoodFlix multimodal recommendation pipeline",
        "MoodFlix 멀티모달 추천 파이프라인",
      ),
    ],
    labels: ["implemented", "experimental", "incomplete"],
  },
  {
    slug: "naeonair-wisdrone",
    number: 4,
    name: "NaeonAir / WisDrone",
    tier: "flagship",
    status: "working-prototype",
    categories: ["robotics", "embedded", "ai-experiment"],
    layout: "systems",
    repositories: [
      { name: "NaeonAir", url: repoUrl("NaeonAir") },
      { name: "wisdrone-interface", url: repoUrl("wisdrone-interface") },
      { name: "wisdrone-ai-drone", url: repoUrl("wisdrone-ai-drone") },
    ],
    summary: {
      en: "UAV/AIoT crowd-management prototype with camera streaming, ground-control routing, telemetry, and experimental AI integration.",
      ko: "카메라 스트리밍, 지상 관제 라우팅, 원격 측정, 실험적 AI 통합을 갖춘 UAV/AIoT 군중 관리 프로토타입.",
    },
    problem: {
      en: "Can ESP32-CAM streams, a Python ground gateway, and a React monitoring interface form an end-to-end drone observation prototype?",
      ko: "ESP32-CAM 스트림, Python 지상 게이트웨이, React 모니터링 인터페이스가 end-to-end 드론 관측 프로토타입을 구성할 수 있는가?",
    },
    implementation: {
      en: [
        "ESP32-CAM Wi-Fi capture and WebSocket image streaming",
        "Python WebSocket ground gateway with device ID routing",
        "React/Vite frontend with map, device editor, video stream, and data panel",
        "Periodic frame forwarding to an AI service and Mobius bridge experiments",
        "FastAPI image upload path in wisdrone-ai-drone with inference-call scaffolding",
      ],
      ko: [
        "ESP32-CAM Wi-Fi 캡처 및 WebSocket 이미지 스트리밍",
        "디바이스 ID 라우팅을 갖춘 Python WebSocket 지상 게이트웨이",
        "맵, 디바이스 편집기, 비디오 스트림, 데이터 패널의 React/Vite 프론트엔드",
        "AI 서비스 및 Mobius 브릿지 실험으로의 주기적 프레임 전달",
        "wisdrone-ai-drone의 FastAPI 이미지 업로드 및 추론 호출 스캐폴딩",
      ],
    },
    architecture: {
      en: [
        "Avionics: ESP32-CAM capture and stream",
        "Ground control: gateway subscription and binary frame forwarding",
        "Frontend: device map and stream display via WebSocket gateway URL",
        "AI component: upload, timestamped persistence, report forwarding (incomplete inference)",
      ],
      ko: [
        "항공 전자: ESP32-CAM 캡처 및 스트림",
        "지상 관제: 게이트웨이 구독 및 바이너리 프레임 전달",
        "프론트엔드: WebSocket 게이트웨이 URL을 통한 디바이스 맵 및 스트림 표시",
        "AI 구성요소: 업로드, 타임스탬프 저장, 리포트 전달(미완성 추론)",
      ],
    },
    decisions: {
      en: [
        "WebSocket gateway centralizes multi-device stream routing",
        "Separate interface and AI repositories split monitoring from inference experiments",
        "Mobius integration explored for external reporting without claiming on-device AI",
      ],
      ko: [
        "WebSocket 게이트웨이가 다중 디바이스 스트림 라우팅 중앙화",
        "인터페이스와 AI 저장소 분리로 모니터링과 추론 실험 구분",
        "온디바이스 AI 주장 없이 외부 리포팅을 위한 Mobius 통합 탐색",
      ],
    },
    limitations: {
      en: [
        "Hardcoded hotspot credentials and local addresses were observed and must not be published",
        "No evident TLS or authentication for stream transport",
        "Core inference implementation in wisdrone-ai-drone appears incomplete",
        "Safety, privacy, and legal requirements for drone/crowd use are substantial",
        "On-device AI claims are not supported by verified implementation",
      ],
      ko: [
        "하드코딩된 핫스팟 자격 증명 및 로컬 주소 관찰, 공개 금지",
        "스트림 전송에 TLS 또는 인증이 확인되지 않음",
        "wisdrone-ai-drone의 핵심 추론 구현이 미완성으로 보임",
        "드론/군중 사용의 안전, 개인정보, 법적 요구사항이 상당함",
        "온디바이스 AI 주장은 검증된 구현으로 뒷받침되지 않음",
      ],
    },
    technologies: [
      "ESP32-CAM",
      "Python",
      "WebSocket",
      "React",
      "Vite",
      "FastAPI",
    ],
    contributors: ["strughyhchan"],
    relatedSlugs: ["grip-5", "intellichair"],
    media: [
      diagram(
        "naeonair-wisdrone",
        "NaeonAir camera stream and ground-control topology",
        "NaeonAir 카메라 스트림 및 지상 관제 토폴로지",
      ),
    ],
    labels: ["implemented", "experimental", "incomplete"],
  },
  {
    slug: "intellichair",
    number: 5,
    name: "Intellichair",
    tier: "supporting",
    status: "prototype",
    categories: ["embedded", "robotics"],
    layout: "systems",
    repositories: [{ name: "Intellichair", url: repoUrl("Intellichair") }],
    summary: {
      en: "Smart-chair sensing prototype estimating seated balance and posture-related signals from load cells and an IMU.",
      ko: "로드셀과 IMU로 좌석 균형 및 자세 관련 신호를 추정하는 스마트 의자 센싱 프로토타입.",
    },
    problem: {
      en: "Can four load cells and an IMU provide useful seated symmetry and posture-related feedback on embedded hardware?",
      ko: "네 개의 로드셀과 IMU가 임베디드 하드웨어에서 유용한 좌석 대칭 및 자세 관련 피드백을 제공할 수 있는가?",
    },
    implementation: {
      en: [
        "Four load cells with HX711 interfaces",
        "Left/right normalization, Symmetry Index, and Center of Pressure calculation",
        "BMI270/BMM150 IMU accelerometer-angle calculation",
        "Buzzer feedback and BLE service/characteristic concept in firmware",
      ],
      ko: [
        "HX711 인터페이스를 갖춘 네 개의 로드셀",
        "좌우 정규화, 대칭 지수, 압력 중심 계산",
        "BMI270/BMM150 IMU 가속도계 각도 계산",
        "펌웨어의 부저 피드백 및 BLE 서비스/특성 개념",
      ],
    },
    architecture: {
      en: [
        "Sensor layer: load cells and IMU",
        "Signal layer: normalization and symmetry metrics",
        "Feedback layer: buzzer and proposed BLE notifications",
      ],
      ko: [
        "센서 계층: 로드셀 및 IMU",
        "신호 계층: 정규화 및 대칭 메트릭",
        "피드백 계층: 부저 및 제안된 BLE 알림",
      ],
    },
    decisions: {
      en: [
        "Symmetry Index simplifies bilateral load comparison",
        "IMU augments load-only sensing with orientation context",
        "Buzzer provides immediate local feedback without a companion app requirement",
      ],
      ko: [
        "대칭 지수로 양측 하중 비교 단순화",
        "IMU가 하중 전용 센싱에 방향 컨텍스트 추가",
        "부저가 동반 앱 없이 즉각적 로컬 피드백 제공",
      ],
    },
    limitations: {
      en: [
        "BLE initialization, advertising, and characteristic updates appear incomplete",
        "Division-by-zero handling may be missing when total load is zero",
        "Center of Pressure may be calculated but not meaningfully used",
        "No clinical validation; health-monitoring claims exceed implementation",
      ],
      ko: [
        "BLE 초기화, 광고, 특성 업데이트가 미완성으로 보임",
        "총 하중이 0일 때 0으로 나누기 처리가 없을 수 있음",
        "압력 중심이 계산되지만 의미 있게 사용되지 않을 수 있음",
        "임상 검증 없음; 건강 모니터링 주장이 구현을 초과",
      ],
    },
    technologies: ["Arduino", "HX711", "Load cells", "BMI270", "BLE"],
    contributors: [],
    relatedSlugs: ["grip-5", "buildin"],
    media: [
      diagram(
        "intellichair",
        "Intellichair load-cell and IMU sensing flow",
        "Intellichair 로드셀 및 IMU 센싱 흐름",
      ),
    ],
    labels: ["implemented", "experimental", "incomplete"],
  },
  {
    slug: "buildin",
    number: 6,
    name: "BuildIn",
    tier: "supporting",
    status: "working-prototype",
    categories: ["embedded", "web"],
    layout: "systems",
    repositories: [{ name: "BuildIn", url: repoUrl("BuildIn") }],
    summary: {
      en: "Physical GitHub Actions build-status indicator using an Arduino MKR WiFi 1010 and four LEDs.",
      ko: "Arduino MKR WiFi 1010과 네 개의 LED로 GitHub Actions 빌드 상태를 표시하는 물리적 표시기.",
    },
    problem: {
      en: "Can a desk-mounted LED device reflect the latest GitHub workflow status for a configured repository?",
      ko: "책상용 LED 디바이스가 설정된 저장소의 최신 GitHub 워크플로 상태를 반영할 수 있는가?",
    },
    implementation: {
      en: [
        "Wi-Fi connection and GitHub API workflow-run polling",
        "State mapping for queued, running, success, and failure",
        "Four LED outputs with manual JSON/string extraction",
        "Repository-specific configuration in firmware",
      ],
      ko: [
        "Wi-Fi 연결 및 GitHub API 워크플로 실행 폴링",
        "대기, 실행, 성공, 실패 상태 매핑",
        "수동 JSON/문자열 추출을 갖춘 네 LED 출력",
        "펌웨어의 저장소별 설정",
      ],
    },
    architecture: {
      en: [
        "Network layer: Wi-Fi and HTTPS to GitHub API",
        "Parse layer: manual extraction of workflow state",
        "Output layer: four LEDs representing CI status",
      ],
      ko: [
        "네트워크 계층: Wi-Fi 및 GitHub API HTTPS",
        "파싱 계층: 워크플로 상태 수동 추출",
        "출력 계층: CI 상태를 나타내는 네 LED",
      ],
    },
    decisions: {
      en: [
        "Traffic-semaphore metaphor makes status glanceable",
        "Polling chosen over webhooks for embedded simplicity",
        "Fixed repository configuration suits a single-purpose desk device",
      ],
      ko: [
        "신호등 은유로 상태를 한눈에 파악",
        "임베디드 단순성을 위해 웹훅 대신 폴링 선택",
        "고정 저장소 설정이 단일 목적 책상 디바이스에 적합",
      ],
    },
    limitations: {
      en: [
        "Hardcoded organization/repository configuration",
        "Aggressive polling interval for reusable production use",
        "Manual response parsing is brittle",
        "Token storage on device needs careful handling",
      ],
      ko: [
        "하드코딩된 조직/저장소 설정",
        "재사용 가능한 프로덕션 사용에 과도한 폴링 간격",
        "수동 응답 파싱이 취약",
        "디바이스에서의 토큰 저장에 주의 필요",
      ],
    },
    technologies: ["Arduino MKR WiFi 1010", "GitHub API", "C++"],
    contributors: ["Prithwis-2023"],
    relatedSlugs: ["roastivator", "intellichair"],
    media: [
      diagram(
        "buildin",
        "BuildIn GitHub API to LED status flow",
        "BuildIn GitHub API에서 LED 상태까지의 흐름",
      ),
    ],
    labels: ["implemented"],
  },
  {
    slug: "ikumplay",
    number: 7,
    name: "IKUMPlay",
    tier: "supporting",
    status: "working-prototype",
    categories: ["ai-experiment"],
    layout: "editorial",
    repositories: [{ name: "IKUMPlay", url: repoUrl("IKUMPlay") }],
    summary: {
      en: "Terminal-based karaoke application combining song search, media preparation, source separation, synchronized lyrics, and playback.",
      ko: "노래 검색, 미디어 준비, 소스 분리, 동기화 가사, 재생을 결합한 터미널 기반 karaoke 애플리케이션.",
    },
    problem: {
      en: "Can a terminal workflow acquire songs, separate vocals, and play back synced lyrics with visual feedback?",
      ko: "터미널 워크플로가 노래를 획득하고 보컬을 분리하며 동기화 가사와 시각적 피드백으로 재생할 수 있는가?",
    },
    implementation: {
      en: [
        "Spotify search through Spotipy",
        "yt-dlp acquisition path with Docker/Spleeter fallback",
        "Synced lyrics/LRC parsing and pygame playback",
        "Rich terminal interface with spectrogram/visualizer and keyboard controls",
      ],
      ko: [
        "Spotipy를 통한 Spotify 검색",
        "Docker/Spleeter 폴백을 갖춘 yt-dlp 획득 경로",
        "동기화 가사/LRC 파싱 및 pygame 재생",
        "스펙트로그램/비주얼라이저 및 키보드 컨트롤의 Rich 터미널 인터페이스",
      ],
    },
    architecture: {
      en: [
        "Search layer: Spotify metadata lookup",
        "Acquisition layer: yt-dlp and separation fallback",
        "Playback layer: pygame with LRC synchronization",
        "UI layer: Rich terminal visualization",
      ],
      ko: [
        "검색 계층: Spotify 메타데이터 조회",
        "획득 계층: yt-dlp 및 분리 폴백",
        "재생 계층: LRC 동기화를 갖춘 pygame",
        "UI 계층: Rich 터미널 시각화",
      ],
    },
    decisions: {
      en: [
        "Terminal-first UI keeps focus on media pipeline transparency",
        "Spleeter fallback supports vocal separation when primary path fails",
        "External services chosen for search and acquisition speed during prototyping",
      ],
      ko: [
        "터미널 우선 UI로 미디어 파이프라인 투명성에 집중",
        "Spleeter 폴백이 기본 경로 실패 시 보컬 분리 지원",
        "프로토타이핑 중 검색 및 획득 속도를 위해 외부 서비스 선택",
      ],
    },
    limitations: {
      en: [
        "Hardcoded Spotify credentials were observed and must not be published",
        "Committed virtual-environment artifacts inflate repository size",
        "External media and service availability affect operation",
        "Copyright and platform terms require careful public wording",
      ],
      ko: [
        "하드코딩된 Spotify 자격 증명 관찰, 공개 금지",
        "커밋된 가상 환경 아티팩트로 저장소 크기 증가",
        "외부 미디어 및 서비스 가용성이 동작에 영향",
        "저작권 및 플랫폼 약관에 대한 신중한 공개 표현 필요",
      ],
    },
    technologies: [
      "Python",
      "Spotipy",
      "yt-dlp",
      "Spleeter",
      "pygame",
      "Rich",
    ],
    contributors: [],
    relatedSlugs: ["moodflix", "roastivator"],
    media: [
      diagram(
        "ikumplay",
        "IKUMPlay media acquisition and playback pipeline",
        "IKUMPlay 미디어 획득 및 재생 파이프라인",
      ),
    ],
    labels: ["implemented", "experimental"],
  },
  {
    slug: "roastivator",
    number: 8,
    name: "roastivator",
    tier: "supporting",
    status: "working-prototype",
    categories: ["web"],
    layout: "editorial",
    repositories: [{ name: "roastivator", url: repoUrl("roastivator") }],
    summary: {
      en: "Web application that analyzes public GitHub profile signals and generates humorous roasting output through rules.",
      ko: "공개 GitHub 프로필 신호를 분석하고 규칙 기반으로 유머러스한 roasting 출력을 생성하는 웹 애플리케이션.",
    },
    problem: {
      en: "Can commit messages, repository names, and activity patterns produce entertaining feedback from public GitHub data?",
      ko: "커밋 메시지, 저장소 이름, 활동 패턴이 공개 GitHub 데이터에서 재미있는 피드백을 생성할 수 있는가?",
    },
    implementation: {
      en: [
        "Next.js, React, and TypeScript client",
        "Step-based input, loading, and result flow",
        "Rules based on commit messages, repository names, stars, forks, followers, and emojis",
        "Error-boundary and hook structure with Jest configuration",
      ],
      ko: [
        "Next.js, React, TypeScript 클라이언트",
        "단계별 입력, 로딩, 결과 흐름",
        "커밋 메시지, 저장소 이름, 스타, 포크, 팔로워, 이모지 기반 규칙",
        "Jest 설정을 갖춘 에러 바운더리 및 훅 구조",
      ],
    },
    architecture: {
      en: [
        "Input step collects a public GitHub username",
        "Analysis step applies deterministic rules to profile signals",
        "Result step presents generated roasting output",
      ],
      ko: [
        "입력 단계에서 공개 GitHub 사용자명 수집",
        "분석 단계에서 프로필 신호에 결정적 규칙 적용",
        "결과 단계에서 생성된 roasting 출력 표시",
      ],
    },
    decisions: {
      en: [
        "Rules-based engine keeps output inspectable and reproducible",
        "Step flow separates loading state from result presentation",
        "Public GitHub API signals chosen as the only data source",
      ],
      ko: [
        "규칙 기반 엔진으로 출력 검 inspectable 및 재현 가능",
        "단계 흐름으로 로딩 상태와 결과 표시 분리",
        "공개 GitHub API 신호만 데이터 소스로 선택",
      ],
    },
    limitations: {
      en: [
        "Core output is deterministic and rule-based, not model-backed AI",
        "Random selection may make repeated results inconsistent",
        "Public GitHub API rate limits may affect usage",
      ],
      ko: [
        "핵심 출력은 모델 기반이 아닌 결정적 규칙 기반",
        "무작위 선택으로 반복 결과가 일관되지 않을 수 있음",
        "공개 GitHub API 속도 제한이 사용에 영향 가능",
      ],
    },
    technologies: ["Next.js", "React", "TypeScript", "Jest"],
    contributors: [],
    relatedSlugs: ["buildin", "ikumplay"],
    media: [
      diagram(
        "roastivator",
        "roastivator GitHub profile analysis flow",
        "roastivator GitHub 프로필 분석 흐름",
      ),
    ],
    labels: ["implemented"],
  },
  {
    slug: "dsnsim",
    number: 9,
    name: "DSNSim",
    tier: "supporting",
    status: "prototype",
    categories: ["embedded", "education"],
    layout: "editorial",
    repositories: [{ name: "DSNSim", url: repoUrl("DSNSim") }],
    summary: {
      en: "Arduino-based educational radio demonstration inspired by uplink/downlink concepts associated with deep-space communication.",
      ko: "심우주 통신 개념에서 영감을 받은 uplink/downlink 교육용 Arduino RF 시연.",
    },
    problem: {
      en: "How can a classroom-friendly RF demo illustrate uplink and downlink mode switching without claiming realistic DSN protocol behavior?",
      ko: "현실적인 DSN 프로토콜 동작을 주장하지 않고 교실 친화적 RF 시연이 uplink/downlink 모드 전환을 어떻게 설명할 수 있는가?",
    },
    implementation: {
      en: [
        "Serial command mode switching between uplink transmit and downlink receive",
        "Basic fixed-message transmission with LED feedback",
        "Servo sweep representing a dish and 433 MHz RF components",
      ],
      ko: [
        "uplink 송신과 downlink 수신 간 Serial 명령 모드 전환",
        "LED 피드백을 갖춘 기본 고정 메시지 전송",
        "안테나 dish를 나타내는 서보 스weep 및 433 MHz RF 구성요소",
      ],
    },
    architecture: {
      en: [
        "Command layer: serial mode selection",
        "RF layer: transmit/receive with fixed payload",
        "Feedback layer: LEDs and servo dish motion",
      ],
      ko: [
        "명령 계층: serial 모드 선택",
        "RF 계층: 고정 페이로드 송수신",
        "피드백 계층: LED 및 서보 dish 동작",
      ],
    },
    decisions: {
      en: [
        "Fixed messages keep the demo understandable in a classroom setting",
        "Servo dish motion provides visual anchoring for link direction",
        "433 MHz components chosen for accessible hardware experimentation",
      ],
      ko: [
        "고정 메시지로 교실 환경에서 시연 이해 용이",
        "서보 dish 동작으로 링크 방향에 시각적 고정",
        "접근 가능한 하드웨어 실험을 위해 433 MHz 구성요소 선택",
      ],
    },
    limitations: {
      en: [
        "No realistic DSN protocol, telemetry, error correction, or link-budget simulation",
        "Fixed payload behavior only",
        "Educational demonstration, not aerospace-grade communications",
      ],
      ko: [
        "현실적인 DSN 프로토콜, 원격 측정, 오류 수정, 링크 예산 시뮬레이션 없음",
        "고정 페이로드 동작만",
        "항공우주급 통신이 아닌 교육용 시연",
      ],
    },
    technologies: ["Arduino", "433 MHz RF", "Servo"],
    contributors: [],
    relatedSlugs: ["buildin", "learning-structures"],
    media: [
      diagram(
        "dsnsim",
        "DSNSim educational RF demonstration modes",
        "DSNSim 교육용 RF 시연 모드",
      ),
    ],
    labels: ["implemented", "experimental"],
  },
  {
    slug: "aura",
    number: 10,
    name: "aura",
    tier: "incubator",
    status: "concept",
    categories: ["embedded"],
    layout: "editorial",
    repositories: [{ name: "aura", url: repoUrl("aura") }],
    summary: {
      en: "Physical-first automation concept using NFC and weight-sensing Pucks to trigger contextual software or smart-home actions.",
      ko: "NFC 및 무게 감지 Puck으로 상황별 소프트웨어 또는 스마트홈 동작을 트리거하는 물리 우선 자동화 개념.",
    },
    problem: {
      en: "Can physical objects with NFC and weight state become reliable triggers for contextual digital actions?",
      ko: "NFC와 무게 상태를 갖춘 물리적 객체가 상황별 디지털 동작의 신뢰할 수 있는 트리거가 될 수 있는가?",
    },
    implementation: {
      en: [
        "Proposed NFC interaction and weight-sensing object state model",
        "Conceptual integrations with Slack, Spotify, Home Assistant, and Notion",
        "Proposed ESP32-S3 and PN532-class hardware with PWA direction",
      ],
      ko: [
        "제안된 NFC 상호작용 및 무게 감지 객체 상태 모델",
        "Slack, Spotify, Home Assistant, Notion과의 개념적 통합",
        "PWA 방향의 ESP32-S3 및 PN532급 하드웨어 제안",
      ],
    },
    architecture: {
      en: [
        "Physical Puck detects presence and weight state",
        "Gateway translates object context into proposed service actions",
        "PWA proposed for configuration and status",
      ],
      ko: [
        "물리 Puck이 존재 및 무게 상태 감지",
        "게이트웨이가 객체 컨텍스트를 제안된 서비스 동작으로 변환",
        "설정 및 상태를 위한 PWA 제안",
      ],
    },
    decisions: {
      en: [
        "Weight plus NFC combines object identity with placement context",
        "Physical-first interaction chosen over screen-first configuration",
        "Multiple integration targets explored at concept stage",
      ],
      ko: [
        "무게와 NFC가 객체 identity와 배치 컨텍스트 결합",
        "화면 우선 설정 대신 물리 우선 상호작용 선택",
        "개념 단계에서 다중 통합 대상 탐색",
      ],
    },
    limitations: {
      en: [
        "Implementation evidence is limited; most behavior appears conceptual",
        "Proposed integrations are not verified as working",
        "Feasibility discussion may exceed built functionality",
      ],
      ko: [
        "구현 근거가 제한적; 대부분의 동작이 개념적",
        "제안된 통합이 동작하는 것으로 검증되지 않음",
        "타당성 논의가 구현된 기능을 초과할 수 있음",
      ],
    },
    technologies: ["ESP32-S3", "NFC", "PWA (proposed)"],
    contributors: [],
    relatedSlugs: ["tolqyn", "intellichair"],
    media: [
      diagram(
        "aura",
        "aura NFC and weight-sensing concept diagram",
        "aura NFC 및 무게 감지 개념 다이어그램",
      ),
    ],
    labels: ["proposed"],
  },
  {
    slug: "learning-structures",
    number: 11,
    name: "Learning Structures",
    tier: "learning",
    status: "learning",
    categories: ["education"],
    layout: "editorial",
    repositories: [
      { name: "Queues", url: repoUrl("Queues") },
      { name: "Trees", url: repoUrl("Trees") },
      { name: "Linked-Lists", url: repoUrl("Linked-Lists") },
    ],
    summary: {
      en: "Grouped learning archive for data-structure practice repositories: Queues, Trees, and Linked-Lists.",
      ko: "Queues, Trees, Linked-Lists 데이터 구조 연습 저장소를 묶은 학습 아카이브.",
    },
    problem: {
      en: "How are foundational data-structure exercises preserved as learning material rather than flagship product stories?",
      ko: "기초 데이터 구조 연습을 플래그십 제품 스토리가 아닌 학습 자료로 어떻게 보존하는가?",
    },
    implementation: {
      en: [
        "Small practice repositories with minimal README documentation",
        "Focused exercises rather than end-to-end systems",
        "Grouped presentation under a single learning archive page",
      ],
      ko: [
        "최소 README 문서를 갖춘 소규모 연습 저장소",
        "end-to-end 시스템이 아닌 집중 연습",
        "단일 학습 아카이브 페이지 아래 그룹 표시",
      ],
    },
    architecture: {
      en: [
        "Separate repositories per structure topic",
        "Archive page explains learning intent and repository links",
        "Not promoted as independent flagship projects",
      ],
      ko: [
        "구조 주제별 별도 저장소",
        "아카이브 페이지가 학습 의도와 저장소 링크 설명",
        "독립 플래그십 프로젝트로 홍보하지 않음",
      ],
    },
    decisions: {
      en: [
        "Grouped archive avoids inflating coursework into product case studies",
        "Repository links remain accessible for direct inspection",
        "Learning status label sets appropriate expectations",
      ],
      ko: [
        "그룹 아카이브로 coursework를 제품 사례 연구로 부풀리지 않음",
        "저장소 링크는 직접 검 inspect 위해 접근 가능 유지",
        "학습 상태 라벨로 적절한 기대치 설정",
      ],
    },
    limitations: {
      en: [
        "Minimal public narrative in individual repositories",
        "Not intended as production software references",
        "Contributor and date details remain incomplete",
      ],
      ko: [
        "개별 저장소의 공개 내러티브가 최소",
        "프로덕션 소프트웨어 참조용이 아님",
        "기여자 및 날짜 세부 정보 불완전",
      ],
    },
    technologies: ["Data structures", "Practice exercises"],
    contributors: [],
    relatedSlugs: ["dsnsim"],
    media: [
      diagram(
        "learning-structures",
        "Learning archive data-structure practice overview",
        "학습 아카이브 데이터 구조 연습 개요",
      ),
    ],
    labels: ["implemented"],
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];

export const flagshipSlugs = [
  "grip-5",
  "tolqyn",
  "moodflix",
  "naeonair-wisdrone",
] as const satisfies readonly ProjectSlug[];
