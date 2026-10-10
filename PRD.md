# Product Requirements Document (PRD)
**Proyecto:** Bóveda: "Mi Yo del Futuro" (Hackatón SBS 2026)  
**Tipo de Entregable:** Prototipo Super MVP (Ultra Visual, Realista, Formato Mobile App)  
**Fuente Exclusiva:** Cuaderno NotebookLM SBS (`💻 [HACKATHON] SBS: Educacion para la FInanzas`)  
**Guía Visual:** [desing.md](file:///home/laptop/Documentos/hackathon-sbs/desing.md) & [DIRECTIVAS.md](file:///home/laptop/Documentos/hackathon-sbs/DIRECTIVAS.md)

---

## 1. Resumen Ejecutivo y Propósito
El objetivo del producto es combatir la **miopía previsional** en jóvenes de 18 a 28 años mediante un sistema de **microahorro automatizado por consumo** ligado a métodos de pago cotidianos (Yape, Plin y Tarjetas de Débito/Crédito). 

Cada vez que el usuario realiza un consumo diario, una fracción configurada se desvía en tiempo real hacia su bóveda previsional: **"Mi Yo del Futuro"**.

### Premisa de Construcción (Super MVP):
* **Cero lógica backend compleja.**
* **100% interactividad simulada, hiperrealista y visualmente atractiva.**
* **Formato Mobile App (Frame de Smartphone iOS/Android)** optimizado para pitch y demos en vivo ante el jurado de la SBS.

---

## 2. Perfil de Usuario y Tono
* **Target:** Jóvenes de 18 a 28 años (universitarios, practicantes y personas en su primer empleo).
* **Pain Point:** Sienten que la jubilación/previsión está a décadas de distancia y no ahorran deliberadamente.
* **Tono de Comunicación:** Fresco, empático, transparente, lenguaje sin tecnicismos bancarios densos, gamificado con toques Tech/Y2K.

---

## 3. Identidad Visual y UI Specs (Alineado a `desing.md`)
* **Tipografías:**
  * Display / Números / Saldos: Tipografía moderna de impacto (**Alpha** / Sans Bold geométrica).
  * Textos y Controles: **Plus Jakarta Sans** / **Inter**.
* **Paleta de Colores Oficial:**
  * **Deep Space Blue (`#000033`):** Fondo principal modo oscuro / Contrastes.
  * **Blanco Puro (`#FFFFFF`):** Fondos claros / textos sobre oscuro.
  * **Ice Blue Tint (`#e1f0fa`):** Superficies de tarjetas, contenedores de balance y bordes de acento.
  * **SBS Royal Blue (`#0131a0`):** Confianza institucional, cabeceras secundarias y sellos SBS.
  * **Turquesa Tech (`#04c4b3`):** Botones principales de acción (CTAs), barras de progreso de la Bóveda y estados de éxito.
  * **Naranja/Amarillo (`#ffb601`):** Insignias de recompensa, multiplicador "Fin de Semana / Salidas" y alertas de ahorro.
* **Soporte de Tema:** Switch toggle Light Mode / Dark Mode interactivo.

---

## 4. Arquitectura de Pantallas y Flujos de Usuario

### 4.1. Pantalla 1: Login & Welcome Sencillo
* **Header:** Logo con isotipo estilizado "Bóveda SBS" + versión adaptativa.
* **Campos:** 
  * Identificación rápida (DNI / Correo).
  * Botón biométrico simulado (Face ID / Huella) o botón *"Ingresar con un toque"*.
* **Micro-copy:** *"Tu dinero de hoy construyendo a tu Yo del Futuro"*.

### 4.2. Pantalla 2: Onboarding de Permisos y Privacidad (Consentimiento Claro)
* **Propósito:** Generar confianza y autorizar la conexión con métodos de pago.
* **Componentes Visuales:**
  * **Selector de Billeteras/Bancos vinculados:** Toggles visuales activos para Yape, Plin, BCP, BBVA, Interbank.
  * **Consentimiento de Débito Automático:** Tarjeta interactiva con check de aprobación de retiro porcentual por transacción.
  * **Sello de Privacidad SBS:** Badge oficial de cifrado y cumplimiento normativo SBS.
  * **CTA Primario:** *"Activar mi Bóveda"* (Turquesa Tech `#04c4b3`).

### 4.3. Pantalla 3: Dashboard Principal - Bóveda "Mi Yo del Futuro"
* **Widget Principal del Saldo:**
  * Tarjeta central flotante con efecto glow suave.
  * Saldo acumulado en la Bóveda (Ej. `S/ 1,482.50 PEN`).
  * Indicador de crecimiento del mes (+S/ 142.80 este mes) y nivel previsional alcanzado.
* **Sección de Personalización del Microahorro (Controles Interactivos):**
  1. **Regla de Porcentaje del Gasto:** Chips seleccionables (3%, 5%, 10%) o slider animado.
  2. **Regla de Redondeo al Sol Superior:** Switch activo (Ej. Paga S/ 8.20 ➔ Ahorra S/ 1.80 a la Bóveda).
  3. **Monto Mínimo de Activación:** Input/Selector (Ej. Solo en consumos mayores a S/ 15.00).
  4. **Multiplicador "Fin de Semana / Salidas" (Booster):** Toggle destacado en `#ffb601` que aplica x2 al microahorro en consumos de ocio/restaurantes.
* **Sección de Simulación de Transacciones (Opción C - En Vivo):**
  * **Botón de Gatillo Rápido:** *"Simular pago con Yape (S/ 28.50 en Starbucks)"* o modal para ingresar cualquier monto.
  * **Feedback Inmediato:** Modal/Toast con animación de confeti o destello:
    * *"¡Pago realizado de S/ 28.50! S/ 2.85 fueron directo a 'Mi Yo del Futuro' 🚀"*.
  * **Feed de Transacciones Recientes:**
    * Lista realista con logos (Yape, Plin, POS Visa), monto del consumo y badge verde con el microahorro sumado.

### 4.4. Pantalla 4: Simulador Proyectivo ("Tu Yo del Futuro a los 60")
* **Gráfico Interactivo de Proyección:**
  * Muestra el impacto del interés compuesto de microahorrar S/ 5 o S/ 10 diarios.
  * Proyección a 10, 20 y 30 años (Ej. *"A este ritmo, tu Bóveda acumulará más de S/ 85,000 PEN para tu retiro sin esfuerzo adicional"*).
  * Selector de estilo de vida futuro (Viajes, Casa propia, Retiro tranquilo).

---

## 5. Requerimientos Técnicos y de Prototipado
* **Formato:** Shell de teléfono móvil (Mobile Mockup con notch/borde moderno tipo iPhone) centrado en pantalla, con opción de probar en pantalla completa responsiva.
* **Stack Recomendado para Prototipado:**
  * **Frontend:** React + Vite + Tailwind CSS.
  * **Iconografía:** Lucide React (íconos de billeteras, candados, monedas, cohete).
  * **Animaciones:** Framer Motion o transiciones Tailwind fluidas para feedback instantáneo de los pagos simulados.
  * **Tematización:** Soporte nativo `dark` y `light` según [desing.md](file:///home/laptop/Documentos/hackathon-sbs/desing.md).

---

## 6. Criterios de Aceptación para la Demo (Pitch SBS)
1. **El jurado entiende la propuesta de valor en 10 segundos:** Un pago en Yape/Plin alimenta automáticamente el retiro futuro.
2. **Interactividad fluida:** Al cambiar el slider de porcentaje o activar el multiplicador de fin de semana, los datos y proyecciones reaccionan visualmente al instante.
3. **El simulador de pago genera impacto visual:** Al presionar "Simular Yape", se ve la notificación emergente y el saldo de la bóveda sube con animación numérica.
4. **Respeta al 100% la paleta de colores y lineamientos de [desing.md](file:///home/laptop/Documentos/hackathon-sbs/desing.md).**
