import React from "react";

const AddressInput = ({
  postcode,
  onChangePostCode,
  errorPostcode,
  address,
  chrome,
  onChangeChrome,
  streetNumber,
  onChangeStreetNumber,
  houseNumber,
  onChangeHouseNumber,
  errorStreetOrHouse,
  apartmentName,
  onChangeApartmentName,
  apartmentTower,
  onChangeApartmentTower,
  apartmentNumber,
  onChangeApartmentNumber,
  kindsmessage,
  message,
}) => {
  return (
    <>
      <div className="w-full mb-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          住所
        </label>
        <p className="text-left">郵便番号(ハイフンなし)（必須）</p>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          minLength={7}
          maxLength={7}
          placeholder="xxxxxxx"
          value={postcode}
          onChange={onChangePostCode}
        />
        {postcode === "" && (
          <p className="text-red-500 text-xs italic">
            郵便番号を入力してください。
          </p>
        )}
      </div>
      {errorPostcode && <p style={{ color: "red" }}>{errorPostcode}</p>}
      <div className="mb-6 ml-20">
        <div>
          <label>都道府県 </label>
          <input
            className="items-start ml-8"
            type="text"
            value={address.prefecture}
            readOnly
          />
        </div>
        <div>
          <label>市町村 </label>
          <input
            className="items-start ml-12"
            type="text"
            value={address.city}
            readOnly
          />
        </div>
        <div>
          <label>町名 </label>
          <input
            className="items-start ml-16"
            type="text"
            value={address.town}
            readOnly
          />
        </div>
      </div>

      {/* 手入力住所 */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            丁目
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="1"
            value={chrome}
            onChange={onChangeChrome}
          />
        </div>
        <div className="md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            番地（必須）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="11"
            value={streetNumber}
            onChange={onChangeStreetNumber}
          />
          {streetNumber === "" && (
            <p className="text-red-500 text-xs italic">
              番地のみ必須入力です。
            </p>
          )}
        </div>
        <div className="md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            号
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="11"
            value={houseNumber}
            onChange={onChangeHouseNumber}
          />
        </div>
        {errorStreetOrHouse && (
          <p style={{ color: "red" }}>{errorStreetOrHouse}</p>
        )}
      </div>

      {/* マンション */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            マンション名
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="マンション名"
            value={apartmentName}
            onChange={onChangeApartmentName}
          />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            棟
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="棟名"
            value={apartmentTower}
            onChange={onChangeApartmentTower}
          />
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            部屋番号
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="部屋番号"
            value={apartmentNumber}
            onChange={onChangeApartmentNumber}
          />
        </div>
      </div>
    </>
  );
};

export default AddressInput;
