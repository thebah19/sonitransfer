const REMITEC_BASE_URL = process.env.REMITEC_API_BASE_URL ?? 'https://app.sonitransfer.com/api';

export async function remitecFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${REMITEC_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json'
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Remitec API request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}
