export default class ScolaError extends Error {
  constructor(message, prefix = 'scola.error.') {
    super(message);

    const match = this.message.match(/(Error: )?(\d{3})?\s?(\w+)\s?(.*)?/);

    if (!match) {
      return;
    }

    this.prefix = prefix;
    this.status = Number(match[2]);
    this.code = match[3];
    this.detail = match[4];
  }

  toString(i18n, prefix) {
    if (typeof i18n === 'undefined') {
      return 'Error: ' + this.status + ' ' + this.code +
        (this.detail && this.status < 500 ? ' ' + this.detail : '');
    }

    prefix = prefix || this.prefix;

    return i18n.string().format(prefix + this.code, {
      detail: this.detail
    });
  }
}
