"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { useAuthToken } from "@convex-dev/auth/react";
import Nav from "@/components/Nav";
import AuthForm from "@/components/AuthForm";
import { parseHandoffParams, isAllowedExtensionId, sendTokenToExtension } from "@/lib/extensionHandoff";

type HandoffState = "idle" | "sending" | "done" | "error";

function AuthPageInner() {
  const searchParams = useSearchParams();
  const { source, extensionId, nonce, silent } = parseHandoffParams(searchParams);
  const isExtensionHandoff = source === "extension" && isAllowedExtensionId(extensionId) && !!nonce;

  const { isAuthenticated, isLoading } = useConvexAuth();
  const token = useAuthToken();

  const [handoffState, setHandoffState] = useState<HandoffState>("idle");
  const [handoffError, setHandoffError] = useState<string | null>(null);

  const redirectTo = isExtensionHandoff
    ? `/auth?source=extension&extensionId=${encodeURIComponent(extensionId!)}&nonce=${encodeURIComponent(nonce!)}`
    : "/auth";

  useEffect(() => {
    if (!isExtensionHandoff) return;
    if (!isAuthenticated || !token) return;
    if (handoffState !== "idle") return;

    setHandoffState("sending");
    sendTokenToExtension(extensionId!, nonce!, token)
      .then((res) => {
        if (res.ok) {
          setHandoffState("done");
        } else {
          setHandoffState("error");
          setHandoffError(res.error || "The extension rejected the sign-in.");
        }
      })
      .catch((err) => {
        setHandoffState("error");
        setHandoffError(err?.message || "Could not reach the extension.");
      });
  }, [isExtensionHandoff, isAuthenticated, token, handoffState, extensionId, nonce]);

  const showSignInForm = !isExtensionHandoff || !isAuthenticated;

  return (
    <>
      <Nav />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        {isLoading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading…</p>
        ) : isExtensionHandoff && isAuthenticated ? (
          <div className="text-center max-w-sm">
            {handoffState === "sending" && (
              <p className="text-gray-600 dark:text-gray-300">Signing you into the Pipi extension…</p>
            )}
            {handoffState === "done" && (
              <>
                <i className="fa-solid fa-circle-check text-secondary text-4xl mb-4" />
                <p className="text-gray-700 dark:text-gray-200 font-medium">You&apos;re signed in.</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  This tab should close automatically. You can also close it now.
                </p>
              </>
            )}
            {handoffState === "error" && !silent && (
              <>
                <p className="text-red-500 font-medium">Couldn&apos;t sign the extension in.</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{handoffError}</p>
              </>
            )}
            {handoffState === "error" && silent && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">Refreshing your session…</p>
            )}
          </div>
        ) : silent ? (
          // Silent refresh: this site's own session already expired too — don't
          // show a form, let the extension fall back to an interactive sign-in.
          <p className="text-gray-500 dark:text-gray-400 text-sm">Session expired.</p>
        ) : (
          showSignInForm && (
            <>
              {isExtensionHandoff && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center max-w-sm">
                  Sign in to connect your Pipi extension.
                </p>
              )}
              <AuthForm redirectTo={redirectTo} />
            </>
          )
        )}
      </main>
    </>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthPageInner />
    </Suspense>
  );
}
