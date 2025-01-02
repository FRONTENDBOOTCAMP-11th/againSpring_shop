import { useState } from "react";

function Cart() {
  //더미 상품 데이터
  const dummyItems = [
    // {
    //   id: 1,
    //   name: "상품 A",
    //   price: 15000,
    //   quantity: 1,
    //   image: "https://via.placeholder.com/80",
    // },
    // {
    //   id: 2,
    //   name: "상품 B",
    //   price: 2500000,
    //   quantity: 2,
    //   image: "https://via.placeholder.com/80",
    // },
    // {
    //   id: 3,
    //   name: "상품 C",
    //   price: 10000,
    //   quantity: 1,
    //   image: "https://via.placeholder.com/80",
    // },
  ];

  const [cartItemsList] = useState(dummyItems);

  const shippingCost = 3000; //배송비
  const totalPrice = cartItemsList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalOrderAmount = totalPrice + shippingCost;

  return (
    <div className="flex justify-center px-[16px]">
      <div className="container mx-auto px-[24px] my-[40px]">
        <div className="flex items-center mb-[16px]">
          <h1 className="text-[24px] font-gowun text-grey-80 mr-[8px]">
            장바구니
          </h1>
          <span className="flex items-center justify-center w-[20px] h-[20px] bg-black bg-opacity-20 text-white rounded-full">
            {cartItemsList.length}
          </span>
        </div>

        <hr className="mb-0 border-t border-grey-20" />

        {cartItemsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[256px]">
            <img
              src="/images/Cart1.png"
              alt="Empty Cart"
              className="w-[52px] h-[52px] mb-[20px]"
            />
            <p className="text-[18px] font-gowun text-grey-40">
              장바구니가 비어있습니다.
            </p>
          </div>
        ) : (
          <div>
            <table className="w-full table-auto">
              <thead>
                <tr className="font-semibold border-b">
                  <th className="w-[2%] text-left py-[20px]">
                    <input
                      type="checkbox"
                      className="w-[16px] h-[16px] cursor-pointer"
                    />
                  </th>
                  <th className="w-[62%] text-left py-[20px] font-gowun text-grey-40 text-[14px] ">
                    상품 정보
                  </th>
                  <th className="w-[12%] text-center py-[20px] font-gowun text-grey-40 text-[14px]">
                    수량
                  </th>
                  <th className="w-[12%] text-center py-[20px] font-gowun text-grey-40 text-[14px]">
                    주문 금액
                  </th>
                  <th className="w-[12%] text-center py-[20px] font-gowun text-grey-40 text-[14px]">
                    배송 정보
                  </th>
                </tr>
              </thead>

              <tbody>
                {cartItemsList.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="text-left">
                      <input
                        type="checkbox"
                        className="w-[16px] h-[16px] cursor-pointer"
                      />
                    </td>
                    <td className="flex items-start py-[20px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[80px] h-[80px] object-cover mr-[8px]"
                      />
                      <div>
                        <h2 className="text-[15px] font-semibold text-grey-80">
                          {item.name}
                        </h2>
                      </div>
                    </td>
                    <td className="text-center py-[20px] border-l border-grey-20">
                      <div className="flex justify-center h-full">
                        <div className="flex items-center h-[32px] border border-grey-20">
                          <button className="w-[24px] h-full border-r border-grey-20 hover:bg-grey-10">
                            -
                          </button>
                          <span className="w-[50px] h-full flex items-center justify-center border-grey-200 text-black text-[12px]">
                            {item.quantity}
                          </span>
                          <button className="w-[24px] h-full border-l border-grey-20 hover:bg-grey-10">
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="text-center text-grey-80 font-gowunBold py-[20px] border-l border-grey-20 text-[20px]">
                      {(item.price * item.quantity).toLocaleString()}원
                    </td>
                    <td className="text-center text-grey-80 font-gowunBold py-[20px] border-l border-grey-20">
                      <div className="text-[16px]">
                        {shippingCost.toLocaleString()}원
                      </div>
                      <div className="text-[13px] font-gowun text-grey-40">
                        택배
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr className="mb-[12px]" />

            <div className="flex justify-between">
              <p className="text-[14px] font-gowun">
                총 주문 상품{" "}
                <span className="text-secondary-40 font-gowunBold">
                  {cartItemsList.length}
                </span>
                개
              </p>
            </div>

            <hr className="mt-[12px] mb-[16px]" />

            <div className="grid grid-cols-[repeat(5,auto)] justify-center gap-[4px] mb-[16px]">
              <div className="flex flex-col items-center">
                <div className="text-[18px] font-gowunBold">
                  {totalPrice.toLocaleString()}원
                </div>
                <div className="text-[12px] font-gowun text-grey-50">
                  상품 금액
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-[18px] font-bold px-[20px]">+</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[18px] font-gowunBold">
                  {shippingCost.toLocaleString()}원
                </div>
                <div className="text-[12px] font-gowun text-grey-50">
                  배송비
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-[18px] font-bold px-[20px]">=</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[18px] font-bold">
                  {totalOrderAmount.toLocaleString()}원
                </div>
                <div className="text-[12px] font-gowun text-grey-50">
                  총 주문 금액
                </div>
              </div>
            </div>

            <hr className="my-[16px]" />

            <div className="flex justify-center mb-[16px]">
              <button className="bg-primary-40 text-white w-[280px] py-[8px] rounded-md text-[15px] text-center hover:bg-primary-50">
                주문하기
              </button>
            </div>

            <div className="mt-[8px] text-center">
              <button className="text-black text-[15px] border-b border-grey-30">
                다음에 다시 주문하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
