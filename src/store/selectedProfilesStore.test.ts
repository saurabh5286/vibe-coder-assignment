import { beforeEach, describe, expect, it } from "vitest";
import type { UserProfileSummary } from "@/types";
import { useSelectedProfilesStore } from "./selectedProfilesStore";

const storage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
  clear: () => {
    storage.clear();
  },
};

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  configurable: true,
});

const demoProfile: UserProfileSummary = {
  user_id: "1",
  username: "demo",
  url: "https://example.com/demo",
  picture: "https://placehold.co/100x100",
  fullname: "Demo Creator",
  is_verified: true,
  followers: 120000,
};

describe("selectedProfilesStore", () => {
  beforeEach(() => {
    localStorageMock.clear();
    useSelectedProfilesStore.setState({ selectedProfiles: [] });
  });

  it("keeps unique items and allows removal", () => {
    useSelectedProfilesStore.getState().addProfile(demoProfile, "instagram");
    useSelectedProfilesStore.getState().addProfile(demoProfile, "youtube");

    expect(useSelectedProfilesStore.getState().selectedProfiles).toHaveLength(1);

    useSelectedProfilesStore.getState().removeProfile(demoProfile.username);

    expect(useSelectedProfilesStore.getState().selectedProfiles).toHaveLength(0);
  });
});
