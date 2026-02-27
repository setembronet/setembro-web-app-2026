'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { recordAnalytics } from '@/actions/record-analytics';
import { v4 as uuidv4 } from 'uuid';

export function NexusTracker({ postId }: { postId: string }) {
    const searchParams = useSearchParams();

    // Engagement Time Tracking
    const [secondsActive, setSecondsActive] = useState(0);
    const lastActiveTimeRef = useRef<number>(Date.now());
    const isVisibleRef = useRef<boolean>(true);

    // Scroll Tracking
    const [maxScroll, setMaxScroll] = useState(0);

    // Visitor ID (Anonymous Fingerprint)
    const getOrSetVisitorId = () => {
        if (typeof window === 'undefined') return '';
        let vid = localStorage.getItem('nexus_vid');
        if (!vid) {
            vid = uuidv4();
            localStorage.setItem('nexus_vid', vid);
        }
        return vid;
    };

    // Tracking Loop
    useEffect(() => {
        // Setup initial metadata
        const visitor_id = getOrSetVisitorId();
        const utm_source = searchParams.get('utm_source') || sessionStorage.getItem('utm_source') || undefined;
        const utm_medium = searchParams.get('utm_medium') || sessionStorage.getItem('utm_medium') || undefined;
        const utm_campaign = searchParams.get('utm_campaign') || sessionStorage.getItem('utm_campaign') || undefined;

        // Save UTMs to session for persistence across navigation
        if (searchParams.get('utm_source')) sessionStorage.setItem('utm_source', searchParams.get('utm_source')!);
        if (searchParams.get('utm_medium')) sessionStorage.setItem('utm_medium', searchParams.get('utm_medium')!);
        if (searchParams.get('utm_campaign')) sessionStorage.setItem('utm_campaign', searchParams.get('utm_campaign')!);

        const referrer = document.referrer;
        const isMobile = window.innerWidth < 768;

        // --- 1. Engagement Time Tracking ---
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Tab inactive, calculate time spent so far
                const elapsed = Math.floor((Date.now() - lastActiveTimeRef.current) / 1000);
                if (elapsed > 0) {
                    setSecondsActive(prev => prev + elapsed);
                    // Commit to DB proactively when tab loses focus
                    flushData(elapsed);
                }
                isVisibleRef.current = false;
            } else {
                // Tab active again
                lastActiveTimeRef.current = Date.now();
                isVisibleRef.current = true;
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Periodic flush to ensure we don't lose data if user just closes window abruptly
        const interval = setInterval(() => {
            if (isVisibleRef.current) {
                const elapsed = Math.floor((Date.now() - lastActiveTimeRef.current) / 1000);
                if (elapsed > 5) { // Only flush if they've been active for >5s in this tick
                    setSecondsActive(prev => prev + elapsed);
                    flushData(elapsed);
                    lastActiveTimeRef.current = Date.now();
                }
            }
        }, 10000); // Flush every 10 seconds

        // --- 2. Scroll Tracking ---
        const handleScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const scrollPercent = (h.scrollTop || b.scrollTop) / ((h.scrollHeight || b.scrollHeight) - h.clientHeight) * 100;
            const currentScroll = Math.round(scrollPercent);

            if (currentScroll > maxScroll) {
                setMaxScroll(currentScroll);
            }
        };

        // Throttle scroll listener
        let ticking = false;
        const scrollListener = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollListener);

        // Function that physically sends the data to the API
        const flushData = async (incrementalSeconds: number) => {
            if (incrementalSeconds === 0 && maxScroll === 0) return;

            await recordAnalytics({
                post_id: postId,
                visitor_id,
                utm_source,
                utm_medium,
                utm_campaign,
                referrer_url: referrer,
                device_type: isMobile ? 'mobile' : 'desktop',
                engagement_time_seconds: incrementalSeconds,
                max_scroll_depth: maxScroll,
                // LCP could also be passed here if wired up to next/web-vitals
            }).catch(console.error);
        };

        // Initial hit
        flushData(0);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('scroll', scrollListener);
            clearInterval(interval);

            // Final flush on unmount
            if (isVisibleRef.current) {
                const elapsed = Math.floor((Date.now() - lastActiveTimeRef.current) / 1000);
                flushData(elapsed);
            }
        };
    }, [postId, maxScroll, searchParams]);

    // Render nothing - this is purely functional
    return null;
}
