import { app, Tray } from 'electron'
import { creatAppTray } from './tray'

require('@electron/remote/main').initialize()

$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)

let tray: Tray

const appLock = app.requestSingleInstanceLock()

if (!appLock) {
  app.quit()
}

app.on('second-instance', () => {
  $tools.createWindow('Home')
})

app.on('ready', () => {
  tray = creatAppTray()
  $tools.createWindow('Home')
})

app.on('activate', () => {
  if (process.platform == 'darwin') {
    $tools.createWindow('Home')
  }
})

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})

app.on('before-quit', () => {
  $tools.log.info(`Application <${$tools.APP_NAME}> has exited normally.`)
  if (process.platform === 'win32') {
    tray.destroy()
  }
})
