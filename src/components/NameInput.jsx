import React from "react";

const NameInput = ({
  fullNameValue,
  onChangeFullName,
  onChangeKanaName,
  kanaNameValue,
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
            name="fullName"
            value={fullNameValue}
            onChange={onChangeFullName}
          />
          {fullNameValue === "" && (
            <p className="text-red-500 text-xs italic">
              名前を入力してください。
            </p>
          )}
        </div>

        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            なまえ
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="ヤマダタロウ"
            name="kanaName"
            value={kanaNameValue}
            onChange={onChangeKanaName}
          />
          {/* A && B でAがTrueの場合Bが実行される = */}
          {/* => kanaNamwが空白の場合のみpテキストが表示される */}
          {kanaNameValue === "" && (
            <p className="text-blue-400 text-xs italic">
              任意です。<br></br>
              日本語での読みが必要な場合のみ入力してください。
            </p>
          )}
          {errorFurigana && <p style={{ color: "red" }}>{errorFurigana}</p>}
        </div>
      </div>
    </>
  );
};

export default NameInput;
