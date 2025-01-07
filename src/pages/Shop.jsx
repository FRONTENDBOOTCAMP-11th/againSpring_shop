import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMenuStore from "../store/menuStore";
function Cart() {
  //더미 상품 데이터
  const dummyItems = [
    {
      id: 1,
      name: "상품 A",
      price: 15000,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "상품 B",
      price: 2500000,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "상품 C",
      price: 10000,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 4,
      name: "상품 A",
      price: 15000,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 5,
      name: "상품 B",
      price: 2500000,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 6,
      name: "상품 C",
      price: 10000,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
  ];

  const [cartItemsList] = useState(dummyItems);
  const navigate = useNavigate();

  const shippingCost = 3000; //배송비
  const totalPrice = cartItemsList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalOrderAmount = totalPrice + shippingCost;

  const { activeMenu, setActiveMenu } = useMenuStore();
  const [hovered, setHovered] = useState(false);

  const menuItems = [
    { name: "주방용품", links: ["/spring"] },
    { name: "세탁용품", links: ["/community"] },
    { name: "문구용품", links: ["/shop"] },
    { name: "식품", links: ["/inquiry"] },
  ];

  return (
    <div className="flex justify-center px-[16px]">
      {/* 화면 가운데 정렬 및 좌우 패딩을 추가한 외부 컨테이너 */}
      <div
        className="container mx-auto px-[24px] my-[40px]"
        style={{ maxWidth: "1200px" }}
      >
        {" "}
        {/* 장바구니 제목과 아이템 개수를 표시하는 상단 헤더 */}
        <div className="flex items-center mb-[16px]">
          <nav className="w-full">
            <div className="flex justify-center space-x-8">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group hover:bg-secondary-10 hover:text-white"
                  onMouseEnter={() => {
                    setActiveMenu(item.name);
                    setHovered(true);
                  }}
                  onMouseLeave={() => setHovered(false)}
                >
                  <a
                    href="#"
                    className="text-gray-700 hover:text-secondary font-semibold"
                  >
                    {" "}
                    {item.name}{" "}
                  </a>
                  {item.subMenu && activeMenu === item.name && (
                    <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md p-6 min-w-[200px]">
                      <ul className="space-y-3">
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href={item.links[subIndex]}
                              className="hover:text-secondary cursor-pointer block"
                            >
                              {" "}
                              {subItem}{" "}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex items-center mb-[16px]">
          {/* 장바구니 아이템 개수를 표시하는 배지 */}
          <p className="flex items-center justify-center mt-4">
            {" "}
            {/* margin-top 추가하여 여백 조정 */}총 {cartItemsList.length} 개의
            상품이 있습니다
          </p>
        </div>
        {/* 상단 헤더와 본문을 구분하는 수평선 */}
        <hr className="mb-0 border-t border-grey-20" />
        {/* 상품목록에 아이템이 없을 경우 */}
        {cartItemsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[256px]">
            {/* 상품목록이 비어있을 때 보여지는 이미지 */}
            <img
              src="/images/Cart1.png"
              alt="Empty Cart"
              className="w-[52px] h-[52px] mb-[20px]"
            />
            {/* 상품목록이 비어있다는 메시지 */}
            <p className="text-[18px] font-gowun text-grey-40">
              상품목록이 비어있습니다.
            </p>
          </div>
        ) : (
          <div>
            {/* 상품목록에 아이템이 있을 때 */}
            <table className="w-full table-auto">
              <tbody className="flex flex-wrap ">
                {/* 상품목록 아이템들 */}
                {cartItemsList.map((item) => (
                  <tr
                    key={item.id}
                    className="w-1/4 sm:w-1/2 lg:w-1/4 xl:w-1/4 p-2 cursor-pointer"
                    onClick={() =>
                      navigate(`/detail/${item.id}`, { state: item })
                    }
                  >
                    {/* 상품 정보: 이미지와 이름 */}
                    <td className="flex flex-col items-start py-[20px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          maxWidth: "363px",
                          height: "auto",
                          aspectRatio: "363 / 484", // 고정 비율 유지
                          minWidth: "100px", // 최소 크기 설정
                        }}
                      />

                      <div>
                        <h2 className="text-[16px] font-semibold text-grey-80  mt-[20px] ">
                          {item.name}
                        </h2>
                      </div>

                      {/* 주문 금액: 가격 * 수량 */}
                      <td className="text-center text-grey-80 font-gowunBold py-[20px]  text-[16px]">
                        {item.price.toLocaleString()}원
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 🦋🍓*/}

            {/* 인덱스 버튼 */}
            <div className=" justify-center mb-[16px] flex gap-[16px]">
              <button className="bg-[#D9D9D9] text-black w-[40px] py-[8px] rounded-md text-[15px] text-center hover:bg-secondary-20 hover:text-white">
                1
              </button>
              <button className="bg-[#D9D9D9] text-black w-[40px] py-[8px] rounded-md text-[15px] text-center  hover:bg-secondary-20 hover:text-white">
                2
              </button>
              <button className="bg-[#D9D9D9] text-black w-[40px] py-[8px] rounded-md text-[15px] text-center  hover:bg-secondary-20 hover:text-white">
                3
              </button>
              <button className="bg-[#D9D9D9] text-black w-[60px] py-[8px] rounded-md text-[15px] text-center  hover:bg-secondary-20 hover:text-white">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
