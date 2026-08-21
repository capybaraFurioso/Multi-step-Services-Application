import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { server } from './index.mjs'

let baseUrl

before(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  assert(address && typeof address === 'object')
  baseUrl = `http://127.0.0.1:${address.port}`
})

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()))
  })
})

test('accepts a complete application', async () => {
  const response = await fetch(`${baseUrl}/api/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalInfo: { email: 'demo@example.com' },
      address: { streetAddress: '123 Demo Street' },
      serviceDetails: { serviceType: 'permit', urgency: 'standard' },
      documentUpload: { documents: [] },
    }),
  })
  const body = await response.json()

  assert.equal(response.status, 201)
  assert.equal(body.success, true)
  assert.match(body.data.applicationId, /^APP-[A-F0-9]{8}$/)
  assert.doesNotThrow(() => new Date(body.data.submittedAt).toISOString())
})

test('rejects an incomplete application', async () => {
  const response = await fetch(`${baseUrl}/api/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ personalInfo: { email: 'demo@example.com' } }),
  })

  assert.equal(response.status, 400)
})

test('rejects malformed JSON', async () => {
  const response = await fetch(`${baseUrl}/api/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{',
  })

  assert.equal(response.status, 400)
})

test('rejects unsupported methods', async () => {
  const response = await fetch(`${baseUrl}/api/applications`)

  assert.equal(response.status, 405)
})

test('returns 404 for unknown endpoints', async () => {
  const response = await fetch(`${baseUrl}/api/unknown`)

  assert.equal(response.status, 404)
})
