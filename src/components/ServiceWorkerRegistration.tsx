"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
          function (registration) {
            console.log("ServiceWorker registration successful");
          },
          function (err) {
            console.log("ServiceWorker registration failed: ", err);
          }
        );
      });

      // Handle PWA install prompt
      let deferredPrompt: any;
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
      });
    }
  }, []);

  return null;
}
