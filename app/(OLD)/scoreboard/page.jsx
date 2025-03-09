import Container from "@/components/Container";
import React from "react";
import BattingStats from "@/components/BattingStats";
import BowlerStats from "@/components/BowlerStats";
import Header from "@/components/Header";
import Button from "@/components/Button";

const page = () => {
  return (
    <Container>
      <Header title="Scoreboard" />
      <div className="flex flex-col gap-3 px-3">
        <div className="bg-[#F1F5F9] rounded-md p-[10px]">
          <div className="flex justify-between items-end  rounded-sm bg-white p-2 ">
            <div className="flex flex-col gap-2">
              <p className="">Team A , 1st Inning</p>
              <div>
                <p className="text-[28px] font-semibold">
                  22 - 2 <span className="text-[20px]">(0.0)</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <p className=" uppercase">crr</p>
              <p>5.77</p>
            </div>
          </div>
        </div>
        <BattingStats />
        <BowlerStats />
        <div className="bg-[#F1F5F9] rounded-md p-[10px]">
          <div className="flex rounded-md items-center bg-white p-2 gap-3 ">
            <p className="">This Over</p>
            <div className="flex gap-2">
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                2
              </p>
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                4
              </p>
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                1
              </p>
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                0
              </p>
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                6
              </p>
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                2
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#F1F5F9] rounded-md p-[10px]">
          <div className="flex rounded-md items-center bg-white p-2 gap-3 ">
            <div className="flex gap-3 justify-center items-center flex-wrap">
              <input type="checkbox" />
              <label>Wicket</label>
              <input type="checkbox" />
              <label>Wide</label>
              <input type="checkbox" />
              <label>No ball</label>
              <input type="checkbox" />
              <label>Byes</label>
              <input type="checkbox" />
              <label>LegBy</label>
            </div>
            <div className=" space-y-2">
              <Button text="Retire" />
              <Button text="Swap" />
            </div>
          </div>
        </div>
        <div className="bg-[#F1F5F9] rounded-md p-[10px]">
          <div className="flex rounded-md items-center bg-white p-2 gap-3 ">
            <div className="w-[40%] p-1 rounded-sm border border-gray-100 ">
              <div className="flex flex-col p-2 bg-[#F1F5F9] rounded-sm  space-y-2">
                <Button text="undo" />
                <Button text="Partnership" />
                <Button text="extras" />
              </div>
            </div>
            <div className="w-[60%]  p-1 rounded-sm border border-gray-100  ">
              <div className=" flex gap-3 justify-center items-center flex-wrap p-2 bg-[#F1F5F9] rounded-sm">
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  0
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  1
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  2
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  3
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  4s
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  5
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  6s
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  ...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
