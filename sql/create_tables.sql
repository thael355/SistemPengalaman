-- SQL schema for SistemPengalaman (MySQL 8+)

CREATE TABLE `Users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `TenagaAhlis` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` BIGINT UNSIGNED NOT NULL,
  `nama` VARCHAR(255) NOT NULL,
  `bidangKeahlian` VARCHAR(255) NOT NULL,
  `nomorTelepon` VARCHAR(255) NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tenaga_ahlis_user_id_index` (`userId`),
  CONSTRAINT `tenaga_ahlis_user_id_foreign`
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Pengalamans` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tenagaAhliId` BIGINT UNSIGNED NOT NULL,
  `instansi` VARCHAR(255) NOT NULL,
  `posisi` VARCHAR(255) NOT NULL,
  `tahunMulai` INT NOT NULL,
  `tahunSelesai` INT NULL,
  `deskripsi` TEXT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pengalamans_tenaga_ahli_id_index` (`tenagaAhliId`),
  CONSTRAINT `pengalamans_tenaga_ahli_id_foreign`
    FOREIGN KEY (`tenagaAhliId`) REFERENCES `TenagaAhlis` (`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
