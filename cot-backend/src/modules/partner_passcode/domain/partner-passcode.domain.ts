export class PartnerPasscodeDomain {
  static generatePasscode(): string {
    const now = new Date();
    const month = now.getMonth() + 1; // Месяцы в JS начинаются с 0
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const timeString = `${month}-${day}-${hours}-${minutes}-${seconds}`;
    const timeHash = this.stringToBase36(timeString);
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${randomPart}${timeHash}`.toUpperCase();
  }

  static generatePasscodes(count: number): string[] {
    const passcodes: string[] = [];
    for (let i = 0; i < count; i++) {
      passcodes.push(this.generatePasscode());
    }
    console.log(JSON.stringify(passcodes));
    return passcodes;
  }

  // Преобразование в 32-битное целое
  private static stringToBase36(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }
}
