import { useEffect, useState } from "react";

const InstallPWAAlert = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(event);
      setShowButton(true); // Show install button

      // Inform the user via an alert
      alert("You can install our app! Click the 'Install App' button.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show install prompt
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShowButton(false); // Hide button after interaction
      });
    }
  };

  return showButton ? (
    <button
      onClick={handleInstallClick}
      style={{ padding: "10px", background: "blue", color: "white" }}
    >
      Install App
    </button>
  ) : null;
};

export default InstallPWAAlert;
