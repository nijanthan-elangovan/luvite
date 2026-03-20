import crypto from "crypto";
import { cookies } from "next/headers";

const AUTH_COOKIE = "luvite_auth";
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 14;

function getAuthSecret() {
  if (!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET environment variable is required");
  }
  return process.env.AUTH_SECRET;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, savedHash] = stored.split(":");
  if (!salt || !savedHash) return false;
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(savedHash));
}

export function signAuthToken(payload: { userId: number; email: string; name: string }) {
  const body = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };
  const encoded = base64UrlEncode(JSON.stringify(body));
  const signature = crypto
    .createHmac("sha256", getAuthSecret())
    .update(encoded)
    .digest("base64url");

  return `${encoded}.${signature}`;
}

export function verifyAuthToken(token?: string | null) {
  if (!token) return null;

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = crypto
    .createHmac("sha256", getAuthSecret())
    .update(encoded)
    .digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encoded)) as {
      userId: number;
      email: string;
      name: string;
      exp: number;
    };

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getAuthCookieName() {
  return AUTH_COOKIE;
}

export async function getCurrentUserFromCookies() {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  return verifyAuthToken(token);
}
