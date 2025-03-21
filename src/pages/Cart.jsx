import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cartStore } from '../store/cartStore';
import useUserStore from '@store/userStore';
import { Helmet } from 'react-helmet-async';
import Wishlist from '@pages/WishList';
import PurchaseButton from '@components/PurchaseButton';

function Cart() {
  const { userId } = useParams();
  const { cartItemsList, shippingCost, fetchCartItems, loading, error, updateItemQuantity, selectedItems, selectItem, deselectItem, deleteSelectedItems, clearCart } = cartStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchCartItems(); // userId를 사용하지 않고 user 정보를 활용하여 장바구니 아이템을 가져옴
    }
  }, [user, fetchCartItems, navigate]);

  const totalPrice = cartItemsList.reduce((total, item) => total + item.price * item.quantity, 0);

  const finalAmount = totalPrice + shippingCost;

  // // (나중에 시도)calculateShippingFee 함수를 사용하여 배송비 계산 (50,000원 이상이면 0, 아니면 3,000원)
  // const shippingFee = calculateShippingFee(cartItemsList);
  // const totalOrderAmount = totalPrice + shippingFee;

  const handleQuantityChange = (item, change) => {
    const newQuantity = Math.max(0, item.quantity + change);
    updateItemQuantity(item.id, newQuantity);
  };

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      deselectItem(itemId);
    } else {
      selectItem(itemId);
    }
  };

  const handleDeleteSelected = () => {
    deleteSelectedItems();
  };

  const handleClearCart = async () => {
    await clearCart();
    alert('장바구니가 비워졌습니다.');
  };

  const handleOrderAgain = () => {
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex justify-center">
      <div className="container w-[1200px] px-[16px] my-[40px]">
        <Helmet>
          <title>다시, 봄 장바구니</title>
          <meta name="description" content="장바구니에 담긴 상품을 확인하세요." />
        </Helmet>

        <div className="flex items-center mb-[16px]">
          <h1 className="text-[24px] font-gowun text-grey-80 mr-[8px]">장바구니</h1>
          <span className="flex items-center justify-center w-[20px] h-[20px] bg-black bg-opacity-20 text-white rounded-full">{cartItemsList.length}</span>
        </div>
        <hr className="mb-0 border-t border-grey-20" />

        {cartItemsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[256px]">
            <img src="/images/Cart1.png" alt="Empty Cart" className="w-[52px] h-[52px] mb-[20px]" />
            <p className="text-[18px] font-gowun text-grey-40">장바구니가 비어있습니다.</p>
          </div>
        ) : (
          <div>
            <table className="w-full table-auto">
              <thead>
                <tr className="font-semibold border-b">
                  <th className="w-[2%] text-left py-[20px]"></th>
                  <th className="w-[62%] text-left py-[20px] font-gowun text-grey-40 text-[14px]">상품 정보</th>
                  <th className="w-[12%] text-center py-[20px] font-gowun text-grey-40 text-[14px]">수량</th>
                  <th className="w-[12%] text-center py-[20px] font-gowun text-grey-40 text-[14px]">주문 금액</th>
                  <th className="w-[12%] text-center py-[20px] font-gowun text-grey-40 text-[14px]">배송 정보</th>
                </tr>
              </thead>

              <tbody>
                {cartItemsList.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="text-left">
                      <input type="checkbox" className="w-[16px] h-[16px] cursor-pointer" checked={selectedItems.includes(item.id)} onChange={() => handleCheckboxChange(item.id)} />
                    </td>
                    <td className="flex items-start py-[20px]">
                      <img src={`https://11.fesp.shop${item.image}`} alt={item.name} className="w-[80px] h-[80px] object-cover mr-[8px]" />
                      <div>
                        <h2 className="text-[15px] font-semibold text-grey-80">{item.name}</h2>
                      </div>
                    </td>
                    <td className="text-center py-[20px] border-l border-grey-20">
                      <div className="flex justify-center h-full">
                        <div className="flex items-center h-[32px] border border-grey-20">
                          <button className={`w-[24px] h-full border-r border-grey-20 ${item.quantity <= 1 ? 'opacity-50' : 'hover:bg-grey-10'}`} onClick={() => item.quantity > 1 && handleQuantityChange(item, -1)} disabled={item.quantity <= 1}>
                            -
                          </button>
                          <span className="w-[50px] h-full flex items-center justify-center border-grey-200 text-black text-[12px]">{item.quantity}</span>
                          <button className="w-[24px] h-full border-l border-grey-20 hover:bg-grey-10" onClick={() => handleQuantityChange(item, 1)}>
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="text-center text-grey-80 font-gowunBold py-[20px] border-l border-grey-20 text-[20px]">{(item.price * item.quantity).toLocaleString()}원</td>
                    <td className="text-center text-grey-80 font-gowunBold py-[20px] border-l border-grey-20">
                      <div className="text-[16px]">{shippingCost.toLocaleString()}원</div>
                      <div className="text-[13px] font-gowun text-grey-40">택배</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr className="mb-[12px]" />

            <div className="flex justify-start mb-[40px]">
              <button className="bg-white text-black py-[8px] px-[12px] font-[12px] font-gowunBold border border-grey-40 text-[14px] hover:bg-grey-30 mr-[8px]" onClick={handleClearCart}>
                장바구니 비우기
              </button>
              <button className="bg-white text-black py-[8px] px-[12px] font-[12px] font-gowunBold border border-grey-40 text-[14px] hover:bg-grey-30 mr-[8px]" onClick={handleDeleteSelected}>
                선택 상품 삭제
              </button>
            </div>

            <hr className="mb-[12px] border-grey-50" />

            <div className="flex justify-between">
              <p className="text-[14px] font-gowun">
                총 주문 상품 <span className="text-secondary-40 font-gowunBold">{cartItemsList.length}</span>개
              </p>
            </div>

            <hr className="mt-[12px] mb-[16px]" />

            <div className="grid grid-cols-[repeat(5,auto)] justify-center gap-[4px] mb-[16px]">
              <div className="flex flex-col items-center">
                <div className="text-[18px] font-gowunBold">{totalPrice.toLocaleString()}원</div>
                <div className="text-[12px] font-gowun text-grey-50">상품 금액</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-[18px] font-bold px-[20px]">+</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[18px] font-gowunBold">{shippingCost.toLocaleString()}원</div>
                <div className="text-[12px] font-gowun text-grey-50">배송비</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-[18px] font-bold px-[20px]">=</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[18px] font-bold">{finalAmount.toLocaleString()}원</div>
                <div className="text-[12px] font-gowun text-grey-50">총 주문 금액</div>
              </div>
            </div>

            <hr className="my-[16px] border-grey-50" />

            <div className="flex justify-center mb-[16px]">
              <div className="flex justify-center mb-[16px]">
                <PurchaseButton products={cartItemsList} shippingFee={shippingCost} className="bg-primary-40 text-white w-[280px] py-[8px] rounded-md text-[15px] text-center hover:bg-primary-50">
                  결제하기
                </PurchaseButton>
              </div>
            </div>

            <div className="mt-[8px] flex justify-center">
              <button className="text-black text-[15px] border-b border-grey-40" onClick={handleOrderAgain}>
                다음에 다시 주문하기
              </button>
            </div>
          </div>
        )}
        <hr className="mt-[12px] mb-[16px]" />

        <Wishlist />
      </div>
    </div>
  );
}

export default Cart;
