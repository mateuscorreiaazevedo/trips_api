/*
  Warnings:

  - You are about to drop the column `createdAt` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `hostId` on the `services` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `hosts` table without a default value. This is not possible if the table is not empty.

*/
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
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "hosts_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "hosts_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "hosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_hosts" ("babies", "bathrooms", "bedrooms", "categoryId", "cleaningFee", "createdAt", "currency", "description", "guests", "id", "locationId", "pricePerNight", "step", "title", "updatedAt", "userId") SELECT "babies", "bathrooms", "bedrooms", "categoryId", "cleaningFee", "createdAt", "currency", "description", "guests", "id", "locationId", "pricePerNight", "step", "title", "updatedAt", "userId" FROM "hosts";
DROP TABLE "hosts";
ALTER TABLE "new_hosts" RENAME TO "hosts";
CREATE TABLE "new_locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT,
    "country" TEXT NOT NULL
);
INSERT INTO "new_locations" ("address", "city", "country", "id", "lat", "lng", "state", "zipCode") SELECT "address", "city", "country", "id", "lat", "lng", "state", "zipCode" FROM "locations";
DROP TABLE "locations";
ALTER TABLE "new_locations" RENAME TO "locations";
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
    "pets" BOOLEAN NOT NULL
);
INSERT INTO "new_services" ("airConditioning", "freeParking", "hairDryer", "id", "kitchen", "laundry", "office", "pets", "pool", "tv", "wifi") SELECT "airConditioning", "freeParking", "hairDryer", "id", "kitchen", "laundry", "office", "pets", "pool", "tv", "wifi" FROM "services";
DROP TABLE "services";
ALTER TABLE "new_services" RENAME TO "services";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
