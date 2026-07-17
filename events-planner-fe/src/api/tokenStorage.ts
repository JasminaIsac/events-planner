export function getAccessToken() {
  return sessionStorage.getItem("accessToken");
}

export function setAccessToken(accessToken: string) {
  sessionStorage.setItem("accessToken", accessToken);
}

export function clearAccessToken() {
  sessionStorage.removeItem("accessToken");
}
