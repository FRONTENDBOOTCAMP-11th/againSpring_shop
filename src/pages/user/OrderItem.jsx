import PropTypes from "prop-types";

OrderItem.propTypes = {
  products: PropTypes.array,
};

function OrderItem({ products }) {
  const renderedItem = products.map((item) => {
    return (
      <div
        key={item._id}
        className="mt-[30px] flex flex-col gap-[20px] text-[16px] border border-grey-10 rounded-[12px] p-[20px] "
      >
        <div className="flex justify-between">
          <div className="text-[24px] font-gowunBold">
            주문완료
            <span className="text-[18px] text-secondary-50 font-gowunBold">
              {" "}
              · 12/30 (목) 도착
            </span>
          </div>
          <img src={"/icons/dots.svg"} />
        </div>

        <div className="flex items-center border border-primary-50 rounded-lg">
          <div className="flex flex-grow gap-[20px]">
            <img
              className="w-[150px] h-[200px] object-contain"
              src={`https://11.fesp.shop${item.image?.path}`}
            />
            <div className="flex flex-col justify-center gap-[20px]">
              <p className="text-[20px]">{item.name}</p>
              <p className="text-[20px]">
                {item.price.toLocaleString()}원 · {item.quantity}개
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[20px] w-[240px] p-[20px] border-l border-grey-30">
            <button
              type="button"
              className="text-[18px] border border-grey-20 h-[48px]"
            >
              배송 조회
            </button>
            <button
              type="button"
              className="text-[18px] border border-grey-20 h-[48px]"
            >
              교환, 반품 신청
            </button>
            <button
              type="button"
              className="text-[18px] text-primary-60 border border-primary-60 h-[48px]"
            >
              리뷰 작성하기
            </button>
          </div>
        </div>
      </div>
    );
  });
  return <>{renderedItem}</>;
}

export default OrderItem;
