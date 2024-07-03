"use client";

import { ReactElement } from "react";

const MallHeaderSearch = (): ReactElement => {
  return (
    <div className="py-3 bg-white">
      <p className="text-center">準備中です。</p>
      <div className="flex justify-center">
        {/* 検索ボタン */}
        <div className="flex items-center mt-4">
          <button
            className="bg-[#1F2937] py-1 px-2 cursor-pointer h-full rounded text-white"
            onClick={() => alert("検索機能は準備中です。(検索)")}
          >
            <span className="material-symbols-outlined text-[#FFF] pr-1 !text-sm">search</span>検索
          </button>
          {/* クリアボタン */}
          <button className="ml-4 cursor-pointer py-1 px-2" onClick={() => alert("検索機能は準備中です。(クリア)")}>
            クリア
          </button>
        </div>
      </div>
    </div>
  );
};

export default MallHeaderSearch;
