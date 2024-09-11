import { NextResponse } from 'next/server';
import { HfInference } from "@huggingface/inference";
import { put } from "@vercel/blob";
import { auth } from '@clerk/nextjs/server'
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { accidentAd } from "../../server/db/schema";


const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

interface BlobResponse {
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

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);


export async function GET() {
  const { userId } = auth()

  const baseUrl = 'https://discover.data.vic.gov.au/api/3/action/datastore_search';
  const resourceId = 'd48aa391-9f43-4c67-bd90-81192ff2e732';
  const totalRecords = 171099;
  const randomOffset = Math.floor(Math.random() * totalRecords);
  const url = `${baseUrl}?resource_id=${resourceId}&limit=1&offset=${randomOffset}`;

  try {
    const response = await fetch(url);
    const data = await response.json() as AccidentApiResponse;

    if (data.success && data.result.records.length > 0) {
      const record = data.result.records[0];
      if (!record) {
        return NextResponse.json({ error: 'No accident record found' }, { status: 404 });
      }

      const killed = parseInt(record.NO_PERSONS_KILLED ?? '0');
      let deathSentence = '';
      if (killed >= 1) {
        deathSentence = `${killed} ${killed === 1 ? 'person' : 'people'} died in this accident.`;
      }

      const DEFAULT_ID = record._id;
  
      const CarResourceId = 'cbe84365-ec40-4693-b9f9-f14bed51e42c';
      const CarUrl = `${baseUrl}?resource_id=${CarResourceId}&filters={"_id":${DEFAULT_ID}}`;

      try {
        const CarResponse = await fetch(CarUrl);
        if (!CarResponse.ok) {
          console.error(`Car API responded with status: ${CarResponse.status}`);
          return NextResponse.json({ error: `Car API error: ${CarResponse.statusText}` }, { status: CarResponse.status });
        }

        const CarData = await CarResponse.json() as Result;
        console.log('Car API response:', JSON.stringify(CarData, null, 2));

        if (!CarData.result?.records?.length) {
          console.error('No car records found in the response');
          return NextResponse.json({ error: 'No car data found' }, { status: 404 });
        }

        const CarRecord = CarData.result.records[0];

        const carYearManuf = CarRecord?.VEHICLE_YEAR_MANUF
        const carMake = CarRecord?.VEHICLE_MAKE
        const carModel = CarRecord?.VEHICLE_MODEL

        const accidentType = record.ACCIDENT_TYPE_DESC
        const dayOfWeek = record.DAY_WEEK_DESC
        const policeAttend = record.POLICE_ATTEND
        const policeSentence = policeAttend === '1' ? 'Police at the scene.' : 'No police at the scene.'
        const vehicleSentence = record.NO_OF_VEHICLES === '1' ? '1 vehicle was involved.' : `${record.NO_OF_VEHICLES} vehicles were involved.`
        const severitySentence = record.SEVERITY === '1' ? 'Fatal' : 'Injured'
        const NO_PERSONS = parseInt(record.NO_PERSONS ?? '0')
        const personsSentence = NO_PERSONS === 1 ? '1 person are injured.' : `${NO_PERSONS} people are injured.`
        
        const sentence = `a vintage ad of ${carYearManuf} ${carMake} ${carModel} in a ${accidentType} accident on a ${dayOfWeek}. ${policeSentence} ${deathSentence} ${vehicleSentence} ${severitySentence}. ${personsSentence}. Display text: '${accidentType}'`;

        const imgCap = await hf.textToImage({
          inputs: sentence,
          model: "multimodalart/vintage-ads-flux",
        });

        const buff = Buffer.from(await imgCap.arrayBuffer());


        const fileName = `${Date.now()}.png`;

        const blob: BlobResponse = await put(fileName, buff, {
          access: "public",
        });


        const imgclas = await hf.imageToText({
          data: imgCap,
          model: "nlpconnect/vit-gpt2-image-captioning",
        });
        if (!userId) {
          return new NextResponse('Unauthorized', { status: 401 })
        }


    await db.insert(accidentAd).values({
      userId: userId,
      defaultId: DEFAULT_ID.toString(),
      sentence: sentence,
      url: blob.url,
      imgdescribe: imgclas.generated_text,
      
    }).returning();

        return NextResponse.json({ sentence, blob });
      } catch (error) {
        console.error('Error fetching car data:', error);
        return NextResponse.json({ error: 'Error fetching car data' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'No accident data found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching accident data:', error);
    return NextResponse.json({ error: 'Error fetching accident data' }, { status: 500 });
  }
}