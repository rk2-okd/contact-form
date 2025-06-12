import React from "react";

const TransmissionResults = ({
  kanjiName,
  kanaName,
  email,
  selectedDomain,
  postcode,
  chrome,
  streetNumber,
  houseNumber,
  apartmentName,
  apartmentTower,
  apartmentNumber,
  kindsmessage,
  message,
  comment,
}) => {
  const Style = {
    color: "blue",
  };

  const MessageType = () => {
    console.log(kindsmessage);
    switch (kindsmessage) {
      case "type1":
        return <p style={Style}>商品のお届けについて</p>;
      case "type2":
        return <p style={Style}>返品・交換について</p>;
      case "type3":
        return <p style={Style}>お支払いについて</p>;
      case "type4":
        return <p style={Style}>その他</p>;
      default:
        return <p>あああ</p>;
    }
  };
  return (
    <>
      <p className="text-green-500 text-lg font-bold mb-3">{comment}</p>
      <div>
        <h2 className="font-bold text-1g">送信結果</h2>
        <div className="ml-10">
          <div>
            <div className="flex">
              <p>名前：</p>
              <p style={Style}>{kanjiName}</p>
            </div>
            <div className="flex">
              <p>ナマエ：</p>
              <p style={Style}>{kanaName}</p>
            </div>
          </div>
          <div className="flex">
            <p>メールアドレス：</p>
            <p style={Style}>
              {email}@{selectedDomain}
            </p>
          </div>
          <div className="flex">
            <p>郵便番号：</p>
            <p style={Style}>{postcode}</p>
          </div>
          <div>
            <div className="flex">
              <p>丁目：</p>
              <p style={Style}>{chrome}</p>
            </div>
            <div className="flex">
              <p>番地：</p>
              <p style={Style}>{streetNumber}</p>
            </div>
            <div className="flex">
              <p>号：</p>
              <p style={Style}>{houseNumber}</p>
            </div>
          </div>
          <div>
            <div className="flex">
              <p>マンション名：</p>
              <p style={Style}>{apartmentName}</p>
            </div>
            <div className="flex">
              <p>棟：</p>
              <p style={Style}>{apartmentTower}</p>
            </div>
            <div className="flex">
              <p>号室：</p>
              <p style={Style}>{apartmentNumber}</p>
            </div>
          </div>
          <div className="flex">
            <p>お問い合わせの種類：</p>
            {MessageType()}
          </div>
          <div className="flex">
            <p>お問い合わせの内容：</p>
            <p style={Style}>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default TransmissionResults;
