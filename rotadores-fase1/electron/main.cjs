// Proceso principal de Electron: abre una ventana con la app ya compilada
// (dist/index.html, version autocontenida — un solo archivo, sin depender
// de assets sueltos). CommonJS (.cjs) a proposito: el resto del proyecto es
// "type": "module", pero el proceso principal de Electron es mas simple asi.
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function crearVentana() {
  const ventana = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'Rotadores Fase 1',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  Menu.setApplicationMenu(null);
  ventana.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
}

app.whenReady().then(crearVentana);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) crearVentana();
});
