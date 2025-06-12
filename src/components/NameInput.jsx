import React from "react";

const NameInput = ({
  kanjiName,
  onChangeKanjiName,
  kanaName,
  onChangeKanaName,
  errorFurigana,
}) => {
  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            名前（必須）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            minLength={2} //文字数が正しいかチェック{2文字以上}
            type="text"
            placeholder="山田たろう"
            value={kanjiName}
            onChange={onChangeKanjiName}
          />
          {kanjiName === "" && (
            <p className="text-red-500 text-xs italic">
              名前を入力してください。
            </p>
          )}
        </div>

        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            フリガナ（必須）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            minLength={2} //文字数が正しいか{2文字以上}
            type="text"
            placeholder="ヤマダタロウ"
            value={kanaName}
            onChange={onChangeKanaName}
          />
          {/* A && B でAがTrueの場合Bが実行される = */}
          {/* => kanaNamwが空白の場合のみpテキストが表示される */}
          {kanaName === "" && (
            <p className="text-red-500 text-xs italic">
              名前をカタカナで入力してください。
            </p>
          )}
          {errorFurigana && <p style={{ color: "red" }}>{errorFurigana}</p>}
        </div>
      </div>
    </>
  );
};

export default NameInput;
