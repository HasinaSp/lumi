-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'lemonsqueezy',
    "providerOrderId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "offer" "AuditOffer" NOT NULL,
    "userId" TEXT NOT NULL,
    "restaurantName" TEXT,
    "city" TEXT,
    "platform" "Platform",
    "marketplaceUrl" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_providerOrderId_key" ON "Payment"("providerOrderId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
