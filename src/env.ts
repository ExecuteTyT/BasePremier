import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Sanity CMS
    SANITY_TOKEN: z.string().optional(),
    SANITY_WEBHOOK_SECRET: z.string().optional(),

    // YClients (серверный прокси)
    YCLIENTS_PARTNER_TOKEN: z.string().optional(),
    YCLIENTS_USER_TOKEN: z.string().optional(),
    YCLIENTS_COMPANY_ID: z.string().optional(),

    // Sentry
    SENTRY_AUTH_TOKEN: z.string().optional(),

    // Telegram notifications
    TELEGRAM_BOT_TOKEN: z.string().optional(),
    TELEGRAM_CHAT_ID: z.string().optional(),
  },

  client: {
    // Обязательные
    NEXT_PUBLIC_SITE_URL: z.string().url(),

    // Sanity
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
    NEXT_PUBLIC_SANITY_DATASET: z.string().default("production"),

    // YClients widget (публичные)
    NEXT_PUBLIC_YCLIENTS_COMPANY_ID: z.string().optional(),
    NEXT_PUBLIC_YCLIENTS_FORM_ID: z.string().optional(),

    // Analytics
    NEXT_PUBLIC_YM_ID: z.string().optional(),
    NEXT_PUBLIC_YANDEX_VERIFICATION: z.string().optional(),

    // Sentry
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  },

  runtimeEnv: {
    // Server
    SANITY_TOKEN: process.env.SANITY_TOKEN,
    SANITY_WEBHOOK_SECRET: process.env.SANITY_WEBHOOK_SECRET,
    YCLIENTS_PARTNER_TOKEN: process.env.YCLIENTS_PARTNER_TOKEN,
    YCLIENTS_USER_TOKEN: process.env.YCLIENTS_USER_TOKEN,
    YCLIENTS_COMPANY_ID: process.env.YCLIENTS_COMPANY_ID,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,

    // Client
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_YCLIENTS_COMPANY_ID: process.env.NEXT_PUBLIC_YCLIENTS_COMPANY_ID,
    NEXT_PUBLIC_YCLIENTS_FORM_ID: process.env.NEXT_PUBLIC_YCLIENTS_FORM_ID,
    NEXT_PUBLIC_YM_ID: process.env.NEXT_PUBLIC_YM_ID,
    NEXT_PUBLIC_YANDEX_VERIFICATION: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
