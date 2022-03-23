import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./SplashPageTemplate/AuthorCard/AuthorCard.css";
import "./../AboutPage/AboutPageNew/AboutPageNew.css";

/* importing images*/
import NFTLA1_rounded from './images/NFT-LA-Dig-V01-modified.png';
import NFTLA1 from './images/NFT-LA-Dig-V01.jpg';
import NFTLA2 from './images/NFT-LA-Dig-V02.png';
import NFTLA3 from './images/NFT-LA-Dig-V03.png';
import NFTLA_Video from "./images/NFT-LA-RAIR-2021.mp4"

/* importing Components*/
import TeamMeet from "./TeamMeet/TeamMeetList";
import AuthorCard from "./SplashPageTemplate/AuthorCard/AuthorCard";
import setTitle from '../../utils/setTitle';
import NotCommercialTemplate from "./NotCommercial/NotCommercialTemplate";
import CarouselModule from "./SplashPageTemplate/Carousel/Carousel";
import VideoPlayerModule from "./SplashPageTemplate/VideoPlayer/VideoPlayerModule";
import StaticTiles from "./SplashPageTemplate/VideoTiles/StaticTiles";
import UnlockableVideo from "./images/nipsey1.png";

// Google Analytics
//const TRACKING_ID = 'UA-209450870-5'; // YOUR_OWN_TRACKING_ID
//ReactGA.initialize(TRACKING_ID);

const splashData = {
  title: "#nftla",
  titleColor: "#A4396F",
  description: "Connect your wallet to receive a free airdrop. Unlock exclusive encrypted streams",
  backgroundImage: NFTLA1_rounded,
  buttonColor: "#A4396F",
  buttonLabel: "Submit with Form",
  NFTName: "NFT art",
  video: NFTLA_Video,
  carouselData: [
    {
      title: "Horizon",
      img: NFTLA2
    },
    {
      title: "Dark",
      img: NFTLA3
    },
    {
      title: "Palm",
      img: NFTLA1
    }
  ],
  tilesTitle: "Unlockable Conference Videos Coming Soon"
}



const NFTLASplashPage = ({ loginDone }) => {
  const { primaryColor } = useSelector((store) => store.colorStore);
  const carousel_match = window.matchMedia('(min-width: 900px)')
  const [carousel, setCarousel] = useState(carousel_match.matches)
  window.addEventListener("resize", () => setCarousel(carousel_match.matches))
  
  useEffect(() => {
    setTitle(`NFTLA`);
  }, [])

  const formHyperlink = () => {
    window.open(
      'https://placekitten.com/200/300'
    );  
  }

  return (
    <div className="wrapper-splash-page">
      <div className="template-home-splash-page">
        <AuthorCard formHyperlink={formHyperlink} splashData={splashData}/>
        <CarouselModule carousel={!carousel} carouselData={splashData.carouselData}/>
        <VideoPlayerModule backgroundImage={splashData.backgroundImage} video={splashData.video}/>
        <StaticTiles title={splashData.tilesTitle} primaryColor={primaryColor} UnlockableVideo={UnlockableVideo}/>
        <TeamMeet primaryColor={primaryColor} arraySplash={"NFTLA"} />
        <NotCommercialTemplate primaryColor={primaryColor} NFTName={splashData.NFTName}/> 
      </div>
    </div>
  );
};

export default NFTLASplashPage;