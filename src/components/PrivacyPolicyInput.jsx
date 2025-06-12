import React from "react";

const PrivacyPolicyInput = ({ privacyAgreed, onChangePrivacyAgreed }) => {
  return (
    <>
      <div className="flex items-center mb-2">
        <input
          // id="privacy-checkbox"
          type="checkbox"
          className="mr-2"
          checked={privacyAgreed}
          onChange={onChangePrivacyAgreed}
        />
        <label htmlFor="privacy-checkbox" className="text-sm text-gray-700">
          プライバシーポリシーに同意します（必須）
        </label>
      </div>
      {!privacyAgreed && (
        <p className="text-red-500 text-xs italic">
          プライバシーポリシーに同意する必要があります。
        </p>
      )}
    </>
  );
};
export default PrivacyPolicyInput;
