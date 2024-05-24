import { useRouter } from "next/navigation"
import { ReactNode } from "react"
 
export default function PageBackLink({ children }: { children: ReactNode }) {
  const router = useRouter()
 
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.back();
  }
 
  return (
    <div onClick={handleClick}>
      {children}
    </div>
  )
}
