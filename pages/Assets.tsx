import React, { useEffect, useState } from "react";
import BoughtData from "../components/BoughtData";
import { useRouter } from "next/router";
import {
  ExchangeContractAddress,
  ExchangeContractAbi,
  CoreContractAddress,
  CoreContractAbi,
} from "../constants";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useBalance,
} from "wagmi";
import Head from "next/head";

interface Mystarts {
  name: string;
  description: string;
  tagline: string;
  owner: string;
  amt: string;
  votes: string;
  imgHash: string;
}

export default function Assets() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [assetArr, setAssetArr] = useState<string[]>([]);
  const [invested, setInvested] = useState<number>(0);
  const [investedStartups, setInvestedStartups] = useState<string[]>([]);

  const [allStarts, setAllStarts] = useState<Mystarts[]>([
    {
      name: "",
      description: "",
      tagline: "",
      owner: "",
      amt: "",
      votes: "",
      imgHash: "",
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

  async function handleStartupsInvested() {
    try {
      setToggle(true);
      const myStartupTx = await core?.getListOfStartups();

      let allStartups: Mystarts[] = [];

      myStartupTx.forEach((itm: any) => {
        if (itm.isActive) {
          allStartups.push({
            name: itm.name,
            description: itm.description,
            tagline: itm.tagline,
            owner: itm.ownerAddress,
            amt: itm.amount.toString(),
            votes: itm.upVoteCount.toString(),
            imgHash: itm.imgHash,
          });
        }
      });

      // getImgVideo(allStarts.owner);
      setAllStarts(myStartupTx);

      const investedIdx = await core?.getTotalInvested();
      // console.log(investedIdx.toNumber());
      const number = investedIdx.toString();
      setInvested(+number);

      const investedStartups = await core?.getInvestedStartupsIdx();
      const idxArr: string[] = [];
      investedStartups.forEach((itm: any) => {
        idxArr.push(itm.toString());
      });
      console.log(idxArr);
      setInvestedStartups(idxArr);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setToggle(true);
    handleStartupsInvested();
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden sm:pt-28 md:pt-24 pt-40   bg-[url('https://awesomescreenshot.s3.amazonaws.com/image/3743367/40435508-30c48ba47302ecd3669c7aadadbff8a5.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20230603%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230603T203615Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=99cfd6b8a6988d538c18488a59d967f23cfe5ce687409d49ee44a7e504090cc5')] bg-cover bg-no-repeat  overflow-hidden  relative ">
      <Head>
        <title>Your Assets - PitchX</title>
        <meta name="description" content="Created with <3 by Wisdom" />
        <link rel="icon" href="/hatch.png" />
      </Head>
      <div className=" m-5 top-24 left-2 z-20 flex justify-center items-center bg-gray-900 text-white py-2 px-4 rounded-lg">
        <p className="text-white ">StartUp Invested</p>
      </div>

      {toggle &&
        investedStartups.map((itm: string, idx: number) => (
          <div
            key={idx}
            className="md:w-2/4 sm:w-2/3 w-4/5 mx-auto h-40 pb-3 bg-white/10  transition-all duration-300 ease-linear mb-4 backdrop-blur-md flex items-start justify-start  rounded-xl font-jose overflow-hidden "
          >
            <img
              src={
                allStarts[+itm].imgHash === "initial_img"
                  ? "img/initial_img.jpg"
                  : `https://ipfs.io/ipfs/${allStarts[+itm].imgHash}`
              }
              alt="header"
              className="h-40 w-48  "
            />
            <div className=" w-full flex flex-col">
              <div className="w-full flex  sm:flex-row flex-col mt-3 sm:mt-0 items-center justify-start">
                <p className="text-white font-semibold pl-2 mr-2 pt-2 text-md sm:text-2xl">
                  {allStarts[+itm].name}
                  <img
                    src="img/star.png"
                    alt="header"
                    className=" inline-block h-3 w-3  "
                  />
                  <span className="text-xs mx-0.5">
                    ({allStarts[+itm].votes})
                  </span>{" "}
                </p>
              </div>
              <p className=" text-white tracking-widest ml-2 sm:block hidden font-semibold">
                Tagline :
              </p>
              <div className=" text-sm  px-2  py-2   w-full overflow-hidden ">
                <p className="text-clip text-white h-16  overflow-scroll scrollbar-hide">
                  {allStarts[+itm].tagline}
                  <br />
                  {invested / 10 ** 18}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
