import { z } from "zod";

export const checkoutSchema = z.object({
    restaurantName: z.string().min(2).max(100),
    city: z.string().max(100).optional(),
    platform: z.enum(["UBEREATS", "DELIVEROO", "BOTH"]),
    offer: z.enum(["SIMPLE", "COMPLETE", "MONTHLY"]),
    marketplaceUrl: z.string().url().optional().or(z.literal("")),
    message: z.string().max(1000).optional(),
});

export const auditReportSchema = z.object({
    scoreGlobal: z.coerce.number().min(0).max(100),
    photosScore: z.coerce.number().min(0).max(100),
    menuScore: z.coerce.number().min(0).max(100),
    pricingScore: z.coerce.number().min(0).max(100),
    seoScore: z.coerce.number().min(0).max(100),
    summary: z.string().max(5000).optional(),
    strengths: z.string().max(5000).optional(),
    improvements: z.string().max(5000).optional(),
    recommendations: z.string().max(5000).optional(),
});