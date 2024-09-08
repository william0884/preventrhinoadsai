CREATE TABLE IF NOT EXISTS "accidentId" (
	"id" serial PRIMARY KEY NOT NULL,
	"defaultId" text NOT NULL,
	"sentence" text NOT NULL,
	"url" text NOT NULL,
	"imgdescribe" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "ACCIDENT";--> statement-breakpoint
DROP TABLE "ACCIDENT_EVENT";--> statement-breakpoint
DROP TABLE "ACCIDENT_LOCATION";--> statement-breakpoint
DROP TABLE "ATMOSPHERIC_COND";--> statement-breakpoint
DROP TABLE "NODE";--> statement-breakpoint
DROP TABLE "PERSON";--> statement-breakpoint
DROP TABLE "ROAD_SURFACE_COND";--> statement-breakpoint
DROP TABLE "SUB_DCA";--> statement-breakpoint
DROP TABLE "VEHICLE";