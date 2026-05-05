# Pokédex React con PokeAPI

Un proyecto React que muestra Pokémon de la Pokédex usando la [PokeAPI](https://pokeapi.co/).

## Estructura del Proyecto

```
src/pokemon/
├── componentes/
│   ├── Pokedex.jsx          # Componente principal que gestiona la paginación y lógica
│   └── PokemonCard.jsx      # Componente para renderizar cada tarjeta de Pokémon
├── estilos/
│   ├── Pokedex.css          # Estilos para el contenedor y paginación
│   └── PokemonCard.css      # Estilos para las tarjetas individuales
└── services/
    └── pokeApi.js           # Servicio para llamadas a la PokeAPI
```

## Características

✨ **Características principales:**

- 📱 Grid responsive que se adapta a diferentes tamaños de pantalla
- 🎨 Tarjetas hermosas con efectos hover y animaciones
- 🔄 Paginación para navegar entre generaciones de Pokémon
- 🏷️ Colores diferentes por tipo (fuego, agua, eléctrico, etc.)
- 📊 Información de altura y peso de cada Pokémon
- ⚡ Carga dinámica de datos desde la API
- 🖼️ Imágenes de alta calidad (artwork oficial)

## Componentes

### `Pokedex.jsx`
Componente principal que:
- Gestiona el estado de la lista de Pokémon
- Maneja la paginación (20 Pokémon por página)
- Realiza llamadas a la API en paralelo para obtener detalles
- Controla la carga y errores

### `PokemonCard.jsx`
Componente individual que:
- Muestra la imagen del Pokémon
- Displays el número de Pokédex
- Muestra los tipos con colores específicos
- Indica altura y peso formateados

### `pokeApi.js`
Servicio que proporciona funciones para:
- `getPokemonList()` - Obtiene lista paginada de Pokémon
- `getPokemonDetails()` - Detalles completos de un Pokémon
- `getPokemonSpecies()` - Información de la especie

## Estilos

### Colores por tipo
- 🔥 Fuego: `#f08030`
- 💧 Agua: `#6890f0`
- ⚡ Eléctrico: `#f8d030`
- 🌿 Planta: `#78c850`
- ❄️ Hielo: `#98d8d8`
- Y muchos más...

## Cómo usar

### Instalar dependencias
```bash
npm install
```

### Ejecutar en desarrollo
```bash
npm run dev
```

El proyecto se abrirá en `http://localhost:5173`

### Compilar para producción
```bash
npm run build
```

## API Utilizada

**PokeAPI** - Gratuita y sin autenticación requerida
- Documentación: https://pokeapi.co/docs/v2
- Base URL: `https://pokeapi.co/api/v2`

## Ejemplos de endpoints

```
/pokemon?limit=20&offset=0     # Lista de Pokémon paginada
/pokemon/{id o nombre}         # Detalles del Pokémon
/pokemon-species/{id o nombre} # Información de especie
```

## Requisitos

- Node.js 14+
- npm o yarn
- Conexión a Internet (para PokeAPI)

## Notas de desarrollo

- Los datos se obtienen bajo demanda (lazy loading)
- Las imágenes se cargan desde `official-artwork` de PokeAPI
- La paginación muestra 20 Pokémon por página
- Los tipos de Pokémon tienen colores específicos según el canon oficial

## Futuras mejoras

- 🔍 Barra de búsqueda para filtrar Pokémon
- 🏆 Filtrar por tipo
- 💾 Guardar favoritos en localStorage
- 📊 Vista de estadísticas detalladas
- 🌙 Modo oscuro

---

**Creado con React + Vite + PokeAPI** 🚀
