/* eslint no-undefined: 0 */

export default class ScolaError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.status = -1;
    this.code = -1;
    this.detail = null;
    this.stack = new Error(message).stack;

    this._prefix = {
      string: 'scola.error.'
    };

    this._parse();
  }

  prefix(name, value = null) {
    if (value === null) {
      return this._prefix[name];
    }

    this._prefix[name] = value + '.';
    return this;
  }

  toString(string = null) {
    if (string !== null) {
      return string.format(this._prefix.string + this.code, {
        detail: this.detail
      });
    }

    return 'Error:' +
      ' ' + this.status +
      ' ' + this.code +
      (this.detail !== null && this.status < 500 ?
        ' ' + this.detail : '');
  }

  toJSON() {
    return {
      errors: [{
        status: this.status,
        code: this.code,
        detail: this.detail !== null && this.status < 500 ?
          this.detail : undefined
      }]
    };
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
