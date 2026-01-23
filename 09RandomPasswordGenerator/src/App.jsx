// import { useState ,useCallback,useEffect,useRef} from "react"


// function App() {
 
// const [numberAllowed,setNumberAllowed]=useState(false)
// const [charAllowed,setcharAllowed]=useState(false)
// const [length,setLength]=useState(8)
// const [password,setPassword]=useState("")

// // useRef hook used for highlight copy text( assign value of passwrdRef in input )
// const passwordRef=useRef(null)

// const passwordGenerator=useCallback(()=>{
//   let pass=""
//   let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
//   if(numberAllowed) str +="0123456789"
//   if(charAllowed) str+="~!@#$%^&*(){}`"

//     // console.log(str)
//   for(let i=1;i<=length;i++){           //length is state by default 8
//     let char= Math.floor(Math.random()*str.length+1)
//     pass += str.charAt(char)
//       console.log(str)
//   }

//   setPassword(pass)
//      console.log(pass)

// },[length,numberAllowed,charAllowed,setPassword])


// const copyPasswordToClipboard=useCallback(()=>{
//   // select ifit possible then use ? quesmark range can be (0,3) for select and copy 
//   passwordRef.current?.select()
//    passwordRef.current?.setSelectionRange(0,999)
//    window.navigator.clipboard.writeText(password)
// },[password])


// // useEffect hook  //
// useEffect(()=>{
//   passwordGenerator();
// },[length,numberAllowed,charAllowed,passwordGenerator])


//   return (
//     <>

//     <div  className="min-h-dvh min-w-dvw flex flex-col justify-center items-center bg-slate-950 ">

//     <div className=" bg-slate-800 h-[200px] w-[600px] p-2 rounded-xl flex flex-col items-center justify-evenly " >
//       <h2 className="text-white text-center text-2xl">Password Generator</h2>


// {/* input */}
//  <div className="h-10 w-[82%] flex items-center justify-center bg-white rounded-xl m-2 ">
//   <div className="w-120 h-12  flex shadow  items-center justify-start p-2 ">
//     {/* we have to assign ref */}
//   <input className=" w-full outline-none" type="text" value={password} placeholder="password "  readOnly ref={passwordRef}/>
//   </div>
//   <div className="h-10 w-[20%] bg-blue-600  rounded-e-xl flex items-center justify-center ">
// <button onClick={copyPasswordToClipboard} className=" font-bold text-white border-none">Copy</button> 
//   </div>
//      </div>

  
// {/* last box */}
// <div className="flex text-sm gap-x-2 text-white">
//   <div className="flex items-center gap-x-1 ">

//   <input type="range" min={8} max={100} value={length}  className="cursor-pointer" 
//   onChange={(e)=>{setLength(e.target.value)  }}/>
//   <label htmlFor="">length {length} </label>
//   </div>
// <div className="flex items-center gap-x-1 ">
// <input type="checkbox" defaultChecked={numberAllowed } id="numberInput" onChange={()=>{
//   setNumberAllowed((prev)=> !prev)
// }}/>
// <label htmlFor="numberInput"> Numbers</label>
// </div>

// <div className="flex items-center gap-x-1 ">
// <input type="checkbox" defaultChecked={charAllowed } id="charInput" onChange={()=>{
//   setcharAllowed((prev)=>!prev )
// }}/>
// <label htmlFor="charInput">Character</label>
// </div>

// </div> 

//     </div>
//     </div>
//     </>
//   )
// }

// export default App





import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*(){}`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 p-4">
      <div className="bg-slate-800 w-full max-w-md sm:max-w-lg p-4 rounded-xl flex flex-col items-center justify-evenly gap-4">
        <h2 className="text-white text-center text-2xl">Password Generator</h2>

        {/* Input + Copy */}
        <div className="w-full flex flex-col sm:flex-row items-center bg-white rounded-xl overflow-hidden">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className="flex-1 p-2 outline-none text-black w-full"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="w-full sm:w-auto sm:px-4 py-2 bg-blue-600 text-white font-bold hover:bg-blue-700"
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center text-white gap-4">
          {/* Length */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer flex-1"
            />
            <span>Length: {length}</span>
          </div>

          {/* Numbers */}
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          {/* Characters */}
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={charAllowed}
              id="charInput"
              onChange={() => setcharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
