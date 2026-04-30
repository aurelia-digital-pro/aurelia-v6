import { getToken } from "next-auth/jwt"
import { supabaseAdmin } from "../../../lib/supabaseAdmin"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token?.sub) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const { title, price, image_url, niche } = req.body || {}
  if (!title || price === undefined || price === null) {
    return res.status(400).json({ error: "title and price are required" })
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({
      user_id: token.sub,
      title,
      price,
      image_url: image_url || null,
      niche: niche || null
    })
    .select("id")
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ success: true, product_id: data.id })
}
