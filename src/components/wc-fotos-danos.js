import fotomaton from "../utiles/fotomaton.js";

const ICON_GALLERY = `
  <svg viewBox="0 -960 960 960" aria-hidden="true" focusable="false">
    <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z"/>
  </svg>
`;

const ICON_UPLOAD = `
  <svg viewBox="0 -960 960 960" aria-hidden="true" focusable="false">
    <path d="M450-313v-371L330-564l-43-43 193-193 193 193-43 43-120-120v371h-60ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z"/>
  </svg>
`;

const ICON_CAMERA = `
  <svg viewBox="0 -960 960 960" aria-hidden="true" focusable="false">
    <path d="M479.5-267q72.5 0 121.5-49t49-121.5q0-72.5-49-121T479.5-607q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5ZM140-120q-24 0-42-18t-18-42v-513q0-23 18-41.5t42-18.5h147l73-87h240l73 87h147q23 0 41.5 18.5T880-693v513q0 24-18.5 42T820-120H140Zm0-60h680v-513H645l-73-87H388l-73 87H140v513Zm340-257Z"/>
  </svg>
`;

const ICON_DELETE = `
  <svg viewBox="0 -960 960 960" aria-hidden="true" focusable="false">
    <path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/>
  </svg>
`;

const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      --fd-bg: linear-gradient(180deg, #f9fbff 0%, #eef4ff 100%);
      --fd-panel: #ffffff;
      --fd-border: #cfd9ea;
      --fd-border-strong: #9fb3d3;
      --fd-text: #17324d;
      --fd-text-soft: #5f7289;
      --fd-primary: #1459c7;
      --fd-primary-soft: #e8f0ff;
      --fd-danger: #c13b3b;
      --fd-drop: rgba(20, 89, 199, 0.08);
      display: block;
      color: var(--fd-text);
      font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    button,
    select,
    input {
      font: inherit;
    }

    .shell {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
      gap: 20px;
      align-items: start;
    }

    .panel {
      background: var(--fd-panel);
      border: 1px solid var(--fd-border);
      border-radius: 24px;
      box-shadow: 0 18px 40px rgba(18, 55, 105, 0.08);
      overflow: hidden;
    }

    .canvas-panel {
      display: flex;
      flex-direction: column;
      background: var(--fd-bg);
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 18px 20px;
      border-bottom: 1px solid rgba(159, 179, 211, 0.35);
      background: rgba(255, 255, 255, 0.68);
      backdrop-filter: blur(14px);
    }

    .toolbar-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .title {
      font-size: 1.1rem;
      font-weight: 700;
    }

    .subtitle {
      color: var(--fd-text-soft);
      font-size: 0.92rem;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid var(--fd-border);
      background: #fff;
      color: var(--fd-text-soft);
      font-size: 0.86rem;
    }

    .canvas-wrap {
      position: relative;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .canvas-stage {
      position: relative;
      width: min(100%, 920px);
      aspect-ratio: 5 / 3;
      max-height: min(68vh, 620px);
    }

    canvas {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 20px;
      border: 1px solid rgba(159, 179, 211, 0.5);
      background: linear-gradient(180deg, #fefefe 0%, #edf3fb 100%);
      touch-action: none;
      cursor: crosshair;
    }

    .help {
      position: absolute;
      left: 16px;
      bottom: 16px;
      max-width: 300px;
      padding: 12px 14px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.88);
      border: 1px solid rgba(159, 179, 211, 0.45);
      color: var(--fd-text-soft);
      font-size: 0.9rem;
      line-height: 1.4;
      backdrop-filter: blur(12px);
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      width: min(100%, 360px);
      justify-self: end;
      height: min(74vh, 700px);
      min-height: 500px;
    }

    .sidebar-header {
      padding: 16px 18px;
      border-bottom: 1px solid rgba(159, 179, 211, 0.35);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .sidebar-body {
      flex: 1;
      min-height: 0;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: auto;
    }

    .damage-card,
    .general-card,
    .empty-card {
      border: 1px solid var(--fd-border);
      border-radius: 16px;
      padding: 14px;
      background: #fff;
      transition: border-color 120ms ease, background 120ms ease, box-shadow 120ms ease;
    }

    .damage-card.dragover,
    .general-card.dragover {
      border: 2px dashed var(--fd-primary);
      background: var(--fd-drop);
      box-shadow: inset 0 0 0 1px rgba(20, 89, 199, 0.12);
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .row.wrap {
      flex-wrap: wrap;
    }

    .damage-title {
      font-weight: 700;
      font-size: 0.96rem;
    }

    .muted {
      color: var(--fd-text-soft);
      font-size: 0.84rem;
      line-height: 1.35;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: 1px solid var(--fd-border);
      background: #fff;
      color: var(--fd-text);
      border-radius: 12px;
      padding: 8px 12px;
      font-size: 0.88rem;
      line-height: 1.2;
      cursor: pointer;
      transition: transform 120ms ease, border-color 120ms ease, background 120ms ease;
    }

    .btn:hover {
      transform: translateY(-1px);
      border-color: var(--fd-border-strong);
    }

    .btn.primary {
      background: var(--fd-primary);
      border-color: var(--fd-primary);
      color: #fff;
    }

    .btn.icon-only {
      min-width: 40px;
      width: 40px;
      height: 40px;
      padding: 0;
    }

    .btn svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
      display: block;
    }

    .btn.soft {
      background: var(--fd-primary-soft);
      color: var(--fd-primary);
      border-color: #c7d8ff;
    }

    .btn.danger {
      color: var(--fd-danger);
      border-color: #efc3c3;
      background: #fff7f7;
    }

    .inline-file-input {
      display: none;
    }

    .gallery {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      margin-top: 12px;
    }

    .gallery-item {
      border: 1px solid var(--fd-border);
      border-radius: 16px;
      overflow: hidden;
      background: #fff;
    }

    .gallery-item img {
      width: 100%;
      height: 90px;
      display: block;
      object-fit: cover;
      cursor: pointer;
    }

    .gallery-item button {
      width: 100%;
      border: 0;
      border-top: 1px solid var(--fd-border);
      background: #fff;
      color: var(--fd-danger);
      padding: 10px;
      cursor: pointer;
    }

    .modal[hidden] {
      display: none;
    }

    .modal {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
    }

    .modal-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(13, 26, 44, 0.55);
      backdrop-filter: blur(8px);
    }

    .modal-card {
      position: relative;
      width: min(920px, calc(100vw - 32px));
      max-height: calc(100vh - 32px);
      overflow: auto;
      border-radius: 24px;
      background: #fff;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 30px 80px rgba(8, 23, 43, 0.4);
      padding: 22px;
    }

    .modal-card.compact {
      width: min(680px, calc(100vw - 32px));
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
    }

    .preview {
      display: grid;
      gap: 14px;
    }

    .preview-main {
      width: 100%;
      height: min(56vh, 420px);
      object-fit: contain;
      border-radius: 20px;
      background: #eef3fa;
      border: 1px solid var(--fd-border);
    }

    .preview-strip {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
    }

    .preview-thumb {
      border: 2px solid transparent;
      border-radius: 14px;
      padding: 0;
      background: transparent;
      cursor: pointer;
      overflow: hidden;
    }

    .preview-thumb.active {
      border-color: var(--fd-primary);
    }

    .preview-thumb img {
      width: 100%;
      height: 72px;
      object-fit: cover;
      display: block;
    }

    .camera {
      display: grid;
      gap: 14px;
    }

    video {
      width: 100%;
      max-height: 56vh;
      border-radius: 20px;
      background: #0f1724;
      object-fit: cover;
    }

    .hidden-canvas {
      display: none;
    }

    @media (max-width: 920px) {
      .shell {
        grid-template-columns: 1fr;
      }

      .canvas-panel,
      .sidebar {
        min-height: unset;
        height: auto;
      }

      .canvas-stage {
        width: 100%;
        max-height: none;
        min-height: 360px;
      }

      .help {
        max-width: calc(100% - 24px);
      }
    }
  </style>

  <section class="shell">
    <article class="panel canvas-panel">
      <div class="toolbar">
        <div>
          <div class="title">Fotos de danos</div>
          <div class="subtitle">Marca la zona del vehiculo y adjunta evidencias.</div>
        </div>
        <div class="toolbar-group">
          <label class="pill">
            Vehiculo
            <select id="vehicleSelect">
              <option value="coche">Coche</option>
              <option value="moto">Moto</option>
              <option value="camion">Camion</option>
            </select>
          </label>
          <span class="pill" id="modePill"></span>
        </div>
      </div>
      <div class="canvas-wrap">
        <div class="canvas-stage">
          <canvas id="damageCanvas"></canvas>
          <div class="help" id="helpText"></div>
        </div>
      </div>
    </article>

    <aside class="panel sidebar">
      <div class="sidebar-header">
        <div class="title">Registro</div>
        <div class="subtitle">Estado general y danos detectados.</div>
      </div>
      <div class="sidebar-body" id="sidebarBody"></div>
    </aside>
  </section>

  <div class="modal" id="galleryModal" hidden>
    <div class="modal-backdrop" data-close-gallery></div>
    <div class="modal-card">
      <div class="modal-header">
        <div>
          <div class="title" id="galleryTitle"></div>
          <div class="subtitle" id="galleryCount"></div>
        </div>
        <div class="row wrap">
          <button class="btn danger icon-only" id="deleteImageButton" type="button" aria-label="Eliminar foto" title="Eliminar foto">
            ${ICON_DELETE}
          </button>
          <button class="btn" data-close-gallery>Cerrar</button>
        </div>
      </div>
      <div class="preview">
        <img class="preview-main" id="galleryMain" alt="Vista previa" />
        <div class="preview-strip" id="galleryStrip"></div>
      </div>
    </div>
  </div>

  <div class="modal" id="cameraModal" hidden>
    <div class="modal-backdrop" data-close-camera></div>
    <div class="modal-card compact">
      <div class="modal-header">
        <div>
          <div class="title">Camara</div>
          <div class="subtitle">Haz una foto y guardala en el item seleccionado.</div>
        </div>
        <button class="btn" data-close-camera>Cerrar</button>
      </div>
      <div class="camera">
        <video id="cameraVideo" autoplay playsinline muted></video>
        <div class="row wrap">
          <span class="muted" id="cameraStatus"></span>
          <button class="btn primary" id="takePhotoButton">Hacer foto</button>
        </div>
      </div>
      <canvas class="hidden-canvas" id="captureCanvas"></canvas>
    </div>
  </div>
`;

const VEHICLE_LABELS = {
  coche: "Coche",
  moto: "Moto",
  camion: "Camion",
};

const MARKER_RADIUS = 14;

const buildVehicleSvg = (type) => {
  const shapes = {
    coche: `
      <rect x="130" y="170" width="340" height="90" rx="26" fill="#cfe0ff"/>
      <path d="M180 170 L230 120 H370 L420 170 Z" fill="#8fb3ff"/>
      <rect x="235" y="128" width="60" height="38" rx="10" fill="#f7fbff"/>
      <rect x="305" y="128" width="60" height="38" rx="10" fill="#f7fbff"/>
      <circle cx="210" cy="270" r="34" fill="#24384f"/>
      <circle cx="390" cy="270" r="34" fill="#24384f"/>
      <circle cx="210" cy="270" r="16" fill="#c2cfdd"/>
      <circle cx="390" cy="270" r="16" fill="#c2cfdd"/>
    `,
    moto: `
      <circle cx="195" cy="255" r="38" fill="#24384f"/>
      <circle cx="405" cy="255" r="38" fill="#24384f"/>
      <circle cx="195" cy="255" r="18" fill="#c2cfdd"/>
      <circle cx="405" cy="255" r="18" fill="#c2cfdd"/>
      <path d="M225 240 L300 180 L360 180 L395 235" stroke="#8fb3ff" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M300 180 L265 145" stroke="#8fb3ff" stroke-width="14" stroke-linecap="round"/>
      <path d="M360 180 L390 145" stroke="#8fb3ff" stroke-width="14" stroke-linecap="round"/>
      <path d="M265 145 L325 145" stroke="#cfe0ff" stroke-width="16" stroke-linecap="round"/>
      <path d="M290 200 L240 255" stroke="#cfe0ff" stroke-width="14" stroke-linecap="round"/>
    `,
    camion: `
      <rect x="90" y="165" width="240" height="100" rx="22" fill="#8fb3ff"/>
      <rect x="320" y="185" width="160" height="80" rx="18" fill="#cfe0ff"/>
      <rect x="350" y="145" width="80" height="52" rx="12" fill="#d9e6ff"/>
      <rect x="360" y="155" width="50" height="28" rx="8" fill="#f7fbff"/>
      <circle cx="170" cy="275" r="34" fill="#24384f"/>
      <circle cx="335" cy="275" r="34" fill="#24384f"/>
      <circle cx="445" cy="275" r="34" fill="#24384f"/>
      <circle cx="170" cy="275" r="16" fill="#c2cfdd"/>
      <circle cx="335" cy="275" r="16" fill="#c2cfdd"/>
      <circle cx="445" cy="275" r="16" fill="#c2cfdd"/>
    `,
  };

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fdfefe"/>
          <stop offset="100%" stop-color="#e7eef8"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="32" fill="url(#bg)"/>
      <path d="M50 300 H550" stroke="#d8e3f1" stroke-width="8" stroke-linecap="round"/>
      ${shapes[type] || shapes.coche}
    </svg>
  `)}`;
};

class FotosDanos extends HTMLElement {
  static get observedAttributes() {
    return ["mode"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.state = this.createEmptyState();
    this.pointerModeMedia = window.matchMedia("(pointer: coarse)");
    this.currentImageIndex = 0;
    this.galleryContextKey = "general";
    this.cameraTargetKey = "general";
    this.dragTargetKey = null;
    this.backgroundImage = new Image();
    this.backgroundImage.onload = () => this.scheduleResizeCanvas();
    this.canvas = this.shadowRoot.querySelector("#damageCanvas");
    this.canvasStage = this.shadowRoot.querySelector(".canvas-stage");
    this.ctx = this.canvas.getContext("2d");
    this.sidebarBody = this.shadowRoot.querySelector("#sidebarBody");
    this.vehicleSelect = this.shadowRoot.querySelector("#vehicleSelect");
    this.modePill = this.shadowRoot.querySelector("#modePill");
    this.helpText = this.shadowRoot.querySelector("#helpText");
    this.galleryModal = this.shadowRoot.querySelector("#galleryModal");
    this.galleryTitle = this.shadowRoot.querySelector("#galleryTitle");
    this.galleryCount = this.shadowRoot.querySelector("#galleryCount");
    this.galleryMain = this.shadowRoot.querySelector("#galleryMain");
    this.galleryStrip = this.shadowRoot.querySelector("#galleryStrip");
    this.deleteImageButton = this.shadowRoot.querySelector("#deleteImageButton");
    this.cameraModal = this.shadowRoot.querySelector("#cameraModal");
    this.cameraVideo = this.shadowRoot.querySelector("#cameraVideo");
    this.captureCanvas = this.shadowRoot.querySelector("#captureCanvas");
    this.cameraStatus = this.shadowRoot.querySelector("#cameraStatus");
    this.takePhotoButton = this.shadowRoot.querySelector("#takePhotoButton");

    this.onPointerModeChange = () => this.render();
    this.onResize = () => this.resizeCanvas();
    this.onCanvasStageResize = () => this.scheduleResizeCanvas();
    this.onCanvasClick = (event) => this.handleCanvasInteraction(event);
    this.onCanvasTouchEnd = (event) => this.handleCanvasInteraction(event.changedTouches[0], true);
    this.onVehicleChange = (event) => {
      this.state.vehicleType = event.target.value;
      this.loadVehicle();
      this.emitChange();
    };
    this.onCloseGallery = () => this.closeGallery();
    this.onCloseCamera = () => this.closeCamera();
    this.onTakePhoto = () => this.capturePhoto();
    this.onDeleteImage = () => this.deleteCurrentImage();
    this.resizeObserver = new ResizeObserver(this.onCanvasStageResize);
    this.resizeFrame = null;
  }

  connectedCallback() {
    this.canvas.addEventListener("click", this.onCanvasClick);
    this.canvas.addEventListener("touchend", this.onCanvasTouchEnd);
    this.vehicleSelect.addEventListener("change", this.onVehicleChange);
    this.takePhotoButton.addEventListener("click", this.onTakePhoto);
    this.deleteImageButton.addEventListener("click", this.onDeleteImage);

    this.shadowRoot.querySelectorAll("[data-close-gallery]").forEach((button) => {
      button.addEventListener("click", this.onCloseGallery);
    });
    this.shadowRoot.querySelectorAll("[data-close-camera]").forEach((button) => {
      button.addEventListener("click", this.onCloseCamera);
    });

    this.pointerModeMedia.addEventListener("change", this.onPointerModeChange);
    window.addEventListener("resize", this.onResize);
    this.resizeObserver.observe(this.canvasStage);

    if (this.hasAttribute("value")) {
      try {
        this.value = JSON.parse(this.getAttribute("value"));
      } catch (_error) {
        this.render();
      }
    } else {
      this.render();
    }
  }

  disconnectedCallback() {
    this.canvas.removeEventListener("click", this.onCanvasClick);
    this.canvas.removeEventListener("touchend", this.onCanvasTouchEnd);
    this.vehicleSelect.removeEventListener("change", this.onVehicleChange);
    this.takePhotoButton.removeEventListener("click", this.onTakePhoto);
    this.pointerModeMedia.removeEventListener("change", this.onPointerModeChange);
    window.removeEventListener("resize", this.onResize);
    this.resizeObserver.disconnect();
    if (this.resizeFrame) {
      cancelAnimationFrame(this.resizeFrame);
      this.resizeFrame = null;
    }
    this.deleteImageButton.removeEventListener("click", this.onDeleteImage);
    this.stopCamera();
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "mode" && newValue !== _oldValue) {
      this.render();
    }
  }

  get mode() {
    const attrMode = this.getAttribute("mode") || "auto";
    if (attrMode === "tablet" || attrMode === "desktop") {
      return attrMode;
    }
    return this.pointerModeMedia.matches ? "tablet" : "desktop";
  }

  get value() {
    return this.serializeState();
  }

  set value(nextValue) {
    const incoming = nextValue || {};
    this.state = {
      vehicleType: incoming.vehicleType || "coche",
      general: {
        images: [...(incoming.general?.images || [])],
      },
      damages: (incoming.damages || []).map((damage, index) => ({
        id: damage.id || this.createDamageId(index),
        x: Number(damage.x),
        y: Number(damage.y),
        images: [...(damage.images || [])],
      })),
    };
    this.galleryContextKey = "general";
    this.cameraTargetKey = "general";
    this.currentImageIndex = 0;
    this.loadVehicle();
    this.render();
  }

  createEmptyState() {
    return {
      vehicleType: "coche",
      general: { images: [] },
      damages: [],
    };
  }

  createDamageId(index = this.state.damages.length) {
    return `damage-${Date.now()}-${index}`;
  }

  serializeState() {
    return {
      vehicleType: this.state.vehicleType,
      general: {
        images: [...this.state.general.images],
      },
      damages: this.state.damages.map((damage) => ({
        id: damage.id,
        x: damage.x,
        y: damage.y,
        images: [...damage.images],
      })),
    };
  }

  loadVehicle() {
    this.backgroundImage.src = buildVehicleSvg(this.state.vehicleType);
  }

  render() {
    this.vehicleSelect.value = this.state.vehicleType;
    this.modePill.textContent = this.mode === "tablet" ? "Modo tablet" : "Modo PC";
    this.helpText.textContent =
      this.mode === "tablet"
        ? "Toca sobre el vehiculo para crear un dano y usa la camara para hacer las fotos."
        : "Haz click sobre el vehiculo para crear un dano y arrastra imagenes a cada bloque para adjuntarlas.";

    this.renderSidebar();
    this.scheduleResizeCanvas();
    if (!this.backgroundImage.src) {
      this.loadVehicle();
    } else {
      this.scheduleResizeCanvas();
    }
  }

  scheduleResizeCanvas() {
    if (this.resizeFrame) {
      cancelAnimationFrame(this.resizeFrame);
    }

    this.resizeFrame = requestAnimationFrame(() => {
      this.resizeFrame = null;
      this.resizeCanvas();
    });
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const pixelRatio = window.devicePixelRatio || 1;
    const width = Math.max(320, Math.round(rect.width * pixelRatio));
    const height = Math.max(260, Math.round(rect.height * pixelRatio));

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    this.paintCanvas();
  }

  paintCanvas() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    if (!width || !height) {
      return;
    }

    this.ctx.clearRect(0, 0, width, height);

    if (this.backgroundImage.complete && this.backgroundImage.naturalWidth) {
      const scale = Math.min(width / this.backgroundImage.naturalWidth, height / this.backgroundImage.naturalHeight);
      const drawWidth = this.backgroundImage.naturalWidth * scale;
      const drawHeight = this.backgroundImage.naturalHeight * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;
      this.ctx.drawImage(this.backgroundImage, x, y, drawWidth, drawHeight);
    }

    this.state.damages.forEach((damage, index) => {
      this.ctx.beginPath();
      this.ctx.arc(damage.x, damage.y, MARKER_RADIUS, 0, Math.PI * 2);
      this.ctx.fillStyle = "#1459c7";
      this.ctx.fill();

      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "bold 14px Inter, Arial, sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(String(index + 1), damage.x, damage.y + 1);
    });
  }

  renderSidebar() {
    const damageCards = this.state.damages
      .map((damage, index) => {
        return `
          <section class="damage-card" data-drop-target="${damage.id}">
            <div class="row">
              <div>
                <div class="damage-title">Dano ${index + 1}</div>
                <div class="muted">${damage.images.length} ${damage.images.length === 1 ? "imagen" : "imagenes"}</div>
              </div>
              <div class="row wrap">
                ${damage.images.length ? `
                  <button class="btn soft icon-only" type="button" data-open-gallery="${damage.id}" aria-label="Ver fotos del dano ${index + 1}" title="Ver fotos">
                    ${ICON_GALLERY}
                  </button>
                ` : ""}
                ${this.renderUploader(damage.id)}
                <button class="btn danger icon-only" type="button" data-delete-damage="${damage.id}" aria-label="Eliminar dano ${index + 1}" title="Eliminar dano">
                  ${ICON_DELETE}
                </button>
              </div>
            </div>
          </section>
        `;
      })
      .join("");

    this.sidebarBody.innerHTML = `
      <section class="general-card" data-drop-target="general">
        <div class="row">
          <div>
            <div class="damage-title">Estado general</div>
            <div class="muted">${this.state.general.images.length} ${this.state.general.images.length === 1 ? "imagen" : "imagenes"}</div>
          </div>
          <div class="row wrap">
            ${this.state.general.images.length ? `
              <button class="btn soft icon-only" type="button" data-open-gallery="general" aria-label="Ver fotos del estado general" title="Ver fotos">
                ${ICON_GALLERY}
              </button>
            ` : ""}
            ${this.renderUploader("general")}
          </div>
        </div>
      </section>
      ${
        damageCards ||
        `<section class="empty-card">
          <div class="damage-title">Todavia no hay danos registrados</div>
          <div class="muted" style="margin-top: 8px;">Pulsa o toca sobre el vehiculo para anadir uno nuevo.</div>
        </section>`
      }
    `;

    this.bindSidebarEvents();
  }

  renderUploader(key) {
    const isTablet = this.mode === "tablet";

    return `
      <button class="btn primary icon-only" type="button" data-add-images="${key}" aria-label="${isTablet ? "Abrir camara" : "Seleccionar archivos"}" title="${isTablet ? "Abrir camara" : "Seleccionar archivos"}">
        ${isTablet ? ICON_CAMERA : ICON_UPLOAD}
      </button>
      <input class="inline-file-input" type="file" accept="image/*" multiple data-file-input="${key}" ${isTablet ? 'capture="environment"' : ""} />
    `;
  }

  bindSidebarEvents() {
    this.sidebarBody.querySelectorAll("[data-delete-damage]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        this.deleteDamage(button.dataset.deleteDamage);
      });
    });

    this.sidebarBody.querySelectorAll("[data-add-images]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const key = button.dataset.addImages;
        if (this.mode === "tablet") {
          this.openCamera(key);
        } else {
          this.sidebarBody.querySelector(`[data-file-input="${key}"]`)?.click();
        }
      });
    });

    this.sidebarBody.querySelectorAll("[data-file-input]").forEach((input) => {
      input.addEventListener("change", async (event) => {
        const key = input.dataset.fileInput;
        await this.addFilesToKey(event.target.files, key);
        event.target.value = "";
      });
    });

    this.sidebarBody.querySelectorAll("[data-open-gallery]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        this.openGallery(button.dataset.openGallery, Number(button.dataset.imageIndex || 0));
      });
    });

    this.sidebarBody.querySelectorAll("[data-drop-target]").forEach((dropzone) => {
      const key = dropzone.dataset.dropTarget;
      dropzone.addEventListener("dragenter", (event) => {
        if (this.mode !== "desktop") {
          return;
        }
        event.preventDefault();
        this.dragTargetKey = key;
        dropzone.classList.add("dragover");
      });
      dropzone.addEventListener("dragover", (event) => {
        if (this.mode !== "desktop") {
          return;
        }
        event.preventDefault();
        dropzone.classList.add("dragover");
      });
      dropzone.addEventListener("dragleave", (event) => {
        if (dropzone.contains(event.relatedTarget)) {
          return;
        }
        dropzone.classList.remove("dragover");
      });
      dropzone.addEventListener("drop", async (event) => {
        if (this.mode !== "desktop") {
          return;
        }
        event.preventDefault();
        dropzone.classList.remove("dragover");
        this.dragTargetKey = null;
        await this.addFilesToKey(event.dataTransfer.files, key);
      });
    });
  }

  handleCanvasInteraction(event, isTouch = false) {
    if (isTouch) {
      event.preventDefault?.();
    }

    const rect = this.canvas.getBoundingClientRect();
    const clientX = event.clientX;
    const clientY = event.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newDamage = {
      id: this.createDamageId(),
      x,
      y,
      images: [],
    };

    this.state.damages.push(newDamage);
    this.paintCanvas();
    this.renderSidebar();
    this.emitChange();
  }

  deleteDamage(id) {
    this.state.damages = this.state.damages.filter((damage) => damage.id !== id);
    if (this.galleryContextKey === id) {
      this.closeGallery();
    }
    this.paintCanvas();
    this.renderSidebar();
    this.emitChange();
  }

  getItemByKey(key) {
    return key === "general" ? this.state.general : this.state.damages.find((damage) => damage.id === key);
  }

  getImagesByKey(key) {
    return this.getItemByKey(key)?.images || [];
  }

  async addFilesToKey(fileList, key) {
    const files = Array.from(fileList || []).filter((file) => file.type.startsWith("image/"));
    if (!files.length) {
      return;
    }

    const images = await Promise.all(files.map((file) => this.readFileAsDataUrl(file)));
    const target = this.getItemByKey(key);
    if (!target) {
      return;
    }

    target.images.push(...images);
    this.renderSidebar();
    if (!this.galleryModal.hidden && this.galleryContextKey === key) {
      this.openGallery(key, this.currentImageIndex);
    }
    this.emitChange();
  }

  readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  openGallery(key, index = 0) {
    const images = this.getImagesByKey(key);
    if (!images.length) {
      return;
    }

    this.galleryContextKey = key;
    this.currentImageIndex = Math.min(index, images.length - 1);
    this.galleryTitle.textContent = key === "general" ? "Estado general" : this.getDamageLabel(key);
    this.galleryCount.textContent = `${images.length} ${images.length === 1 ? "imagen" : "imagenes"}`;
    this.galleryMain.src = images[this.currentImageIndex];
    this.galleryStrip.innerHTML = images
      .map(
        (src, imageIndex) => `
          <button class="preview-thumb ${imageIndex === this.currentImageIndex ? "active" : ""}" type="button" data-gallery-index="${imageIndex}">
            <img src="${src}" alt="Imagen ${imageIndex + 1}" />
          </button>
        `
      )
      .join("");

    this.galleryStrip.querySelectorAll("[data-gallery-index]").forEach((button) => {
      button.addEventListener("click", () => this.openGallery(key, Number(button.dataset.galleryIndex)));
    });

    this.galleryModal.hidden = false;
  }

  closeGallery() {
    this.galleryModal.hidden = true;
  }

  deleteCurrentImage() {
    const target = this.getItemByKey(this.galleryContextKey);
    if (!target?.images.length) {
      return;
    }

    target.images.splice(this.currentImageIndex, 1);

    if (!target.images.length) {
      this.closeGallery();
    } else {
      this.currentImageIndex = Math.min(this.currentImageIndex, target.images.length - 1);
      this.openGallery(this.galleryContextKey, this.currentImageIndex);
    }

    this.renderSidebar();
    this.emitChange();
  }

  getDamageLabel(key) {
    const index = this.state.damages.findIndex((damage) => damage.id === key);
    return index >= 0 ? `Dano ${index + 1}` : "Dano";
  }

  async openCamera(key) {
    this.cameraTargetKey = key;
    this.cameraStatus.textContent = "Solicitando acceso a la camara...";
    this.cameraModal.hidden = false;

    try {
      const initOk = await fotomaton.inicializar(this.cameraVideo);
      if (!initOk) {
        this.cameraStatus.textContent = "No se pudo abrir la camara. Puedes usar el selector de archivos del sistema.";
        return;
      }

      this.cameraStatus.textContent = `Guardando fotos en ${key === "general" ? "Estado general" : this.getDamageLabel(key)}.`;
    } catch (error) {
      this.cameraStatus.textContent = "No se pudo abrir la camara. Puedes usar el selector de archivos del sistema.";
      console.error(error);
    }
  }

  closeCamera() {
    this.cameraModal.hidden = true;
    this.stopCamera();
  }

  stopCamera() {
    fotomaton.finalizar();
    this.cameraVideo.srcObject = null;
  }

  capturePhoto() {
    const dataUrl = fotomaton.capturar(this.cameraVideo);
    if (!dataUrl) {
      return;
    }

    const target = this.getItemByKey(this.cameraTargetKey);
    if (!target) {
      return;
    }

    target.images.push(dataUrl);
    this.renderSidebar();
    this.emitChange();
  }

  emitChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: this.serializeState(),
        bubbles: true,
        composed: true,
      }),
    );
  }
}

if (!customElements.get("wc-fotos-danos")) {
  customElements.define("wc-fotos-danos", FotosDanos);
}

export { FotosDanos, VEHICLE_LABELS };
