import React , { useCallback, useState , useEffect , useRef} from 'react';

function App() {
  // "useState" has been used as a hook
  const [length, setLength] = useState(8);
  const [number , setNumber] = useState(false);
  const [char , setChar] = useState(false);
  const [pswd , setPswd] = useState("");
 
  // "useCallback" has been used as a hook
  // "useCallback" help in optimisation i.e help in memoisation & keep the data in form of cache in the memory
  const pswdgen = useCallback(() => {
      let psd = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(number==true){
          str = str + "0123456789";
      }
      if(char==true){
        str = str + "!@#$%^&*()*";
      }
      for(let i=1 ; i<=length ; i++){
           let cr = Math.floor(Math.random() * str.length + 1);
           psd = psd + str.charAt(cr);
      }
      setPswd(psd);
  },[length,number,char,setPswd]);

  const copyPswdToClipboard = useCallback(() => {
      pswdRef.current?.select();
      pswdRef.current?.setSelectionRange(0,90);
      window.navigator.clipboard.writeText(pswd)
  } , [pswd]);

  // "useEffect" has been used as a hook
  // "useEffect" help in smooth execution & re run if there is any changes in dependencies i.e any element of array
  useEffect(() => {
      pswdgen();
  } , [length,number,char,pswdgen]);

  // "useRef" has been used as hook
  // "useRef" is used when there is requirement of any reference
   const pswdRef = useRef(null);

  return (
         <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-orange-500 bg-gray-700'>
            <h1 className='text-white text-center my-3'>Password Generator</h1> 
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
                 <input
                     type="text"
                     value={pswd}
                     className="outline-none w-full py-1 px-3"
                     placeholder="Password"
                     readOnly 
                     ref={pswdRef}
                 />
                 <button 
                 onClick = {copyPswdToClipboard}
                 className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
                  copy
                  </button>
            </div>
            <div className='flex text-sm gap-x-2'>
               <div className='flex items-center gap-x-1'>
                     <input 
                     type="range"
                     min = {6}
                     max = {100}
                     value = {length}
                     className='cursor-pointer' 
                     onChange = {(e) => {setLength(e.target.value)}}
                     />
                     <label>Label: {length}</label>
               </div>

               <div className='flex items-center gap-x-1'>
                  <input
                     type="checkbox"
                     defaultChecked={number}
                     id="numberInput"
                     onChange={() => {
                        setNumber((prev) => !prev);
                     }}
                  />
                  <label htmlFor="numberInput">Numbers</label>
               </div>
               
               <div className='flex items-center gap-x-1'>
                  <input
                     type="checkbox"
                     defaultChecked={char}
                     id="characterInput"
                     onChange={() => {
                        setChar((prev) => !prev);
                     }}
                  />
                  <label htmlFor="characterInput">Characters</label>
               </div>
            </div>
         </div>
  )
}

export default App;
