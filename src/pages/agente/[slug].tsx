import { useAtom } from "jotai";
import Image from "next/image";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { Header, tokenAtom } from "~/ui/Header";
import { NoToken } from "~/ui/NoToken";
import { api } from "~/utils/api";
import { FiShare2 } from "react-icons/fi";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { RiWhatsappLine } from "react-icons/ri";
import { Flag } from "~/ui/Flag";

type PageProps = InferGetServerSidePropsType<typeof getStaticProps>;

export default function Agente({ slug }: PageProps) {
  const [token] = useAtom(tokenAtom);
  const { data: agent } = api.agent.profile.useQuery(
    { token, slug },
    {
      enabled: !!token,
    },
  );

  const facebook = agent?.socialMedias.find((s) => s.name === "Facebook")?.url;
  const instagram = agent?.socialMedias.find(
    (s) => s.name === "Instagram",
  )?.url;
  const youtube = agent?.socialMedias.find((s) => s.name === "Youtube")?.url;
  const twitter = agent?.socialMedias.find((s) => s.name === "Twitter")?.url;
  const linkedin = agent?.socialMedias.find((s) => s.name === "Linkedin")?.url;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Header title="AGENTE" />
      <div className="scrollbar h-[calc(100vh-208px)] w-full overflow-scroll pb-40">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {!token && <NoToken />}
          {agent && (
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex w-64 flex-col gap-8">
                <div className="relative h-80 w-64 shrink-0">
                  <Image
                    draggable={false}
                    priority
                    className="object-cover"
                    alt="Imagem de perfil"
                    src={
                      agent.profileImage ??
                      "https://www.usenonstop.com/images/user-placeholder.webp"
                    }
                    fill
                    sizes="256px"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <div className="font-baloo text-3xl font-medium">
                      {agent.name}
                    </div>

                    <div className="text-gray-700">
                      <div>Corretor</div>
                      {!!agent.creci && (
                        <div className="text-sm">
                          <span className="">CRECI</span> {agent.creci}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="flex w-fit items-center gap-2 rounded-lg border px-3 py-2 text-gray-700 shadow"
                  onClick={() => alert("compartilhar")}
                >
                  Compartilhar
                  <FiShare2 />
                </button>
                <div className="mt-auto flex flex-wrap gap-4 text-2xl text-gray-700">
                  {!!facebook && (
                    <Link draggable={false} href={facebook}>
                      <FaFacebook />
                    </Link>
                  )}
                  {!!instagram && (
                    <Link draggable={false} href={instagram}>
                      <FaInstagram />
                    </Link>
                  )}
                  {!!youtube && (
                    <Link draggable={false} href={youtube}>
                      <FaYoutube />
                    </Link>
                  )}
                  {!!twitter && (
                    <Link draggable={false} href={twitter}>
                      <FaTwitter />
                    </Link>
                  )}
                  {!!linkedin && (
                    <Link draggable={false} href={linkedin}>
                      <FaLinkedin />
                    </Link>
                  )}
                  {!!agent.email && (
                    <Link
                      draggable={false}
                      href={`mailto:${agent.corporateEmail ?? agent.email}`}
                    >
                      <MdOutlineEmail />
                    </Link>
                  )}
                  {!!agent.phone && (
                    <Link draggable={false} href={`tel:${agent.phone}`}>
                      <AiOutlinePhone />
                    </Link>
                  )}
                  {!!agent.whatsapp && (
                    <Link
                      draggable={false}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://wa.me/+55${agent.whatsapp?.replace(/\D/g, "")}`}
                    >
                      <RiWhatsappLine />
                    </Link>
                  )}
                </div>
                {agent.type === "AGENTE" &&
                  !!agent.brokerage?.profileImage &&
                  !!agent.brokerage?.slug && (
                    <div>
                      <span className="font-baloo text-2xl font-medium">
                        Agente da
                      </span>
                      <Link
                        draggable={false}
                        href={`/perfil/${agent.brokerage.slug}/#top`}
                      >
                        <div className="relative h-40 w-64">
                          <Image
                            draggable={false}
                            className="object-cover"
                            alt="Logo da organização"
                            src={agent.brokerage.profileImage}
                            fill
                          />
                        </div>
                      </Link>
                    </div>
                  )}
                {agent.type === "AGENTE" && agent.languages.length > 0 && (
                  <div>
                    <span className="font-baloo text-2xl font-medium">
                      Idiomas
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {agent.languages.map((l) => (
                        <Flag key={l} code={l} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex h-full w-full max-w-xl flex-col justify-between gap-8">
                {!!agent.about && (
                  <div className="flex w-full flex-col gap-2">
                    <span className="font-baloo text-2xl font-medium">
                      Sobre
                    </span>
                    <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg max-h-60 overflow-scroll pr-4 text-sm text-gray-500">
                      {agent.about}
                    </div>
                  </div>
                )}

                {agent.actuationAreas.length > 0 && (
                  <div className="flex w-full flex-col gap-1">
                    <span className="font-baloo text-2xl font-medium">
                      Áreas de atuação
                    </span>
                    <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg flex max-h-36 flex-wrap gap-3 overflow-scroll pr-4 text-sm text-gray-500">
                      {agent.actuationAreas.map((a) => (
                        <div
                          className="h-fit rounded-lg border p-2 shadow"
                          key={a.id}
                        >{`${!!a.area.replace(/\s/g, "") ? a.area + " - " : ""}${
                          a.city
                        }/${a.state}`}</div>
                      ))}
                    </div>
                  </div>
                )}

                {!!agent.partnershipRules && (
                  <div className="flex w-full flex-col gap-1">
                    <span className="font-baloo text-2xl font-medium">
                      Regras de parceria
                    </span>
                    <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg flex max-h-60 flex-wrap gap-3 overflow-scroll whitespace-pre-wrap pr-4 text-sm text-gray-500">
                      {agent.partnershipRules}
                    </div>
                  </div>
                )}

                {agent.type === "AGENTE" && agent.education && (
                  <div className="flex flex-col gap-2">
                    <span className="font-baloo text-2xl font-medium">
                      Formação acadêmica
                    </span>
                    <div className="truncate text-sm text-gray-500">
                      {agent.education}
                    </div>
                  </div>
                )}

                {agent.site && (
                  <div className="flex flex-col gap-2">
                    <span className="font-baloo text-2xl font-medium">
                      Website
                    </span>
                    <div className="truncate text-sm text-gray-500">
                      <a href={agent.site}>{agent.site}</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  slug: string;
}> = async (context) => {
  const slug = context.params?.slug;

  if (typeof slug !== "string") return { props: { notFound: true, slug: "" } };

  return { props: { slug }, revalidate: 60, notFound: !slug };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
