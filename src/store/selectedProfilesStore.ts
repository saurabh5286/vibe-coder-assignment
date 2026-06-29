import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ListedProfile, Platform, UserProfileSummary } from "@/types";

interface SelectedProfilesState {
  selectedProfiles: ListedProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => void;
  removeProfile: (username: string) => void;
  clearProfiles: () => void;
}

export const useSelectedProfilesStore = create<SelectedProfilesState>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],
      addProfile: (profile, platform) => {
        const alreadySaved = get().selectedProfiles.some(
          (item) => item.username === profile.username
        );

        if (alreadySaved) {
          return;
        }

        set((state) => ({
          selectedProfiles: [...state.selectedProfiles, { ...profile, platform }],
        }));
      },
      removeProfile: (username) => {
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (item) => item.username !== username
          ),
        }));
      },
      clearProfiles: () => set({ selectedProfiles: [] }),
    }),
    {
      name: "influencer-list",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
