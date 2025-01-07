import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useMenuStore from "../store/menuStore";

function Cart() {
  //더미 상품 데이터
  const [activeTab, setActiveTab] = useState("가"); // 기본 활성 탭은 '가'
  const { state } = useLocation(); // navigate로 전달된 데이터
  const { id } = useParams(); // URL의 파라미터 값

  const tabContent = {
    상세정보: (
      <div>
        <p className="pl-[100px] pr-[100px] text-[18px]">
          이 유기농 핸드타올은 100% 순수 유기농 면으로 제작되어 민감한 피부에도
          안심하고 사용할 수 있습니다. 화학 처리와 인공 염색을 최소화해
          자연스러운 색감과 부드러운 촉감을 유지하며, 뛰어난 흡수력으로 손과
          얼굴의 물기를 빠르게 닦아줍니다. <br /> <br /> <br />
          환경을 생각한 지속 가능한 생산 과정으로 만들어져 자연친화적이며, 세탁
          후에도 형태가 쉽게 변형되지 않아 오랫동안 사용할 수 있습니다. 건강과
          환경을 모두 고려한 최고의 선택으로, 일상에서 프리미엄 감성을 경험해
          보세요.
        </p>

        <div className="flex justify-center items-center gap-[30px] mt-[60px]">
          <img
            src="https://via.placeholder.com/300"
            alt="유기농 핸드타올 이미지"
            className="mb-4 w-[300px] h-auto"
          />
          <img
            src="https://via.placeholder.com/300"
            alt="유기농 핸드타올 이미지"
            className="mb-4 w-[300px] h-auto"
          />
        </div>
      </div>
    ),
    구매안내: (
      <div>
        <p className="pl-[100px] pr-[100px] text-[18px]">
          고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다.
          확인과정에서 도난 카드의 사용이나 타인 명의의 주문등 정상적인 주문이
          아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다.
          <br /> <br /> <br />
          무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은
          가까운 은행에서 직접 입금하시면 됩니다. 주문시 입력한 입금자명과
          실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야
          하며 입금되지 않은 주문은 자동취소 됩니다.
        </p>
      </div>
    ),
    상품후기: "상품후기 탭의 내용",
    QnA: "QnA 탭의 내용",
  };

  const dummyItems = [
    state || {
      id: 1,
      name: "상품 A",
      price: 15000,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
  ];

  const [cartItemsList] = useState(dummyItems);

  const shippingCost = 3000; //배송비
  const totalPrice = cartItemsList.reduce(
    //가격계산
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalOrderAmount = totalPrice + shippingCost; // 가격계산결과

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

          {/* 장바구니 제목 */}
        </div>
        {/* 상단 헤더와 본문을 구분하는 수평선 */}
        <hr className="mb-0 border-t border-grey-20" />
        {/* 장바구니에 아이템이 없을 경우 */}
        <div>
          {/*🦋🍓 장바구니에 아이템이 있을 때 */}
          {cartItemsList.map((item) => (
            <div className="flex ml-[80px] mt-[50px]">
              <div className="flex flex-col  mr-[10px] ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[80px] h-[90px] mb-[30px] object-cover mr-[32px]"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[80px] h-[90px] mb-[30px] object-cover mr-[100px]"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[80px] h-[90px] mb-[20px] object-cover mr-[100px]"
                />
              </div>
              <img
                src={item.image}
                alt={item.name}
                className="w-[370px] h-[492px] mb-[20px] object-cover mr-[70px]"
              />

              <hr className="mt-[12px] mb-[16px]" />

              {/*🍓표 시작 */}
              <dl className="w-full">
                <p className="text-[18px] font-semibold mb-[20px] mt-[30px]">
                  {item.name}
                </p>
                <p className="text-[13px]  text-grey-80">상품설명</p>
                <hr className="mt-[12px] mb-[16px]" />

                <dl className="flex">
                  <dt className=" mr-[90px] mb-[16px]">판매가</dt>
                  <dd>{item.price.toLocaleString()}</dd>
                </dl>

                <dl className="flex">
                  <dt className=" mr-[30px] mb-[16px]">국내·해외배송 </dt>
                  <dd> 국내배송</dd>
                </dl>

                <dl className="flex">
                  <dt className=" mr-[90px] mb-[16px]">배송비 </dt>
                  <dd> 3,000원 (50,000원 이상 구매 시 무료)</dd>
                </dl>

                <dl className="flex">
                  <dt className=" mr-[90px] mb-[16px]">원산지</dt>
                  <dd> 국내</dd>
                </dl>

                <hr className="mt-[12px] mb-[16px]  " />

                {/* 장바구니 아이템들 */}
                {cartItemsList.map((item) => (
                  <div key={item.id} className="border-b py-[20px]">
                    <dd className="flex items-start py-[10px]">
                      {/* 상품 이름 */}

                      <div className="flex">
                        <h2 className="text-[15px] font-semibold text-grey-80 mr-[180px]">
                          {item.name}
                        </h2>

                        {/* 개수 증감 */}
                        <dd className="text-center py-[10px] mr-[60px]">
                          <div className="flex justify-center">
                            <div className="flex items-center h-[32px] border border-grey-20">
                              <button className="w-[24px] h-full border-r border-grey-20 hover:bg-grey-10">
                                -
                              </button>
                              <span className="w-[50px] h-full flex items-center justify-center text-black text-[12px]">
                                {item.quantity}
                              </span>
                              <button className="w-[24px] h-full border-l border-grey-20 hover:bg-grey-10">
                                +
                              </button>
                            </div>
                          </div>
                        </dd>

                        <dd className="text-center py-[10px]">
                          {item.price.toLocaleString()}원
                        </dd>
                      </div>
                    </dd>
                    <hr className="mt-[12px] mb-[1px]  " />

                    {/* 주문 금액 */}
                    <div className="flex">
                      <dt className=" py-[10px] text-[12px] mt-[1px] mr-[10px]">
                        총 상품 금액(수량):
                      </dt>
                      <dd className=" text-grey-80 font-gowunBold py-[10px] text-[21px]">
                        {(item.price * item.quantity).toLocaleString()}원
                      </dd>
                      <dd className=" text-grey-80 font-gowunBold py-[10px] text-[12px] mt-[10px] ml-[10px]">
                        {item.quantity.toLocaleString()}개
                      </dd>
                    </div>
                    <div className="flex mb-[16px] mt-[70px] ">
                      <button className="bg-white border-2 border-gray-300  w-[160px] py-[15px] mr-[10px] rounded-md text-[15px] text-center hover:bg-secondary-20 flex justify-center items-center">
                        찜하기
                      </button>
                      <button className="bg-white border-gray-300 border-2 w-[160px] py-[15px] mr-[10px] rounded-md text-[15px] text-center hover:bg-secondary-20 flex justify-center items-center">
                        장바구니
                      </button>
                      <button className="bg-secondary-10 border-gray-300 border-2 w-[160px] py-[15px] mr-[10px] rounded-md text-[15px] text-center hover:bg-secondary-20 flex justify-center items-center">
                        구매하기
                      </button>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          {/*🦋🍓*/}

          {/*👽제품상세 탭 */}
          <div>
            {/* 탭 네비게이션 */}
            <div className="flex mt-[80px] ">
              {["상세정보", "구매안내", "상품후기", "QnA"].map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)} // 탭 클릭 시 활성화된 탭을 변경
                  className={`w-[430px] pt-[20px] pb-[20px] cursor-pointer px-4 py-2 text-center text-[15px] 
                    ${
                      activeTab === tab
                        ? "border-t-3 border-l-3 border-r-3 bg-secondary-10 text-secondary-30 font-bold"
                        : "border-2 border-gray-300 text-gray-500"
                    }`}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* 탭 콘텐츠 */}
            <div className="p-4 ml-[auto] mr-[auto] w-[1026px] mt-[100px] mb-[100px]">
              <p>{tabContent[activeTab]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
