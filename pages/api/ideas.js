export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  try {
    const { type, context } = req.body

    return res.status(200).json({
      ideas: `
1. Build a private AI knowledge system
2. Create premium digital archives
3. Launch founder-only intelligence tools

Type: ${type}

Context:
${context || 'No context'}
      `
    })

  } catch (error) {
    return res.status(500).json({
      error: 'Ideas engine failed'
    })
  }
}
