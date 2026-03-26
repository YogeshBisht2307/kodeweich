-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Primary', 'Contributor');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'Contributor';
