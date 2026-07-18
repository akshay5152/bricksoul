'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LanyardWrapper() {
  const rootRef = useRef(null);
  const [bootKey, setBootKey] = useState(0);

  useEffect(() => {
    const onBooted = (event) => {
      if (event.detail?.pageId && event.detail.pageId !== 'about') return;
      setBootKey((key) => key + 1);
    };
    window.addEventListener('chkstepan:booted', onBooted);
    return () => window.removeEventListener('chkstepan:booted', onBooted);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const card = root.querySelector('.card');
    const badge = root.querySelector('.hanging-card__badge');
    if (!card || !badge) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ctx;
    let idleTween = null;
    let ready = false;
    let dragging = false;
    let rafId = 0;

    const state = {
      rot: 0,
      rotY: 0,
      rotX: 0,
      scaleY: 1,
    };
    const target = {
      rot: 0,
      rotY: 0,
      rotX: 0,
      scaleY: 1,
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const stopIdle = () => {
      if (idleTween) {
        idleTween.kill();
        idleTween = null;
      }
    };

    const startIdle = () => {
      if (reducedMotion || dragging || !ready) return;
      stopIdle();
      idleTween = gsap.to(target, {
        rot: 3.5,
        duration: 2.1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        onUpdate: () => {
          target.rotY = target.rot * 0.45;
          target.rotX = -target.rot * 0.25;
          target.scaleY = 1;
        },
      });
    };

    const settleHome = () => {
      stopIdle();
      gsap.to(target, {
        rot: 0,
        rotY: 0,
        rotX: 0,
        scaleY: 1,
        duration: 1.35,
        ease: 'elastic.out(1, 0.45)',
        overwrite: true,
        onComplete: startIdle,
      });
    };

    const applyPointer = (clientX, clientY, isDrag) => {
      const pivot = root.getBoundingClientRect();
      const originX = pivot.left + pivot.width / 2;
      const originY = pivot.top + 8;

      const dx = clientX - originX;
      const dy = clientY - originY;
      const dist = Math.hypot(dx, dy) || 1;

      if (!isDrag && dist > 480) {
        if (!idleTween && Math.abs(target.rot) < 0.4) startIdle();
        else if (!idleTween) settleHome();
        return;
      }

      stopIdle();

      const maxAngle = isDrag ? 48 : 32;
      let angle = Math.atan2(dx, Math.max(dy, 24)) * (180 / Math.PI);
      angle = clamp(angle, -maxAngle, maxAngle);

      if (!isDrag) {
        const proximity = clamp(1 - dist / 480, 0, 1);
        angle *= proximity;
      }

      const stretch = isDrag
        ? clamp(dist / 150, 0.72, 1.35)
        : clamp(1 + (dy / dist) * 0.12 * clamp(1 - dist / 480, 0, 1), 0.88, 1.14);

      target.rot = angle;
      target.rotY = angle * 0.55;
      target.rotX = -angle * 0.35;
      target.scaleY = stretch;
    };

    const tick = () => {
      state.rot += (target.rot - state.rot) * 0.12;
      state.rotY += (target.rotY - state.rotY) * 0.12;
      state.rotX += (target.rotX - state.rotX) * 0.12;
      state.scaleY += (target.scaleY - state.scaleY) * 0.12;

      gsap.set(card, {
        rotation: state.rot,
        scaleY: state.scaleY,
        transformOrigin: 'top center',
      });
      gsap.set(badge, {
        rotateY: state.rotY,
        rotateX: state.rotX,
        scaleY: 1 / (state.scaleY || 1),
        transformOrigin: 'top center',
      });

      rafId = requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.set(card, {
          transformOrigin: 'top center',
          force3D: true,
        });
        gsap.set(badge, {
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
          force3D: true,
        });

        gsap.fromTo(
          card,
          { y: -520, rotation: -12, opacity: 0, scaleY: 1.08 },
          {
            y: 0,
            rotation: 0,
            opacity: 1,
            scaleY: 1,
            duration: 1.7,
            ease: 'bounce.out',
            delay: 0.05,
            onComplete: () => {
              ready = true;
              if (reducedMotion) return;
              rafId = requestAnimationFrame(tick);
              startIdle();
            },
          }
        );

        if (reducedMotion) return;

        const onPointerMove = (event) => {
          if (!ready) return;
          applyPointer(event.clientX, event.clientY, dragging);
        };

        const onPointerDown = (event) => {
          if (!ready) return;
          if (!event.target.closest('.hanging-card__badge')) return;
          dragging = true;
          stopIdle();
          badge.style.cursor = 'grabbing';
          applyPointer(event.clientX, event.clientY, true);
          event.preventDefault();
        };

        const onPointerUp = () => {
          if (!dragging) return;
          dragging = false;
          badge.style.cursor = 'grab';
          settleHome();
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
        badge.addEventListener('pointerdown', onPointerDown);

        root.__hangingHandlers = {
          onPointerMove,
          onPointerUp,
          onPointerDown,
        };
      }, rootRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      stopIdle();
      const handlers = root.__hangingHandlers;
      if (handlers) {
        window.removeEventListener('pointermove', handlers.onPointerMove);
        window.removeEventListener('pointerup', handlers.onPointerUp);
        window.removeEventListener('pointercancel', handlers.onPointerUp);
        badge.removeEventListener('pointerdown', handlers.onPointerDown);
        root.__hangingHandlers = null;
      }
      ctx?.revert();
    };
  }, [bootKey]);

  return (
    <div className="style-module-scss-module__-80N3q__lanyardWrapper">
      <div ref={rootRef} className="hanging-card-root">
        <div className="card hanging-card">
          <div className="hanging-card__strap" aria-hidden="true" />
          <div className="hanging-card__hook" aria-hidden="true" />
          <div className="hanging-card__badge">
            <div className="hanging-card__title">
              I Build
              <br />
              What You
              <br />
              Can&apos;t
              <br />
              Imagine
            </div>
            <p className="hanging-card__copy">
              Turning complex ideas into seamless digital products, built with
              precision, motion, and modern tools.
            </p>
            <div className="hanging-card__footer">
              <span>about</span>
              <span className="hanging-card__logo">
                <img
                  src="/images/brand/LogoDark.svg"
                  alt=""
                  width={23}
                  height={23}
                  draggable={false}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
