import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize, sep } from 'node:path'

const root = join(process.cwd(), 'dist')
const port = 8686

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost')
    let pathname = decodeURIComponent(url.pathname)
    if (pathname.endsWith('/')) pathname += 'index.html'

    const file = normalize(join(root, pathname))
    if (!file.startsWith(root + sep)) {
      res.writeHead(403).end('Forbidden')
      return
    }

    const body = await readFile(file)
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    try {
      const body = await readFile(join(root, 'index.html'))
      res.writeHead(200, { 'content-type': types['.html'] })
      res.end(body)
    } catch (err) {
      res.writeHead(500).end(String(err))
    }
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`preview server listening on ${port}`)
})
