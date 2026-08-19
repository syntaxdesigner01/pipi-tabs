// Minimal ambient declaration for the subset of chrome.runtime used to hand
// the auth token back to the extension. This site is a normal web page, not
// an extension — we don't want the full @types/chrome surface here.
interface Chrome {
  runtime?: {
    sendMessage(
      extensionId: string,
      message: unknown,
      responseCallback?: (response: any) => void
    ): void;
    lastError?: { message?: string };
  };
}

declare const chrome: Chrome | undefined;
