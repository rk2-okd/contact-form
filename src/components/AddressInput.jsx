import React from "react";

const AddressInput = ({
  postcode,
  onChangePostCode,
  errorPostcode,

  address = { prefecture: "", city: "", town: "" }, // ★ここ重要
  setAddress = () => {}, // ★念のため

  onClickSearchAddress,
  isSearchingAddress,
  errorAddressSearch,

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
}) => {
  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-4 items-end">
        <div className="w-full md:w-2/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            郵便番号（必須）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            value={postcode}
            onChange={onChangePostCode}
            placeholder="例）1234567"
          />
          {errorPostcode && <p style={{ color: "red" }}>{errorPostcode}</p>}
        </div>

        <div className="w-full md:w-1/3 px-3">
          <button
            type="button"
            onClick={onClickSearchAddress}
            disabled={isSearchingAddress}
            className="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
          >
            {isSearchingAddress ? "検索中..." : "住所を表示"}
          </button>
        </div>

        {errorAddressSearch && (
          <div className="w-full px-3 mt-2">
            <p style={{ color: "red" }}>{errorAddressSearch}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            都道府県（任意）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            value={address?.prefecture ?? ""}
            onChange={(e) =>
              setAddress((prev) => ({ ...(prev ?? {}), prefecture: e.target.value }))
            }
          />
        </div>

        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            市区町村（任意）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            value={address?.city ?? ""}
            onChange={(e) =>
              setAddress((prev) => ({ ...(prev ?? {}), city: e.target.value }))
            }
          />
        </div>

        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            町名（任意）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            value={address?.town ?? ""}
            onChange={(e) =>
              setAddress((prev) => ({ ...(prev ?? {}), town: e.target.value }))
            }
          />
        </div>
      </div>

      {/* 以下はあなたの既存をそのまま */}
      {/* 丁目 */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            丁目（任意）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            value={chrome}
            onChange={onChangeChrome}
          />
        </div>

        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            番地（必須）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            value={streetNumber}
            onChange={onChangeStreetNumber}
          />
        </div>

        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            号（任意）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            value={houseNumber}
            onChange={onChangeHouseNumber}
          />
        </div>

        {errorStreetOrHouse && (
          <div className="w-full px-3 mt-2">
            <p style={{ color: "red" }}>{errorStreetOrHouse}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            マンション名（任意）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            value={apartmentName}
            onChange={onChangeApartmentName}
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            棟番号（任意）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            value={apartmentTower}
            onChange={onChangeApartmentTower}
          />
        </div>

        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            室番号（任意）
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            value={apartmentNumber}
            onChange={onChangeApartmentNumber}
          />
        </div>
      </div>
    </>
  );
};

export default AddressInput;
