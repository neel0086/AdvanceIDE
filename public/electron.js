const { app, BrowserWindow, Menu } = require('electron')
const path = require("path");
const isDev = require("electron-is-dev");
const {ipcMain} = require('electron')
// require('@electron/remote/main').initialize()
// require("@electron/remote/main").enable(webContents)
// Menu.setApplicationMenu(false)
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: '100%',
    height: '100%',
    title:"Turbine",
    frame: false,
    // target:'node',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    },
  });
  mainWindow.maximize()
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) 

//   // Synchronous event emmision
//   event.returnValue = 'sync pong'
// })