export class ServerErrorException extends Error {
  private code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }

  get Code(): string | undefined {
    return this.code;
  }

  get Message(): string {
    return this.message;
  }

  get Stack(): string | undefined {
    return this.stack;
  }
}
