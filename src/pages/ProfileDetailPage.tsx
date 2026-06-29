import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  const addProfile = useSelectedProfilesStore((state) => state.addProfile);
  const removeProfile = useSelectedProfilesStore((state) => state.removeProfile);
  const selectedProfiles = useSelectedProfilesStore(
    (state) => state.selectedProfiles
  );

  const isSelected = useMemo(
    () => !!username && selectedProfiles.some((item) => item.username === username),
    [selectedProfiles, username]
  );

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout title="Profile unavailable" subtitle="The requested creator could not be found.">
        <p className="text-slate-600">Invalid profile</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-violet-700">
          Back to search
        </Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`} subtitle="Loading profile data…">
        <p className="text-slate-500">Loading...</p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`} subtitle="The profile could not be loaded.">
        <p className="mb-4 text-red-600">
          Could not load profile details for {username}
        </p>
        <Link to="/" className="text-sm font-medium text-violet-700 underline">
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  return (
    <Layout title={user.fullname} subtitle={`A closer look at ${user.username} on ${platform}.`}>
      <Link to="/" className="mb-4 inline-block text-sm font-medium text-violet-700">
        ← Back to search
      </Link>

      <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-[0_24px_70px_-24px_rgba(15,23,42,0.45)] md:flex-row md:items-start md:p-8">
        <img
          src={user.picture}
          alt={user.fullname}
          className="h-24 w-24 rounded-full border border-slate-200 object-cover shadow-sm"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-semibold text-slate-900">
              @{user.username}
            </h2>
            <VerifiedBadge verified={user.is_verified} />
          </div>
          <p className="mt-1 text-slate-600">{user.fullname}</p>
          <p className="mt-2 text-sm text-slate-500">Platform: {platform}</p>

          {user.description && (
            <p className="mt-4 text-sm leading-6 text-slate-700">{user.description}</p>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-sm text-slate-500">Followers</div>
              <div className="mt-1 font-semibold text-slate-900">
                {formatFollowersDetail(user.followers)}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-sm text-slate-500">Engagement Rate</div>
              <div className="mt-1 font-semibold text-slate-900">
                {user.engagement_rate !== undefined
                  ? `${(user.engagement_rate * 100).toFixed(2)}%`
                  : "N/A"}
              </div>
            </div>
            {user.posts_count !== undefined && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-sm text-slate-500">Posts</div>
                <div className="mt-1 font-semibold text-slate-900">{user.posts_count}</div>
              </div>
            )}
            {user.avg_likes !== undefined && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-sm text-slate-500">Avg Likes</div>
                <div className="mt-1 font-semibold text-slate-900">
                  {formatFollowersDetail(user.avg_likes)}
                </div>
              </div>
            )}
            {user.avg_comments !== undefined && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-sm text-slate-500">Avg Comments</div>
                <div className="mt-1 font-semibold text-slate-900">{user.avg_comments}</div>
              </div>
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-sm text-slate-500">Avg Views</div>
                <div className="mt-1 font-semibold text-slate-900">
                  {formatFollowersDetail(user.avg_views)}
                </div>
              </div>
            )}
            {user.engagements !== undefined && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-sm text-slate-500">Engagements</div>
                <div className="mt-1 font-semibold text-slate-900">
                  {formatEngagementRate(user.engagement_rate)}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
              >
                View on platform →
              </a>
            )}
            <button
              type="button"
              onClick={() => {
                if (isSelected) {
                  removeProfile(username);
                  return;
                }
                addProfile(user, platform as "instagram" | "youtube" | "tiktok");
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isSelected
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-900 text-white hover:bg-violet-700"
              }`}
            >
              {isSelected ? "Saved to list" : "Add to List"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
