import React from 'react'

export function useWindowSize() {
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });
    return size
}