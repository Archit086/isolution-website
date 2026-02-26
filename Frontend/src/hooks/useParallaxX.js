import { useEffect, useRef } from 'react'

export const useParallaxX = (speed = 0.1) => {
    const ref = useRef(null)

    useEffect(() => {
        let rafId
        const handleScroll = () => {
            rafId = requestAnimationFrame(() => {
                if (!ref.current) return

                // Calculate based on the element's distance to the viewport center
                const rect = ref.current.getBoundingClientRect()
                const centerY = rect.top + rect.height / 2
                const viewportCenter = window.innerHeight / 2

                // Distance from center determines drift amount
                const distFromCenter = centerY - viewportCenter
                ref.current.style.transform = `translateX(${distFromCenter * speed}px)`
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            cancelAnimationFrame(rafId)
        }
    }, [speed])

    return ref
}
