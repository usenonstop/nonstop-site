import { useAtom } from "jotai";
import { Header, tokenAtom } from "~/ui/Header";
import { NoToken } from "~/ui/NoToken";
import { PropertyCard } from "~/ui/PropertyCard";
import { api } from "~/utils/api";

export default function Home() {
  const [token] = useAtom(tokenAtom);
  const { data: properties } = api.property.getHighlight.useQuery(token, {
    enabled: !!token,
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Header title="DESTAQUES" />
      <div className="h-[calc(100vh-160px)] w-full overflow-scroll">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {!token && <NoToken />}
          {properties?.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </div>
    </div>
  );
}