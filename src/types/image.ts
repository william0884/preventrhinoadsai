export interface BlobResponse {
    url: string;
    downloadUrl: string;
    pathname: string;
    contentType?: string;
    contentDisposition?: string;
  }
  
  export interface AccidentApiResponse {
    help: string;
    success: boolean;
    result: AccidentResult;
  }
  
  export interface AccidentResult {
    include_total: boolean;
    limit: number;
    records_format: string;
    resource_id: string;
    total_estimation_threshold: null;
    records: AccidentRecord[];
    fields: Field[];
    _links: Links;
    total: number;
    total_was_estimated: boolean;
  }
  
  export interface AccidentRecord {
    _id: number;
    ACCIDENT_NO: string;
    ACCIDENT_DATE: string;
    ACCIDENT_TIME: string;
    ACCIDENT_TYPE: string;
    ACCIDENT_TYPE_DESC: string;
    DAY_OF_WEEK: string;
    DAY_WEEK_DESC: string;
    DCA_CODE: string;
    DCA_DESC: string;
    LIGHT_CONDITION: string;
    NODE_ID: string;
    NO_OF_VEHICLES: string;
    NO_PERSONS_KILLED: string;
    NO_PERSONS_INJ_2: string;
    NO_PERSONS_INJ_3: string;
    NO_PERSONS_NOT_INJ: string;
    NO_PERSONS: string;
    POLICE_ATTEND: string;
    ROAD_GEOMETRY: string;
    ROAD_GEOMETRY_DESC: string;
    SEVERITY: string;
    SPEED_ZONE: string;
    RMA: string | null;
  }
  
  export interface Field {
    id: string;
    type: string;
  }
  
  export interface Links {
    start: string;
    next: string;
  }
  
  export interface Result {
    result: {
      records: VehicleRecord[];
      // ... other properties
    };
    // ... other properties
  }
  
  export interface VehicleRecord {
    _id: number;
    ACCIDENT_NO: string;
    VEHICLE_ID: string;
    VEHICLE_YEAR_MANUF: string;
    VEHICLE_DCA_CODE: string;
    INITIAL_DIRECTION: string;
    ROAD_SURFACE_TYPE: string;
    ROAD_SURFACE_TYPE_DESC: string;
    REG_STATE: string;
    VEHICLE_BODY_STYLE: string;
    VEHICLE_MAKE: string;
    VEHICLE_MODEL: string;
    VEHICLE_POWER: string | null;
    VEHICLE_TYPE: string;
    VEHICLE_TYPE_DESC: string;
    VEHICLE_WEIGHT: string | null;
    CONSTRUCTION_TYPE: string;
    FUEL_TYPE: string;
    NO_OF_WHEELS: string;
    NO_OF_CYLINDERS: string;
    SEATING_CAPACITY: string;
    TARE_WEIGHT: string;
    TOTAL_NO_OCCUPANTS: string;
    CARRY_CAPACITY: string | null;
    CUBIC_CAPACITY: string | null;
    FINAL_DIRECTION: string;
    DRIVER_INTENT: string;
    VEHICLE_MOVEMENT: string;
    TRAILER_TYPE: string;
    VEHICLE_COLOUR_1: string;
    VEHICLE_COLOUR_2: string;
    CAUGHT_FIRE: string;
    INITIAL_IMPACT: string;
    LAMPS: string;
    LEVEL_OF_DAMAGE: string;
    TOWED_AWAY_FLAG: string;
    TRAFFIC_CONTROL: string;
    TRAFFIC_CONTROL_DESC: string;
  }
  