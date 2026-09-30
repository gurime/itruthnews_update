'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Goback() {
const router = useRouter()

return (
<button
type="button"
onClick={() => router.back()}
className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#1577c2] transition-colors hover:text-[#b24936]"
>
<ArrowLeft aria-hidden="true" size={16} />
Go back
</button>
)
}