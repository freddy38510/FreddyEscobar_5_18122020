export default class Client {
  constructor() {
    this.baseUrl = process.env.API_BASE_URL;
  }

  async read(endpoint) {
    const res = await Client.request('GET', this.baseUrl + endpoint);

    return Client.parseResponse(res);
  }

  async create(endpoint, data) {
    const res = await Client.request('POST', this.baseUrl + endpoint, data);

    return Client.parseResponse(res);
  }

  static async request(method, endpoint, body = null) {
    return fetch(endpoint, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });
  }

  static async parseResponse(res) {
    try {
      if (!res.ok) throw Error(`(${res.status}) ${res.statusText}`);

      return await res.json();
    } catch (error) {
      // Client Error
      throw Error(error);
    }
  }
}
