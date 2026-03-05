import { useEffect, useRef } from 'react';

export default function CursorThread() {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dot = dotRef.current;
    if (!canvas || !dot) return;

    const ctx = canvas.getContext('2d');
    let pts = [];
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const mx = e.clientX, my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      pts.push({ x: mx, y: my, age: 0 });
      if (pts.length > 52) pts.shift();
    };
    document.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts = pts.map(p => ({ ...p, age: p.age + 1 })).filter(p => p.age < 52);
      if (pts.length > 1) {
        for (let i = 1; i < pts.length; i++) {
          const t = 1 - pts[i].age / 52;
          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x, pts[i].y);
          ctx.strokeStyle = `rgba(200,160,76,${t * t * 0.46})`;
          ctx.lineWidth = 1.4 * t;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="threadCanvas" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
