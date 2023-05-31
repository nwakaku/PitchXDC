import React ,{useEffect} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useGateway } from "@civic/ethereum-gateway-react";
import { useAccount } from "wagmi";
import { IdentityButton } from "@civic/ethereum-gateway-react";




export default dynamic (() => Promise.resolve(Homepage), {ssr: false})

const Homepage = () => {
  const { gatewayStatus, gatewayToken } = useGateway();
  const { address, isConnected } = useAccount();


  function handleContact(e: string) {
    window.open(e);
  }
  
  

   useEffect(() => {
 
   }, []);
  return (
    <>
      <section className="bg-[#fff] dark:bg-[#fff]">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-[#012169]">
              Empowering Startups <br /> with Opportunities
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              PitchTube is an NFT-gated startup incubator platform that enables
              startups to raise funding through video pitches while providing
              networking and mentorship opportunities
            </p>
            {gatewayToken ? (
              <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <a
                  href="/BuyNFT"
                  className="text-white bg-[#ff9e00]-500 hover:bg-[#ff9e00]-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-[#ff9e00] dark:hover:bg-[#ff9e00] focus:outline-none dark:focus:ring-green-800"
                >
                  Launch App
                </a>
              </div>
            ) : (
              isConnected && <IdentityButton />
            )}
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src={
                "https://img.freepik.com/premium-vector/online-courses-flat-modern-design-illustration_566886-263.jpg?w=996"
              }
              alt="hero image"
            />
          </div>
        </div>
      </section>

      <footer>
        <div className="bg-[#100a25] text-white grid grid-cols-2 w-full">
          <div className="flex flex-col items-start p-4 justify-start">
            <p className="text-xl">PitchTube</p>
            <p className="text-sm">
              A One stop shop for STARTUPS and INVESTORS
            </p>
            <div className="flex   gap-8 mt-2">
              <div>
                <img
                  className="cursor-pointer"
                  src="/img/twitter.png"
                  alt="bg"
                  width={40}
                />
              </div>
              <div>
                <img
                  className="cursor-pointer"
                  src="/img/github.png"
                  alt="bg"
                  width={40}
                />
              </div>
              <div>
                <img
                  className="cursor-pointer"
                  src="/img/linkin.png"
                  alt="bg"
                  height={40}
                  width={40}
                />
              </div>
            </div>
          </div>
          <span className=" py-2 my-auto  text-[#c7c7c7] text-xs">
            ©2023 PitchTube. ALL COPYRIGHTS RESERVED
          </span>
        </div>
      </footer>
    </>
  );
}
