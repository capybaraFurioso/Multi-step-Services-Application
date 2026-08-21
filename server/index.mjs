import { createServer } from 'node:http'
import { pathToFileURL } from 'node:url'

const port = Number.parseInt(process.env.PORT ?? '8787', 10)
const allowedOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173'

function writeJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': allowedOrigin,
    Vary: 'Origin',
  })
  response.end(JSON.stringify(body))
}

async function readJson(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > 1_000_000) throw new Error('Request body is too large.')
    chunks.push(chunk)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function isApplication(value) {
  return Boolean(
    value
      && typeof value === 'object'
      && value.personalInfo?.email
      && value.address?.streetAddress
      && value.serviceDetails?.serviceType
      && value.serviceDetails?.urgency
      && Array.isArray(value.documentUpload?.documents),
  )
}

export const server = createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    })
    response.end()
    return
  }

  if (request.url !== '/api/applications') {
    writeJson(response, 404, { success: false, error: 'Endpoint not found.' })
    return
  }

  if (request.method !== 'POST') {
    writeJson(response, 405, { success: false, error: 'Method not allowed.' })
    return
  }

  try {
    const application = await readJson(request)
    if (!isApplication(application)) {
      writeJson(response, 400, {
        success: false,
        error: 'Application payload is incomplete.',
      })
      return
    }

    writeJson(response, 201, {
      success: true,
      data: {
        applicationId: `APP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        submittedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    writeJson(response, 400, {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid request body.',
    })
  }
})

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(port, '127.0.0.1', () => {
    console.log(`Applications API listening on http://127.0.0.1:${port}`)
  })
}
