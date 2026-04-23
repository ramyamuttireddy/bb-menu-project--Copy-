import { useEffect } from "react";

export default function usePullToRefresh(onRefresh) {
  useEffect(() => {
    let startY = 0;
    let endY = 0;

    const threshold = 80; // drag distance

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      endY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (endY - startY > threshold) {
        onRefresh(); // 🔥 trigger refresh
      }
    };

    // Mobile
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Desktop drag (mouse)
    let mouseStart = 0;
    let mouseEnd = 0;
    let isDown = false;

    const handleMouseDown = (e) => {
      isDown = true;
      mouseStart = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      mouseEnd = e.clientY;
    };

    const handleMouseUp = () => {
      if (mouseEnd - mouseStart > threshold) {
        onRefresh();
      }
      isDown = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onRefresh]);
}