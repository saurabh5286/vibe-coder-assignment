import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";
import { VerifiedBadge } from "./VerifiedBadge";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M followers`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K followers`;
  return `${count} followers`;
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const addProfile = useSelectedProfilesStore((state) => state.addProfile);
  const selectedProfiles = useSelectedProfilesStore(
    (state) => state.selectedProfiles
  );
  const isAdded = selectedProfiles.some((item) => item.username === profile.username);

  const handleClick = () => {
    onProfileClick?.(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    addProfile(profile, platform);
  };

  return (
    <article
      onClick={handleClick}
      className="group flex cursor-pointer flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_16px_40px_-22px_rgba(15,23,42,0.45)] transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-[0_20px_45px_-16px_rgba(139,92,246,0.35)] sm:flex-row sm:items-center"
      data-search={searchQuery}
    >
      <div className="flex items-center gap-3">
        <img
          src={profile.picture}
          alt={profile.fullname}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-violet-100"
        />
        <div className="min-w-0 text-left">
          <div className="font-semibold text-slate-900">
            @{profile.username}
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <div className="truncate text-sm text-slate-600">{profile.fullname}</div>
          <div className="text-sm text-slate-500">
            {formatFollowersLocal(profile.followers)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:ml-auto">
        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
          {platform}
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            isAdded
              ? "bg-emerald-600 text-white"
              : "bg-slate-900 text-white hover:bg-violet-700"
          }`}
        >
          {isAdded ? "Saved" : "Add to List"}
        </button>
      </div>
    </article>
  );
}
