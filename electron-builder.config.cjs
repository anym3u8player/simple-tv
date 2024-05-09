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
    language: '2052',
    perMachine: true,
    allowToChangeInstallationDirectory: true,
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
  publish: {
    provider: 'github',
    // provider: 'generic',
    // url: 'http://localhost:3000',
  },
  releaseInfo: {
    releaseName: `v${version}`,
    releaseNotes: '1. 修复已知问题\n2. 优化用户体验\n',
    releaseNotesFile: 'resources/release-notes.md',
    releaseDate: new Date().toLocaleString(),
  },
}
