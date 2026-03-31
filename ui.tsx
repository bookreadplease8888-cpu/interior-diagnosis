import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "interior_admin_session";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export async function createAdminSession() {
  const token = `admin:${Date.now()}`;
  const signed = `${token}.${sign(token)}`;
  const store = await cookies();
  store.set(COOKIE_NAME, signed, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [token, signature] = value.split(".");
  if (!token || !signature) return false;
  return sign(token) === signature;
}
