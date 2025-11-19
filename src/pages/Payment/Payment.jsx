import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Payment.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import useCartStore from "../../stores/cartStore";
import { CalcTotalPrice } from "../../utils/cartCalculations";

const Payment = () => {
  const navigate = useNavigate();

  //카트 아이템 받기
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = CalcTotalPrice(cartItems);

  // 주문자 정보
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [customDomain, setCustomDomain] = useState(false);

  // 유효성 검사

  // 주문 비밀번호 상태
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 상태 안내 & 에러 여부
  const [passwordGuide, setPasswordGuide] = useState("");
  const [matchError, setMatchError] = useState("");

  // 비밀번호 조건 검사: 10~16자, 영문+숫자
  const validatePasswordFormat = (pw, cpw) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,16}$/;
    if (!regex.test(pw)) {
      setPasswordGuide("10~16자의 영문자와 숫자를 조합해야 합니다.");
    } else {
      if (pw === cpw) {
        setPasswordGuide("");
      }
    }
  };

  // 비밀번호 일치 여부 검사
  const validatePasswordMatch = (pw, cpw) => {
    if (cpw && pw !== cpw) {
      setMatchError("비밀번호가 일치하지 않습니다.");
    } else {
      setMatchError(""); // 일치 시 메시지 제거
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,16}$/;
      if (regex.test(pw)) {
        setPasswordGuide(""); // 형식도 만족할 때 안내 메시지도 제거
      }
    }
  };

  // 실시간 검증

  const handlePasswordChange = (e) => {
    const pw = e.target.value;
    setPassword(pw);
    validatePasswordFormat(pw); // 입력할 때마다 확인
  };

  // 배송지 정보
  const [customRequest, setCustomRequest] = useState(false);
  const [requestText, setRequestText] = useState("");

  // 주소 찾기

  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setZipcode(data.zonecode);
        setAddress(data.roadAddress);
        setDetailAddress("");
      },
    }).open();
  };

  // 결제수단
  const [method, setMethod] = useState("card");
  const [allAgree, setAllAgree] = useState(false);
  const [agree, setAgree] = useState({ terms: false, privacy: false });

  const toggleAll = () => {
    const next = !allAgree;
    setAllAgree(next);
    setAgree({ terms: next, privacy: next });
  };

  const toggleOne = (key) => {
    const updated = { ...agree, [key]: !agree[key] };
    const allChecked = Object.values({ ...agree, [key]: !agree[key] }).every(
      Boolean
    );
    setAgree(updated);
    setAllAgree(allChecked);
  };

  // 알림 창

  const [inputValue, setInputValue] = useState("");

  const handlePayment = () => {
    alert("결제가 완료되었습니다.");
    clearCart();
    navigate("/");
  };

  // 도메인
  const domains = ["naver.com", "daum.net", "gmail.com"];

  // 배송 요청사항 <DropDown>

  const requestOptions = [
    "",
    "문 앞에 놓아주세요.",
    "도착 전에 전화 주세요.",
    "경비실에 맡겨 주세요.",
    "직접 입력",
  ];

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected === "직접 입력") {
      setCustomRequest(true);
      setRequestText("");
    } else {
      setCustomRequest(false);
      setRequestText(selected);
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="payment_wrapper">
        <div className="gray_bg"></div>
        <div className="payment">
          {/* 왼쪽 영역 */}
          <div className="payment_left">
            {/* 결제 유형 */}
            <div className="order_payment">
              <h2>주문결제</h2>
              <div className="payment_method">
                <button className="method_button01">
                  <Icon icon="simple-icons:naver" width="14" height="14" />{" "}
                  네이버 페이
                </button>
                <button className="method_button02">
                  <Icon icon="simple-icons:kakao" width="14" height="14" />{" "}
                  카카오 페이
                </button>
              </div>
              <div className="divider">
                <hr />
                <span>OR</span>
                <hr />
              </div>
            </div>

            {/* 구매자 정보 */}
            <div className="buyer_info">
              <h3>구매자 정보</h3>
              <div className="buyer_form">
                <input
                  type="text"
                  placeholder="주문하시는 분의 이름을 입력해주세요."
                />
                <input type="tel" placeholder="연락처를 입력해주세요." />

                <div className="email_container">
                  <input
                    type="text"
                    className="email_input"
                    placeholder="이메일"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                  <span className="email_at">@</span>
                  {customDomain ? (
                    <input
                      type="text"
                      className="domain_input"
                      placeholder="직접 입력"
                      value={emailDomain}
                      onChange={(e) => setEmailDomain(e.target.value)}
                    />
                  ) : (
                    <select
                      className="domain_select"
                      value={emailDomain || ""}
                      onChange={(e) => {
                        const selected = e.target.value;
                        if (selected === "custom") {
                          setCustomDomain(true);
                          setEmailDomain("");
                        } else {
                          setCustomDomain(false);
                          setEmailDomain(selected);
                        }
                      }}
                    >
                      <option value="">도메인 선택</option>
                      {domains.map((domain, index) => (
                        <option key={index} value={domain}>
                          {domain}
                        </option>
                      ))}
                      <option value="custom">직접 입력</option>
                    </select>
                  )}
                </div>
                {/* 주문 비밀번호 입력 */}
                <div className="input_group">
                  <input
                    type="password"
                    placeholder="주문 비밀번호 (10~16자의 영문자와 숫자를 조합)"
                    value={password}
                    onChange={(e) => {
                      const pw = e.target.value;
                      setPassword(pw);
                      validatePasswordFormat(pw); // 조건 검사
                      validatePasswordMatch(pw, confirmPassword); // 일치 여부도 같이 검사
                    }}
                    className={passwordGuide ? "input-error" : ""}
                  />
                  {passwordGuide && (
                    <p className="password-guide">{passwordGuide}</p>
                  )}
                </div>

                {/* 주문 비밀번호 확인 */}
                <div className="input_group">
                  <input
                    type="password"
                    placeholder="주문 비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => {
                      const cpw = e.target.value;
                      setConfirmPassword(cpw);
                      validatePasswordMatch(password, cpw); // 일치 여부만 검사
                    }}
                    className={matchError ? "input-error" : ""}
                  />
                  {matchError && <p className="error-message">{matchError}</p>}
                </div>

                {/* 배송지 정보 */}
                <div className="shipping_info">
                  <h3>배송지 정보</h3>
                  <div className="shipping_form">
                    <input
                      type="text"
                      placeholder="받는 분의 이름을 입력해주세요."
                    />
                    <input type="tel" placeholder="연락처를 입력해주세요." />

                    <div className="payment_zipcode">
                      <input
                        type="text"
                        className="zipcode_input"
                        placeholder="우편번호"
                        onChange={(e) => setZipcode(e.target.value)}
                        value={zipcode}
                      />
                      <button type="button" onClick={handlePostcode}>
                        주소 찾기
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="기본 주소"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                    <input
                      type="text"
                      placeholder="상세 주소 입력"
                      value={detailAddress}
                      onChange={(e) => setDetailAddress(e.target.value)}
                    />

                    <select
                      className="request_select"
                      value={customRequest ? "custom" : requestText}
                      onChange={handleChange}
                    >
                      <option value="">배송시 요청사항을 선택해주세요.</option>
                      <option value="문 앞에 놓아주세요.">
                        문 앞에 놓아주세요.
                      </option>
                      <option value="도착 전에 전화 주세요.">
                        도착 전에 전화 주세요.
                      </option>
                      <option value="경비실에 맡겨 주세요.">
                        경비실에 맡겨 주세요.
                      </option>
                      <option value="직접 입력">직접 입력</option>
                    </select>

                    {customRequest && (
                      <input
                        type="text"
                        className="custom_request_input"
                        placeholder="요청사항을 입력해주세요."
                        value={requestText}
                        onChange={(e) => setRequestText(e.target.value)}
                      />
                    )}
                  </div>
                </div>

                {/* 결제수단 */}
                <div className="payment_mean">
                  <h3>결제수단</h3>
                  <h4>결제수단 선택</h4>
                  <div className="mean_choice">
                    <button
                      className={`btn btn--tab ${
                        method === "card" ? "active" : ""
                      }`}
                      onClick={() => setMethod("card")}
                    >
                      카드 결제
                    </button>
                    <button
                      className={`btn btn--tab ${
                        method === "bank" ? "active" : ""
                      }`}
                      onClick={() => setMethod("bank")}
                    >
                      무통장 입금
                    </button>
                  </div>

                  <p className="notice">
                    * 소액 결제의 경우 PG사 정책에 따라 제한될 수 있습니다.
                  </p>

                  <div className="agreements">
                    <label>
                      <input
                        type="checkbox"
                        checked={allAgree}
                        onChange={toggleAll}
                      />{" "}
                      모든 약관 동의
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={agree.terms}
                        onChange={() => toggleOne("terms")}
                      />{" "}
                      [필수] 쇼핑몰 이용약관 동의
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={agree.privacy}
                        onChange={() => toggleOne("privacy")}
                      />{" "}
                      [필수] 개인정보 수집 및 이용 동의
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="payment_right">
            <div className="payment_summary">
              {cartItems.length === 0 ? (
                <p>장바구니가 비었습니다.</p>
              ) : (
                <>
                  {cartItems.map((item, index) => (
                    <div className="summary_product" key={index}>
                      <img
                        className="summary_product_price"
                        src={item.thumbnail}
                        alt={item.title}
                      />
                      <div className="summary_product_info">
                        <p className="summary_product_name">{item.title}</p>
                        <div className="summary_product_subinfo">
                          <span className="summary_product_quantity">
                            {item.quantity} 개
                          </span>
                          <span className="summary_product_price">
                            {(item.price * item.quantity).toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div className="summary_coupon">
                <input type="text" placeholder="할인코드" />
                <button>적용</button>
              </div>

              <div className="summary_breakdown">
                <div>
                  <span>총 상품금액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
                <div>
                  <span>할인금액</span>
                  <span>0원</span>
                </div>
              </div>

              <hr />

              <div className="summary_total">
                <strong>결제금액</strong>
                <strong>{totalPrice.toLocaleString()}원</strong>
              </div>

              <div>
                <button
                  onClick={handlePayment}
                  // disabled={!inputValue.trim()}
                  className="summary_submit"
                >
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Payment;
