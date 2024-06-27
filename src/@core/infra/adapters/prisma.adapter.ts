import { PrismaClient } from '@prisma/client'

export class PrismaAdapter {
  prismaAdapter: PrismaClient

  constructor() {
    this.prismaAdapter = new PrismaClient({
      log: ['query']
    })
  }
}
