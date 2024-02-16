import { useState } from "react";
import { LuCaseLower, LuCaseUpper, LuCopy, LuCheck } from "react-icons/lu";
import { Button } from "../@/components/ui/button";
import { toast } from "sonner";
import copy from "copy-to-clipboard";
import extenso from "extenso";
import { dynamicMask } from "simple-currency-mask";
import { Toaster } from '../@/components/ui/sonner'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../@/components/ui/select";

function App() {
  const [valueInput, setValueInput] = useState();
  const [result, setResult] = useState();
  const [textChange, setTextChange] = useState(true);
  const [toggleCopy, setToggleCopy] = useState(false)
  const [mode, setMode] = useState(true)

  function AddNewValue() {
    if (valueInput !== "") {
      // Remover caracteres não numéricos, exceto a vírgula
      const cleanValue = valueInput.replace(/[^\d,]/g, '');
      // Chamar a função extenso com o valor como uma string
      const newValue = extenso(cleanValue, { mode: mode ? "currency" : "number" });
      setResult(newValue);
    } else {
      alert("Digite algo");
    }
  }

  function handleEnterKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      AddNewValue();
    }
  }

  function handleCopy() {
    let copiedText = result;
    // Verifica a formatação desejada (maiúsculas ou minúsculas)
    if (textChange) {
      copiedText = copiedText.toUpperCase();
    } else {
      copiedText = copiedText.toLowerCase();
    }
    copy(copiedText);
    toast.custom(() => <div className= 'bg-violet-500 w-full h-full p-5 rounded font-semibold flex items-center '><span className="p-5 flex items-center justify-center"><LuCheck/></span><span>A custom toast with default styling</span></div>, {
      
      description: `${copiedText}`,
    });
  }

  function changeMonetaryValue(e) {
    if (mode) {

      let config = { decimalSeparator: ",", currency: 'R$', negative: true };

      setValueInput(dynamicMask(e.target.value, config));
    } else {

      setValueInput(e.target.value)
    }
  }

  return (
    <div className=" bg-zinc-900 h-screen min-w-full m-0 p-0 max-sm:p-4 text-zinc-100 flex items-center justify-center flex-col">
      <div className="flex flex-col gap-3 w-full items-center justify-center">
        <div className="h-10 max-sm:h-auto flex items-center justify-center max-sm:w-full max-sm:flex-col max-sm:gap-2 w-96">
          <input
            value={valueInput}
            type="text"
            onKeyDown={handleEnterKey}
            onChange={changeMonetaryValue}
            className="h-full pl-3 bg-zinc-700 rounded-none w-full text-sm rounded-l-md outline-none max-sm:rounded max-sm:py-3"
            placeholder="Digite um número"
          />

          <Button
            className="h-10 px-5 py-0 font-bold text-sm rounded-none rounded-r-md bg-violet-500 hover:bg-violet-500/70 transition-all max-sm:rounded max-sm:py-3 max-sm:hidden"
            onClick={AddNewValue}
          >
            Converter
          </Button>

        </div>
        <div
          className={`p-0  bg-zinc-800 border border-zinc-700 mt-3 max-sm:w-full w-96 rounded-md ${textChange ? "uppercase" : "lowercase"
            } text-sm `}
        >
          <div className="flex items-center justify-between px-5 h-20">
            <div className="flex items-center justify-between w-full h-8">

              <div className=" flex items-centergap-2 border border-zinc-700 hover:border-violet-300 transition-all rounded-md overflow-hidden">
                <Button
                  onClick={() => setTextChange(false)}
                  value={textChange}
                  className="bg-transparent p-1  h-8 w-8 rounded-none focus:text-violet-400 focus:bg-zinc-600 outline-0 focus:outline-none border-none transition-all hover:bg-zinc-700"
                >
                  <LuCaseLower size={18} />
                </Button>


                <Button
                  onClick={() => setTextChange(true)}
                  className="bg-transparent p-1  h-8 w-8 rounded-none focus:text-violet-400 hover:border-violet-300 focus:bg-zinc-600 outline-0 focus:outline-none border-none transition-all hover:bg-zinc-700"
                >
                  <LuCaseUpper size={18} />
                </Button>


              </div>
              <Select onValueChange={(() => setMode(!mode))} defaultValue={mode}>
                <SelectTrigger className="w-[180px] max-sm:w-[150px] border-zinc-700 hover:border-violet-300 h-8 px-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='mt-1 border-zinc-700' >
                  <SelectGroup className='w-[170px] max-sm:w-[140px] text-background bg-zinc-700 divide-y divide-zinc-600'>
                    <SelectItem value={true} className='p-2 cursor-pointer border-zinc-800 bg-zinc-700 hover:bg-zinc-600/80 text-xs rounded-none' >Monetário</SelectItem>
                    <SelectItem value={false} className='p-2 cursor-pointer border-zinc-800 bg-zinc-700 hover:bg-zinc-600/80 text-xs border-b  rounded-none' >Numero</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

                {result && (
 

                  <Button
                    onClick={(e) => handleCopy(e) + setToggleCopy(true)}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-700 focus:outline-none hover:bg-zinc-600 focus:text-violet-400"
                  >
                    {toggleCopy ? <LuCheck /> : <LuCopy size={14} />}

                  </Button>

                )}
            </div>


          </div>
          <div className="min-h-28 border-t border-zinc-700 overflow-hidden">
            {result && (
              <p className="p-5 text-start font-family:ebrima min-h-20  text-zinc-300">
                {mode ? <><span className="uppercase">{valueInput} </span>
                  <span>({result}).</span>
                </> :
                  <span>{result}</span>
                }


              </p>)}
          </div>

          <Button
            className="hidden max-sm:block h-10 px-5 py-0 font-bold text-sm rounded-none rounded-r-md bg-violet-600 hover:bg-violet-400 transition-all max-sm:rounded-none max-sm:py-3 max-sm:w-full"
            onClick={AddNewValue}
          >
            Converter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
