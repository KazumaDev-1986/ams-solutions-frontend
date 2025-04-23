# AMS Solutions Frontend

Aplicación frontend para la prueba técnica de AMS Solutions.

## Descripción

Esta aplicación permite visualizar y gestionar productos a través de dos páginas principales:

- Lista de productos con funcionalidad de búsqueda
- Detalles del producto seleccionado

## Tecnologías

- React 19
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

## Estructura del Proyecto

```
src/
├── presentation/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── routes/
├── business/
│   ├── services/
│   └── use-cases/
├── data/
│   ├── repositories/
│   └── models/
└── infrastructure/
    ├── config/
    ├── styles/
    ├── utils/
    └── types/
```

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm run build`: Compila la aplicación para producción
- `npm test`: Ejecuta los tests
- `npm run lint`: Ejecuta el linter

## Variables de Entorno

El proyecto requiere las siguientes variables de entorno:

```env
# Configuración de la API.
VITE_API_BASE_URL=https://itx-frontend-test.onrender.com
VITE_API_TIMEOUT=30000

# Configuración de la cache.
VITE_CACHE_DURATION=3600000
VITE_ENABLE_CACHE=true
```

## Instalación

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Crear archivo `.env` con las variables necesarias
4. Iniciar desarrollo: `npm start`
