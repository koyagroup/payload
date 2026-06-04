import { redirect } from 'next/navigation'

// payload.koyabank.com is an admin-only host (the public marketing site is apps/web on koyabank.com).
// Send the root straight to the Payload admin instead of showing a placeholder holding page.
export default function HomePage() {
  redirect('/admin')
}
