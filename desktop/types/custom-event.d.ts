interface CustomEventMap {
  'router-update': CustomEvent<PageProps>
}

interface WindowEventMap extends CustomEventMap {}

declare namespace Electron {
  interface WebContents {
    send(channel: 'dom-ready', createConfig: CreateConfig): void
  }

  interface IpcRenderer {
    on(channel: 'dom-ready', callback: (event: Electron.IpcRendererEvent, data: CreateConfig) => void): void
  }
}
