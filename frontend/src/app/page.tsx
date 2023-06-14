import { Users } from '@/components/Users'
import LoginForm from '@/components/auth/LoginForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <LoginForm />
      <Users />
    </main>
  )
}
