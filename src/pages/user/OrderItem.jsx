import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

OrderItem.propTypes = {
  products: PropTypes.array,
};

function OrderItem({ products }) {
  const navigate = useNavigate();

  const renderedItem = products.map((item) => {
    return (
      <div
        key={item._id}
        className="mt-[30px] flex text-[16px] border border-grey-30 rounded-[12px] "
      >
        <div className="flex flex-col flex-grow justify-center p-[24px]">
          <div className="flex justify-between">
            <div className="text-[20px] font-gowunBold">
              주문완료
              <span className="text-[18px] text-secondary-50 font-gowunBold">
                {" "}
                · 12/30 (목) 도착
              </span>
            </div>
            <img src={"/icons/dots.svg"} />
          </div>
          <div className="flex gap-[20px]">
            <img
              className="w-[150px] h-[200px] object-contain"
              src={`https://11.fesp.shop${item.image?.path}`}
            />
            <div className="flex flex-col justify-center gap-[20px]">
              <p className="text-[18px]">{item.name}</p>
              <p className="text-[18px]">
                {item.price.toLocaleString()}원 · {item.quantity}개
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-[20px] w-[240px] p-[24px] border-l border-grey-30">
          <button
            type="button"
            className="text-[16px] border border-grey-20 h-[46px] rounded-lg"
          >
            배송 조회
          </button>
          <button
            type="button"
            className="text-[16px] border border-grey-20 h-[46px] rounded-lg"
          >
            교환, 반품 신청
          </button>
          <button
            type="button"
            className="text-[16px] text-primary-60 border border-primary-60 h-[46px] rounded-lg"
            onClick={() => navigate("/review", { state: { item } })}
          >
            리뷰 작성하기
          </button>
        </div>
      </div>
    );
  });
  return <>{renderedItem}</>;
}

export default OrderItem;
