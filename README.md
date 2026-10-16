# IntelliTest BDD

Requisitos: Node.js 22+ y npm. Ejecuta desde la raíz del repositorio:

```sh
npm install
npx playwright install chromium
npm test
npm run report
```

Antes de ejecutar configura TARGET_URL, TEST_USERNAME y TEST_PASSWORD como variables de entorno. .env.example es una plantilla; no se carga automáticamente. No guardes credenciales en Git. En PowerShell usa Read-Host -AsSecureString y asigna su valor a TEST_PASSWORD en memoria.

Sin CASE_ID se ejecutan todos los casos. Para uno solo define CASE_ID con el UUID de su feature. npm run test:headed permite ver el navegador.

Estructura: features/ (Gherkin), steps/ (pasos), pages/ (Page Objects y selectores), data/ (datos sin secretos), fixtures/. package.json y playwright.config.ts están en la raíz. Reportes locales: result.json y report/; resúmenes verificados: data/last-run-*.json.
