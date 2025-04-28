# AMS Solutions Frontend

Aplicación frontend para la prueba técnica de AMS Solutions.

## Despliegue

La aplicación está desplegada en Vercel y puede ser accedida desde:
[https://ams-solutions-frontend.vercel.app](https://ams-solutions-frontend.vercel.app)

## Descripción

Esta aplicación permite visualizar y gestionar productos a través de dos páginas principales:

- Lista de productos con funcionalidad de búsqueda
- Detalles del producto seleccionado
- Carrito de compras con contador de items

## Tecnologías

- React 18
- Vite
- React Router v6
- Vitest + React Testing Library
- IndexedDB
- CSS Modules
- Zustand (State Management)
- Vercel

## Arquitectura

El proyecto sigue una arquitectura por capas:

1. **Presentación (Presentation Layer)**

   - Componentes React
   - Páginas
   - Hooks específicos de UI
   - Estilos
   - Layouts
   - Routes

2. **Datos (Data Layer)**

   - Repositorios
   - Modelos

3. **Infraestructura (Infrastructure Layer)**

   - Cache (IndexedDB)

## Estructura del Proyecto

```
src/
├── __tests__/
│   ├── presentation/
│   │   └── components/
│   │       ├── CartCounter/
│   │       │   └── CartCounter.test.jsx
│   │       ├── Header/
│   │       │   └── Header.test.jsx
│   │       ├── ProductCard/
│   │       │   └── ProductCard.test.jsx
│   │       ├── ProductGrid/
│   │       │   └── ProductGrid.test.jsx
│   │       ├── ProductDetails/
│   │       │   └── ProductActions/
│   │       │       └── ProductActions.test.jsx
│   │       └── SearchProduct/
│   │           └── SearchProduct.test.jsx
│   ├── data/
│   │   └── repositories/
│   │       ├── cartRepository.test.js
│   │       └── productRepository.test.js
│   └── models/
│       ├── Cart.test.js
│       ├── Product.test.js
│       └── ProductDetail.test.js
├── presentation/
│   ├── components/
│   │   ├── CartCounter/
│   │   │   ├── CartCounter.jsx
│   │   │   └── CartCounter.module.css
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.module.css
│   │   ├── ProductCard/
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductCard.module.css
│   │   ├── ProductGrid/
│   │   │   ├── ProductGrid.jsx
│   │   │   └── ProductGrid.module.css
│   │   ├── ProductDetails/
│   │   │   └── ProductActions/
│   │   │       ├── ProductActions.jsx
│   │   │       └── ProductActions.module.css
│   │   └── SearchProduct/
│   │       ├── SearchProduct.jsx
│   │       └── SearchProduct.module.css
│   ├── layouts/
│   │   └── MainLayout/
│   │       ├── MainLayout.jsx
│   │       └── MainLayout.module.css
│   ├── pages/
│   │   ├── ProductListPage.jsx
│   │   └── ProductDetailsPage.jsx
│   ├── styles/
│   │   └── theme/
│   │       ├── variables.css
│   │       ├── colors.css
│   │       ├── spacing.css
│   │       ├── typography.css
│   │       ├── breakpoints.css
│   │       ├── layout.css
│   │       ├── effects.css
│   │       ├── sizes.css
│   │       └── reset.css
│   ├── hooks/
│   │   └── useCart.js
│   └── routes/
│       └── AppRouter.jsx
├── data/
│   ├── models/
│   │   ├── Product.js
│   │   ├── ProductDetail.js
│   │   └── Cart.js
│   └── repositories/
│       ├── productRepository.js
│       └── cartRepository.js
├── infrastructure/
│   ├── config/
│   │   └── env.js
│   ├── http/
│   │   ├── apiClient.js
│   │   └── errorCodes.js
│   └── cache/
│       └── indexedDB.js
├── setupTests.js
└── main.jsx
```

## Testing

El proyecto utiliza Vitest como framework de testing, junto con React Testing Library para los tests de componentes. La configuración de testing se encuentra en:

- `vite.config.js` - Configuración de Vitest
- `src/setupTests.js` - Configuración global de tests

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage
```

### Estructura de Tests

Los tests están organizados siguiendo la misma estructura que el código fuente:

- `__tests__/presentation/` - Tests de componentes y páginas
- `__tests__/data/` - Tests de modelos y repositorios
- `__tests__/models/` - Tests de modelos de datos

### Convenciones de Testing

1. **Nombres de archivos**: `ComponentName.test.jsx` para componentes React
2. **Mocks**: Usar `vi.mock()` para mockear dependencias
3. **Test IDs**: Usar `data-testid` para elementos que no tienen roles semánticos
4. **Async Tests**: Usar `findBy` y `findAllBy` para operaciones asíncronas

## Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run start

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar linter
npm run lint
```

## Variables de Entorno

El proyecto requiere las siguientes variables de entorno:

```env
# API Configuration
VITE_API_BASE_URL=https://itx-frontend-test.onrender.com
VITE_API_TIMEOUT=5000
VITE_API_MAX_RETRIES=3
VITE_API_RETRY_DELAY=1000

# Cache Configuration
VITE_CACHE_DURATION=3600000

# IndexedDB Configuration
VITE_DB_NAME=ams-products-db
VITE_DB_VERSION=1
VITE_DB_STORE_NAME=products
VITE_CART_STORE_NAME=cart-ids
```

### Descripción de las Variables

- **API Configuration**

  - `VITE_API_BASE_URL`: URL base de la API
  - `VITE_API_TIMEOUT`: Tiempo máximo de espera para las llamadas a la API (en milisegundos)
  - `VITE_API_MAX_RETRIES`: Número máximo de reintentos para las llamadas a la API
  - `VITE_API_RETRY_DELAY`: Tiempo de espera entre reintentos (en milisegundos)

- **Cache Configuration**

  - `VITE_CACHE_DURATION`: Duración del caché en milisegundos (1 hora por defecto)

- **IndexedDB Configuration**
  - `VITE_DB_NAME`: Nombre de la base de datos IndexedDB
  - `VITE_DB_VERSION`: Versión de la base de datos
  - `VITE_DB_STORE_NAME`: Nombre del almacén de datos de productos
  - `VITE_CART_STORE_NAME`: Nombre del almacén de datos del carrito

## Instalación

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Crear archivo `.env` con las variables necesarias
4. Iniciar desarrollo: `npm start`

## Características Implementadas

- Arquitectura por capas
- Sistema de rutas con React Router
- Sistema de temas con CSS variables
- Cache de datos con IndexedDB
- Repositorios para productos y carrito
- Modelos de datos tipados
- Tests unitarios para modelos
- Gestión de estado con Zustand
- Componentes modulares con CSS Modules
- Layout system con React Router
