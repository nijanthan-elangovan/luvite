import type { Data } from "@puckeditor/core";

const STORAGE_KEY = "luvite_invitations";

export interface Invitation {
  slug: string;
  data: Data;
  createdAt: string;
  updatedAt: string;
}

function getAll(): Record<string, Invitation> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function saveInvitation(slug: string, data: Data): void {
  const all = getAll();
  const now = new Date().toISOString();
  all[slug] = {
    slug,
    data,
    createdAt: all[slug]?.createdAt ?? now,
    updatedAt: now,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getInvitation(slug: string): Invitation | null {
  const all = getAll();
  return all[slug] ?? null;
}

export function getAllInvitations(): Invitation[] {
  return Object.values(getAll());
}

export function deleteInvitation(slug: string): void {
  const all = getAll();
  delete all[slug];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
