const fs = require('fs');

let envContent = fs.readFileSync('.env', 'utf-8');
envContent = envContent.replace(/VITE_SUPABASE_URL=.*/, 'VITE_SUPABASE_URL=https://bgisovunlvicsltvbnsu.supabase.co');
envContent = envContent.replace(/VITE_SUPABASE_ANON_KEY=.*/, 'VITE_SUPABASE_ANON_KEY=sb_publishable_fXEktlabAZArog0xPRUTqw_0giQpyVc');
fs.writeFileSync('.env', envContent);

let envExContent = fs.readFileSync('.env.example', 'utf-8');
envExContent = envExContent.replace(/VITE_SUPABASE_URL=.*/, 'VITE_SUPABASE_URL=https://bgisovunlvicsltvbnsu.supabase.co');
envExContent = envExContent.replace(/VITE_SUPABASE_ANON_KEY=.*/, 'VITE_SUPABASE_ANON_KEY=sb_publishable_fXEktlabAZArog0xPRUTqw_0giQpyVc');
fs.writeFileSync('.env.example', envExContent);

