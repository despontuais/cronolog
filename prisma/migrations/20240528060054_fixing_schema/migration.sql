/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Comentario` (
    `ID_Comentario` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Usuario` INTEGER NOT NULL,
    `ID_Midia` INTEGER NOT NULL,
    `Texto` VARCHAR(255) NOT NULL,
    `DT_Comentario` DATE NOT NULL,

    UNIQUE INDEX `Comentario_ID_Comentario_key`(`ID_Comentario`),
    INDEX `FK_ID_Midia`(`ID_Midia`),
    INDEX `FK_ID_Usuario`(`ID_Usuario`),
    PRIMARY KEY (`ID_Comentario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Linha_do_tempo` (
    `ID_LinhaTempo` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Usuario` INTEGER NOT NULL,
    `ID_Midia` INTEGER NOT NULL,
    `Descricao` TEXT NOT NULL,
    `Classificacao` VARCHAR(255) NULL,
    `DT_Comentario` DATE NULL,

    UNIQUE INDEX `Linha_do_tempo_ID_LinhaTempo_key`(`ID_LinhaTempo`),
    INDEX `FK_ID_Midia`(`ID_Midia`),
    INDEX `FK_ID_Usuario`(`ID_Usuario`),
    PRIMARY KEY (`ID_LinhaTempo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Midia` (
    `ID_Midia` INTEGER NOT NULL AUTO_INCREMENT,
    `Titulo` VARCHAR(255) NOT NULL,
    `Tipo` VARCHAR(255) NOT NULL,
    `DT_Lancamento` DATE NOT NULL,
    `ID_API` INTEGER NOT NULL,

    UNIQUE INDEX `Midia_ID_Midia_key`(`ID_Midia`),
    PRIMARY KEY (`ID_Midia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Segue` (
    `ID_Segue` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Seguidor` INTEGER NOT NULL,
    `ID_Seguido` INTEGER NOT NULL,

    UNIQUE INDEX `Segue_ID_Segue_key`(`ID_Segue`),
    INDEX `FK_ID_Usuario`(`ID_Seguidor`, `ID_Seguido`),
    PRIMARY KEY (`ID_Segue`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `ID_Usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome_Usuario` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `Senha` VARCHAR(255) NOT NULL,
    `DT_nascimento` DATE NOT NULL,

    UNIQUE INDEX `Usuario_Nome_Usuario_key`(`Nome_Usuario`),
    UNIQUE INDEX `Usuario_Email_key`(`Email`),
    PRIMARY KEY (`ID_Usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
