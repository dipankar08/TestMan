export const envNames = <const>['dev', 'prod']
export type EnvNames = typeof envNames[number]
export interface EnvVariables {
  API_GATEWAY?: string
}
export interface CommonEnvVariables {
  NODE_ENV: 'development' | 'production'
  BUILD_ENV: EnvNames
  PROJECT_NAME?: string
  PROJECT_TITLE?: string
}

export const COMMON_ENV: CommonEnvVariables = {
  BUILD_ENV: process.env.BUILD_ENV as EnvNames,
  NODE_ENV: process.env.NODE_ENV as CommonEnvVariables['NODE_ENV'],
  PROJECT_NAME: process.env.npm_package_name,
  PROJECT_TITLE: 'Test Man',
}

export const env: { [key in EnvNames]: EnvVariables } = {
  dev: {
    API_GATEWAY: 'http://yapi.baidu.com/mock/17714',
  },
  prod: {
    API_GATEWAY: 'http://yapi.baidu.com/mock/17714',
  },
}
