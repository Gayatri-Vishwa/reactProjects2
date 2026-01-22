
import React ,{useId} from 'react'


//it is taking two input label  and classname
function InputBox({ 
   label,
   className=" ",
  amount,
onAmountChange,  //amout change state k liye
onCurrencyChange,
selectCurrency="usd",
currencyOptions=[],    //default vale is empty array
amountDisable=false,
// amountDisable=true,
currencyDisable=false,
}) {
// this hook generate unique  id  for label and input tag
  const amountInputId= useId();

    return (
      //in first div css in `` beacuse here we are input from user
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId}  className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                       // onAmountChange && then we wite function it means if exists so no chances of error
                    // jsvascript events ki value ko string format me leleti h so use Number
                />

                
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {/* not forget the key with loops  key can be -id  or same value here 
                    // In callback function wehave not use {} we use () so no need to store in any var beacuse it returns a value  */}
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                            {currency}
                            </option>
                        ))}
                
                </select>
            </div>
        </div>
    );
}

export  {InputBox};