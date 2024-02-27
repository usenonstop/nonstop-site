import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  propertyFilterAtom,
  propertyMapSelectedProperties,
  propertyPaginationAtom,
  propertyPerimetersAtom,
  propertySearchAtom,
} from "~/atoms/property";
import { PROPERTY_SORT_OPTIONS } from "~/consts/property";
import { sortingToQuery } from "~/fns/sortingToQuery";
import { useDebounce } from "~/hooks/useDebounce";
import type { SortingState, StateFilter } from "~/types/property";
import { Header, tokenAtom } from "~/ui/Header";
import { MapButton } from "~/ui/MapButton";
import { Pagination } from "~/ui/Pagination";
import { PaginationSelect } from "~/ui/PaginationSelect";
import { PropertiesMap } from "~/ui/PropertiesMap";
// import { NoToken } from "~/ui/NoToken";
import { PropertyCard } from "~/ui/PropertyCard";
import { PropertyFilter } from "~/ui/PropertyFilter";
import { Results } from "~/ui/Results";
import { SortingButton } from "~/ui/SortingButton";
import { Select } from "~/ui/Select";
import { api } from "~/utils/api";
import { Autocomplete } from "~/ui/Autocomplete";

export default function Imoveis() {
  const [token] = useAtom(tokenAtom);
  const [showMap, setShowMap] = useState(false);
  const [pagination, setPagination] = useAtom(propertyPaginationAtom);
  const [filters, setFilters] = useAtom(propertyFilterAtom);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedProperties] = useAtom(propertyMapSelectedProperties);
  const [perimeters] = useAtom(propertyPerimetersAtom);
  const [input, setInput] = useState("");
  const [search, setSearch] = useAtom(propertySearchAtom);
  const [cityQuery, setCityQuery] = useState("");
  const debouncedInput = useDebounce(input, 400);
  const debouncedFilters = useDebounce(filters, 400);
  const debouncedCityQuery = useDebounce(cityQuery, 400);

  useEffect(() => {
    setSearch(debouncedInput);
  }, [debouncedInput, setSearch]);

  const { data } = api.property["get-all"].useQuery({
    token,
    pagination,
    search,
    sort: sortingToQuery(sorting),
    selectedProperties,
    filters: debouncedFilters,
    perimeters,
  });

  const { data: statesData } = api.property["get-states"].useQuery(token);

  const { data: citiesData, isLoading } = api.property["get-cities"].useQuery({
    token,
    state: filters.state,
    query: debouncedCityQuery,
  });

  const properties = data?.properties ?? [];
  const total = data?.total ?? 0;
  const states = statesData ? (["TODOS", ...statesData] as StateFilter[]) : [];
  const cities = citiesData ?? [];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Header title="IMÓVEIS" />
      <div className="z-20 flex h-16 w-full items-center justify-between p-4">
        <div className="flex w-80 gap-4">
          <SortingButton
            showDesktop
            disabled={false}
            sorting={sorting}
            setSorting={setSorting}
            sortingOptions={PROPERTY_SORT_OPTIONS}
          />
          <MapButton
            disabled={false}
            value={showMap}
            onClick={() => setShowMap((s) => !s)}
          />
        </div>

        <div className="flex w-full max-w-96 items-center">
          <Pagination
            total={total}
            pagination={pagination}
            onClick={(p) => setPagination((prev) => ({ ...prev, currPage: p }))}
          />

          <Results total={total} pagination={pagination} />
        </div>
        <PaginationSelect
          disabled={false}
          onChange={(perPage) => setPagination({ perPage, currPage: 1 })}
          perPage={pagination.perPage}
        />
      </div>
      <div className="flex h-[calc(100vh-272px)] w-full p-4">
        {!showMap && (
          <div className="flex h-full w-1/4 flex-col gap-2 overflow-scroll border p-4 shadow-inner shadow-gray-300 scrollbar">
            <input
              placeholder="Endereço, Agente, Imobiliária, Condomínio ou Código"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded border p-2"
            />
            <div className="flex flex-col gap-2 text-gray-700">
              <Select
                label="UF"
                value={filters.state}
                onChange={(s) => setFilters((f) => ({ ...f, state: s }))}
                name="state"
                options={states}
              />
              <Autocomplete
                name="city"
                isLoading={isLoading}
                onClose={() => setFilters((f) => ({ ...f, city: "TODAS" }))}
                options={cities}
                onChange={(city) => setFilters((f) => ({ ...f, city }))}
                onChangeInput={(i) => setCityQuery(i)}
                value={filters.city}
                label="Cidade"
              />
            </div>
            <div className="mt-6 px-2 pb-10">
              <PropertyFilter />
            </div>
          </div>
        )}
        {showMap && (
          <div className="h-full w-3/5">
            <PropertiesMap />
          </div>
        )}
        <div
          className={`${showMap ? "w-2/5" : "w-3/4"} overflow-scroll scrollbar`}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* {!token && <NoToken />} */}
            {properties?.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
