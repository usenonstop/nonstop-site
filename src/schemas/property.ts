import { z } from "zod";
import {
  COMMERCIAL_TYPE,
  FILTER_ACCEPTS,
  FILTER_AVAILABLE_FOR,
  FILTER_FACE,
  MANAGED_BY,
  PROPERTY_SORT,
  PROPERTY_STATUS,
  PROPERTY_USE,
  RESIDENTIAL_TYPE,
  TRANSACTION_STATUS,
} from "~/consts/property";

export const paginationSchema = z.object({
  perPage: z.number(),
  currPage: z.number(),
});

const propertySortBySchema = z.record(
  z.enum(PROPERTY_SORT),
  z.literal(1).or(z.literal(-1)),
);

const locationSchema = z.object({ lat: z.number(), lng: z.number() });

export const minMaxSchema = z.object({
  min: z.number().nullable(),
  max: z.number().nullable(),
});

export const propertyFilterSchema = z.object({
  managedBy: z.enum(MANAGED_BY).array(),
  use: z.enum(PROPERTY_USE).array(),
  residentialTypes: z.enum(RESIDENTIAL_TYPE).array(),
  commercialTypes: z.enum(COMMERCIAL_TYPE).array(),
  status: z.enum(PROPERTY_STATUS).array(),
  transactionStatus: z.enum(TRANSACTION_STATUS).array(),
  availableFor: z.enum(FILTER_AVAILABLE_FOR).array(),
  accepts: z.enum(FILTER_ACCEPTS).array(),
  face: z.enum(FILTER_FACE).array(),
  floor: minMaxSchema,
  zapRating: minMaxSchema,
  minBaths: z.number().nullable(),
  minRooms: z.number().nullable(),
  minSuites: z.number().nullable(),
  minParkingLots: z.number().nullable(),
  values: z.object({
    sale: minMaxSchema,
    longStay: minMaxSchema,
    propertyTax: minMaxSchema,
    condoFee: minMaxSchema,
  }),
  areas: z.object({
    useful: minMaxSchema,
    land: minMaxSchema,
  }),
});

export const getAllInputSchema = z.object({
  pagination: paginationSchema,
  search: z.string(),
  sort: propertySortBySchema,
  selectedProperties: locationSchema.array(),
  filters: propertyFilterSchema,
  perimeters: z.string().array(),
});
