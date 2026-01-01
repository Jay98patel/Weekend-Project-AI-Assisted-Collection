import { IncomingMessage, ServerResponse } from 'node:http'
import { Plugin } from 'vite'

const weddingTemplate = {
  id: 'wedding-1',
  title: 'Wedding Gift Donation Help',
  description:
    "Hey everyone! I'd appreciate your help in giving the couple a special gift for their big day! Any contribution you can make would be wonderful.",
  image: '/assets/wedding-hero.jpg',
  category: 'wedding',
}

const babyTemplate = {
  id: 'baby-1',
  title: 'Baby Shower Group Gift',
  description:
    'Join us in celebrating the new arrival with a thoughtful group gift for the parents-to-be.',
  image: '/assets/baby-hero.jpg',
  category: 'baby',
}

const defaultTemplate = {
  id: 'default-1',
  title: 'Group Gift Collection',
  description:
    'Contribute to a meaningful group gift that celebrates someone special and brings everyone together.',
  image: '/assets/wedding-hero.jpg',
  category: 'general',
}

const readBody = (req: IncomingMessage) => {
  return new Promise<string>((resolve) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      resolve(data)
    })
  })
}

const includesKeyword = (value: string, keywords: string[]) => {
  const lowered = value.toLowerCase()
  return keywords.some((keyword) => lowered.includes(keyword))
}

const getTemplates = (prompt: string, category: string | null) => {
  const combined = `${prompt} ${category ?? ''}`.toLowerCase()
  if (includesKeyword(combined, ['wedding', 'bride', 'groom', 'marriage'])) {
    return [weddingTemplate]
  }
  if (includesKeyword(combined, ['baby', 'shower', 'newborn', 'nursery'])) {
    return [babyTemplate]
  }
  return [defaultTemplate]
}

const getFeedback = (prompt: string, category: string | null) => {
  const templates = getTemplates(prompt, category)
  if (templates[0]?.category === 'wedding') {
    return 'Here is an example of a group gift collection for a wedding gift'
  }
  if (templates[0]?.category === 'baby') {
    return 'Here is an example of a group gift collection for a baby shower'
  }
  return 'Here is an example of a group gift collection'
}

const handleRequest = async (req: IncomingMessage, res: ServerResponse) => {
  const bodyText = await readBody(req)
  let payload: Record<string, unknown> = {}
  let parseError = false
  if (bodyText) {
    try {
      payload = JSON.parse(bodyText) as Record<string, unknown>
    } catch {
      parseError = true
    }
  }
  const userPrompt = String(payload.userPrompt ?? '')
  const category = payload.category ? String(payload.category) : null
  const triggerError = includesKeyword(userPrompt, ['error', 'fail'])
  const triggerBadRequest =
    parseError || includesKeyword(userPrompt, ['invalid', 'bad request'])
  const latency =
    triggerError || triggerBadRequest ? 2000 : 1200 + Math.floor(Math.random() * 800)

  setTimeout(() => {
    res.setHeader('Content-Type', 'application/json')

    if (triggerError) {
      res.statusCode = 500
      res.end(JSON.stringify({ message: 'Server error' }))
      return
    }

    if (triggerBadRequest) {
      res.statusCode = 400
      res.end(JSON.stringify({ message: 'Bad request' }))
      return
    }

    const templates = getTemplates(userPrompt, category)
    const feedback = getFeedback(userPrompt, category)
    res.statusCode = 200
    res.end(
      JSON.stringify({
        templates,
        feedback,
        generatedAt: Date.now(),
      })
    )
  }, latency)
}

export const mockApiPlugin = (): Plugin => {
  const middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (!req.url?.startsWith('/api/ai/generate-collection')) {
      next()
      return
    }
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.end()
      return
    }
    handleRequest(req, res)
  }

  return {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}
