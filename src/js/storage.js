export default class Storage {
  static get(key) {
    const value = localStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  }

  static set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  static unset(key) {
    if (this.isset(key)) return localStorage.removeItem(key);
    return null;
  }

  static clear() {
    return localStorage.clear();
  }

  static isset(key) {
    return this.get(key) !== null;
  }
}
