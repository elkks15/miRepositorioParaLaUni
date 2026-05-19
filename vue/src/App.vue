<script setup>
import { ref, computed } from "vue";
import SolicitudDatos from "./components/SolicitudDatos.vue";
import BrainrotMoment from "./components/BrainrotMoment.vue";
import InternetChaosOverlay from "./components/InternetChaosOverlay.vue";
import BrainrotRuleta from "./components/BrainrotRuleta.vue";

const sahur = ref(false);
const contador = ref(0);

const titulo = computed(() =>
  sahur.value ? "TUNG TUNG TUNG SAHUR" : "Vue 3 + JavaScript + Vite"
);

const mensaje = computed(() => {
  if (sahur.value) {
    return contador.value === 0
      ? "Il contatore… brrr brrr patapim."
      : `Il numero sacro: ${contador.value}. Tralalero tralala.`;
  }
  return contador.value === 0
    ? "Usa los botones para sumar o restar."
    : `El contador está en ${contador.value}.`;
});

function toggleSahur() {
  sahur.value = !sahur.value;
}

function incrementar() {
  contador.value++;
}

function restar() {
  contador.value--;
}
</script>

<template>
  <div class="app-shell" :class="{ 'app-shell--sahur': sahur }">
    <button
      type="button"
      class="toggle-sahur"
      :aria-pressed="sahur"
      @click="toggleSahur"
    >
      {{ sahur ? "Modo normal" : "Modo Tung Tung Sahur" }}
    </button>

    <InternetChaosOverlay :activo="sahur" />

    <main class="layout">
      <p v-if="sahur" class="sahur-ribbon" aria-hidden="true">
        🥁 bom bom cus cus 🥁
      </p>
      <h1 class="titulo-principal">{{ titulo }}</h1>
      <p class="mensaje">{{ mensaje }}</p>
      <div class="acciones">
        <button type="button" class="btn btn--menos" @click="restar">−1</button>
        <button type="button" class="btn" @click="incrementar">+1</button>
      </div>
      <SolicitudDatos />
      <BrainrotMoment :sahur="sahur" />
      <BrainrotRuleta :sahur="sahur" />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  position: relative;
}

.toggle-sahur {
  position: fixed;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 50;
  cursor: pointer;
  border: 2px solid #0f172a;
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 700;
  background: #fff;
  color: #0f172a;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.12);
}

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  padding-top: 3.25rem;
  text-align: center;
}

.sahur-ribbon {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: clip;
}

.titulo-principal {
  font-size: 1.75rem;
  font-weight: 700;
  color: #42b883;
  margin: 0;
}

.mensaje {
  margin: 0;
  color: #334155;
  max-width: 28rem;
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.btn {
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  padding: 0.65rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #42b883, #35495e);
  box-shadow: 0 4px 14px rgba(66, 184, 131, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(53, 73, 94, 0.35);
}

.btn:active {
  transform: translateY(0);
}

.btn--menos {
  background: linear-gradient(135deg, #64748b, #475569);
  box-shadow: 0 4px 14px rgba(71, 85, 105, 0.35);
}

.btn--menos:hover {
  box-shadow: 0 6px 18px rgba(51, 65, 85, 0.4);
}
</style>

<style>
/* Modo visual intenso: animaciones lentas (sin estroboscopio). Desactivadas si prefers-reduced-motion. */
.app-shell--sahur {
  min-height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(
    125deg,
    #ff006e,
    #8338ec,
    #3a86ff,
    #06ffa5,
    #ffbe0b,
    #fb5607
  );
  background-size: 400% 400%;
  animation: sahure-fondo 10s ease infinite;
}

.app-shell--sahur::before {
  content: "";
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  opacity: 0.35;
  background: repeating-conic-gradient(
    from 0deg at 50% 50%,
    transparent 0deg 8deg,
    rgba(255, 255, 255, 0.06) 8deg 16deg
  );
  animation: sahure-giro 28s linear infinite;
}

.app-shell--sahur .layout {
  position: relative;
  z-index: 2;
  padding-bottom: 5.5rem;
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.4));
}

.app-shell--sahur .toggle-sahur {
  border-color: #fffc00;
  background: #120024;
  color: #fffc00;
  box-shadow:
    0 0 12px #ff00aa,
    0 0 24px #00fff7;
  animation: sahure-boton 3.5s ease-in-out infinite alternate;
}

.app-shell--sahur .sahur-ribbon {
  color: #fff;
  text-shadow:
    2px 0 #ff00cc,
    -2px 0 #00ffee,
    0 2px #ffff00;
  animation: sahure-cinta-combo 11s ease-in-out infinite;
}

.app-shell--sahur .titulo-principal {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: clamp(1.5rem, 6vw, 2.75rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(90deg, #fffc00, #ff00aa, #00fff7, #fffc00);
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation:
    sahure-arcoiris 4s linear infinite,
    sahure-titulo 3.2s ease-in-out infinite,
    sahure-glitch-clip 3.6s steps(2, end) infinite;
  filter: drop-shadow(0 0 8px rgba(255, 0, 170, 0.9));
}

.app-shell--sahur .mensaje {
  color: #0a0a0a;
  font-weight: 800;
  max-width: 32rem;
  padding: 0.5rem 0.85rem;
  border-radius: 0.5rem;
  background: rgba(255, 252, 0, 0.92);
  border: 3px solid #ff00aa;
  box-shadow: 4px 4px 0 #00fff7;
  transform-origin: center;
  animation: sahure-mensaje 2.4s ease-in-out infinite;
}

.app-shell--sahur .btn {
  border-radius: 0.35rem;
  border: 3px solid #fffc00;
  font-family: Impact, sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  animation: sahure-boton-accion 2.2s ease-in-out infinite;
}

.app-shell--sahur .btn--menos {
  background: linear-gradient(135deg, #ff00aa, #8338ec);
  box-shadow: 0 0 16px #ff00aa;
}

.app-shell--sahur .btn:not(.btn--menos) {
  background: linear-gradient(135deg, #00fff7, #06ffa5);
  color: #120024;
  box-shadow: 0 0 16px #00fff7;
}

.app-shell--sahur .panel {
  background: rgba(10, 0, 40, 0.88);
  border: 3px solid #fffc00;
  box-shadow:
    0 0 20px #ff00aa,
    0 0 40px #00fff7,
    inset 0 0 30px rgba(131, 56, 236, 0.35);
  color: #f0f0f0;
  animation: sahure-panel 4.5s ease-in-out infinite;
}

.app-shell--sahur .panel__titulo,
.app-shell--sahur .resultado__titulo {
  color: #fffc00;
  text-shadow: 0 0 8px #ff00aa;
}

.app-shell--sahur .campo label {
  color: #a7f3d0;
}

.app-shell--sahur .campo input {
  background: #1a0520;
  border-color: #00fff7;
  color: #fff;
}

.app-shell--sahur .campo input:focus {
  border-color: #fffc00;
  box-shadow: 0 0 0 3px rgba(255, 0, 170, 0.45);
}

.app-shell--sahur .resultado {
  border-top-color: #8338ec;
}

.app-shell--sahur .resultado__vacio,
.app-shell--sahur .fila dt {
  color: #c4b5fd;
}

.app-shell--sahur .fila dd {
  color: #fef08a;
}

@keyframes sahure-fondo {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes sahure-giro {
  to {
    transform: rotate(360deg);
  }
}

@keyframes sahure-boton {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(40deg);
  }
}

@keyframes sahure-cinta-combo {
  0%,
  100% {
    transform: translateX(18%) rotate(-2deg) scale(1);
  }
  25% {
    transform: translateX(-8%) rotate(2deg) scale(1.03);
  }
  50% {
    transform: translateX(-18%) rotate(-1deg) scale(1.01);
  }
  75% {
    transform: translateX(8%) rotate(1.5deg) scale(1.02);
  }
}

@keyframes sahure-arcoiris {
  to {
    background-position: 300% center;
  }
}

@keyframes sahure-titulo {
  0%,
  100% {
    transform: rotate(-2deg) scale(1);
  }
  50% {
    transform: rotate(2deg) scale(1.03);
  }
}

@keyframes sahure-glitch-clip {
  0%,
  88%,
  100% {
    clip-path: inset(0 0 0 0);
  }
  90% {
    clip-path: inset(0 8% 0 0);
  }
  92% {
    clip-path: inset(0 0 5% 4%);
  }
  94% {
    clip-path: inset(3% 0 0 6%);
  }
  96% {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes sahure-mensaje {
  0%,
  100% {
    transform: rotate(-0.8deg);
  }
  50% {
    transform: rotate(0.8deg);
  }
}

@keyframes sahure-boton-accion {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-3px) scale(1.04);
  }
}

@keyframes sahure-panel {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(25deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-shell--sahur,
  .app-shell--sahur::before,
  .app-shell--sahur .toggle-sahur,
  .app-shell--sahur .sahur-ribbon,
  .app-shell--sahur .titulo-principal,
  .app-shell--sahur .mensaje,
  .app-shell--sahur .btn,
  .app-shell--sahur .panel {
    animation: none !important;
  }

  .app-shell--sahur::before {
    transform: none;
  }
}
</style>
