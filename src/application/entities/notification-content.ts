export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const minMaxContentLength = this.validateContentLength(content);
    if (!minMaxContentLength) {
      throw new Error(
        "Content Length error. Either exceeds it's length or too short.",
      );
    }
    this.content = content;
  }
}
