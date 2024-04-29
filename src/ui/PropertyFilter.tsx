import { useEffect, useRef } from "react";
import { useAtom } from "jotai";

import type {
  CommercialType,
  FilterAccepts,
  FilterAvailableFor,
  FilterFace,
  ResidentialType,
  Status,
  TransactionStatus,
  Use,
} from "~/types/property";
import { InputLabel } from "~/ui/InputLabel";
import { Checkbox } from "~/ui/Checkbox";
import { PriceInput } from "~/ui/PriceInput";
import { AreaInput } from "~/ui/AreaInput";
import { NumberInput } from "~/ui/NumberInput";
import { MinValue } from "~/ui/MinValue";
import {
  propertyFilterAtom,
  propertyMapCreatedPolygonsAtom,
  propertyMapPolygonsAtom,
  propertyPaginationAtom,
  propertyPerimetersAtom,
} from "~/atoms/property";
import {
  COMMERCIAL_TYPE,
  COMMERCIAL_TYPE_WITH_LABEL,
  FILTER_ACCEPTS,
  FILTER_ACCEPTS_WITH_LABEL,
  FILTER_AVAILABLE_FOR,
  FILTER_AVAILABLE_FOR_WITH_LABEL,
  FILTER_FACE,
  FILTER_FACE_WITH_LABEL,
  INITIAL_PROPERTY_FILTER,
  PROPERTY_STATUS,
  PROPERTY_STATUS_WITH_LABEL,
  PROPERTY_USE,
  PROPERTY_USE_WITH_LABEL,
  RESIDENTIAL_TYPE,
  RESIDENTIAL_TYPE_WITH_LABEL,
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_WITH_LABEL,
} from "~/consts/property";
import { addOrRemove } from "~/fns/addOrRemove";
import { api } from "~/utils/api";

export const PropertyFilter = () => {
  const utils = api.useUtils();
  const containerRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useAtom(propertyFilterAtom);
  const [, setPagination] = useAtom(propertyPaginationAtom);
  const [, setPerimeters] = useAtom(propertyPerimetersAtom);
  const [polygons, setPolygons] = useAtom(propertyMapPolygonsAtom);
  const [, setCreatedPolygons] = useAtom(propertyMapCreatedPolygonsAtom);

  const handleClickUse = (t: Use) => {
    setPagination((p) => ({ ...p, currPage: 1 }));

    const newFilters = structuredClone(filters);

    if (filters.use.includes(t)) {
      newFilters.use = newFilters.use.filter((type) => type !== t);
      newFilters.residentialTypes =
        t === "RESIDENCIAL" ? [] : newFilters.residentialTypes;
      newFilters.commercialTypes =
        t === "COMERCIAL" ? [] : newFilters.commercialTypes;
    } else {
      newFilters.use = [...newFilters.use, t];
      newFilters.residentialTypes =
        t === "RESIDENCIAL" ? [...RESIDENTIAL_TYPE] : filters.residentialTypes;
      newFilters.commercialTypes =
        t === "COMERCIAL" ? [...COMMERCIAL_TYPE] : filters.commercialTypes;
    }

    void setFilters(newFilters);
  };

  const handleClickResidentialType = (t: ResidentialType) => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    const newFilters = structuredClone(filters);
    if (filters.residentialTypes.includes(t)) {
      const newTypes = newFilters.residentialTypes.filter((type) => type !== t);
      newFilters.residentialTypes = newTypes;
      newFilters.use =
        newTypes.length === 0
          ? newFilters.use.filter((u) => u !== "RESIDENCIAL")
          : newFilters.use;
    } else {
      newFilters.residentialTypes = [...newFilters.residentialTypes, t];
      newFilters.use = [
        ...Array.from(new Set([...newFilters.use, "RESIDENCIAL"])),
      ] as Use[];
    }

    void setFilters(newFilters);
  };

  const handleClickCommercialType = (t: CommercialType) => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    const newFilters = structuredClone(filters);
    if (filters.commercialTypes.includes(t)) {
      const newTypes = newFilters.commercialTypes.filter((type) => type !== t);
      newFilters.commercialTypes = newTypes;
      newFilters.use =
        newTypes.length === 0
          ? newFilters.use.filter((u) => u !== "COMERCIAL")
          : newFilters.use;
    } else {
      newFilters.commercialTypes = [...newFilters.commercialTypes, t];
      newFilters.use = [
        ...Array.from(new Set([...newFilters.use, "COMERCIAL"])),
      ] as Use[];
    }
    void setFilters(newFilters);
  };

  const handleClickStatus = (s: Status) => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    setFilters((f) => ({ ...f, status: addOrRemove(f.status, s) }));
  };

  const handleClickTransactionStatus = (s: TransactionStatus) => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    setFilters((f) => ({
      ...f,
      transactionStatus: addOrRemove(f.transactionStatus, s),
    }));
  };

  const handleClickAvailableFor = (s: FilterAvailableFor) => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    const newFilters = structuredClone(filters);
    if (newFilters.availableFor.includes(s)) {
      newFilters.availableFor = newFilters.availableFor.filter(
        (type) => type !== s,
      );
    } else {
      newFilters.availableFor = [...newFilters.availableFor, s];
    }
    if (
      !newFilters.availableFor.includes("VENDA") &&
      !newFilters.availableFor.includes("VENDA_E_LOCACAO")
    )
      newFilters.values = {
        ...newFilters.values,
        sale: { min: null, max: null },
      };
    if (
      !newFilters.availableFor.includes("LOCACAO") &&
      !newFilters.availableFor.includes("VENDA_E_LOCACAO")
    )
      newFilters.values = {
        ...newFilters.values,
        longStay: { min: null, max: null },
      };

    void setFilters(newFilters);
  };

  const handleClickAccepts = (s: FilterAccepts) => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    const newFilters = structuredClone(filters);
    if (s === "INDIFERENTE") {
      if (filters.accepts.includes("INDIFERENTE")) {
        newFilters.accepts = [];
      } else {
        newFilters.accepts = ["INDIFERENTE"];
      }
    } else {
      if (filters.accepts.includes(s)) {
        newFilters.accepts = filters.accepts.filter(
          (type) => type !== s && type !== "INDIFERENTE",
        );
      } else {
        newFilters.accepts = [...filters.accepts, s].filter(
          (v) => v !== "INDIFERENTE",
        );
      }
    }
    void setFilters(newFilters);
  };

  const handleClickFaces = (s: FilterFace) => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    const newFilters = structuredClone(filters);
    if (s === "ANY") {
      if (filters.face.includes("ANY")) {
        newFilters.face = [];
      } else {
        newFilters.face = ["ANY"];
      }
    } else {
      if (filters.face.includes(s)) {
        newFilters.face = filters.face.filter((type) => type !== s);
      } else {
        newFilters.face = [...filters.face.filter((v) => v !== "ANY"), s];
      }
    }
    void setFilters(newFilters);
  };

  const handleChangeValue = (
    val: number | null,
    key: keyof typeof filters.values,
    minMax: "min" | "max",
  ) => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    const newFilters = structuredClone(filters);
    newFilters.values[key][minMax] = val;

    void setFilters(newFilters);
  };

  const handleChangeArea = (
    val: number | null,
    key: keyof typeof filters.areas,
    minMax: "min" | "max",
  ) => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    const newFilters = structuredClone(filters);
    newFilters.areas[key][minMax] = val;
    void setFilters(newFilters);
  };

  const handleChangeFloor = (val: number | null, minMax: "min" | "max") => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    const newFilters = structuredClone(filters);
    newFilters.floor[minMax] = val;
    void setFilters(newFilters);
  };

  const handleChangeZapRating = (val: number | null, minMax: "min" | "max") => {
    if (minMax === "min" && val && val > 9) return;
    if (minMax === "max" && val && val > 10) return;
    setPagination((p) => ({ ...p, currPage: 1 }));
    const newFilters = structuredClone(filters);
    newFilters.zapRating[minMax] = val;
    void setFilters(newFilters);
  };

  const handleChangeMin = (
    val: number | null,
    path: "minBaths" | "minRooms" | "minSuites" | "minParkingLots",
  ) => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    const newFilters = structuredClone(filters);
    newFilters[path] = val;
    void setFilters(newFilters);
  };

  const handleReset = (polygons: google.maps.Polygon[]) => {
    setPagination((p) => ({ ...p, currPage: 1 }));
    void setFilters(structuredClone(INITIAL_PROPERTY_FILTER));
    void utils.property["get-all"].invalidate();
    void utils.property["get-markers"].invalidate();

    for (const p of polygons) {
      p.setMap(null);
    }
    setPolygons([]);
    setCreatedPolygons([]);
    setPerimeters([]);
  };

  useEffect(() => {
    const getFocus = () => {
      if (!containerRef.current) return;
      const first = containerRef.current.firstChild;
      if (!first) return;
      if (first.nodeName === "BUTTON") (first as HTMLButtonElement).focus();
    };
    getFocus();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <InputLabel htmlFor="availableFor">Disponível para</InputLabel>
        <input hidden id="availableFor" />
        <div className="mt-4 flex w-full flex-col gap-2">
          {FILTER_AVAILABLE_FOR.map((p) => (
            <Checkbox
              name={`availableFor-${p}`}
              key={p}
              label={
                FILTER_AVAILABLE_FOR_WITH_LABEL.find((t) => t.value === p)
                  ?.label
              }
              onChange={() => handleClickAvailableFor(p)}
              value={filters.availableFor.includes(p)}
            />
          ))}
        </div>
      </div>

      <div>
        <InputLabel htmlFor="values.sale">Preço de venda</InputLabel>
        <input hidden id="values.sale" />
        <div className="mt-4 flex w-full gap-2">
          <PriceInput
            disabled={
              !filters.availableFor.includes("VENDA") &&
              !filters.availableFor.includes("VENDA_E_LOCACAO")
            }
            value={filters.values.sale.min}
            name="values.sale.min"
            label="Valor mínimo"
            onChange={(val) => handleChangeValue(val, "sale", "min")}
          />
          <PriceInput
            disabled={
              !filters.availableFor.includes("VENDA") &&
              !filters.availableFor.includes("VENDA_E_LOCACAO")
            }
            value={filters.values.sale.max}
            name="values.sale.max"
            label="Valor máximo"
            onChange={(val) => handleChangeValue(val, "sale", "max")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="values.longStay">Preço de locação</InputLabel>
        <input hidden id="values.longStay" />
        <div className="mt-4 flex w-full gap-2">
          <PriceInput
            disabled={
              !filters.availableFor.includes("LOCACAO") &&
              !filters.availableFor.includes("VENDA_E_LOCACAO")
            }
            value={filters.values.longStay.min}
            name="values.longStay.min"
            label="Valor mínimo"
            onChange={(val) => handleChangeValue(val, "longStay", "min")}
          />
          <PriceInput
            disabled={
              !filters.availableFor.includes("LOCACAO") &&
              !filters.availableFor.includes("VENDA_E_LOCACAO")
            }
            value={filters.values.longStay.max}
            name="values.longStay.max"
            label="Valor máximo"
            onChange={(val) => handleChangeValue(val, "longStay", "max")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="values.propertyTax">IPTU</InputLabel>
        <input hidden id="values.propertyTax" />
        <div className="mt-4 flex w-full gap-2">
          <PriceInput
            value={filters.values.propertyTax.min}
            name="values.propertyTax.min"
            label="Valor mínimo"
            onChange={(val) => handleChangeValue(val, "propertyTax", "min")}
          />
          <PriceInput
            value={filters.values.propertyTax.max}
            name="values.propertyTax.max"
            label="Valor máximo"
            onChange={(val) => handleChangeValue(val, "propertyTax", "max")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="values.condoFee">Taxa de Condomínio</InputLabel>
        <input hidden id="values.condoFee" />
        <div className="mt-4 flex w-full gap-2">
          <PriceInput
            value={filters.values.condoFee.min}
            name="values.condoFee.min"
            label="Valor mínimo"
            onChange={(val) => handleChangeValue(val, "condoFee", "min")}
          />
          <PriceInput
            value={filters.values.condoFee.max}
            name="values.condoFee.max"
            label="Valor máximo"
            onChange={(val) => handleChangeValue(val, "condoFee", "max")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="areas.useful">Área útil</InputLabel>
        <input hidden id="areas.useful" />
        <div className="mt-4 flex w-full gap-2">
          <AreaInput
            value={filters.areas.useful.min}
            name="areas.useful.min"
            label="Área mínima"
            onChange={(val) => handleChangeArea(val, "useful", "min")}
          />
          <AreaInput
            value={filters.areas.useful.max}
            name="areas.useful.max"
            label="Área máxima"
            onChange={(val) => handleChangeArea(val, "useful", "max")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="areas.land">Área terreno</InputLabel>
        <input hidden id="areas.land" />
        <div className="mt-4 flex w-full gap-2">
          <AreaInput
            value={filters.areas.land.min}
            name="areas.land.min"
            label="Área mínima"
            onChange={(val) => handleChangeArea(val, "land", "min")}
          />
          <AreaInput
            value={filters.areas.land.max}
            name="areas.land.max"
            label="Área máxima"
            onChange={(val) => handleChangeArea(val, "land", "max")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="accepts">Aceita</InputLabel>
        <input hidden id="accepts" />
        <div className="mt-4 flex w-full flex-col gap-2">
          {FILTER_ACCEPTS.map((p) => (
            <Checkbox
              name={`accepts-${p}`}
              key={p}
              label={
                FILTER_ACCEPTS_WITH_LABEL.find((t) => t.value === p)?.label
              }
              onChange={() => handleClickAccepts(p)}
              value={filters.accepts.includes(p)}
            />
          ))}
        </div>
      </div>

      <div>
        <InputLabel htmlFor="use">Uso</InputLabel>
        <input hidden id="use" />
        <div className="mt-4 flex w-full flex-col gap-2">
          {PROPERTY_USE.map((p) => (
            <Checkbox
              name={`use-${p}`}
              key={p}
              label={PROPERTY_USE_WITH_LABEL.find((t) => t.value === p)?.label}
              onChange={() => handleClickUse(p)}
              value={filters.use.includes(p)}
            />
          ))}
        </div>
      </div>

      <div>
        <InputLabel htmlFor="face">Face</InputLabel>
        <input hidden id="face" />
        <div className="mt-4 grid w-full grid-cols-2 gap-2">
          {FILTER_FACE.map((p) => (
            <Checkbox
              name={`face-${p}`}
              key={p}
              label={FILTER_FACE_WITH_LABEL.find((t) => t.value === p)?.label}
              onChange={() => handleClickFaces(p)}
              value={filters.face.includes(p)}
            />
          ))}
        </div>
      </div>

      <div>
        <InputLabel htmlFor="zapRating">Nota ZAP</InputLabel>
        <input hidden id="zapRating" />
        <div className="mt-4 flex w-full gap-2">
          <NumberInput
            value={filters.zapRating.min}
            name="zapRating.min"
            label="Nota mínima"
            onChange={(val) => handleChangeZapRating(val, "min")}
          />
          <NumberInput
            value={filters.zapRating.max}
            name="zapRating.max"
            label="Nota máxima"
            onChange={(val) => handleChangeZapRating(val, "max")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="floor">Andar</InputLabel>
        <input hidden id="floor" />
        <div className="mt-4 flex w-full gap-2">
          <NumberInput
            value={filters.floor.min}
            name="floor.min"
            label="Andar mínimo"
            onChange={(val) => handleChangeFloor(val, "min")}
          />
          <NumberInput
            value={filters.floor.max}
            name="floor.max"
            label="Andar máximo"
            onChange={(val) => handleChangeFloor(val, "max")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="baths">Banheiros</InputLabel>
        <input hidden id="baths" />
        <div className="mt-4">
          <MinValue
            value={filters.minBaths}
            onChange={(val) => handleChangeMin(val, "minBaths")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="rooms">Quartos</InputLabel>
        <input hidden id="rooms" />
        <div className="mt-4">
          <MinValue
            value={filters.minRooms}
            onChange={(val) => handleChangeMin(val, "minRooms")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="suites">Suítes</InputLabel>
        <input hidden id="suites" />
        <div className="mt-4">
          <MinValue
            value={filters.minSuites}
            onChange={(val) => handleChangeMin(val, "minSuites")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="parkingLots">Vagas</InputLabel>
        <input hidden id="parkingLots" />
        <div className="mt-4">
          <MinValue
            value={filters.minParkingLots}
            onChange={(val) => handleChangeMin(val, "minParkingLots")}
          />
        </div>
      </div>

      <div>
        <InputLabel htmlFor="type">Tipo</InputLabel>
        <input hidden id="type" />
        <div className="mt-4 grid w-full grid-cols-2 gap-2">
          {RESIDENTIAL_TYPE.map((p) => (
            <Checkbox
              name={`residentialTypes-${p}`}
              key={p}
              label={
                RESIDENTIAL_TYPE_WITH_LABEL.find((t) => t.value === p)?.label
              }
              onChange={() => handleClickResidentialType(p)}
              value={filters.residentialTypes.includes(p)}
            />
          ))}
          {COMMERCIAL_TYPE.map((p) => (
            <Checkbox
              name={`commercialTypes-${p}`}
              key={p}
              label={
                COMMERCIAL_TYPE_WITH_LABEL.find((t) => t.value === p)?.label
              }
              onChange={() => handleClickCommercialType(p)}
              value={filters.commercialTypes.includes(p)}
            />
          ))}
        </div>
      </div>

      <div>
        <InputLabel htmlFor="status">Situação</InputLabel>
        <input hidden id="status" />
        <div className="mt-4 grid w-full grid-cols-2 gap-2">
          {PROPERTY_STATUS.map((p) => (
            <Checkbox
              name={`status-${p}`}
              key={p}
              label={
                PROPERTY_STATUS_WITH_LABEL.find((t) => t.value === p)?.label
              }
              onChange={() => handleClickStatus(p)}
              value={filters.status.includes(p)}
            />
          ))}
        </div>
      </div>

      <div>
        <InputLabel htmlFor="transactionStatus">Status</InputLabel>
        <input hidden id="transactionStatus" />
        <div className="mt-4 grid w-full grid-cols-2 gap-2">
          {TRANSACTION_STATUS.map((p) => (
            <Checkbox
              name={`transactionStatus-${p}`}
              key={p}
              label={
                TRANSACTION_STATUS_WITH_LABEL.find((t) => t.value === p)?.label
              }
              onChange={() => handleClickTransactionStatus(p)}
              value={filters.transactionStatus.includes(p)}
            />
          ))}
        </div>
      </div>

      <button onClick={() => handleReset(polygons)}>Limpar</button>
    </div>
  );
};
