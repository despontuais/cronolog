/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`;

-- CreateTable
CREATE TABLE `comentario` (
    `ID_Comentario` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Usuario` INTEGER NULL,
    `ID_Midia` INTEGER NULL,
    `Texto` VARCHAR(255) NULL,
    `DT_Comentario` DATE NULL,

    UNIQUE INDEX `comentario_ID_Comentario_key`(`ID_Comentario`),
    INDEX `FK_ID_Midia`(`ID_Midia`),
    INDEX `FK_ID_Usuario`(`ID_Usuario`),
    PRIMARY KEY (`ID_Comentario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `linha_do_tempo` (
    `ID_LinhaTempo` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Usuario` INTEGER NULL,
    `ID_Midia` INTEGER NULL,
    `Notas` VARCHAR(255) NULL,
    `Classificacao` VARCHAR(255) NULL,
    `DT_Comentario` DATE NULL,

    UNIQUE INDEX `linha_do_tempo_ID_LinhaTempo_key`(`ID_LinhaTempo`),
    INDEX `FK_ID_Midia`(`ID_Midia`),
    INDEX `FK_ID_Usuario`(`ID_Usuario`),
    PRIMARY KEY (`ID_LinhaTempo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `midia` (
    `ID_Midia` INTEGER NOT NULL AUTO_INCREMENT,
    `Titulo` VARCHAR(255) NULL,
    `Tipo` VARCHAR(255) NULL,
    `DT_Lancamento` DATE NULL,

    UNIQUE INDEX `midia_ID_Midia_key`(`ID_Midia`),
    PRIMARY KEY (`ID_Midia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `segue` (
    `ID_Segue` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Seguidor` INTEGER NULL,
    `ID_Seguido` INTEGER NULL,

    UNIQUE INDEX `segue_ID_Segue_key`(`ID_Segue`),
    INDEX `FK_ID_Usuario`(`ID_Seguidor`, `ID_Seguido`),
    PRIMARY KEY (`ID_Segue`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
