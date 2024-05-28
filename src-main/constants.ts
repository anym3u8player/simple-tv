import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const DARK_BACK_COLOR = '#000000'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const ROOT = __dirname
