// Convierte el build de Vite (dist/index.html + dist/assets/*) en un solo
// archivo HTML autocontenido, sin referencias externas a archivos locales.
// Necesario para poder abrir la app con doble clic (file://): los navegadores
// bloquean por CORS que un <script type="module" src="..."> cargue otro
// archivo local por separado, pero un <script> ya insertado dentro del mismo
// HTML (sin ninguna carga externa) sí funciona sin problema.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(raiz, 'dist');
const rutaHtml = join(distDir, 'index.html');

let html = readFileSync(rutaHtml, 'utf-8');

// Inline del CSS: <link rel="stylesheet" ... href="./assets/xxx.css"> -> <style>...</style>
html = html.replace(
  /<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"[^>]*>/,
  (_coincidencia, rutaRelativa) => {
    const css = readFileSync(join(distDir, rutaRelativa), 'utf-8');
    return `<style>\n${css}\n</style>`;
  }
);

// Inline del JS: <script type="module" ... src="./assets/xxx.js"></script> -> <script type="module">...</script>
html = html.replace(
  /<script type="module"[^>]*src="\.\/(assets\/[^"]+\.js)"[^>]*><\/script>/,
  (_coincidencia, rutaRelativa) => {
    const js = readFileSync(join(distDir, rutaRelativa), 'utf-8');
    return `<script type="module">\n${js}\n</script>`;
  }
);

// Inline del favicon como data URI, para que no dependa de un archivo aparte.
html = html.replace(/<link rel="icon"[^>]*href="\.\/(favicon\.svg)"[^>]*\/?>/, (_coincidencia, rutaRelativa) => {
  const svg = readFileSync(join(distDir, rutaRelativa), 'utf-8');
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  return `<link rel="icon" type="image/svg+xml" href="${dataUri}" />`;
});

writeFileSync(rutaHtml, html);
console.log('dist/index.html ahora es un archivo autocontenido (sin dependencias locales externas).');
