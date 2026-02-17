export async function apiFetch(
  url: string,
  options: RequestInit = {},
  retry = true,
) {
  let res = await fetch(`http://localhost:3000${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  // If unauthorized, try refresh
  if (res.status === 401 && retry) {
    const refreshRes = await fetch(
      'http://localhost:3000/auth/refresh',
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (refreshRes.ok) {
      // retry original request once
      res = await apiFetch(url, options, false);
    }
  }

  return res;
}
