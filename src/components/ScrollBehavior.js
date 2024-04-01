import React, { useState, useEffect } from 'react';

export default function ScrollBehavior() {
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowArrow(true);
        }

        else {
            setShowArrow(false);
        }
    };

    const scrollToTop = () => {
        const scrollToTop = window.setInterval(() => {
            const pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 40); // how far to scroll on each step
            }

            else {
                window.clearInterval(scrollToTop);
            }
        }, 1); // scroll speed in milliseconds
    };

    return (
        <div className={`arrow-up ${showArrow ? 'active' : ''}`} onClick={scrollToTop}>
            <i className="ri-arrow-up-s-line ri-3x"></i>
        </div>
    );
}