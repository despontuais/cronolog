/*
  Warnings:

  - Made the column `title` on table `media` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `media` ADD COLUMN `chronological_date` TIMESTAMP(0) NULL,
    MODIFY `title` VARCHAR(255) NOT NULL;
