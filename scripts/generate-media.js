const fs = require('fs')
const path = require('path')

async function main() {
  const dir = path.resolve(__dirname, '..', 'static', 'media')
  const images = fs.readdirSync(dir)
    .filter(f => f.match(/\.(png|jpg|jpeg|gif|svg)$/i))
    .map(file => `/media/${file}`)

  const dataFile = path.resolve(__dirname, '..', 'assets', 'data', 'media.json')
  fs.writeFileSync(dataFile, JSON.stringify(images, null, 2))
}

main().catch(console.error)
