import {defineConfig,loadEnv} from 'vite';
// Plain JavaScript needs no transpilation. Keep this build usable in restricted
// Windows environments that cannot start esbuild's background service.
export default defineConfig(({mode})=>{
 const env=loadEnv(mode,process.cwd(),'VITE_');
 return {plugins:[{name:'public-config',enforce:'pre',transform(code,id){
  if(!/\.[cm]?js(?:\?|$)/.test(id))return;
  return code.replaceAll('import.meta.env?.VITE_SUPABASE_URL',JSON.stringify(env.VITE_SUPABASE_URL||''))
   .replaceAll('import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY',JSON.stringify(env.VITE_SUPABASE_PUBLISHABLE_KEY||''))
   .replaceAll('process.env.NODE_ENV',JSON.stringify(mode==='production'?'production':'development'))
   .replace(/\bprocess\.env\b/g,'({})');
 }}],resolve:{preserveSymlinks:true},esbuild:false,optimizeDeps:{noDiscovery:true,include:[]},build:{target:'esnext',minify:false,cssMinify:false},server:{host:'127.0.0.1',port:5173,strictPort:true}};
});
