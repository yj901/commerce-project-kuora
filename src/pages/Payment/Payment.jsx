import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./Payment.scss";
import productImage from "../../assets/images/product.jpg";

const Payment = () => {
  // 주문자 정보
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [customDomain, setCustomDomain] = useState(false);

  // 배송지 정보
  const [customRequest, setCustomRequest] = useState(false);
  const [requestText, setRequestText] = useState("");

  // 주소 찾기

  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");

  const handleSearchAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setZonecode(data.zonecode);
        setAddress(data.roadAddress);
      },
    }).open();

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
  };
  return (
    <div className="payment_wrapper">
      <div className="payment">
        {/* 왼쪽 영역 */}
        <div className="payment_left">
          {/* 결제 유형 */}
          <div className="order_payment">
            <h2>주문결제</h2>
            <div className="payment_method">
              <button className="method_button01">
                <Icon icon="simple-icons:naver" width="14" height="14" /> 네이버
                페이
              </button>
              <button className="method_button02">
                <Icon icon="simple-icons:kakao" width="14" height="14" /> 카카오
                페이
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
              <input
                type="password"
                placeholder="주문 비밀번호 (10자~16자의 영문자, 숫자 2가지 조합)"
              />
              <input type="password" placeholder="주문 비밀번호 확인" />
            </div>
          </div>

          {/* 배송지 정보 */}
          <div className="shipping_info">
            <h3>배송지 정보</h3>
            <div className="shipping_form">
              <input type="text" placeholder="받는 분의 이름을 입력해주세요." />
              <input type="tel" placeholder="연락처를 입력해주세요." />

              <div className="payment_zipcode">
                <input
                  type="text"
                  className="zipcode_input"
                  placeholder="우편번호"
                  value={zonecode}
                  readOnly
                />
                <button onClick={handleSearchAddress}>주소 찾기</button>
              </div>

              <input type="text" placeholder="기본 주소" />
              <input type="text" placeholder="상세 주소 입력" />

              <select
                className="request_select"
                value={customRequest ? "custom" : requestText}
                onChange={handleChange}
              >
                <option value="">배송시 요청사항을 선택해주세요.</option>
                <option value="문 앞에 놓아주세요.">문 앞에 놓아주세요.</option>
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
                className={`btn btn--tab ${method === "card" ? "active" : ""}`}
                onClick={() => setMethod("card")}
              >
                카드 결제
              </button>
              <button
                className={`btn btn--tab ${method === "bank" ? "active" : ""}`}
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

        {/* 오른쪽 영역 */}
        <div className="payment_right">
          <div className="payment_summary">
            <div className="summary_product">
              <img src={productImage} alt="제품" />
              <div className="summary_product_info">
                <p className="summary_product__name">Bletilla 3 Seater Sofa</p>
                <div className="summary_product_subinfo">
                  <span className="summary_product_quantity">1개</span>
                  <span className="summary_product_price">206,460원</span>
                </div>
              </div>
            </div>

            <div className="summary_coupon">
              <input type="text" placeholder="할인코드" />
              <button>적용</button>
            </div>

            <div className="summary_breakdown">
              <div>
                <span>총 상품금액</span>
                <span>206,460원</span>
              </div>
              <div>
                <span>할인금액</span>
                <span>-15,540원</span>
              </div>
              <div>
                <span>배송비</span>
                <span>20,000원</span>
              </div>
            </div>

            <hr />

            <div className="summary_total">
              <strong>결제금액</strong>
              <strong>210,920원</strong>
            </div>

            <button className="summary_submit">결제하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
