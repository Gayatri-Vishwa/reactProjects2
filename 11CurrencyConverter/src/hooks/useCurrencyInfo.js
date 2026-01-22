import { useEffect,useState } from "react";

function useCurrencyInfo(currency){
    const [data,setdata]=useState({})


    useEffect(()=>{
const apiKey="cffa3cb971e96d82c4f69d28";

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`;

    fetch(url)
      .then((res) => res.json()) // Fix: call .json() to parse the response
      .then((res) => {
        if (res && res.conversion_rates) {
          setdata(res.conversion_rates); // Extract conversion rates
        }
      })
      .catch((error) => console.error("Error fetching currency data:", error));
  }, [currency]);

//   why this code not workin the i use chatgpt
//         // const url=`https://api.exchangerate-api.com/v4/latest/${currency}.json`
//         const url=` https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${currency}.json`
//     fetch(url)
//     .then((res)=> res.json)
//     .then((res)=> setdata(res[currency]))
//  },[currency])

    return data
}

export default useCurrencyInfo;


        // https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"