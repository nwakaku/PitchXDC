import React, { useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  CoreContractAddress,
  CoreContractAbi,
  PitchXAddress,
  PitchXAbi,
} from "../constants";
import { useState } from "react";
import { useEffect } from "react";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useBalance,
} from "wagmi";

interface Istarts {
  name: string;
  description: string;
  tags: string;
  owner: string;
  amt: string;
  active: boolean;
  id: string;
  votes: string;
  imgHash: string;
  vidHash: string;
}

export default function AllStartups() {
  const [img, setImg] = useState<string>("img/initial_img.jpg");

  const [allStarts, setAllStarts] = useState<any>([
    {
      name: "",
      description: "",
      tags: "",
      owner: "",
      amt: "",
      active: false,
      id: "",
      votes: "",
      imgHash: "",
      vidHash: "",
    },
  ]);

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const core = useContract({
    address: CoreContractAddress,
    abi: CoreContractAbi,
    signerOrProvider: signer || provider,
  });

  let allStartups: Istarts[] = [];

  async function getMyStarts() {
    try {
      const myStartupTx = await core?.getListOfStartups();
      console.log(myStartupTx);

      myStartupTx.forEach((itm: any) => {
        if (itm.isActive) {
          allStartups.push({
            name: itm.name,
            description: itm.description,
            tags: itm.tagline,
            owner: itm.ownerAddress,
            amt: itm.amount.toString(),
            active: itm.isActive,
            id: itm.sID.toString(),
            votes: itm.upVoteCount.toString(),
            imgHash: itm.imgHash,
            vidHash: itm.videoHash,
          });
        }
      });

      console.log(allStartups);

      // getImgVideo(allStarts.owner);
      setAllStarts(myStartupTx);
      console.log(allStarts);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMyStarts();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-[url('https://awesomescreenshot.s3.amazonaws.com/image/3743367/40435508-30c48ba47302ecd3669c7aadadbff8a5.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20230603%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230603T203615Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=99cfd6b8a6988d538c18488a59d967f23cfe5ce687409d49ee44a7e504090cc5')] bg-cover bg-no-repeat items-center gap-4 pt-24 justify-start text-white scrollbar-hide">
      <Head>
        <title>PitchX - Startups</title>
        <meta name="description" content="Created with <3 by Wisdom" />
        <link rel="icon" href="/hatch.png" />
      </Head>

      <div className="w-full h-screen overflow-scroll overflow-x-hidden scrollbar-hide grid-cols-1 grid auto-rows-max content-start justify-center gap-4">
        {allStarts.map((itm: any, idx: number) => (
          <div
            key={idx}
            className="md:w-2/4 sm:w-2/3 w-4/5 mx-auto h-40 pb-3 bg-gray-500  transition-all duration-300 ease-linear  backdrop-blur-md flex items-start justify-start rounded-xl font-jose overflow-hidden"
          >
            <img
              src={
                itm.imgHash === "initial_img"
                  ? "img/initial_img.jpg"
                  : `https://ipfs.io/ipfs/${itm.imgHash}`
              }
              alt="header"
              className="h-40 w-48"
            />
            {/* {console.log(itm.amount)} */}
            <div className="w-full flex flex-col">
              <div className="w-full flex sm:flex-row flex-col mt-3 sm:mt-0 items-center justify-start">
                <p className="text-white font-semibold pl-2 mr-2 text-md sm:text-2xl">
                  {itm.name}
                  <img
                    src="img/star.png"
                    alt="header"
                    className="inline-block h-3 w-3"
                  />
                  {console.log(itm.amount)}
                  <span className="text-xs mx-0.5">({itm.votes})</span>{" "}
                </p>
                <Link
                  href={{
                    pathname: "/Expand",
                    query: {
                      name: itm.name,
                      descrip: itm.description,
                      tags: itm.tagline,
                      owner: itm.ownerAddress,
                      amt: itm.amount?.toString(),
                      votes: itm.votes,
                      imgHash: itm.imgHash,
                      vidHash: itm.vidHash,
                    },
                  }}
                  className="rounded-2xl bg-yellow-500 hover:shadow-xl hover:scale-110 hover:shadow-black-600 transition-all duration-200 ease-linear flex items-center justify-center py-1.5 px-3 sm:my-3 my-1 mr-2 sm:ml-auto"
                >
                  Expand
                </Link>
              </div>
              <p className="text-base tracking-widest ml-2 sm:block hidden font-semibold">
                Tagline :{itm.tagline}
              </p>
              <div className="text-sm px-2 py-2 w-full overflow-hidden">
                <p className="text-clip h-16 overflow-scroll scrollbar-hide">
                  {itm.amount?.toString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
