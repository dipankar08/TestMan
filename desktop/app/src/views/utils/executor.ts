const exec = require('child_process').exec
import { dassert } from 'corexxx'

export async function _execute(command: string): Promise<{ stdout: string; stderr: string; error: string }> {
  return new Promise((resolve, reject) => {
    try {
      exec(command, (error: any, stdout: any, stderr: any) => {
        resolve({ stdout: stdout, stderr: stderr, error: error })
      })
    } catch (e: any) {
      reject(e.message)
    }
  })
}

export type SUPPORTED_CMD = 'start_app' | 'stop_app'

export async function runCommand(command_name: SUPPORTED_CMD, arg_list: string[] = []): Promise<string> {
  const res = await _execute(`${command_name} ${arg_list.join(' ')}`)
  if (res.error || res.stderr) {
    throw new Error('Not able to execute')
  }
  return res.stdout
}

export type SUPPORTED_ASSERT = 'android_device_online'

export async function runAssert(command_name: SUPPORTED_ASSERT, arg_list: string[] = []) {
  switch (command_name) {
    case 'android_device_online': {
      const res = await _execute('adb devices')
      dassert.verifyOrThrow(
        help_string_array(res.stdout).length == 2,
        'no device found - please make sure device has attached'
      )
      //debugger
      break
    }
  }
}
export const help_string_array = (data: string) => data.split('\n').filter((x) => x.trim().length >= 1)
