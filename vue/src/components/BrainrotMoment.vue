<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  sahur: { type: Boolean, default: false },
});

const chips = [
  "Tung tung tung sahur",
  "Tralalero tralala",
  "Bombardino crocodilo",
  "Cappuccino assassino",
  "Lirili larila",
  "Brr brr patapim",
  "Chimpanzini bananini",
  "Trippi troppi",
  "Odin din din dun",
  "Frigo camelo",
  "Boneca ambalabu",
  "Cocofanto elefanto",
  "Giraffa celeste",
  "Trulimero trulicina",
  "Espresso signora",
  "Las Tralaleritas",
  "Matteo che schiaffeggia il canguro",
  "Bananita dolphinita",
  "Orcalero orcala",
  "Rhino toasterino",
  "Spioniro golubiro",
  "La vaca saturno saturnita",
  "U Din Din Dun",
  "Patapim patapum",
  "Sigma male grindset",
  "Skibidi dop dop dop yes yes",
  "Ohio final boss",
  "No cap fr fr",
  "Estamos peak",
  "Ratio + L + cope",
  "Touch grass speedrun any%",
  "Literally 1984",
  "Source: trust me bro",
  "Free Robux 100% legit",
  "Not clickbait (clickbait)",
  "Gigachad.png",
  "MonkaS",
  "Copium tank full",
  "Hopium overdose",
  "Blud thought he cooked",
  "Fanum tax",
  "Gyatt",
  "Rizzler certified",
  "Slay queen slay",
  "It's so over / we're so back",
  "404 empathy not found",
  "UwU *notices your DOM*",
  "Rickroll pero irónico",
  "Subscribe for nothing",
];

const lore = [
  "Il pipeline neuronale è broken… solo vibrazioni.",
  "Tralalero nuota nel data lake. Bombardino protegge il backend.",
  "Se non committo oggi, il cappuccino diventa assassino.",
  "Brr brr patapim è il sound effect del deploy a viernes 18:00.",
  "Chimpanzini bananini = pair programming estremo.",
  "Tung tung tung sahur = alarm de producción en loop.",
];

const loreIdx = ref(0);
let loreTimer;

onMounted(() => {
  loreTimer = setInterval(() => {
    loreIdx.value = (loreIdx.value + 1) % lore.length;
  }, 4200);
});

onUnmounted(() => {
  clearInterval(loreTimer);
});

const loreActual = computed(() => lore[loreIdx.value]);

const marqueeText = computed(() => `${chips.join(" · ")} · `);
</script>

<template>
  <section
    class="brainrot-moment"
    :class="{ 'brainrot-moment--sahur': sahur }"
    aria-labelledby="brainrot-titulo"
  >
    <h2 id="brainrot-titulo" class="brainrot-moment__titulo">
      Momento brainrot
      <span class="brainrot-moment__badge" aria-hidden="true">MAX</span>
    </h2>

    <p class="brainrot-moment__aviso">
      Animaciones lentas; si te molesta el movimiento, activa “reducir movimiento” en el sistema.
    </p>

    <div class="brainrot-marquee" aria-hidden="true">
      <div class="brainrot-marquee__track">
        <span class="brainrot-marquee__inner">{{ marqueeText }}</span>
        <span class="brainrot-marquee__inner">{{ marqueeText }}</span>
      </div>
    </div>

    <blockquote class="brainrot-lore">
      <p class="brainrot-lore__text" :key="loreIdx">{{ loreActual }}</p>
    </blockquote>

    <div class="brainrot-grid" role="list">
      <span
        v-for="(c, i) in chips"
        :key="c + i"
        class="brainrot-chip"
        role="listitem"
        :style="{ '--d': `${(i % 7) * 0.35}s` }"
      >
        {{ c }}
      </span>
    </div>

    <div class="brainrot-orbit" aria-hidden="true">
      <span class="brainrot-orbit__a">🦈</span>
      <span class="brainrot-orbit__b">🐊</span>
      <span class="brainrot-orbit__c">🍌</span>
      <span class="brainrot-orbit__d">🥁</span>
    </div>
  </section>
</template>

<style scoped>
.brainrot-moment {
  position: relative;
  width: 100%;
  max-width: 36rem;
  margin-top: 1.5rem;
  padding: 1.25rem 1rem 2rem;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(145deg, #fdf4ff, #ecfeff, #fef9c3);
  border: 2px solid #c026d3;
  box-shadow: 0 8px 28px rgba(192, 38, 211, 0.2);
}

.brainrot-moment--sahur {
  border-width: 3px;
  border-color: #fffc00;
  background: linear-gradient(
    160deg,
    rgba(255, 0, 110, 0.25),
    rgba(131, 56, 236, 0.35),
    rgba(6, 255, 165, 0.2)
  );
  box-shadow:
    0 0 24px rgba(255, 0, 170, 0.45),
    0 0 48px rgba(0, 255, 247, 0.25),
    inset 0 0 40px rgba(255, 252, 0, 0.08);
  animation: br-pulso-caja 5s ease-in-out infinite;
}

.brainrot-moment__titulo {
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #86198f;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  text-shadow: 0 1px 0 #fff;
}

.brainrot-moment--sahur .brainrot-moment__titulo {
  font-family: Impact, Haettenschweiler, sans-serif;
  color: #fff;
  text-shadow:
    2px 0 #ff00aa,
    -2px 0 #00fff7,
    0 0 12px #fffc00;
  animation: br-titulo-shake 3.5s ease-in-out infinite;
}

.brainrot-moment__badge {
  display: inline-block;
  font-size: 0.65rem;
  padding: 0.15rem 0.45rem;
  border-radius: 0.25rem;
  background: #f472b6;
  color: #fff;
  vertical-align: middle;
}

.brainrot-moment--sahur .brainrot-moment__badge {
  background: #ff00aa;
  animation: br-badge-spin 6s linear infinite;
}

.brainrot-moment__aviso {
  margin: 0 0 1rem;
  font-size: 0.72rem;
  line-height: 1.35;
  color: #64748b;
  text-align: center;
}

.brainrot-moment--sahur .brainrot-moment__aviso {
  color: #e9d5ff;
  text-shadow: 0 0 6px #000;
}

.brainrot-marquee {
  margin: 0 -1rem 1rem;
  padding: 0.45rem 0;
  background: linear-gradient(90deg, #a855f7, #ec4899, #06b6d4, #a855f7);
  background-size: 200% 100%;
  background-position: 0% 0%;
  animation: br-marquee-bg 8s linear infinite;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.brainrot-marquee__track {
  display: flex;
  width: max-content;
  animation: br-marquee-scroll 45s linear infinite;
}

.brainrot-marquee__inner {
  flex-shrink: 0;
  padding: 0 1.5rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 1px 1px 0 #000;
  white-space: nowrap;
}

.brainrot-moment--sahur .brainrot-marquee__track {
  animation-duration: 18s;
}

.brainrot-lore {
  margin: 0 0 1rem;
  padding: 0.65rem 0.85rem;
  border-left: 4px solid #d946ef;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 0 0.5rem 0.5rem 0;
  text-align: left;
}

.brainrot-moment--sahur .brainrot-lore {
  border-left-color: #fffc00;
  background: rgba(10, 0, 30, 0.55);
  box-shadow: 0 0 16px rgba(255, 0, 170, 0.35);
  animation: br-lore-hue 7s ease-in-out infinite;
}

.brainrot-lore__text {
  margin: 0;
  font-size: 0.88rem;
  font-weight: 700;
  font-style: italic;
  color: #4c1d95;
  line-height: 1.45;
}

.brainrot-moment--sahur .brainrot-lore__text {
  color: #fef08a;
  text-shadow: 0 0 8px #ff00aa;
}

.brainrot-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.brainrot-chip {
  display: inline-block;
  padding: 0.35rem 0.55rem;
  font-size: 0.72rem;
  font-weight: 700;
  border-radius: 999px;
  background: #fff;
  border: 2px solid #a855f7;
  color: #581c87;
  animation: br-chip-float 4.5s ease-in-out infinite;
  animation-delay: var(--d, 0s);
}

.brainrot-moment--sahur .brainrot-chip {
  border-color: #00fff7;
  color: #0f172a;
  background: linear-gradient(135deg, #fef08a, #fda4af);
  box-shadow: 0 0 10px rgba(0, 255, 247, 0.5);
  animation: br-chip-float 3.2s ease-in-out infinite, br-chip-hue 9s linear infinite;
  animation-delay: var(--d, 0s), calc(var(--d, 0s) * 0.5);
}

.brainrot-orbit {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
}

.brainrot-moment--sahur .brainrot-orbit {
  opacity: 0.55;
}

.brainrot-orbit__a,
.brainrot-orbit__b,
.brainrot-orbit__c,
.brainrot-orbit__d {
  position: absolute;
  font-size: 1.75rem;
  filter: drop-shadow(0 0 4px #fff);
}

.brainrot-orbit__a {
  top: 12%;
  left: 8%;
  animation: br-orbit-a 14s ease-in-out infinite;
}

.brainrot-orbit__b {
  top: 22%;
  right: 6%;
  animation: br-orbit-b 16s ease-in-out infinite;
}

.brainrot-orbit__c {
  bottom: 18%;
  left: 12%;
  animation: br-orbit-c 18s ease-in-out infinite;
}

.brainrot-orbit__d {
  bottom: 10%;
  right: 15%;
  animation: br-orbit-d 12s ease-in-out infinite;
}

.brainrot-moment--sahur .brainrot-orbit__a {
  animation-duration: 9s;
}

.brainrot-moment--sahur .brainrot-orbit__b {
  animation-duration: 10s;
}

.brainrot-moment--sahur .brainrot-orbit__c {
  animation-duration: 11s;
}

.brainrot-moment--sahur .brainrot-orbit__d {
  animation-duration: 8s;
}

@keyframes br-marquee-scroll {
  to {
    transform: translateX(-50%);
  }
}

@keyframes br-marquee-bg {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 200% 0%;
  }
}

@keyframes br-pulso-caja {
  0%,
  100% {
    filter: hue-rotate(0deg) saturate(1.1);
  }
  50% {
    filter: hue-rotate(35deg) saturate(1.35);
  }
}

@keyframes br-titulo-shake {
  0%,
  100% {
    transform: rotate(-1deg) scale(1);
  }
  50% {
    transform: rotate(1deg) scale(1.02);
  }
}

@keyframes br-badge-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes br-lore-hue {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(40deg);
  }
}

@keyframes br-chip-float {
  0%,
  100% {
    transform: translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateY(-4px) rotate(1deg);
  }
}

@keyframes br-chip-hue {
  to {
    filter: hue-rotate(360deg);
  }
}

@keyframes br-orbit-a {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(12px, 20px) scale(1.15);
  }
  66% {
    transform: translate(-8px, 10px) scale(0.95);
  }
}

@keyframes br-orbit-b {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(-18px, 24px) rotate(25deg);
  }
}

@keyframes br-orbit-c {
  0%,
  100% {
    transform: translate(0, 0);
  }
  40% {
    transform: translate(20px, -12px);
  }
  80% {
    transform: translate(-14px, 8px);
  }
}

@keyframes br-orbit-d {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.25) rotate(-15deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .brainrot-moment,
  .brainrot-moment--sahur,
  .brainrot-marquee,
  .brainrot-marquee__track,
  .brainrot-moment__titulo,
  .brainrot-moment__badge,
  .brainrot-lore,
  .brainrot-chip,
  .brainrot-orbit__a,
  .brainrot-orbit__b,
  .brainrot-orbit__c,
  .brainrot-orbit__d {
    animation: none !important;
  }

  .brainrot-marquee__track {
    transform: none;
  }
}
</style>
