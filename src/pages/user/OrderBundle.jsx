import OrderItem from "@pages/user/OrderItem";
import PropTypes from "prop-types";

OrderBundle.propTypes = {
  bundle: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    products: PropTypes.array,
  }),
};

function OrderBundle({ bundle }) {
  return (
    <>
      <div className="flex flex-col rounded-[20px] p-[20px] shadow-[rgba(0,0,0,0.08)_0px_2px_4px_0px,_rgba(0,0,0,0.16)_0px_0px_1px_0px]">
        <div className="flex justify-between items-center">
          <p className="text-[20px] font-gowunBold">{bundle.createdAt} 주문</p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[18px] text-primary-70">주문 상세보기</p>
            <img className="w-[30px] h-[30px]" src="/icons/pointer.svg" />
          </div>
        </div>

        <OrderItem products={bundle.products} />
      </div>
    </>
  );
}
export default OrderBundle;
