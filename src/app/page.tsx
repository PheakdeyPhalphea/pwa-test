"use client";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault(); // Prevent the default install prompt
      setDeferredPrompt(event); // Store the event to trigger it later
      setShowInstallMessage(true); // Show custom install message
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Trigger the native install prompt
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA installation");
      } else {
        console.log("User dismissed the PWA installation");
      }
      setDeferredPrompt(null); // Clear the deferred prompt event
      setShowInstallMessage(false); // Hide the custom install message
    } else {
      alert("Installation is not available.");
    }
  };

  return (
    <div className="w-full mx-auto text-center items-center h-screen flex flex-col justify-center">
      <p className="text-2xl ">Testing PWA</p>
      {showInstallMessage && (
        <div>
          <p className="text-lg my-10">Install our app for a better experience!</p>
          <button
            className="p-[10px] bg-blue-700 text-white rounded-lg"
            onClick={handleInstallClick}
          >
            Install App
          </button>
        </div>
      )}
    </div>
  );
}
