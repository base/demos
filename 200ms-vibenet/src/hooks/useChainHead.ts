import { useEffect, useRef, useState } from 'react'

import { HEAD_POLL_MS } from '../chain/config'
import { readHead } from '../chain/rpc'

export function useChainHead() {
  const [head, setHead] = useState<number | null>(null)
  const [cadenceMs, setCadenceMs] = useState<number | null>(null)
  const previous = useRef<{ head: number; at: number } | null>(null)

  useEffect(() => {
    let stopped = false
    let timer = 0
    const poll = async () => {
      try {
        const next = await readHead()
        const now = performance.now()
        if (!stopped) {
          const last = previous.current
          if (last && next > last.head) setCadenceMs((now - last.at) / (next - last.head))
          previous.current = { head: next, at: now }
          setHead(next)
        }
      } catch {
        // The page-level health state handles prolonged failures.
      } finally {
        if (!stopped) timer = window.setTimeout(poll, HEAD_POLL_MS)
      }
    }
    void poll()
    return () => {
      stopped = true
      window.clearTimeout(timer)
    }
  }, [])

  return { head, cadenceMs }
}
