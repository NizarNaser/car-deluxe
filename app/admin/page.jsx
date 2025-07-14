'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // ننتظر تحميل الجلسة
    if (!session || session.user.role !== 'admin') {
      router.push('/unauthorized') // توجيه في حال ليس أدمين
    }
  }, [session, status])

  if (status === 'loading') return <p>Verifying. ...</p>

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-700">Welcome admin   </h1>
    </div>
  )
}
