export default class Client {
  constructor() {
    this.baseUrl = process.env.API_BASE_URL;
  }

  async read(endpoint) {
    const res = await request('GET', this.baseUrl + endpoint);

    return parseResponse(res);
  }

  async create(endpoint, data) {
    const res = await request('POST', this.baseUrl + endpoint, data);

    return parseResponse(res);
  }
}

async function request(method, endpoint, body = null) {
  const data = body === null ? null : JSON.stringify(body);

  return fetch(endpoint, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  });
}

async function parseResponse(res) {
  try {
    if (!res.ok) throw Error(`(${res.status}) ${res.statusText}`);

    return await res.json();
  } catch (error) {
    // Client Error
    throw Error(error);
  }
}
