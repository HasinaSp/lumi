import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

lemonSqueezySetup({
  apiKey: process.env.LEMONSQUEEZY_API_KEY!,
  onError: (error) => {
    console.error(error);
  },
});