'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        // Touch devices have no real cursor — leave the native one alone
        if (window.matchMedia('(hover: none)').matches) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mx = -100, my = -100, rx = -100, ry = -100;
        let raf;

        const onMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top = my + 'px';
        };
        document.addEventListener('mousemove', onMove);

        const loop = () => {
            rx += (mx - rx) * 0.13;
            ry += (my - ry) * 0.13;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
            raf = requestAnimationFrame(loop);
        };
        loop();

        const onOver = (e) => {
            const t = e.target.closest('a,button,[data-tilt],.prop-tab');
            dot.classList.toggle('is-hovering', !!t);
            ring.classList.toggle('is-hovering', !!t);
        };
        document.addEventListener('mouseover', onOver);

        return () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div className="cursor" ref={dotRef} aria-hidden="true"></div>
            <div className="cursor-ring" ref={ringRef} aria-hidden="true"></div>
        </>
    );
}