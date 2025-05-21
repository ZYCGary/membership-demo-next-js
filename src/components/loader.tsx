import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Loader({ className }: { className?: string }) {
  return <LoaderCircle className={cn('h-4 w-4 animate-spin', className)} />
}
