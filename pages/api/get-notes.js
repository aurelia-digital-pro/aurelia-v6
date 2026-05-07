export default async function handler(req, res) {
  try {

    const notes = [
      {
        id: 1,
        content: "Aurelia Memory Core Online",
        created_at: new Date()
      },
      {
        id: 2,
        content: "Private AI system initialized",
        created_at: new Date()
      }
    ]

    return res.status(200).json({
      notes
    })

  } catch (error) {
    return res.status(500).json({
      error: 'Failed to load notes'
    })
  }
}
