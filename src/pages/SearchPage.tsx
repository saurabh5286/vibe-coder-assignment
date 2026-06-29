import { useMemo, useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { SelectedProfilesPanel } from "@/components/SelectedProfilesPanel";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  return (
    <Layout title="Discover talent" subtitle="Search across Instagram, YouTube, and TikTok in a faster, calmer workflow.">
      <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
        <div className="space-y-6">
          <PlatformFilter
            selected={platform}
            onChange={(p) => {
              setPlatform(p);
              setSearchQuery("");
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="rounded-4xl border border-slate-200 bg-white/80 p-5 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.35)]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">Matching creators</p>
                <p className="text-sm text-slate-500">
                  Showing {filtered.length} of {allProfiles.length} results for {platform}
                </p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {searchQuery ? `Filtered by “${searchQuery}”` : "Fresh results"}
              </div>
            </div>
            <ProfileList
              profiles={filtered}
              platform={platform}
              searchQuery={searchQuery}
              onProfileClick={() => undefined}
            />
          </div>
        </div>

        <SelectedProfilesPanel />
      </div>
    </Layout>
  );
}
