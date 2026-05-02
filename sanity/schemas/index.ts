import { articleSchema } from "./article";
import { barberSchema } from "./barber";
import { hairstyleSchema } from "./hairstyle";
import { serviceSchema } from "./service";
import { siteSettingsSchema } from "./siteSettings";

export const schemaTypes = [
  barberSchema,
  articleSchema,
  serviceSchema,
  hairstyleSchema,
  siteSettingsSchema,
];
