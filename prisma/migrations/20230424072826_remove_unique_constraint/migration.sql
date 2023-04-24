/*
  Warnings:

  - You are about to drop the column `userName` on the `photographer` table. All the data in the column will be lost.
  - You are about to drop the column `FavoritePhoto` on the `photographerinfo` table. All the data in the column will be lost.
  - You are about to drop the column `PhotoPreference` on the `photographerinfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user]` on the table `photographer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `photographer_userName_key` ON `photographer`;

-- AlterTable
ALTER TABLE `account` MODIFY `providerAccountId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `photographer` DROP COLUMN `userName`,
    ADD COLUMN `user` VARCHAR(255) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `photographerinfo` DROP COLUMN `FavoritePhoto`,
    DROP COLUMN `PhotoPreference`,
    ADD COLUMN `careerStart` VARCHAR(255) NULL,
    ADD COLUMN `favoritePhoto` VARCHAR(255) NULL,
    ADD COLUMN `photoPreference` VARCHAR(255) NULL,
    MODIFY `country` VARCHAR(255) NULL,
    MODIFY `city` VARCHAR(255) NULL,
    MODIFY `about` VARCHAR(255) NULL,
    MODIFY `camera` VARCHAR(255) NULL,
    MODIFY `lens` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `photos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personID` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `filename` VARCHAR(191) NOT NULL,
    `filetype` VARCHAR(191) NOT NULL,
    `filesize` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `thumbnailUrl` VARCHAR(191) NULL,
    `dateTaken` DATETIME(3) NULL,
    `uploadDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `tags` JSON NULL,
    `privacy` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `photographer_user_key` ON `photographer`(`user`);

-- AddForeignKey
ALTER TABLE `photographerinfo` ADD CONSTRAINT `photographerinfo_personID_fkey` FOREIGN KEY (`personID`) REFERENCES `photographer`(`personID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_personID_fkey` FOREIGN KEY (`personID`) REFERENCES `photographer`(`personID`) ON DELETE RESTRICT ON UPDATE CASCADE;
