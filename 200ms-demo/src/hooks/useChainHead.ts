import { useEffect, useRef, useState } from 'react'

import { subscribeToHeads } from '../chain/subscriptions'

export function useChainHead(enabled = true) {
  const [head, setHead] = useState<number | null>(null)
  const [cadenceMs, setCadenceMs] = useState<number | null>(null)
  const previous = useRef<{ head: number; at: number } | null>(null)

  useEffect(() => {
    if (!enabled) return
    return subscribeToHeads(({ number }) => {
      const now = performance.now()
      const last = previous.current
      if (last && number > last.head) setCadenceMs((now - last.at) / (number - last.head))
      previous.current = { head: number, at: now }
      setHead(number)
    })
  }, [enabled])

  return { head, cadenceMs }
}
