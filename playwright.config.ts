import {defineConfig} from '@playwright/test';
import {defineBddConfig} from 'playwright-bdd';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
const envPath=resolve(process.cwd(),'.env');
if(existsSync(envPath))process.loadEnvFile(envPath);
const required=['TARGET_URL',...(process.env.TEST_REQUIRE_AUTH==='true'?['TEST_USERNAME','TEST_PASSWORD']:[])];
const missing=required.filter(name=>!process.env[name]?.trim());
if(missing.length)throw new Error('Configuración incompleta: '+missing.join(', ')+'. Copia .env.example a .env y completa esos campos, o inyéctalos en el entorno. No guardes .env en Git.');
try{const target=new URL(process.env.TARGET_URL!);if(!['http:','https:'].includes(target.protocol)||target.username||target.password)throw new Error();}catch{throw new Error('TARGET_URL debe ser una URL HTTP/HTTPS válida, sin credenciales. Revisa .env o el entorno.');}
const testDir=defineBddConfig({featuresRoot:'features',features:`features/${process.env.CASE_ID||'*'}.feature`,steps:['fixtures/test.ts','steps/**/*.ts'],outputDir:'.features-gen'});
export default defineConfig({testDir,workers:1,retries:0,timeout:60000,globalTimeout:180000,forbidOnly:true,reporter:[['json',{outputFile:'result.json'}],['html',{outputFolder:'report',open:'never'}]],use:{baseURL:process.env.TARGET_URL,headless:true,proxy:process.env.BROWSER_PROXY?{server:process.env.BROWSER_PROXY}:undefined,screenshot:'only-on-failure',trace:'retain-on-failure',video:'off'}});
