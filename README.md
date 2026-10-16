# IntelliTest BDD

Requisitos: Node.js 22+ y npm. Ejecuta desde la raíz del repositorio.

## Primer arranque (PowerShell)

```powershell
npm ci
npx playwright install chromium
Copy-Item .env.example .env
notepad .env
npm run test:headed
```

Si el proyecto nuevo aún no tiene package-lock.json, usa npm install en lugar de npm ci. No sobrescribas un .env existente. Completa TEST_USERNAME y TEST_PASSWORD en .env cuando TEST_REQUIRE_AUTH=true. TARGET_URL es la URL del ambiente. No se incluyen claves ni contraseñas de Sites en el repositorio.

La configuración carga .env automáticamente tanto en bddgen como en Playwright. Las variables del entorno tienen prioridad, para CI y el worker. Si faltan valores obligatorios, la suite se detiene antes de abrir el navegador con un mensaje que indica los nombres faltantes, sin imprimir sus valores. .env permanece local, excluido de Git.

TypeScript incluye typescript y @types/node como dependencias de desarrollo y tsconfig.json con types: ["node"]. npm run typecheck comprueba process, los módulos node: y todo el código antes de ejecutar. No instales con --omit=dev si vas a desarrollar o ejecutar esta suite. Las pruebas realizan typecheck automáticamente; no se ocultan errores con declaraciones globales artificiales de process.

npm test ejecuta sin interfaz; npm run test:headed muestra el navegador; npm run report abre el reporte HTML. Sin CASE_ID se ejecutan todos los casos. Define CASE_ID con el UUID de su feature para ejecutar uno solo.

No hacen falta claves de IA ni conexión a Sites para ejecutar los scripts descargados. Los resultados de autenticación dependen de las credenciales del ambiente de pruebas que configures localmente.

Estructura: features/ (Gherkin), steps/ (pasos), pages/ (Page Objects y selectores), data/ (datos sin secretos), fixtures/. package.json y playwright.config.ts están en la raíz. Reportes locales: result.json y report/; resúmenes verificados: data/last-run-*.json.
