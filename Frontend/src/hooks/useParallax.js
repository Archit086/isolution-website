import { useEffect, useRef } from 'react'

export const useParallax = (speed = 0.3) => {
    const ref = useRef(null)

    useEffect(() => {
        let rafId
        const handleScroll = () => {
            rafId = requestAnimationFrame(() => {
                if (!ref.current) return
                // We calculate distance from the top of the parent container to create true depth
                const scrolled = window.scrollY
                const offset = (scrolled - ref.current.parentElement.offsetTop) * speed
                ref.current.style.transform = `translateY(${offset}px)`
            })
        }

        // Using passive: true to ensure scrolling performance isn't blocked
        window.addEventListener('scroll', handleScroll, { passive: true })

        // Initial call to set position
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            cancelAnimationFrame(rafId)
        }
    }, [speed])

    return ref
}
