import { redirect } from "next/navigation"
export default function Home() {
  // Redirect to the dashboard page
  return redirect("/dashboard")
}
