"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_context_menu_1 = __importDefault(require("electron-context-menu"));
const path = __importStar(require("path"));
const isDevelopment = process.env.NODE_ENV === 'development';
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const disposeContextMenu = (0, electron_context_menu_1.default)({ showInspectElement: true });
async function createWindow() {
    let win;
    if (isDevelopment) {
        const primaryDisplay = electron_1.screen.getPrimaryDisplay();
        win = new electron_1.BrowserWindow({
            width: 300,
            height: 220,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
            y: 23,
            x: primaryDisplay.workAreaSize.width / 2,
            resizable: false,
        });
        await win.loadURL('http://localhost:3000');
        // win.webContents.openDevTools({
        //   mode: 'bottom',
        // })
    }
    else {
        win = new electron_1.BrowserWindow({
            width: 300,
            height: 220,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });
        await win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    }
    win.setMaximizable(false);
    win.setMinimizable(false);
}
electron_1.app.whenReady().then(async () => {
    await createWindow();
    electron_1.app.on('activate', async () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            await createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        disposeContextMenu();
        electron_1.app.quit();
    }
});
