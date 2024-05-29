/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { version } = require('./package.json')

const nameEN = 'SimpleTV'

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  productName: '视界',
  appId: 'com.joey.tv',
  artifactName: `${nameEN}-\${version}-\${os}-\${arch}.\${ext}`,
  directories: {
    output: 'release',
    buildResources: 'resources',
  },
  files: ['dist'],
  win: {
    icon: 'resources/icon.ico',
    target: 'nsis',
  },
  nsis: {
    oneClick: false,
    perMachine: true,
    allowToChangeInstallationDirectory: true,
    installerLanguages: ['zh_CN', 'en_US'],
    license: 'resources/license.html',
    // multiLanguageInstaller: true,
    // language: '2052',
    // installerSidebar  164 × 314
  },
  mac: {
    icon: 'resources/icon.icns',
    target: 'default',
  },
  dmg: {
    window: {
      width: 540,
      height: 380,
    },
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications',
      },
      {
        x: 130,
        y: 150,
        type: 'file',
      },
    ],
  },
  // publish: {
  //   provider: 'github',
  //   // provider: 'generic',
  //   // url: 'http://localhost:3000',
  // },
  releaseInfo: {
    releaseName: `v${version}`,
    releaseNotes: '1. 修复已知问题\n2. 优化用户体验\n',
    releaseNotesFile: 'resources/release-notes.md',
    releaseDate: new Date().toLocaleString('zh-CN'),
  },
}
