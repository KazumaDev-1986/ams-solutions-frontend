# AMS Solutions Frontend

Aplicación frontend para la prueba técnica de AMS Solutions.

## Descripción

Esta aplicación permite visualizar y gestionar productos a través de dos páginas principales:

- Lista de productos con funcionalidad de búsqueda
- Detalles del producto seleccionado

## Tecnologías

- React 18
- Vite
- React Router
- Jest
- IndexedDB
- CSS Vanilla

## Arquitectura

El proyecto sigue una arquitectura por capas:

1. **Presentación (Presentation Layer)**

   - Componentes React
   - Páginas
   - Hooks específicos de UI
   - Estilos

2. **Negocio (Business Layer)**

   - Servicios
   - Casos de uso
   - Lógica de negocio

3. **Datos (Data Layer)**

   - Repositorios
   - APIs
   - Manejo de estado

4. **Infraestructura (Infrastructure Layer)**
   - Configuraciones
   - Utilidades
   - Constantes
   - Tipos/Interfaces
   - Cache (IndexedDB)

## Estructura del Proyecto

```
src/
├── presentation/
│   ├── components/
│   ├── pages/
│   │   ├── ProductListPage.jsx
│   │   └── ProductDetailsPage.jsx
│   ├── hooks/
│   └── routes/
│       └── AppRouter.jsx
├── business/
│   ├── services/
│   └── use-cases/
├── data/
│   ├── models/
│   │   ├── Product.js
│   │   ├── ProductDetail.js
│   │   └── Cart.js
│   └── repositories/
│       ├── productRepository.js
│       └── cartRepository.js
└── infrastructure/
    ├── config/
    ├── styles/
    │   └── theme/
    │       ├── variables.css
    │       └── reset.css
    ├── cache/
    │   └── indexedDB.js
    ├── utils/
    └── types/
```

## Testing

El proyecto utiliza Jest como framework de testing. La estructura de tests sigue la misma organización que el código fuente:

```
src/
└── __tests__/
    ├── models/
    │   ├── Product.test.js
    │   ├── ProductDetail.test.js
    │   └── Cart.test.js
    └── data/
        └── repositories/
            ├── productRepository.test.js
            └── cartRepository.test.js
```

### Tests de Repositorios

Los tests de repositorios verifican la interacción con la API y el sistema de caché:

#### ProductRepository

- Obtener lista de productos desde caché
- Obtener lista de productos desde API cuando no hay caché
- Obtener detalles de producto desde caché
- Obtener detalles de producto desde API cuando no hay caché
- Manejo de errores de API

#### CartRepository

- Añadir producto al carrito
- Manejo de errores de API
- Manejo de errores de red

### Scripts de Testing

- `npm test`: Ejecuta todos los tests
- `npm run test:watch`: Ejecuta los tests en modo watch
- `npm run test:coverage`: Ejecuta los tests con reporte de cobertura

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm run build`: Compila la aplicación para producción
- `npm test`: Ejecuta todos los tests
- `npm run test:watch`: Ejecuta los tests en modo watch
- `npm run test:coverage`: Ejecuta los tests con reporte de cobertura
- `npm run lint`: Ejecuta el linter

## Variables de Entorno

El proyecto requiere las siguientes variables de entorno:

```env
# API Configuration
VITE_API_BASE_URL=https://itx-frontend-test.onrender.com
VITE_API_TIMEOUT=30000

# Cache Configuration
VITE_CACHE_DURATION=3600000
VITE_ENABLE_CACHE=true

# IndexedDB Configuration
VITE_DB_NAME=ams-products-db
VITE_DB_VERSION=1
VITE_DB_STORE_NAME=products
```

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
