import "./App.css";

import { Fragment, useState, useEffect } from "react";
import NameInput from "./components/NameInput";
import MailAddressInput from "./components/MailAddressInput";
import AddressInput from "./components/AddressInput";
import MessageInput from "./components/MessageInput";
import PrivacyPolicyInput from "./components/PrivacyPolicyInput";
import TransmissionResults from "./components/TransmissionResults";

const initialFormData = {
  fullName: '',
  kanaName: '',
  email: '',
  domain: '',
};
const App = () => {
  // 送信されているかどうかの定義
  const [isFirstSubmitted, setIsFirstSubmitted] = useState(false);
  const [isFirstSubmitting, setIsFirstSubmitting] = useState(false);

  const [isSecondSubmitted, setIsSecondSubmitted] = useState(false);
  const [isSecondSubmitting, setIsSecondSubmitting] = useState(false);

  //送信中コメント
  const [submitComment, setSubmitComment] = useState("");
  // 完了コメント
  const [comment, setComment] = useState("");

  //ナマエが間違っているときの定義（入っているか以上の判断をしたいもののみ定義
  const [errorFurigana, setErrorFurigana] = useState("");

  //メール(@より前の)定義
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  //メール(@より後のドメイン)の定義
  const [selectedDomain, setSelectedDomain] = useState("");

  // 郵便番号の定義
  const [postcode, setPostCode] = useState("");
  const [errorPostcode, setErrorPostCode] = useState("");
  // 都道府県, 市区町村,
  const [address, setAddress] = useState({
    prefecture: "",
    city: "",
    town: "",
  });
  // 丁目 必須ではない　数字が一般的だが新田などの例外もある
  const [chrome, setChrome] = useState("");
  // 番地　特別な制限はない
  const [streetNumber, setStreetNumber] = useState("");
  // 号　必須ではない　必須ではない　1~999 が一般的　1000もあり得る
  const [houseNumber, setHouseNumber] = useState("");
  // 番地、号がエラーの時の定義
  const [errorStreetOrHouse, setErrorStreetOrHouse] = useState("");

  // マンション名　必須ではない
  const [apartmentName, setApartmentName] = useState("");
  // 棟番号 必須ではない
  const [apartmentTower, setApartmentTower] = useState("");
  // 室番号 必須ではない
  const [apartmentNumber, setApartmentNumber] = useState("");

  //問い合わせの種類の定義
  const [kindsmessage, setKindsMessage] = useState("");
  //問い合わせ内容の定義
  const [message, setMessage] = useState("");

  // プライバシーポリシーの定義
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  // 送信文が間違っているときのメッセージ
  const [error, seterror] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // 郵便番号が変わったとき
  const onChangePostCode = (e) => {
    const code = e.target.value;
    setPostCode(code);
    setErrorPostCode("");
    //郵便番号検索api
    if (code.length === 7) {
      fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${code}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results) {
            const result = data.results[0];
            if (result.address1) {
              setAddress({
                prefecture: result.address1,
                city: result.address2,
                town: result.address3,
              });
            } else {
              setErrorPostCode("無効な郵便番号です");
            }
          } else {
            setErrorPostCode("無効な郵便番号です");
          }
        })
        .catch((error) => {
          console.error("API呼び出しエラー:", error);
        });
    }
  };
  // 丁目が変わったとき
  const onChangeChrome = (e) => {
    setChrome(e.target.value);
  };
  // 番地が変わったとき
  const onChangeStreetNumber = (e) => {
    setStreetNumber(e.target.value);
  };
  // 号が変わったとき
  const onChangeHouseNumber = (e) => {
    setHouseNumber(e.target.value);
  };

  const onChangeApartmentName = (e) => {
    setApartmentName(e.target.value);
  };
  const onChangeApartmentTower = (e) => {
    setApartmentTower(e.target.value);
  };
  const onChangeApartmentNumber = (e) => {
    setApartmentNumber(e.target.value);
  };

  // お問い合わせの種類が変わったとき
  const onChangeKindsMessage = (e) => {
    setKindsMessage(e.target.value);
  };
  // お問い合わせの文章が変わったとき
  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  // プライバシーポリシーに関するボタンが押されたとき
  const onChangePrivacyAgreed = () => {
    setPrivacyAgreed(!privacyAgreed);
  };
  //domainOptionsリスト
  const domainOptions = [
    "gmail.com",
    "yahoo.co.jp",
    "outlook.com",
    "icloud.com",
    "docomo.ne.jp",
    "ezweb.ne.jp",
    "softbank.ne.jp",
    "nifty.com",
    "biglobe.ne.jp",
    "ocn.ne.jp",
  ];
  //firstHandleSubmit関数
  const firstHandleSubmit = async (e) => {
    //イベント(e)のデフォルト動作禁止
    e.preventDefault();
    seterror("");
    setErrorFurigana("");
    setErrorMail("");
    setErrorPostCode("");
    setErrorStreetOrHouse("");
    setSubmitComment("送信中です お待ちください・・・");
    setComment("");

    setIsFirstSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // ナマエの形式が正しいか(カタカナかどうか)
    const kanaRegex = /^[\u30A0-\u30FF]+$/;
    // メールアドレス(@よりまえ)の形式が正しいか
    const validLocalPartRegex = /^[a-zA-Z0-9._-]+$/;
    setTimeout(() => {
        console.log("submit check", formData, {
        postcode, streetNumber, kindsmessage, message, privacyAgreed
      });
      if (
        //お名前が入力されているか,
        formData.fullName === "" ||
        //メールアドレスが入力されているか
        email === "" ||
        selectedDomain === "" ||
        postcode === "" ||
        streetNumber === "" ||
        kindsmessage === "" ||
        message === "" ||
        !privacyAgreed
      ) {
        //入力がなかったら、エラーを出す
        seterror("入力に誤りがあります");
        setSubmitComment("");
        return; //条件が満たされた場合以降の処理を中断するため、returnを返す
      } // ナマエが入っていない、もしくはナマエが形式とあっていない
      if (formData.fullName !== "" || !kanaRegex.test(kanaName)) {
        setErrorFurigana("フリガナはカタカナで入力してください。");
        seterror("入力に誤りがあります");
        setSubmitComment("");
        return;
      } // メールアドレス(@よりまえ)が入っていない、もしくはメールアドレス(@よりまえ)が形式とあっていない
      if (formData.email === "" || !validLocalPartRegex.test(email)) {
        setErrorMail("メールアドレスの形式が正しくありません。");
        seterror("入力に誤りがあります");
        setSubmitComment("");
        return;
      }
      if (postcode === "" || isNaN(postcode)) {
        setErrorPostCode("郵便番号の形式が正しくありません。");
        seterror("入力に誤りがあります");
        setSubmitComment("");
        return;
      }
      if (
        (streetNumber && isNaN(Number(streetNumber))) ||
        (houseNumber && isNaN(Number(houseNumber)))
      ) {
        setErrorStreetOrHouse("番地, 号は数字で入力してください");
        seterror("入力に誤りがあります");
        setSubmitComment("");
        return;
      } // ゲームが選択されていない、もしくは答えとあっていない
      //↓の処理まで行った　＝　　エラーがなく送信できた時の処理
      //エラー文やらを消す

      setErrorDices("");

      setIsFirstSubmitted(true);
      setIsFirstSubmitting(false);
      setComment("ありがとうございます。お問合せ内容を受け付けました。");
    }, 1000);
    seterror("");
    //setSubmitComment("");
  };

  // 人間であるかどうか確認するためのゲームの定義
  const [selectedDices, setSelectedDices] = useState("");
  const [errorDices, setErrorDices] = useState("");
  const [randomScreen, setRandomScreen] = useState(null);

  // ランダムに選択
  useEffect(() => {
    if (screens.length > 0) {
      const randomIndex = Math.floor(Math.random() * screens.length);
      const selectedScreen = screens[randomIndex];
      console.log("Selected Screen:", selectedScreen); // 確認用
      setRandomScreen(selectedScreen); // オブジェクト全体をセット
    } else {
      console.error("Screens array is empty");
    }
  }, []);
  // サイコロ選択のハンドル
  const handleDicesChange = (value) => {
    setSelectedDices(value);
  };

  // Dicesリスト
  const Dices = [
    { value: "six", label: 6 },
    { value: "seven", label: 7 },
    { value: "ten", label: 10 },
    { value: "eleven", label: 11 },
    { value: "fourteen", label: 14 },
  ];

  const screens = [
    {
      id: "screen1",
      correctAnswer: "six",
      content: (
        <Fragment key="screen1">
          <div className="w-full mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              すべて足した数字を選んでください
            </label>
            <div className="mt-4 flex justify-center">
              <img
                src="./image/aa.png"
                alt="さいころ"
                className="w-32 h-32 object-cover"
              />
            </div>
          </div>
        </Fragment>
      ),
    },
    {
      id: "screen2",
      correctAnswer: "eleven",
      content: (
        <Fragment key="screen2">
          <div className="w-full mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              すべて足した数字を選んでください
            </label>
            <div className="mt-4 flex justify-center">
              <img
                src="./image/bb.png"
                alt="さいころ"
                className="w-32 h-32 object-cover"
              />
            </div>
          </div>
        </Fragment>
      ),
    },
    {
      id: "screen3",
      correctAnswer: "seven",
      content: (
        <Fragment key="screen3">
          <div className="w-full mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              すべて足した数字を選んでください
            </label>
            <div className="mt-4 flex justify-center">
              <img
                src="./image/cc.png"
                alt="さいころ"
                className="w-32 h-32 object-cover"
              />
            </div>
          </div>
        </Fragment>
      ),
    },
    {
      id: "screen4",
      correctAnswer: "ten",
      content: (
        <Fragment key="screen4">
          <div className="w-full mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              すべて足した数字を選んでください
            </label>
            <div className="mt-4 flex justify-center">
              <img
                src="./image/dd.png"
                alt="さいころ"
                className="w-32 h-32 object-cover"
              />
            </div>
          </div>
        </Fragment>
      ),
    },
    {
      id: "screen5",
      correctAnswer: "fourteen",
      content: (
        <Fragment key="screen5">
          <div className="w-full mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              すべて足した数字を選んでください
            </label>
            <div className="mt-4 flex justify-center">
              <img
                src="./image/ee.png"
                alt="さいころ"
                className="w-32 h-32 object-cover"
              />
            </div>
          </div>
        </Fragment>
      ),
    },
  ];

  const seccondHandleSubmit = (e) => {
    e.preventDefault();
    setSubmitComment("送信中です お待ちください・・・");
    setIsSecondSubmitting(true);
    setTimeout(() => {
      if (selectedDices === "") {
        setErrorDices("どれかを選択してください");
        setSubmitComment("");
        return;
      }
      if (selectedDices !== randomScreen.correctAnswer) {
        setErrorDices("入力に誤りがあります選択しなおしてください");
        setSubmitComment("");
        return;
      }
      seterror("");
      setErrorDices("");
      setSubmitComment("");
      setIsSecondSubmitted(true);
      setIsSecondSubmitting(false);
    }, 1000);
    setPrivacyAgreed(false);

    setErrorDices("");
  };
  // console.log(selectedDices);

  return (
    <Fragment>
      <h2 className="text-xl pt-3 mb-3 font-bold">お問合わせ</h2>
      {!isFirstSubmitted ? (
        <div className="pt-8 items-center">
          <form className="w-full max-w-xl" onSubmit={firstHandleSubmit}>
            <NameInput
              onChangeFullName={handleChange}
              fullNameValue={formData.fullName}
              onChangeKanaName={handleChange}
              kanaNameValue={formData.kanaName}
              errorFurigana={errorFurigana}
            />
            <MailAddressInput
              onChangeEmail={handleChange}
              email={formData.email}
              errorMail={errorMail}
              selectedDomain={formData.domain}
              onChangeDomain={handleChange}
              domainOptions={domainOptions}
            />

            <AddressInput
              postcode={postcode}
              onChangePostCode={onChangePostCode}
              errorPostcode={errorPostcode}
              address={address}
              chrome={chrome}
              onChangeChrome={onChangeChrome}
              streetNumber={streetNumber}
              onChangeStreetNumber={onChangeStreetNumber}
              houseNumber={houseNumber}
              onChangeHouseNumber={onChangeHouseNumber}
              errorStreetOrHouse={errorStreetOrHouse}
              apartmentName={apartmentName}
              onChangeApartmentName={onChangeApartmentName}
              apartmentTower={apartmentTower}
              onChangeApartmentTower={onChangeApartmentTower}
              apartmentNumber={apartmentNumber}
              onChangeApartmentNumber={onChangeApartmentNumber}
            />

            <MessageInput
              kindsmessage={kindsmessage}
              onChangeKindsMessage={onChangeKindsMessage}
              message={message}
              onChangeMessage={onChangeMessage}
            />
            <PrivacyPolicyInput
              privacyAgreed={privacyAgreed}
              onChangePrivacyAgreed={onChangePrivacyAgreed}
            />
            {/* エラーがある場合のみpテキストが表示される */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="mt-8 mb-12">
              <div>
                <button
                  className="shadow bg-yellow-500 hover:bg-yellow-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-2"
                  type="submit"
                >
                  送信
                </button>
              </div>
              {isFirstSubmitting && (
                <div>
                  {submitComment && (
                    <p className="text-green-400 mt-3">{submitComment}</p>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div>
          {!isSecondSubmitted ? (
            <div>
              {randomScreen ? (
                <>
                  <div>{randomScreen.content}</div>
                  <div className="mt-4 flex space-x-4 justify-around">
                    {Dices.map((one) => (
                      <label key={one.value} className="flex items-center mb-2">
                        <input
                          type="radio"
                          name="dice"
                          value={one.value}
                          checked={selectedDices === one.value}
                          onChange={() => handleDicesChange(one.value)}
                          className="mr-2"
                        />
                        {one.label}
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <p>Loading///</p>
              )}
              <div className=" md:items-center">
                <div className="mt-2">
                  <button
                    className="shadow bg-yellow-500 hover:bg-yellow-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={seccondHandleSubmit}
                  >
                    送信
                  </button>
                </div>
              </div>
              {errorDices && <p style={{ color: "red" }}>{errorDices}</p>}
              {isSecondSubmitting && (
                <div>
                  {submitComment && (
                    <p className="text-green-400 mt-5">{submitComment}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <TransmissionResults
              fullName={formData.fullName}
              kanaName={kanaName}
              comment={comment}
              email={email}
              selectedDomain={selectedDomain}
              postcode={postcode}
              chrome={chrome}
              streetNumber={streetNumber}
              houseNumber={houseNumber}
              apartmentName={apartmentName}
              apartmentTower={apartmentTower}
              apartmentNumber={apartmentNumber}
              kindsmessage={kindsmessage}
              message={message}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

export default App;
