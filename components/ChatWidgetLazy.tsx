"use client";

// Lazy, idle-mounted wrapper around the Scout chat widget.
// The chat bundle is heavy client JS; mounting it during initial hydration was a
// major contributor to mobile Total Blocking Time. This wrapper keeps it out of
// the critical path and mounts it on the first of: browser idle, first user
// interaction, or an "ec:open-scout" request from any "Get a Quote" button.
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export default function ChatWidgetLazy() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let done = false;
    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, onInteract));
      window.removeEventListener("ec:open-scout", onOpenScout as EventListener);
    };
    const mount = () => {
      if (done) return;
      done = true;
      setShow(true);
      cleanup();
    };
    const onInteract = () => mount();
    // If a quote button asks Scout to open before it has mounted, mount now and
    // re-dispatch so the freshly-mounted widget receives its own open event.
    const onOpenScout = () => {
      const wasMounted = done;
      mount();
      if (!wasMounted) {
        setTimeout(() => window.dispatchEvent(new Event("ec:open-scout")), 60);
      }
    };

    events.forEach((e) =>
      window.addEventListener(e, onInteract, { once: true, passive: true })
    );
    window.addEventListener("ec:open-scout", onOpenScout as EventListener);

    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }).requestIdleCallback;
    const idleId = ric
      ? ric(mount, { timeout: 2500 })
      : (setTimeout(mount, 1800) as unknown as number);

    return () => {
      cleanup();
      const cic = (window as unknown as {
        cancelIdleCallback?: (id: number) => void;
      }).cancelIdleCallback;
      if (cic) cic(idleId);
      else clearTimeout(idleId as unknown as ReturnType<typeof setTimeout>);
    };
  }, []);

  return show ? <ChatWidget /> : null;
}
