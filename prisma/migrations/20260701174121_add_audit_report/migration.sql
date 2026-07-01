-- CreateTable
CREATE TABLE "AuditReport" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "scoreGlobal" INTEGER NOT NULL DEFAULT 0,
    "summary" TEXT,
    "strengths" TEXT,
    "improvements" TEXT,
    "recommendations" TEXT,
    "photosScore" INTEGER NOT NULL DEFAULT 0,
    "menuScore" INTEGER NOT NULL DEFAULT 0,
    "pricingScore" INTEGER NOT NULL DEFAULT 0,
    "seoScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuditReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuditReport_auditId_key" ON "AuditReport"("auditId");

-- AddForeignKey
ALTER TABLE "AuditReport" ADD CONSTRAINT "AuditReport_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "AuditRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
