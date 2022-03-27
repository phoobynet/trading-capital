import { app, BrowserWindow, screen } from 'electron'
import contextMenu from 'electron-context-menu'
import * as path from 'path'

const isDevelopment = process.env.NODE_ENV === 'development'
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
const disposeContextMenu = contextMenu({ showInspectElement: true })

async function createWindow(): Promise<void> {
  let win: BrowserWindow

  if (isDevelopment) {
    const primaryDisplay = screen.getPrimaryDisplay()

    win = new BrowserWindow({
      width: 300,
      height: 220,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      y: 23,
      x: primaryDisplay.workAreaSize.width / 2,
      resizable: false,
    })
    await win.loadURL('http://localhost:3000')
    // win.webContents.openDevTools({
    //   mode: 'bottom',
    // })
  } else {
    win = new BrowserWindow({
      width: 300,
      height: 220,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })
    await win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`)
  }

  win.setMaximizable(false)
  win.setMinimizable(false)
}

app.whenReady().then(async () => {
  await createWindow()

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    disposeContextMenu()
    app.quit()
  }
})
