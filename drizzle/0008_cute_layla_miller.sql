CREATE TABLE IF NOT EXISTS "accidentAd" (
	"id" serial PRIMARY KEY NOT NULL,
	"defaultId" text NOT NULL,
	"sentence" text NOT NULL,
	"url" text NOT NULL,
	"imgdescribe" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "accidentId";