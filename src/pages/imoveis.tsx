// import { useAtom } from "jotai";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  propertyFilterAtom,
  propertyMapSelectedProperties,
  propertyPaginationAtom,
  propertyPerimetersAtom,
  propertySearchAtom,
} from "~/atoms/property";
import { PROPERTY_SORT_OPTIONS, UF_FILTER } from "~/consts/property";
import { sortingToQuery } from "~/fns/sortingToQuery";
import { useDebounce } from "~/hooks/useDebounce";
import type { SortingState } from "~/types/property";
import { Header } from "~/ui/Header";
import { MapButton } from "~/ui/MapButton";
import { Pagination } from "~/ui/Pagination";
import { PaginationSelect } from "~/ui/PaginationSelect";
import { PropertiesMap } from "~/ui/PropertiesMap";
// import { NoToken } from "~/ui/NoToken";
import { PropertyCard } from "~/ui/PropertyCard";
import { PropertyFilter } from "~/ui/PropertyFilter";
import { Results } from "~/ui/Results";
import { SortingButton } from "~/ui/SortingButton";
import { StringSelect } from "~/ui/StringSelect";
import { api } from "~/utils/api";

export default function Imoveis() {
  // const [token] = useAtom(tokenAtom);
  const [showMap, setShowMap] = useState(false);
  const [pagination, setPagination] = useAtom(propertyPaginationAtom);
  const [filters, setFilters] = useAtom(propertyFilterAtom);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedProperties] = useAtom(propertyMapSelectedProperties);
  const [perimeters] = useAtom(propertyPerimetersAtom);
  const [input, setInput] = useState("");
  const [search, setSearch] = useAtom(propertySearchAtom);
  const debouncedInput = useDebounce(input, 400);
  const debouncedFilters = useDebounce(filters, 400);

  useEffect(() => {
    setSearch(debouncedInput);
  }, [debouncedInput, setSearch]);

  const { data } = api.property["get-all"].useQuery(
    {
      pagination,
      search,
      sort: sortingToQuery(sorting),
      selectedProperties,
      filters: debouncedFilters,
      perimeters,
    },
    // { enabled: !!token },
  );

  const properties = data?.properties ?? [];
  const total = data?.total ?? 0;

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
          <div className="flex h-full w-1/4 flex-col gap-2 border p-4 shadow-inner shadow-gray-300">
            <input
              placeholder="Endereço, Agente, Imobiliária, Condomínio ou Código"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded border p-2"
            />
            <div className="text-gray-700">
              <StringSelect
                value={filters.state}
                onChange={(s) => setFilters((f) => ({ ...f, state: s }))}
                name="state"
                options={UF_FILTER}
              />
            </div>
            <div className="mt-6 h-[calc(100%-64px)] overflow-scroll px-2 pb-10 scrollbar">
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
