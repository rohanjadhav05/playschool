import React, { useEffect, useRef } from 'react'

export default function VideoPlayer({ src, className }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      return
    }

    let hls
    import('hls.js').then(({ default: Hls }) => {
      if (!Hls.isSupported()) return
      hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
    })

    return () => {
      if (hls) hls.destroy()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      className={className}
    />
  )
}
