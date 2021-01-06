export default class Storage {
  static get(key) {
    const value = localStorage.getItem(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  }

  static set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key) {
    if (this.has(key)) {
      localStorage.removeItem(key);
    }
  }

  static has(key) {
    return this.get(key) !== null;
  }
}
