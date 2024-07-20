/*
  Warnings:

  - Added the required column `locationId` to the `hosts` table without a default value. This is not possible if the table is not empty.
  - Made the column `hostId` on table `images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hostId` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT,
    "country" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_hosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "step" TEXT,
    "categoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "pricePerNight" REAL NOT NULL,
    "currency" TEXT,
    "cleaningFee" REAL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL,
    "babies" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "locationId" TEXT NOT NULL,
    CONSTRAINT "hosts_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "hosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_hosts" ("babies", "bathrooms", "bedrooms", "categoryId", "cleaningFee", "createdAt", "currency", "description", "guests", "id", "pricePerNight", "title", "updatedAt", "userId") SELECT "babies", "bathrooms", "bedrooms", "categoryId", "cleaningFee", "createdAt", "currency", "description", "guests", "id", "pricePerNight", "title", "updatedAt", "userId" FROM "hosts";
DROP TABLE "hosts";
ALTER TABLE "new_hosts" RENAME TO "hosts";
CREATE TABLE "new_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    CONSTRAINT "images_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "hosts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_images" ("hostId", "id", "url") SELECT "hostId", "id", "url" FROM "images";
DROP TABLE "images";
ALTER TABLE "new_images" RENAME TO "images";
CREATE UNIQUE INDEX "images_id_key" ON "images"("id");
CREATE TABLE "new_services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kitchen" BOOLEAN NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "tv" BOOLEAN NOT NULL,
    "pool" BOOLEAN NOT NULL,
    "laundry" BOOLEAN NOT NULL,
    "hairDryer" BOOLEAN NOT NULL,
    "office" BOOLEAN NOT NULL,
    "freeParking" BOOLEAN NOT NULL,
    "airConditioning" BOOLEAN NOT NULL,
    "pets" BOOLEAN NOT NULL,
    "hostId" TEXT NOT NULL,
    CONSTRAINT "services_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "hosts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_services" ("airConditioning", "freeParking", "hairDryer", "hostId", "id", "kitchen", "laundry", "office", "pets", "pool", "tv", "wifi") SELECT "airConditioning", "freeParking", "hairDryer", "hostId", "id", "kitchen", "laundry", "office", "pets", "pool", "tv", "wifi" FROM "services";
DROP TABLE "services";
ALTER TABLE "new_services" RENAME TO "services";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
