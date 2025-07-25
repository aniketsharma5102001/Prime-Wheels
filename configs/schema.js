import { json } from "drizzle-orm/gel-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import { pgTable, serial } from "drizzle-orm/pg-core";

export const Carlisting = pgTable('carListing', {
  id: serial('id').primaryKey(),
  listingTitle: varchar('listingTitle'),
  tagline: varchar('tagline'),
  originalprice: varchar('originalprice'),
  SellingPrice: varchar('SellingPrice'),
  catagory: varchar('catagory').notNull(),
  condition: varchar('condition').notNull(),
  Type: varchar('Type').notNull(),
  make: varchar('make').notNull(),
  model: varchar('model').notNull(),
  year: varchar('year').notNull(),
  driveType: varchar('driveType').notNull(),
  engineSize: varchar('engineSize').notNull(),
  cylinder: varchar('cylinder').notNull(),
  color: varchar('color').notNull(),
  door: varchar('door').notNull(),
  vin: varchar('vin').notNull(),
  offerType: varchar('offerType').notNull(),
  listingDescription: varchar('listingDescription').notNull(),
  features: json('features'),
  createdBy: varchar('createdBy').notNull(),
  userName: varchar('userName').notNull().default('Aniket Sharma'),
  userImageUrl: varchar('userImageUrl').default(''),
  postedOn: varchar('postedOn')
});

export const CarImages = pgTable('carImages', {
  id: serial('id').primaryKey(),
  imageUrl: varchar('imageUrl').notNull(),
  CarListingId: integer('carListingId')
    .notNull()
    .references(() => Carlisting.id, { onDelete: "cascade" })
});
