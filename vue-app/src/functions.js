
export async function authInfo() {
  const response = await fetch('/.auth/me');
  const payload = await response.json();
  const { clientPrincipal } = payload;
  return clientPrincipal;
}

export default function getAuthUserDetails() {
  authInfo().then((result) => {
    if (result === null) {
      return null;
    }
    const info = JSON.parse(result);
    return info.clientPrincipal.userDetails;
  });
}
