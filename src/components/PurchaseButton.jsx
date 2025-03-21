import React, { useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { calculateShippingFee } from '@utils/calculateShippingFee';

function PurchaseButton({ products, shippingFee, className, children }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (isLoading) return; // 중복 클릭 방지
    setIsLoading(true);

    // 결제할 최종 금액 계산 (상품 가격의 합)
    const totalAmount = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // 부모로부터 전달된 shippingFee가 있으면 사용, 없으면 calculateShippingFee 호출
    const effectiveShippingFee = shippingFee !== undefined ? shippingFee : calculateShippingFee(products);

    // 상품 가격 + 배송비 = 최종 결제 금액
    const finalAmount = totalAmount + effectiveShippingFee;

    // 한 번만 생성되는 orderId (딱히 쓸일없을듯..)
    const orderId = `ORDER_${Date.now()}`;

    // 디버깅: 결제창에 넘길 금액과 orderId를 출력
    console.log('requestPayment amount:', finalAmount);
    console.log('requestPayment orderId:', orderId);

    // 결제에 사용할 상품 목록 (cartItems)을 Local Storage에 저장 (PaymentSuccess에서 사용)
    localStorage.setItem('cartItems', JSON.stringify(products));

    try {
      // Toss Payments SDK 로드 후 결제창 요청
      const tossPayments = await loadTossPayments(import.meta.env.VITE_TOSS_CLIENT_KEY);
      await tossPayments.requestPayment('카드', {
        amount: finalAmount, // 최종 금액
        orderId: orderId, // 위에서 생성한 orderId 사용
        orderName: products.length === 1 ? products[0].name : `${products[0].name} 외 ${products.length - 1}건`,
        successUrl: `${import.meta.env.VITE_TOSS_SUCCESS_URL}?amount=${finalAmount}&orderId=${orderId}&shippingFee=${shippingFee}`,
        failUrl: import.meta.env.VITE_TOSS_FAIL_URL,
      });
    } catch (error) {
      console.error('결제창 오류:', error);
      alert('결제창 호출 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <button className={className} onClick={handlePurchase} disabled={isLoading}>
      {isLoading ? '결제 진행 중...' : children || '구매하기'}
    </button>
  );
}

export default PurchaseButton;
