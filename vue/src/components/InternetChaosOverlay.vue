<script setup>
defineProps({
  /** Solo visible en modo intenso */
  activo: { type: Boolean, default: false },
});

/** Textos “internet” dispersos; capa baja opacidad, sin cubrir interacción (pointer-events: none en raíz). */
const flotantes = [
  "POV: sos la página",
  "RATIO + L + MID",
  "no cap fr fr on god",
  "based and redpilled",
  "skill issue",
  "touch grass",
  "W rizz",
  "L bozo",
  "cope seethe mald",
  "Ohio final boss",
  "sigma grindset",
  "NPC detected",
  "main character moment",
  "this ain't it chief",
  "rent free",
  "living in your head",
  "ratio",
  "first",
  "who asked + yikes",
  "cringe compilation #47",
  "Twitch chat moment",
  "KEKW",
  "PogChamp",
  "Kappa",
  "404 brain not found",
  "stack overflow of the soul",
  "git gud",
  "vibe check: failed",
  "send help (not really)",
  "deep fried HTML",
  "unironically peak",
  "ironicamente peak también",
  "HYPERCLAP",
  "We do a little trolling",
  "It's giving… chaos",
];
</script>

<template>
  <div v-if="activo" class="ico" aria-hidden="true">
    <div class="ico__scan" />

    <div class="ico__rgb" />

    <div
      v-for="(txt, i) in flotantes"
      :key="i"
      class="ico__float"
      :style="{ '--n': i }"
    >
      {{ txt }}
    </div>

    <div class="ico__hud">
      <span class="ico__live">LIVE</span>
      <span class="ico__sub">0 viewers · Ohio announce</span>
    </div>

    <div class="ico__ad">AD</div>

    <div class="ico__marquee2">
      <div class="ico__marquee2-track">
        <span>URGENT: click here for free VBucks (not) · subscribe for nothing · /ban everyone ·</span>
        <span>URGENT: click here for free VBucks (not) · subscribe for nothing · /ban everyone ·</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ico {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 3;
  overflow: hidden;
}

.ico__scan {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 2px,
    rgba(0, 0, 0, 0.11) 2px,
    rgba(0, 0, 0, 0.11) 3px
  );
  animation: ico-scan-move 5.5s linear infinite;
  mix-blend-mode: multiply;
  opacity: 0.55;
}

.ico__rgb {
  position: absolute;
  inset: -4px;
  box-shadow:
    inset 0 0 0 3px rgba(255, 0, 110, 0.35),
    inset 0 0 0 6px rgba(0, 255, 247, 0.22),
    inset 0 0 0 9px rgba(255, 252, 0, 0.18);
  animation: ico-rgb-pulse 4.2s ease-in-out infinite;
}

.ico__float {
  position: absolute;
  font-family: Impact, Haettenschweiler, system-ui, sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: clamp(0.65rem, 1.8vw, 1rem);
  line-height: 1;
  white-space: nowrap;
  opacity: 0.28;
  color: #fff;
  text-shadow:
    2px 0 #ff00aa,
    -2px 0 #00fff7;
  animation: ico-float 11s ease-in-out infinite;
  animation-delay: calc(var(--n) * 0.41s);
  mix-blend-mode: overlay;
}

.ico__float:nth-child(3) {
  top: 8%;
  left: 3%;
}
.ico__float:nth-child(4) {
  top: 14%;
  right: 2%;
}
.ico__float:nth-child(5) {
  top: 28%;
  left: 8%;
}
.ico__float:nth-child(6) {
  top: 38%;
  right: 12%;
}
.ico__float:nth-child(7) {
  top: 52%;
  left: 2%;
}
.ico__float:nth-child(8) {
  top: 58%;
  right: 4%;
}
.ico__float:nth-child(9) {
  top: 68%;
  left: 18%;
}
.ico__float:nth-child(10) {
  top: 76%;
  right: 20%;
}
.ico__float:nth-child(11) {
  top: 86%;
  left: 6%;
}
.ico__float:nth-child(12) {
  top: 92%;
  right: 8%;
}
.ico__float:nth-child(13) {
  top: 18%;
  left: 42%;
}
.ico__float:nth-child(14) {
  top: 44%;
  right: 38%;
}
.ico__float:nth-child(15) {
  top: 62%;
  left: 48%;
}
.ico__float:nth-child(16) {
  top: 32%;
  left: 62%;
}
.ico__float:nth-child(17) {
  top: 72%;
  right: 52%;
}
.ico__float:nth-child(18) {
  top: 10%;
  left: 72%;
}
.ico__float:nth-child(19) {
  top: 48%;
  left: 22%;
}
.ico__float:nth-child(20) {
  top: 54%;
  right: 28%;
}
.ico__float:nth-child(21) {
  top: 22%;
  left: 28%;
}
.ico__float:nth-child(22) {
  top: 82%;
  left: 52%;
}
.ico__float:nth-child(23) {
  top: 36%;
  right: 2%;
}
.ico__float:nth-child(24) {
  top: 66%;
  right: 42%;
}
.ico__float:nth-child(25) {
  top: 12%;
  left: 52%;
}
.ico__float:nth-child(26) {
  top: 42%;
  left: 2%;
}
.ico__float:nth-child(27) {
  top: 78%;
  left: 32%;
}
.ico__float:nth-child(28) {
  top: 26%;
  right: 48%;
}
.ico__float:nth-child(29) {
  top: 56%;
  left: 72%;
}
.ico__float:nth-child(30) {
  top: 88%;
  right: 32%;
}
.ico__float:nth-child(31) {
  top: 34%;
  left: 38%;
}
.ico__float:nth-child(32) {
  top: 64%;
  right: 8%;
}
.ico__float:nth-child(33) {
  top: 6%;
  right: 22%;
}
.ico__float:nth-child(34) {
  top: 50%;
  left: 12%;
}
.ico__float:nth-child(35) {
  top: 70%;
  right: 2%;
}
.ico__float:nth-child(36) {
  top: 40%;
  left: 82%;
}
.ico__float:nth-child(37) {
  top: 20%;
  right: 62%;
}

.ico__hud {
  position: absolute;
  top: 3.5rem;
  left: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.35rem 0.5rem;
  border-radius: 0.35rem;
  background: rgba(10, 0, 20, 0.65);
  border: 2px solid #ff003c;
  animation: ico-hud-jitter 2.8s steps(2, end) infinite;
}

.ico__live {
  font-size: 0.7rem;
  font-weight: 900;
  color: #ff003c;
  letter-spacing: 0.15em;
  animation: ico-live-soft 2.1s ease-in-out infinite;
}

.ico__sub {
  font-size: 0.58rem;
  font-weight: 700;
  color: #e2e8f0;
  max-width: 10rem;
  line-height: 1.2;
}

.ico__ad {
  position: absolute;
  bottom: 3.4rem;
  left: 0.75rem;
  font-size: 0.65rem;
  font-weight: 900;
  padding: 0.2rem 0.4rem;
  background: #fffc00;
  color: #000;
  border: 2px solid #000;
  animation: ico-ad-spin 14s linear infinite;
}

.ico__marquee2 {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.35rem 0;
  background: rgba(0, 0, 0, 0.55);
  border-top: 2px solid #00fff7;
  overflow: hidden;
}

.ico__marquee2-track {
  display: flex;
  width: max-content;
  animation: ico-marquee2 22s linear infinite;
  gap: 2rem;
}

.ico__marquee2-track span {
  flex-shrink: 0;
  font-size: 0.68rem;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

@keyframes ico-scan-move {
  to {
    background-position: 0 120px;
  }
}

@keyframes ico-rgb-pulse {
  0%,
  100% {
    opacity: 0.55;
    filter: hue-rotate(0deg);
  }
  50% {
    opacity: 0.85;
    filter: hue-rotate(90deg);
  }
}

@keyframes ico-float {
  0%,
  100% {
    transform: translate(0, 0) rotate(-2deg) scale(1);
  }
  50% {
    transform: translate(10px, -14px) rotate(3deg) scale(1.08);
  }
}

@keyframes ico-hud-jitter {
  0%,
  90%,
  100% {
    transform: translate(0, 0);
  }
  92% {
    transform: translate(-2px, 1px);
  }
  94% {
    transform: translate(2px, -1px);
  }
  96% {
    transform: translate(-1px, -1px);
  }
}

@keyframes ico-live-soft {
  0%,
  100% {
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    opacity: 0.65;
    filter: brightness(1.4);
  }
}

@keyframes ico-ad-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes ico-marquee2 {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ico__scan,
  .ico__rgb,
  .ico__float,
  .ico__hud,
  .ico__live,
  .ico__ad,
  .ico__marquee2-track {
    animation: none !important;
  }
}
</style>
