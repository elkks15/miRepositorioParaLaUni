<script setup>
import { ref, computed } from "vue";

const nombre = ref("");
const correo = ref("");

const hayDatos = computed(() => nombre.value.trim() !== "" || correo.value.trim() !== "");
</script>

<template>
  <section class="panel" aria-labelledby="titulo-datos">
    <h2 id="titulo-datos" class="panel__titulo">Datos de contacto</h2>

    <form class="form" @submit.prevent>
      <div class="campo">
        <label for="nombre">Nombre</label>
        <input
          id="nombre"
          v-model.trim="nombre"
          type="text"
          name="nombre"
          autocomplete="name"
          placeholder="Tu nombre"
        />
      </div>
      <div class="campo">
        <label for="correo">Correo electrónico</label>
        <input
          id="correo"
          v-model.trim="correo"
          type="email"
          name="correo"
          autocomplete="email"
          placeholder="correo@ejemplo.com"
        />
      </div>
    </form>

    <div class="resultado" role="region" aria-live="polite">
      <h3 class="resultado__titulo">Valores capturados</h3>
      <template v-if="hayDatos">
        <dl class="lista">
          <div class="fila">
            <dt>Nombre</dt>
            <dd>{{ nombre || "—" }}</dd>
          </div>
          <div class="fila">
            <dt>Correo</dt>
            <dd>{{ correo || "—" }}</dd>
          </div>
        </dl>
      </template>
      <p v-else class="resultado__vacio">Escribe en los campos para ver aquí lo que capturas.</p>
    </div>
  </section>
</template>

<style scoped>
.panel {
  width: 100%;
  max-width: 22rem;
  margin-top: 2rem;
  padding: 1.25rem;
  border-radius: 0.75rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
  text-align: left;
}

.panel__titulo {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.campo label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
}

.campo input {
  width: 100%;
  padding: 0.55rem 0.65rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-family: inherit;
}

.campo input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.2);
}

.resultado {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid #e2e8f0;
}

.resultado__titulo {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.resultado__vacio {
  margin: 0;
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.45;
}

.lista {
  margin: 0;
}

.fila {
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 0.5rem 1rem;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.fila:last-child {
  margin-bottom: 0;
}

.fila dt {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
}

.fila dd {
  margin: 0;
  font-size: 0.95rem;
  color: #0f172a;
  word-break: break-word;
}
</style>
