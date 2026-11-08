# CicloTaller Pro | SGIP-BikeTech (v1.0)
**Prototipo Funcional Web para un Negocio Independiente de Servicio Técnico, Mantenimiento y Repuestos de Bicicletas**

- **Autor:** Andrés Darío Rodríguez Dacuara
- **Institución:** Corporación Universitaria Iberoamericana
- **Proyecto:** Formulación y Prototipo Funcional de Software (SGIP-BikeTech)

---

## 1. Descripción del Prototipo Funcional
`CicloTaller Pro (SGIP-BikeTech)` es un prototipo funcional interactivo desarrollado con tecnologías web estándar (**HTML5, CSS3 y JavaScript ES6+**) que implementa la totalidad de las Historias de Usuario (`HU-01` a `HU-07`) y Criterios de Aceptación (`CA-01.1` a `CA-07.3`) enfocados en un taller independiente de servicio técnico y mantenimiento de bicicletas.

## 2. Estructura del Proyecto
- [`index.html`](index.html): Interfaz principal Single-Page Application (SPA) con los 7 módulos funcionales interactivos.
- [`css/styles.css`](css/styles.css): Sistema de diseño adaptativo (Grid/Flexbox), tarjetas KPI, tablero Kanban de taller y pre-factura POS.
- [`js/app.js`](js/app.js): Motor lógico en cliente con control RBAC, gestión de Órdenes de Servicio Técnico (`OST`), bloqueo transaccional simulado (`ACID Row-Lock`), Kardex inmutable, órdenes de compra y liquidación fiscal interna (`IVA 19%`).
- [`edt_corregida.html`](edt_corregida.html): Diagrama de la Estructura de Desglose del Trabajo (EDT / WBS) corregida y alineada al cronograma de 16 semanas.
- `screenshots/`: Capturas de pantalla en alta resolución de la EDT y de cada Historia de Usuario (`hu01_rbac.png` a `hu07_dashboard_reportes.png`).

## 3. Ejecución Rápida
Abra el archivo [`index.html`](index.html) directamente en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Firefox). También puede navegar directamente a cada Historia de Usuario mediante parámetros URL:
- `index.html?screen=hu01` — **HU-01:** Autenticación JWT, Matriz RBAC y Bitácora de Auditoría.
- `index.html?screen=hu02` — **HU-02:** Recepción Técnica de Bicicletas y Apertura de Órdenes (OST).
- `index.html?screen=hu03` — **HU-03:** Tablero Kanban de Taller e Imputación Atómica de Repuestos.
- `index.html?screen=hu04` — **HU-04:** Catálogo Especializado de Ciclismo, Alertas de Stock y Kardex Inmutable.
- `index.html?screen=hu05` — **HU-05:** Gestión de Proveedores de Ciclismo y Recepción de Órdenes de Compra.
- `index.html?screen=hu06` — **HU-06:** Liquidación POS con Cálculo Fiscal Interno (IVA 19%) y Registro de Pagos en Mostrador.
- `index.html?screen=hu07` — **HU-07:** Tablero Analítico de Gestión (KPIs) y Exportación de Reportes (PDF/CSV).
