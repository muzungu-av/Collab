export class PartnerPasscodeDomain {
  static generatePasscode(): string {
    // Логика генерации уникального passcode (например, случайная строка)
    return Math.random().toString(36).substring(2, 12).toUpperCase();
  }

  static generatePasscodes(count: number): string[] {
    const passcodes: string[] = [];
    for (let i = 0; i < count; i++) {
      passcodes.push(this.generatePasscode());
    }
    return passcodes;
  }
}
