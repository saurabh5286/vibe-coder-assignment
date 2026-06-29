import { Link } from "react-router-dom";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";
import { formatFollowers } from "@/utils/formatters";
import { getPlatformLabel } from "@/utils/dataHelpers";

export function SelectedProfilesPanel() {
  const selectedProfiles = useSelectedProfilesStore(
    (state) => state.selectedProfiles
  );
  const removeProfile = useSelectedProfilesStore((state) => state.removeProfile);

  return (
    <aside className="rounded-4xl border border-slate-200 bg-white/85 p-5 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.4)] backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Saved list</p>
          <p className="text-sm text-slate-500">
            {selectedProfiles.length} profile
            {selectedProfiles.length === 1 ? "" : "s"} ready to review
          </p>
        </div>
        <div className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
          {selectedProfiles.length}/10
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {selectedProfiles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
            Save creators here to build your shortlist.
          </div>
        ) : (
          selectedProfiles.map((profile) => (
            <div
              key={profile.username}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    to={`/profile/${profile.username}?platform=${profile.platform}`}
                    className="font-semibold text-slate-900 transition hover:text-violet-700"
                  >
                    @{profile.username}
                  </Link>
                  <p className="truncate text-sm text-slate-500">
                    {profile.fullname}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-white px-2.5 py-1">
                      {getPlatformLabel(profile.platform)}
                    </span>
                    <span>{formatFollowers(profile.followers)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeProfile(profile.username)}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-rose-300 hover:text-rose-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
