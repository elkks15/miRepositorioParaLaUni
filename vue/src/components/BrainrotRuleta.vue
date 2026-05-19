<script setup>
import { ref, computed, onUnmounted } from "vue";

defineProps({
  /** Estilo extra alineado con modo Sahur */
  sahur: { type: Boolean, default: false },
});

const brainrots = [
  "Tung Tung Sahur",
  "Tralalero Tralala",
  "Bombardino Crocodilo",
  "Cappuccino Assassino",
  "Lirili Larila",
  "Brr Brr Patapim",
  "Chimpanzini Bananini",
  "Frigo Camelo",
  "Boneca Ambalabu",
  "Cocofanto Elefanto",
];

const SUBS = [
  "okbuddyretard",
  "196",
  "dankmemes",
  "shitposting",
  "ComedyNecrophilia",
  "whenthe",
  "memes",
];

const CHAOS_LINES = [
  "Rizz quantum tunneling activado.",
  "El servidor te envió un besito (mentira).",
  "Tu aura acaba de hacer /reset.",
  "Mainframe: 'no'.",
  "Has ganado -3 social credit.",
  "Ohio te reclama como dependiente fiscal.",
  "Deploy cancelado por fanum tax.",
  "404: skill not found.",
  "Sigma grindset → modo sueño.",
  "Tralalero hackeó tu clipboard (no).",
];

const degPer = 360 / brainrots.length;

const wheelRotation = ref(0);
const spinning = ref(false);
const resultado = ref("");
const robux = ref(0);
const memeUrl = ref("");
const memeTitle = ref("");
const memeError = ref("");
const toasts = ref([]);
const shake = ref(false);
const wheelFlip = ref(false);

let toastId = 0;

function randomRobux() {
  return Math.floor(Math.random() * 999_999) + 1_337;
}

function pushToast(msg) {
  const id = ++toastId;
  toasts.value = [...toasts.value, { id, msg }];
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 3200);
}

async function fetchMeme() {
  memeError.value = "";
  const sub = SUBS[Math.floor(Math.random() * SUBS.length)];
  try {
    const res = await fetch(`https://meme-api.com/gimme/${encodeURIComponent(sub)}`);
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    if (!data.url) throw new Error("sin url");
    memeUrl.value = data.url;
    memeTitle.value = data.title || sub;
  } catch {
    memeError.value = "API caída o CORS: meme de respaldo.";
    memeUrl.value = `https://picsum.photos/seed/${Date.now() % 10000}/420/420`;
    memeTitle.value = "Random lorem (picsum)";
  }
}

let spinTimer;

function spin() {
  if (spinning.value) return;
  spinning.value = true;
  resultado.value = "";
  memeUrl.value = "";

  const winner = Math.floor(Math.random() * brainrots.length);
  const spins = 5 + Math.floor(Math.random() * 4);
  const targetMod = (360 - winner * degPer - degPer / 2 + 720) % 360;
  const currentMod = ((wheelRotation.value % 360) + 360) % 360;
  const delta = spins * 360 + (targetMod - currentMod + 360) % 360;
  wheelRotation.value += delta;

  void fetchMeme();

  const ms = 4200;
  clearTimeout(spinTimer);
  spinTimer = window.setTimeout(() => {
    spinning.value = false;
    resultado.value = brainrots[winner];
    robux.value = randomRobux();
    pushToast(`Sos literalmente ${brainrots[winner]}. Robux sincronizados.`);
  }, ms);
}

function btnRandomRobux() {
  robux.value = randomRobux();
  pushToast(`Robux recalculados por el algoritmo: ${robux.value.toLocaleString("es-ES")}`);
}

function btnChaosToast() {
  pushToast(CHAOS_LINES[Math.floor(Math.random() * CHAOS_LINES.length)]);
}

function btnShake() {
  shake.value = true;
  window.setTimeout(() => {
    shake.value = false;
  }, 650);
}

function btnFlipWheel() {
  wheelFlip.value = true;
  window.setTimeout(() => {
    wheelFlip.value = false;
  }, 900);
}

function btnRandomBrainrotSinRuleta() {
  resultado.value = brainrots[Math.floor(Math.random() * brainrots.length)];
  robux.value = randomRobux();
  pushToast("Asignación express sin ruleta (100% legal en Ohio).");
}

function btnSoloMeme() {
  void fetchMeme();
  pushToast("Meme nuevo desde la matrix.");
}

const conicStops = computed(() => {
  const colors = [
    "#e11d48",
    "#c026d3",
    "#7c3aed",
    "#2563eb",
    "#0891b2",
    "#059669",
    "#ca8a04",
    "#ea580c",
    "#db2777",
    "#4f46e5",
  ];
  let s = "";
  for (let i = 0; i < brainrots.length; i++) {
    const a0 = i * degPer;
    const a1 = (i + 1) * degPer;
    const c = colors[i % colors.length];
    s += `${c} ${a0}deg ${a1}deg${i < brainrots.length - 1 ? "," : ""}`;
  }
  return s;
});

const wheelStyle = computed(() => ({
  transform: `rotate(${wheelRotation.value}deg) scaleX(${wheelFlip.value ? -1 : 1})`,
  background: `conic-gradient(${conicStops.value})`,
}));

onUnmounted(() => {
  clearTimeout(spinTimer);
  toasts.value = [];
});
</script>

<template>
  <section
    class="ruleta"
    :class="{ 'ruleta--sahur': sahur, 'ruleta--shake': shake }"
    aria-labelledby="ruleta-titulo"
  >
    <h2 id="ruleta-titulo" class="ruleta__titulo">¿Qué brainrot eres?</h2>
    <p class="ruleta__sub">
      Ruleta + memes aleatorios vía
      <a href="https://meme-api.com" target="_blank" rel="noopener noreferrer">meme-api.com</a>
      (Reddit). Robux 100% ficticios.
    </p>

    <div class="ruleta__layout">
      <div class="ruleta__wheel-area">
        <div class="ruleta__pointer" aria-hidden="true" />
        <div class="ruleta__wheel-wrap">
          <div
            class="ruleta__wheel"
            :class="{ 'ruleta__wheel--spinning': spinning }"
            :style="wheelStyle"
          >
            <div
              v-for="(nombre, i) in brainrots"
              :key="nombre"
              class="ruleta__label-wrap"
              :style="{ transform: `rotate(${-90 + i * degPer + degPer / 2}deg)` }"
            >
              <span
                class="ruleta__label"
                :style="{ transform: `rotate(${90 - i * degPer - degPer / 2}deg)` }"
              >
                {{ nombre }}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="ruleta__spin"
          :disabled="spinning"
          @click="spin"
        >
          {{ spinning ? "Girando…" : "Girar ruleta" }}
        </button>
      </div>

      <div class="ruleta__panel">
        <div v-if="resultado" class="ruleta__result">
          <p class="ruleta__eres">Tu brainrot:</p>
          <p class="ruleta__nombre">{{ resultado }}</p>
          <p class="ruleta__robux">
            Robux asignados al azar:
            <strong>{{ robux.toLocaleString("es-ES") }}</strong>
            <span class="ruleta__robux-note">(no reales)</span>
          </p>
        </div>
        <div v-else class="ruleta__placeholder">
          Toca <strong>Girar ruleta</strong> para destino y meme.
        </div>

        <figure v-if="memeUrl" class="ruleta__meme">
          <img :src="memeUrl" :alt="memeTitle || 'Meme'" loading="lazy" />
          <figcaption v-if="memeTitle">{{ memeTitle }}</figcaption>
          <p v-if="memeError" class="ruleta__meme-err">{{ memeError }}</p>
        </figure>
      </div>
    </div>

    <div class="ruleta__chaos" role="group" aria-label="Botones caóticos">
      <button type="button" class="ruleta__mini" @click="btnRandomRobux">Robux random</button>
      <button type="button" class="ruleta__mini" @click="btnChaosToast">Mensaje random</button>
      <button type="button" class="ruleta__mini" @click="btnShake">Temblor UI</button>
      <button type="button" class="ruleta__mini" @click="btnFlipWheel">Espejo ruleta</button>
      <button type="button" class="ruleta__mini" @click="btnRandomBrainrotSinRuleta">
        Brainrot express
      </button>
      <button type="button" class="ruleta__mini" @click="btnSoloMeme">Solo otro meme</button>
    </div>

    <div class="ruleta__toasts" aria-live="polite">
      <div v-for="t in toasts" :key="t.id" class="ruleta__toast">
        {{ t.msg }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.ruleta {
  width: 100%;
  max-width: 52rem;
  margin-top: 1.75rem;
  padding: 1.25rem 1rem 1.5rem;
  border-radius: 1rem;
  background: linear-gradient(180deg, #f8fafc, #f1f5f9);
  border: 2px solid #94a3b8;
  text-align: center;
}

.ruleta--sahur {
  border-color: #fffc00;
  background: linear-gradient(180deg, rgba(30, 0, 40, 0.92), rgba(15, 0, 25, 0.95));
  box-shadow: 0 0 24px rgba(255, 0, 170, 0.25);
}

.ruleta--shake {
  animation: ruleta-shake 0.55s ease-in-out;
}

.ruleta__titulo {
  margin: 0 0 0.35rem;
  font-size: 1.25rem;
  font-weight: 900;
  color: #0f172a;
}

.ruleta--sahur .ruleta__titulo {
  color: #fef08a;
  text-shadow: 0 0 10px #ff00aa;
}

.ruleta__sub {
  margin: 0 0 1.25rem;
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.4;
}

.ruleta--sahur .ruleta__sub {
  color: #cbd5e1;
}

.ruleta__sub a {
  color: #7c3aed;
  font-weight: 700;
}

.ruleta--sahur .ruleta__sub a {
  color: #67e8f9;
}

.ruleta__layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: flex-start;
}

.ruleta__wheel-area {
  position: relative;
  flex: 0 0 auto;
}

.ruleta__pointer {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 22px solid #0f172a;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
}

.ruleta--sahur .ruleta__pointer {
  border-top-color: #fffc00;
}

.ruleta__wheel-wrap {
  width: 260px;
  height: 260px;
  margin: 0 auto 1rem;
}

.ruleta__wheel {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 5px solid #0f172a;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);
  transition: transform 0.28s ease-out;
}

.ruleta__wheel--spinning {
  transition: transform 4.1s cubic-bezier(0.12, 0.85, 0.15, 1);
}

.ruleta--sahur .ruleta__wheel {
  border-color: #fffc00;
  box-shadow:
    0 0 20px rgba(255, 0, 170, 0.5),
    0 0 40px rgba(0, 255, 247, 0.25);
}

.ruleta__label-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  transform-origin: center center;
}

.ruleta__label {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  margin-left: -50px;
  margin-top: -118px;
  font-size: 0.58rem;
  font-weight: 800;
  line-height: 1.15;
  text-align: center;
  color: #fff;
  text-shadow: 0 1px 2px #000;
  pointer-events: none;
}

.ruleta__spin {
  cursor: pointer;
  border: none;
  border-radius: 999px;
  padding: 0.65rem 1.5rem;
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, #db2777, #7c3aed);
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.4);
}

.ruleta__spin:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.ruleta--sahur .ruleta__spin {
  background: linear-gradient(135deg, #ff00aa, #00fff7);
  color: #120024;
}

.ruleta__panel {
  flex: 1 1 240px;
  max-width: 22rem;
  text-align: left;
}

.ruleta__result {
  margin-bottom: 1rem;
}

.ruleta__eres {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: #64748b;
}

.ruleta--sahur .ruleta__eres {
  color: #a5b4fc;
}

.ruleta__nombre {
  margin: 0.25rem 0 0.5rem;
  font-size: 1.35rem;
  font-weight: 900;
  line-height: 1.2;
  color: #7c3aed;
}

.ruleta--sahur .ruleta__nombre {
  color: #fef08a;
  text-shadow: 0 0 12px #ff00aa;
}

.ruleta__robux {
  margin: 0;
  font-size: 0.9rem;
  color: #334155;
}

.ruleta--sahur .ruleta__robux {
  color: #e2e8f0;
}

.ruleta__robux-note {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: #94a3b8;
}

.ruleta__placeholder {
  font-size: 0.88rem;
  color: #64748b;
  margin-bottom: 1rem;
}

.ruleta--sahur .ruleta__placeholder {
  color: #94a3b8;
}

.ruleta__meme {
  margin: 0;
  border-radius: 0.65rem;
  overflow: hidden;
  border: 2px solid #cbd5e1;
  background: #0f172a;
}

.ruleta--sahur .ruleta__meme {
  border-color: #00fff7;
}

.ruleta__meme img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 280px;
  object-fit: contain;
}

.ruleta__meme figcaption {
  padding: 0.45rem 0.6rem;
  font-size: 0.72rem;
  line-height: 1.35;
  color: #e2e8f0;
  background: #1e293b;
}

.ruleta__meme-err {
  margin: 0;
  padding: 0.35rem 0.6rem;
  font-size: 0.7rem;
  color: #fda4af;
  background: #450a0a;
}

.ruleta__chaos {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #cbd5e1;
}

.ruleta--sahur .ruleta__chaos {
  border-top-color: #8338ec;
}

.ruleta__mini {
  cursor: pointer;
  border: 2px solid #64748b;
  border-radius: 0.45rem;
  padding: 0.4rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 700;
  background: #fff;
  color: #0f172a;
}

.ruleta__mini:hover {
  border-color: #7c3aed;
  color: #5b21b6;
}

.ruleta--sahur .ruleta__mini {
  background: rgba(30, 0, 50, 0.8);
  border-color: #fffc00;
  color: #fef08a;
}

.ruleta__toasts {
  position: fixed;
  bottom: 5.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 60;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: center;
  pointer-events: none;
  max-width: 90vw;
}

.ruleta__toast {
  padding: 0.45rem 0.85rem;
  border-radius: 0.5rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #0f172a;
  background: #fef08a;
  border: 2px solid #0f172a;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: ruleta-toast-in 0.25s ease-out;
}

@keyframes ruleta-shake {
  0%,
  100% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(-6px, 3px) rotate(-0.5deg);
  }
  40% {
    transform: translate(7px, -2px) rotate(0.5deg);
  }
  60% {
    transform: translate(-5px, -4px);
  }
  80% {
    transform: translate(4px, 2px);
  }
}

@keyframes ruleta-toast-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ruleta__wheel,
  .ruleta__wheel--spinning {
    transition: none !important;
  }

  .ruleta--shake {
    animation: none !important;
  }

  .ruleta__toast {
    animation: none !important;
  }
}
</style>
