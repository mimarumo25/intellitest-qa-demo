import {defineConfig} from '@playwright/test';
import {defineBddConfig} from 'playwright-bdd';
const testDir=defineBddConfig({featuresRoot:'features',features:`features/${process.env.CASE_ID||'*'}.feature`,steps:['fixtures/test.ts','steps/**/*.ts'],outputDir:'.features-gen'});
export default defineConfig({testDir,workers:1,retries:0,timeout:60000,globalTimeout:180000,forbidOnly:true,reporter:[['json',{outputFile:'result.json'}],['html',{outputFolder:'report',open:'never'}]],use:{baseURL:process.env.TARGET_URL,headless:true,proxy:process.env.BROWSER_PROXY?{server:process.env.BROWSER_PROXY}:undefined,screenshot:'only-on-failure',trace:'retain-on-failure',video:'off'}});
