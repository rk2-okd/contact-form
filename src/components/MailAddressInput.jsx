import React from "react";

const MailAddressInput = ({
  email,
  onChangeEmail,
  errorMail,
  selectedDomain,
  onChangeDomain,
  domainOptions,
}) => {
  return (
    <>
      <div className="w-full mb-6">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          メールアドレス(@の前までを入力)（必須）
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder="example"
          value={email}
          onChange={onChangeEmail}
        />
        {email === "" && (
          <p className="text-red-500 text-xs italic">
            メールアドレスを入力してください。（必須）
          </p>
        )}
        {/* erroemailが空白の場合のみpテキストが表示される */}
        {errorMail && <p style={{ color: "red" }}>{errorMail}</p>}
      </div>

      <div className="w-full mb-6">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          ドメイン（必須）
        </label>
        <select
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={selectedDomain}
          onChange={onChangeDomain}
        >
          <option value="" disabled>
            --選択してください--
          </option>
          {/* domainOptionsリストをmap関数で回して表示 */}
          {domainOptions.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
        {/* selectedDomainが空白の場合のみpテキストが表示される */}
        {selectedDomain === "" && (
          <p className="text-red-500 text-xs italic">
            ドメインを選んでください
          </p>
        )}
      </div>
    </>
  );
};
export default MailAddressInput;
