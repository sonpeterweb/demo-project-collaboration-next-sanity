/** True when CI uses the placeholder Sanity project (no real CMS dataset). */
export function isCiSanityEnvironment(): boolean {
  return (
    process.env.CI === "true" ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "ci-sanity-project"
  );
}
