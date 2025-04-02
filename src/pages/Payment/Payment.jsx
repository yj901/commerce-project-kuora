// Pages/Payment.jsx
import React from "react";
import "./Payment.scss"; // SCSS 스타일을 임포트

const Payment = () => {
  return (
    <div className="payment-container">
      <div className="left">
        <h2>주문 결제</h2>
        <div className="payment-method">
          <button className="payment-button naverpay">네이버 페이</button>
          <button className="payment-button kakao">카카오페이</button>
        </div>
        <hr className="divider" />

        {/* 구매자 정보 */}
        <div className="buyer-info">
          <h3>구매자 정보</h3>
          <input
            type="text"
            placeholder="주문하시는 분의 이름을 입력해주세요"
          />
          <input type="tel" placeholder="연락처를 입력해주세요" />
          <input type="email" placeholder="이메일" />
          <input
            type="password"
            placeholder="주문 비밀번호 (10자~16자의 영문자, 숫자 2가지 조합)"
          />
          <input type="password" placeholder="주문 비밀번호 확인" />
        </div>

        {/* 배송지 정보 */}
        <div className="shipping-info">
          <h3>배송지 정보</h3>
          <input type="text" placeholder="받는 분의 이름을 입력해주세요" />
          <input type="tel" placeholder="연락처를 입력해주세요" />
          <div className="address">
            <input type="text" placeholder="우편번호" />
            <button>주소 찾기</button>
          </div>
          <input type="text" placeholder="기본 주소" />
          <input type="text" placeholder="상세 주소 입력" />
          <input type="text" placeholder="배송시 요청사항을 선택해 주세요" />
        </div>

        {/* 결제수단 */}
        <div className="payment-methods">
          <h3>결제수단</h3>
          <button>카드 결제</button>
          <button>무통장 입금</button>
        </div>

        {/* 약관 동의 */}
        <div className="terms">
          <label>
            <input type="checkbox" />
            약관에 동의합니다
          </label>
        </div>
      </div>

      <div className="right">
        <h3>상품 정보</h3>
        <div className="product">
          <img src="https://via.placeholder.com/150" alt="상품 이미지" />
          <div className="product-details">
            <p>상품명: 예시 상품</p>
            <p>수량: 1</p>
            <p>가격: 222,000원</p>
          </div>
        </div>

        <div className="discount">
          <input type="text" placeholder="할인코드" />
          <button>적용</button>
        </div>

        <div className="price-summary">
          <p>총 상품금액: 222,000원</p>
          <p>할인 금액: -15,540원</p>
          <p>배송비: 20,000원</p>
          <hr />
          <p>
            <strong>결제금액: 208,460원</strong>
          </p>
        </div>

        <div className="pay-button">
          <button>결제하기</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
