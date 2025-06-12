import React from "react";

const MessageInput = ({
  kindsmessage,
  onChangeKindsMessage,
  message,
  onChangeMessage,
}) => {
  return (
    <>
      <div className="w-full mb-6">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          お問い合わせの種類（必須）
        </label>
        <select
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={kindsmessage}
          onChange={onChangeKindsMessage}
        >
          <option value="" disabled>
            --選択してください--
          </option>
          <option value="type1">商品のお届けについて</option>
          <option value="type2">返品・交換について</option>
          <option value="type3">お支払いについて</option>
          <option value="type4">その他</option>
          {/* 必要に応じてoptionタグを追加 */}
        </select>
        {/*　kindsmessageが空白の場合のみpテキストが表示される */}
        {kindsmessage === "" && (
          <p className="text-red-500 text-xs italic">
            種類を選択してください。
          </p>
        )}
      </div>

      <div className="w-full mb-6">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          お問い合わせ内容（必須）
        </label>
        <textarea
          value={message}
          onChange={onChangeMessage}
          className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
        ></textarea>
        {/* messageが空白の場合のみpテキストが表示される */}
        {message === "" && (
          <p className="text-red-500 text-xs italic">
            お問合せ内容を入力してください。
          </p>
        )}
      </div>
    </>
  );
};

export default MessageInput;
