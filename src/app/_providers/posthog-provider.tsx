// app/providers.js
"use client";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { env } from "~/env";
import { useEffect } from "react";
// import SuspendedPostHogPageView from "./PostHogPageView";

import dynamicLoader from "next/dynamic";

const SuspendedPostHogPageView = dynamicLoader(
  () => import("./PostHogPageView"),
  {
    ssr: false,
  },
);

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/ingest",

      ui_host: "https://us.posthog.com",
      capture_pageview: false, // Disable automatic pageview capture, as we're using Next.js
      // person_profiles: "identified_only", // or "always" to create profiles for anonymous users
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}
