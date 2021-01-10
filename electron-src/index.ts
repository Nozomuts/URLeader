// Native
import { join } from "path";
// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext(".");

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      nativeWindowOpen: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  // 外部ウィンドウで開く
  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    const win = new BrowserWindow({ show: false });
    win.once("ready-to-show", () => win.show());
    win.loadURL(url);
    event.newGuest = win;
  });

  const url = isDev ? "http://localhost:8000/" : "https://urleader.vercel.app/";

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  event.sender.send("message", message);
});
