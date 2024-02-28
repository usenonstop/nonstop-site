import { useAtom } from "jotai";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { Header, tokenAtom } from "~/ui/Header";
import { api } from "~/utils/api";
// import { NoToken } from "~/ui/NoToken";
import { CondoPage } from "~/ui/CondoPage";

type PageProps = InferGetServerSidePropsType<typeof getStaticProps>;

export default function Imovel({ id }: PageProps) {
  const [token] = useAtom(tokenAtom);
  const { data: condo } = api.condo.get.useQuery({ token, id });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Header title="CONDOMÍNIO" />
      <div className="h-[calc(100vh-208px)] w-full overflow-scroll scrollbar">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* {!token && <NoToken />} */}
          {condo && <CondoPage condo={condo} />}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  id: string;
}> = async (context) => {
  const id = context.params?.id;

  if (typeof id !== "string") return { props: { notFound: true, id: "" } };

  return { props: { id }, revalidate: 60, notFound: !id };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
