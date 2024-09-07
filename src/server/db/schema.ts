// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  pgTableCreator,
  text,
  pgTable,
  varchar,
  integer,
  primaryKey,
  foreignKey,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `prevent-rhino-ads-ai_${name}`);

export const accident = pgTable(
  "ACCIDENT",
  {
    ACCIDENT_NO: text("ACCIDENT_NO").primaryKey(),
    ACCIDENT_DATE: text("ACCIDENT_DATE"),
    ACCIDENT_TIME: text("ACCIDENT_TIME"),
    ACCIDENT_TYPE: text("ACCIDENT_TYPE"),
    ACCIDENT_TYPE_DESC: text("ACCIDENT_TYPE_DESC"),
    DAY_OF_WEEK: text("DAY_OF_WEEK"),
    DAY_WEEK_DESC: text("DAY_WEEK_DESC"),
    DCA_CODE: text("DCA_CODE"),
    DCA_DESC: text("DCA_DESC"),
    LIGHT_CONDITION: text("LIGHT_CONDITION"),
    NODE_ID: text("NODE_ID"),
    NO_OF_VEHICLES: text("NO_OF_VEHICLES"),
    NO_PERSONS: text("NO_PERSONS"),
    NO_PERSONS_INJ_2: text("NO_PERSONS_INJ_2"),
    NO_PERSONS_INJ_3: text("NO_PERSONS_INJ_3"),
    NO_PERSONS_KILLED: text("NO_PERSONS_KILLED"),
    NO_PERSONS_NOT_INJ: text("NO_PERSONS_NOT_INJ"),
    POLICE_ATTEND: text("POLICE_ATTEND"),
    ROAD_GEOMETRY: text("ROAD_GEOMETRY"),
    ROAD_GEOMETRY_DESC: text("ROAD_GEOMETRY_DESC"),
    SEVERITY: text("SEVERITY"),
    SPEED_ZONE: text("SPEED_ZONE"),
    RMA: text("RMA"),
  },
)

export const accident_event = pgTable(
  "ACCIDENT_EVENT",
  {
    ACCIDENT_NO: varchar("ACCIDENT_NO", { length: 12 }).references(() => accident.ACCIDENT_NO),
    EVENT_SEQ_NO: integer("EVENT_SEQ_NO"),
    EVENT_TYPE: varchar("EVENT_TYPE", { length: 1 }),
    EVENT_TYPE_Description: varchar("EVENT_TYPE_Description", { length: 40 }),
    VEHICLE_1_ID: varchar("VEHICLE_1_ID", { length: 1 }),
    VEHICLE_1_COLL_PT: varchar("VEHICLE_1_COLL_PT", { length: 1 }),
    VEHICLE_1_COLL_PT_Description: varchar("VEHICLE_1_COLL_PT_Description", { length: 30 }),
    VEHICLE_2_ID: varchar("VEHICLE_2_ID", { length: 1 }),
    VEHICLE_2_COLL_PT: varchar("VEHICLE_2_COLL_PT", { length: 1 }),
    VEHICLE_2_COLL_PT_Description: varchar("VEHICLE_2_COLL_PT_Description", { length: 30 }),
    PERSON_ID: varchar("PERSON_ID", { length: 2 }),
    OBJECT_TYPE: integer("OBJECT_TYPE"),
    OBJECT_TYPE_Desc: varchar("OBJECT_TYPE_Desc", { length: 60 }),
  },
)

export const accident_location = pgTable(
  "ACCIDENT_LOCATION",
  {
    ACCIDENT_NO: varchar("ACCIDENT_NO", { length: 12 }).references(() => accident.ACCIDENT_NO),
    NODE_ID: varchar("NODE_ID", { length: 70 }),
    ROAD_ROUTE_1: integer("ROAD_ROUTE_1"),
    ROAD_NAME: varchar("ROAD_NAME", { length: 45 }),
    ROAD_TYPE: varchar("ROAD_TYPE", { length: 15 }),
    DISTANCE_LOCATION: integer("DISTANCE_LOCATION"),
    DIRECTION_LOCATION: varchar("DIRECTION_LOCATION", { length: 2 }),
  },
)

export const atmospheric_cond = pgTable(
  "ATMOSPHERIC_COND",
  {
    ACCIDENT_NO: varchar("ACCIDENT_NO", { length: 12 }).references(() => accident.ACCIDENT_NO),
    ATMOSPH_COND: varchar("ATMOSPH_COND", { length: 1 }),
    ATMOSPH_COND_SEQ: integer("ATMOSPH_COND_SEQ"),
    ATMOSPH_COND_Desc: varchar("ATMOSPH_COND_Desc", { length: 12 }),
  },
)

export const node = pgTable(
  "NODE",
  {
    ACCIDENT_NO: varchar("ACCIDENT_NO", { length: 12 }).references(() => accident.ACCIDENT_NO),
    NODE_ID: varchar("NODE_ID", { length: 70 }),
    NODE_TYPE: integer("NODE_TYPE"),
    VICGRID94_X: integer("VICGRID94_X"),
    VICGRID94_Y: integer("VICGRID94_Y"),
    LGA_NAME: varchar("LGA_NAME", { length: 25 }),
    DEG_URBAN_NAME: varchar("DEG_URBAN_NAME", { length: 25 }),
    LATITUDE: integer("LATITUDE"),
    LONGITUDE: integer("LONGITUDE"),
    POSTCODE_CRASH: integer("POSTCODE_CRASH"),
  },
)

export const person = pgTable(
  "PERSON",
  {
    ACCIDENT_NO: varchar("ACCIDENT_NO", { length: 12 }).references(() => accident.ACCIDENT_NO),
    PERSON_ID: varchar("PERSON_ID", { length: 2 }),
    VEHICLE_ID: varchar("VEHICLE_ID", { length: 1 }),
    SEX: varchar("SEX", { length: 1 }),
    AGE_GROUP: varchar("AGE_GROUP", { length: 10 }),
    INJ_LEVEL: varchar("INJ_LEVEL", { length: 1 }),
    INJ_LEVEL_Desc: varchar("INJ_LEVEL_Desc", { length: 15 }),
    SEATING_POSITION: varchar("SEATING_POSITION", { length: 2 }),
    HELMET_BELT_WORN: varchar("HELMET_BELT_WORN", { length: 1 }),
    ROAD_USER_TYPE: varchar("ROAD_USER_TYPE", { length: 2 }),
    ROAD_USER_TYPE_Desc: varchar("ROAD_USER_TYPE_Desc", { length: 20 }),
    LICENCE_STATE: varchar("LICENCE_STATE", { length: 1 }),
    TAKEN_HOSPITAL: varchar("TAKEN_HOSPITAL", { length: 1 }),
    EJECTED_CODE: varchar("EJECTED_CODE", { length: 1 }),
  },
  
)

export const vehicle = pgTable(
  "VEHICLE",
  {
    ACCIDENT_NO: varchar("ACCIDENT_NO", { length: 12 }).references(() => accident.ACCIDENT_NO),
    VEHICLE_ID: varchar("VEHICLE_ID", { length: 1 }),
    VEHICLE_YEAR_MANUF: integer("VEHICLE_YEAR_MANUF"),
    VEHICLE_DCA_CODE: varchar("VEHICLE_DCA_CODE", { length: 1 }),
    INITIAL_DIRECTION: varchar("INITIAL_DIRECTION", { length: 2 }),
    ROAD_SURFACE_TYPE: varchar("ROAD_SURFACE_TYPE", { length: 1 }),
    ROAD_SURFACE_TYPE_Desc: varchar("ROAD_SURFACE_TYPE_Desc", { length: 10 }),
    REG_STATE: varchar("REG_STATE", { length: 1 }),
    VEHICLE_BODY_STYLE: varchar("VEHICLE_BODY_STYLE", { length: 6 }),
    VEHICLE_MAKE: varchar("VEHICLE_MAKE", { length: 6 }),
    VEHICLE_MODEL: varchar("VEHICLE_MODEL", { length: 6 }),
    VEHICLE_POWER: integer("VEHICLE_POWER"),
    VEHICLE_TYPE: varchar("VEHICLE_TYPE", { length: 2 }),
    VEHICLE_TYPE_Desc: varchar("VEHICLE_TYPE_Desc", { length: 50 }),
    VEHICLE_WEIGHT: integer("VEHICLE_WEIGHT"), 
    CONSTRUCTION_TYPE: varchar("CONSTRUCTION_TYPE", { length: 1 }),
    FUEL_TYPE: varchar("FUEL_TYPE", { length: 1 }),
    NO_OF_WHEELS: integer("NO_OF_WHEELS"),
    NO_OF_CYLINDERS: integer("NO_OF_CYLINDERS"),
    NO_OF_SEATS: integer("NO_OF_SEATS"),
    NO_OF_DOORS: integer("NO_OF_DOORS"),
    NO_OF_AXLES: integer("NO_OF_AXLES"),
    NO_OF_PASSENGERS: integer("NO_OF_PASSENGERS"),
    TOWED_AWAY_FLAG: integer("TOWED_AWAY_FLAG"),
    TRAFFIC_CONTROL: integer("TRAFFIC_CONTROL"),
    TRAFFIC_CONTROL_Desc: varchar("TRAFFIC_CONTROL_Desc", { length: 15 }),
  },

)

export const road_surface_cond = pgTable(
  "ROAD_SURFACE_COND",
  {
    ACCIDENT_NO: varchar("ACCIDENT_NO", { length: 12 }).references(() => accident.ACCIDENT_NO),
    SURFACE_COND: varchar("SURFACE_COND", { length: 1 }),
    SURFACE_COND_Desc: varchar("SURFACE_COND_Desc", { length: 6 }),
    SURFACE_COND_SEQ: integer("SURFACE_COND_SEQ"),
  },
)

export const sub_dca = pgTable(
  "SUB_DCA",
  {
    ACCIDENT_NO: varchar("ACCIDENT_NO", { length: 12 }).references(() => accident.ACCIDENT_NO),
    SUB_DCA_CODE: varchar("SUB_DCA_CODE", { length: 3 }),
    SUB_DCA_CODE_Seq: integer("SUB_DCA_CODE_Seq"),
    SUB_DCA_CODE_Desc: varchar("SUB_DCA_CODE_Desc", { length: 60 }),
  },
)