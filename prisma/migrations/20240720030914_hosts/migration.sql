-- CreateTable
CREATE TABLE "hosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    CONSTRAINT "hosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "hostId" TEXT,
    CONSTRAINT "images_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "hosts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "services" (
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
    "hostId" TEXT,
    CONSTRAINT "services_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "hosts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
