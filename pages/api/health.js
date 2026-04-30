export default function handler(req, res) {
  res.status(200).json({
    status: "Aurelia V6 Engine Online 🔥",
    bugs_killed: ["middleware.js", "supabaseAdmin.js", "NEXTAUTH_SECRET"],
    phase: "Ready for Weapon 1: Upload Product"
  })
}
