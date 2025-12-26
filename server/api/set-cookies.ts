export default defineEventHandler((event) => {
  setCookie(event, "pathumToken", "this is the cookie", {
    maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return {
    success: true,
    message: "Cookie set successfully",
  };
});
