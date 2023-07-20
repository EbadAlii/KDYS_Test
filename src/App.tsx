import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { assets } from "./assets";

function App() {
  console.log(assets);
  const [selected, setSelected] = useState(-1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe)
      console.log("swipe", isLeftSwipe ? "left" : "right");
    if (isLeftSwipe) {
      setSelected(selected - 1);
    }
    if (isRightSwipe) {
      setSelected(selected + 1);
    }
  };

  return (
    <div className="h-[100vh] select-none">
      <div className="flex h-[100%] w-[100vw] overflow-x-scroll no-scrollbar">
        {assets.map((obj: any, i: any) =>
          selected !== i ? (
            <div
              className={`
              ${i === 0 && "bg-[#0F4196]"}
              ${i === 1 && "bg-[#808080]"}
              ${i === 2 && "bg-[#F0271E]"}
              ${i === 3 && "bg-[#773A9A]"}
              transition-width duration-1000 ease-in-out w-[25%] h-[100%]  
              ${selected !== -1 ? "hidden" : ""}
              `}
              onClick={() => {
                setSelected(i);
                console.log("Selected: ", i);
              }}
            >
              <div className="pt-[20px] pl-[20px] text-white font-[700] text-[40px]">
                {i + 1}
              </div>
              <div className={`flex h-[80%] justify-center items-center`}>
                <div className="">
                  <img className="max-h-[150px]" src={obj.img} alt="" />
                </div>
              </div>
            </div>
          ) : (
            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="w-[100vw] flex transition-width duration-1000 ease-in-out"
              onClick={() => {
                setSelected(-1);
                console.log("Selected: ", i);
              }}
            >
              <div className={`w-[50%] bg-[${obj.bgColor}]`}>
                <div className="w-[50%]">
                  <div className="pt-[20px] pl-[20px] text-white font-[700] text-[40px]">
                    {i + 1}
                  </div>
                  <div className="pt-[20px] pl-[20px] text-white font-[700] text-[40px]">
                    {obj.headingText}
                  </div>
                  <div className="pt-[20px] pl-[20px] text-white font-[300] text-[20px] leading-7 tracking-wide">
                    {obj.paraText}
                  </div>
                </div>
              </div>
              <div className="w-[50%]">
                <img className="h-[100%] w-[100%]" src={obj.bgImg} alt="" />
              </div>
              <div className={`absolute top-[35%] left-[35%]`}>
                <img src={obj.img} alt="" />
              </div>
              <div>
                <img
                  className="absolute h-[70px] bottom-[10px] left-[10px]"
                  src={obj.ftImg}
                  alt=""
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
