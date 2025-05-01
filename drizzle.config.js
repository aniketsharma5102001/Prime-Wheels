// /**@type{import("drizzle-kit").Config } */
import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema: "./configs/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgresql://Car%20Market%20Place_owner:npg_YFXPnkpG40Jf@ep-snowy-hill-a4zsxepb-pooler.us-east-1.aws.neon.tech/Car%20Market%20Place?sslmode=require'
    },
});