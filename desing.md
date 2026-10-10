# Documento de Diseño (Design Document)
**Hackatón SBS 2026 - Solución de Ahorro Previsional**

---

## 1. Visión General y Posicionamiento
*   **Público Objetivo:** Jóvenes de 18 a 28 años. Estudiantes universitarios y personas en su primer empleo.
*   **Problema a Resolver:** La "miopía previsional". Falta de conexión con el ahorro a largo plazo (jubilación).
*   **Solución Visual:** Una interfaz que traduce el ahorro a largo plazo en recompensas visuales inmediatas.
*   **Tono de Comunicación:** Moderno, empático, transparente y altamente amigable. El lenguaje debe alejarse de la terminología bancaria tradicional para ser digerible e intuitivo.

---

## 2. Branding y Dirección de Arte
La dirección de arte se fundamenta en una estética **Tech Moderna con toques Y2K**, diseñada para ser completamente adaptable. Para garantizar la accesibilidad y adaptarse a las preferencias de los usuarios (Gen Z), el sistema contará con **versiones Light Mode y Dark Mode**. Busca generar confianza institucional pero con un dinamismo propio de las startups y el ecosistema *gaming*.

### 2.1. Logotipo e Identidad
*   **Composición:** Puramente tipográfico acompañado de un isotipo distintivo.
*   **Aplicación:** El isotipo debe funcionar de forma independiente para el ícono de la app y avatares, utilizando los colores de acento. Su versión de color se adaptará automáticamente dependiendo del tema (Light/Dark) del dispositivo.

### 2.2. Tipografía
*   **Títulos y Encabezados (Display):** **Alpha** 
    *   *Uso:* Títulos principales, saldos, niveles alcanzados y *call-to-actions* (CTAs) de gran tamaño. Otorga personalidad y un carácter moderno.
*   **Cuerpo de Texto (Legibilidad):** **Sans-serif limpia y geométrica** (Ej. *Inter*, *Roboto* o *Plus Jakarta Sans*).
    *   *Uso:* Párrafos, descripciones de misiones, términos legales y menús. Su geometría facilita la lectura rápida en pantallas móviles.

---

## 3. Sistema de Color Adaptativo (Paleta UI)
El esquema de color está optimizado para funcionar en ambos modos (Light/Dark), manteniendo siempre los acentos vibrantes para guiar al usuario hacia el ahorro.

### 3.1. Colores Base y Temas
| Elemento UI | Modo Oscuro (Dark Mode) | Modo Claro (Light Mode) |
| :--- | :--- | :--- |
| **Fondo Principal** | **Deep Space Blue (`#000033`)** - Reduce la fatiga visual, aspecto premium y nocturno. | **Blanco Puro (`#FFFFFF`)** - Aspecto limpio, fresco y diurno. |
| **Superficies / Tarjetas**| **Ice Blue Tint (`#e1f0fa`)** aplicado con opacidad baja (10-15%) para separar capas. | **Ice Blue Tint (`#e1f0fa`)** en color sólido suave para diferenciar las tarjetas del fondo blanco. |
| **Texto Principal** | **Blanco Puro (`#FFFFFF`)** para máxima lectura sobre el fondo oscuro. | **Deep Space Blue (`#000033`)** para generar un contraste alto y elegante. |

### 3.2. Colores de Identidad y Acentos (Constantes en ambos modos)
Estos colores se mantienen fijos para no perder la identidad de la marca, sin importar el modo elegido.

*   **Color de Marca (Trust):** **SBS Royal Blue (`#0131a0`)**
    *   *Uso:* Cabeceras secundarias, enlaces, o zonas de validación legal e institucional.
*   **Acento Positivo 1 (Interacción):** **Turquesa Tech (`#04c4b3`)**
    *   *Uso:* Botones primarios, barras de progreso de ahorro y estados de éxito.
*   **Acento Alerta / Recompensa:** **Naranja/Amarillo (`#ffb601`)**
    *   *Uso:* Notificaciones, insignias ganadas, llamadas de atención (recordatorios de misiones) y estados *hover*.

*Nota de Interacción UI:* 
*   En **Dark Mode**, los botones con colores de acento (`#04c4b3`, `#ffb601