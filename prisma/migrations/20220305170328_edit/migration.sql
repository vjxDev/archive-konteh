/*
  Warnings:

  - You are about to drop the column `roomID` on the `desk` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `Desk` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `desk` DROP FOREIGN KEY `Desk_roomID_fkey`;

-- AlterTable
ALTER TABLE `desk` DROP COLUMN `roomID`,
    ADD COLUMN `roomId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Desk` ADD CONSTRAINT `Desk_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
