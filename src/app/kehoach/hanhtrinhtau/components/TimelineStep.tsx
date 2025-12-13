import { EnvironmentOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Pointer } from "lucide-react";

interface TimelineStepProps {
  index: number;
  isFirst: boolean;
  isLast: boolean;
  isLarge: boolean;
}

export default function TimelineStep({
  isFirst,
  isLast,
  isLarge,
}: TimelineStepProps) {
  return (
    <div className="flex flex-col items-center gap-2 relative">
      {/* Nếu là hàng trên → layout bình thường */}
      {!isLarge && (
        <div className="flex flex-col items-center gap-2">
          {/* INPUT LỚN TRÊN */}
          <div className="relative w-[130px]">
            <Input
              className="w-full h-[36px] border border-[#3da6ff] rounded px-2 pr-8"
              type="text"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#3da6ff] font-bold"
              onClick={() => console.log("Open modal")}
              style={{ top: 13, cursor: "pointer" }}
            >
              ...
            </button>
          </div>

          {/* ICON + LINE */}
          <div className="relative w-[163px] flex items-center justify-center">
            <div className="z-10">
              <EnvironmentOutlined className="text-[#0080ff] text-xl" />
            </div>
          </div>
          <div className="w-[16px] h-[16px] border-[2px] border-[#99c8ff] rounded-sm"></div>
        </div>
      )}

      {/* Nếu là hàng dưới → input lớn nằm dưới */}
      {isLarge && (
        <div className="flex flex-col items-center gap-2">
          <div className="w-[16px] h-[16px] border-[2px] border-[#99c8ff] rounded-sm"></div>

          {/* ICON + LINE */}
          <div className="relative w-[163px] flex items-center justify-center">
            <div className="z-10">
              <EnvironmentOutlined className="text-[#0080ff] text-xl" />
            </div>
          </div>
          <div className="relative w-[130px]">
            <Input
              className="w-full h-[36px] border border-[#3da6ff] rounded px-2 pr-8"
              type="text"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#3da6ff] font-bold"
              onClick={() => console.log("Open modal")}
              style={{ top: 13, cursor: "pointer" }}
            >
              ...
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
