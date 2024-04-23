import {
  compare,
  compareSync,
  genSalt,
  genSaltSync,
  hash,
  hashSync,
} from 'bcryptjs'

export class PasswordHelper {
  private static saltRounds = 8

  static async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.saltRounds)

    const hashedPassword = await hash(password, salt)

    return hashedPassword
  }

  static hashSyncPassword(password: string): string {
    const salt = genSaltSync(this.saltRounds)

    const hashedPassword = hashSync(password, salt)

    return hashedPassword
  }

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const match = await compare(password, hashedPassword)

    return match
  }

  static compareSyncPassword(
    password: string,
    hashedPassword: string,
  ): boolean {
    return compareSync(password, hashedPassword)
  }
}
