import { app, BrowserWindowConstructorOptions } from 'electron'
import { asAssetsPath } from './paths'

export const APP_NAME = app.name
export const APP_VERSION = app.getVersion()
export const APP_TITLE = process.env.PROJECT_TITLE
export const APP_ICON = asAssetsPath('app-icon/app-icon@256.png')
export const TRAY_ICON_LIGHT = asAssetsPath('tray-icon/tray-icon-light.png')
export const TRAY_ICON_DARK = asAssetsPath('tray-icon/tray-icon-dark.png')
export const DEFAULT_WINDOW_OPTIONS: BrowserWindowConstructorOptions = {
  icon: APP_ICON,
  minWidth: 200,
  minHeight: 200,
  width: 800,
  height: 600,
  show: false,
  hasShadow: true,
  webPreferences: {
    contextIsolation: false,
    nodeIntegration: true,
    scrollBounce: true,
  },
  titleBarStyle: 'hidden', // 隐藏标题栏, 但显示窗口控制按钮
  // frame: process.platform === 'darwin' ? true : false, // 无边框窗口
  // frame: false, // 无边框窗口
  // skipTaskbar: false, // 是否在任务栏中隐藏窗口
  // backgroundColor: '#fff',
  // transparent: true, // 窗口是否透明
  // titleBarStyle: 'hidden',
  // vibrancy: 'fullscreen-ui', // OSX 毛玻璃效果
}

export const DEFAULT_CREATE_CONFIG: CreateConfig = {
  showSidebar: false,
  showCustomTitlebar: false,
  autoShow: true,
  delayToShow: 0,
  single: true,
}
