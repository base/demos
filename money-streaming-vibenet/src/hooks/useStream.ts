import { useEffect, useRef, useState } from 'react'

import { MoneyStreamer, type StreamSnapshot } from '../chain/streamer'

export function useStream(streamer: MoneyStreamer | null): StreamSnapshot | null {
  const [snapshot, setSnapshot] = useState<StreamSnapshot | null>(() => streamer?.getSnapshot() ?? null)
  const dirty = useRef(true)

  useEffect(() => {
    if (!streamer) {
      setSnapshot(null)
      return
    }
    setSnapshot(streamer.getSnapshot())
    dirty.current = true
    const unsubscribe = streamer.subscribe(() => { dirty.current = true })
    let frame = 0
    const sample = () => {
      if (dirty.current) {
        dirty.current = false
        setSnapshot(streamer.getSnapshot())
      }
      frame = requestAnimationFrame(sample)
    }
    frame = requestAnimationFrame(sample)
    return () => {
      unsubscribe()
      cancelAnimationFrame(frame)
    }
  }, [streamer])

  return snapshot
}
