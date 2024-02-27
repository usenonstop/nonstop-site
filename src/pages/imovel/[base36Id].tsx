import { useAtom } from "jotai";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { Header, tokenAtom } from "~/ui/Header";
import { api } from "~/utils/api";
// import { NoToken } from "~/ui/NoToken";
import { PropertyPage } from "~/ui/PropertyPage";

type PageProps = InferGetServerSidePropsType<typeof getStaticProps>;

export default function Imovel({ base36Id }: PageProps) {
  const [token] = useAtom(tokenAtom);
  const { data: property } = api.property.get.useQuery({ token, base36Id });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Header title="IMÓVEL" />
      <div className="h-[calc(100vh-208px)] w-full overflow-scroll scrollbar">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* {!token && <NoToken />} */}
          {property && <PropertyPage property={property} />}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  base36Id: string;
}> = async (context) => {
  const base36Id = context.params?.base36Id;

  if (typeof base36Id !== "string")
    return { props: { notFound: true, base36Id: "" } };

  return { props: { base36Id }, revalidate: 60, notFound: !base36Id };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
