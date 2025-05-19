const buttonStyling = "border-[1.2px] border-slate-800 px-3 py-0.5 rounded";

const SetQuantity = (
  {
    quantity,
    cardCounter,
    handleQuantityIncrease,
    handleQuantityDecrease,
  }
) => {
  return (
  <div className="flex gap-8 items-center">
    {cardCounter ? null : <div className="font-semibold">QUANTITY</div>}
    <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
      <button disabled={quantity <= 1}
        className={buttonStyling}
        onClick={handleQuantityDecrease}>
        -
      </button>
      <div className="text-slate-800">{quantity}</div>
      <button 
        className={buttonStyling}
        onClick={handleQuantityIncrease}>
        +
      </button>
    </div>
  </div>
  );
}

export default SetQuantity;