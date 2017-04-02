export default class ScolaError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.status = -1;
    this.code = -1;
    this.detail = null;
    this.stack = new Error(message).stack;

    this._parse();
  }

  toString(string = null, prefix = 'scola.error.') {
    if (string !== null) {
      return string.format(prefix + this.code, {
        detail: this.detail
      });
    }

    return 'Error:' +
      ' ' + this.status +
      ' ' + this.code +
      (this.detail !== null && this._status < 500 ?
        ' ' + this.detail : '');
  }

  _parse() {
    const match = this.message
      .match(/(Error: )?(\d{3})?\s?(\w+)\s?(.*)?/);

    if (match === null) {
      return;
    }

    this.status = Number(match[2]);
    this.code = match[3];
    this.detail = typeof match[4] === 'string' ?
      match[4] : null;
  }
}
