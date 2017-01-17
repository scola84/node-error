export default class ScolaError extends Error {
  constructor(message = '', prefix = 'scola.error.') {
    super(message);

    this.message = message;
    this.prefix = prefix;
    this.status = -1;
    this.code = -1;
    this.detail = null;

    this._parse();
  }

  toString(string = null, prefix = null) {
    if (string === null) {
      return 'Error: ' + this.status + ' ' + this.code +
        (this.detail && this.status < 500 ? ' ' + this.detail : '');
    }

    prefix = prefix || this.prefix;

    return string.format(prefix + this.code, {
      detail: this.detail
    });
  }

  static fromError(error, message) {
    if (error.status) {
      return error;
    }

    return new ScolaError(message + ' ' + error.message);
  }

  _parse() {
    const match = this.message.match(/(Error: )?(\d{3})?\s?(\w+)\s?(.*)?/);

    if (!match) {
      return;
    }

    this.status = Number(match[2]);
    this.code = match[3];
    this.detail = match[4];
  }
}
