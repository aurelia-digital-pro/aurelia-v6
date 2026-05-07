export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  try {
    const { content } = req.body

    if (!content) {
      return res.status(400).json({
        error: 'No content provided'
      })
    }

    console.log('Saving note:', content)

    return res.status(200).json({
      success: true,
      message: 'Memory saved successfully',
      saved: content
    })

  } catch (error) {
    return res.status(500).json({
      error: 'Server error'
    })
  }
}
