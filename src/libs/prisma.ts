import { PrismaClient } from "@prisma/client";
import { NODE_ENV } from "../secrets";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
