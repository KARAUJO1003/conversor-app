import { useState } from "react";
import { LuCaseLower, LuCaseUpper, LuCopy, LuCheck, LuX } from "react-icons/lu";
import { Button } from "../@/components/ui/button";
import { toast } from "sonner";
import copy from "copy-to-clipboard";
import extenso from "extenso";
import { dynamicMask } from "simple-currency-mask";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../@/components/ui/select";

function App() {
  const [valueInput, setValueInput] = useState();
  const [result, setResult] = useState();
  const [currencyValue, setCurrencyValue] = useState();
  const [textChange, setTextChange] = useState(true);
  const [showCopyIcon, setShowCopyIcon] = useState(false);
  const [mode, setMode] = useState(true);

  function AddNewValue() {
    if (valueInput) {
      setCurrencyValue(valueInput);
      // Remover caracteres não numéricos, exceto a vírgula
      const cleanValue = valueInput.replace(/[^\d,]/g, "");
      // Chamar a função extenso com o valor como uma string
      const newValue = extenso(cleanValue, {
        mode: mode ? "currency" : "number",
      });
      setResult(newValue);
      setValueInput("");
    } else {
      toast.custom((t) => (
        <div className="bg-violet-950/70 backdrop-blur-sm relative border border-violet-700 w-full h-full gap-4 p-5 rounded font-semibold flex items-center ">
          <span className="p-2 flex items-center justify-center bg-violet-800 text-zinc-300 rounded-full">
            <LuX />
          </span>
          <div className="flex flex-col">
            <span className="text-violet-300">
              Digite algum número no input.
            </span>
          </div>
          <button
            className="absolute top-2 right-2 text-zinc-300"
            onClick={() => toast.dismiss(t)}
          >
            {" "}
            <LuX />
          </button>
        </div>
      ));
    }
  }

  function handleEnterKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      AddNewValue();
    }
  }

  function handleCopy() {
    let copiedText = `${currencyValue} (${result})`;
    // Verifica a formatação desejada (maiúsculas ou minúsculas)
    if (textChange) {
      copiedText = copiedText.toUpperCase();
    } else {
      copiedText = copiedText.toLowerCase();
    }
    copy(copiedText);

    setShowCopyIcon(true);
    setTimeout(() => {
      setShowCopyIcon(false);
    }, 3000);

    toast.custom((t) => (
      <div className="bg-violet-950/70 backdrop-blur-sm relative border border-violet-700 w-full h-full gap-4 p-5 rounded font-semibold flex items-center ">
        <span className="p-2 flex items-center justify-center bg-violet-800 text-zinc-300 rounded-full">
          <LuCheck />
        </span>
        <div className="flex flex-col">
          <span className="text-violet-300">
            Resultado copiado com sucesso!
          </span>
          <span className="text-violet-300 text-xs font-normal">
            {copiedText}
          </span>
        </div>
        <button
          className="absolute top-2 right-2 text-zinc-300"
          onClick={() => toast.dismiss(t)}
        >
          <LuX />
        </button>
      </div>
    ), {
      duration: 3000,
    });
  }

  function changeMonetaryValue(e) {
    if (mode) {
      let config = { decimalSeparator: ",", currency: "R$", negative: true };

      setValueInput(dynamicMask(e.target.value, config));
    } else {
      setValueInput(e.target.value);
    }
  }

  return (
    <div className=" bg-zinc-900 h-screen min-w-full m-0 p-0 max-sm:p-4  text-zinc-100 flex items-center max-sm:justify-start justify-center flex-col">
      <div className="flex flex-col  w-full items-center justify-center max-sm:justify-start max-sm:pt-5">
        <div className="h-10 max-sm:h-auto flex items-center justify-center max-sm:w-full max-sm:flex-col max-sm:gap-2 w-96">
          <input
            value={valueInput}
            type="text"
            onKeyDown={handleEnterKey}
            onChange={changeMonetaryValue}
            className="h-full pl-3 bg-zinc-700/70 rounded-none w-full text-sm rounded-l-md outline-none max-sm:rounded max-sm:py-3"
            placeholder="Digite um número"
          />

          <Button
            className="h-10 px-5 py-0 font-bold text-violet-200 text-sm rounded-none rounded-r-md bg-violet-500/70 hover:bg-violet-500 transition-all max-sm:rounded max-sm:py-3 max-sm:hidden"
            onClick={AddNewValue}
          >
            Converter
          </Button>
        </div>
        <div
          className={`p-0 overflow-hidden bg-zinc-800 border border-zinc-700 mt-3 max-sm:w-full w-96 rounded-md ${textChange ? "uppercase" : "lowercase"
            } text-sm `}
        >
          <div className="flex items-center justify-between px-5 h-20">
            <div className="flex items-center justify-between gap-2 w-full h-8">
              <div className=" flex items-center  border border-zinc-700 hover:border-violet-300/50 transition-all rounded-md overflow-hidden">
                <Button
                  onClick={() => setTextChange(false)}
                  value={textChange}
                  className="bg-transparent flex items-center justify-center  h-8 w-8 rounded-none focus:text-violet-400 focus:bg-zinc-600 outline-0 focus:outline-none border-none transition-all hover:bg-zinc-700"
                >
                  <LuCaseLower size={18} />
                </Button>
                <Button
                  onClick={() => setTextChange(true)}
                  className="bg-transparent flex items-center justify-cente h-8 w-8 rounded-none focus:text-violet-400 hover:border-violet-300/50 focus:bg-zinc-600 outline-0 focus:outline-none border-l border-zinc-600 transition-all hover:bg-zinc-700"
                >
                  <LuCaseUpper size={18} />
                </Button>
              </div>
              <Select onValueChange={() => setMode(!mode)} defaultValue={mode}>
                <SelectTrigger className="max-w-[170px] max-sm:w-full max-sm:max-w-[140px] border-zinc-700 hover:border-violet-300/50 h-8 px-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="mt-1 border-zinc-700">
                  <SelectGroup className="max-w-[170px] max-sm:w-[170px] max-sm:max-w-[140px] text-background bg-zinc-700 ">
                    <SelectItem
                      value={true}
                      className="p-2 cursor-pointer border-b border-zinc-600  bg-zinc-700 hover:bg-zinc-600/80 text-xs rounded-none"
                    >
                      Monetário
                    </SelectItem>
                    <SelectItem
                      value={false}
                      className="p-2 cursor-pointer border-zinc-800 bg-zinc-700 hover:bg-zinc-600/80 text-xs border-b  rounded-none"
                    >
                      Numero
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {result && (
                <Button
                  onClick={handleCopy}
                  className="w-8 h-8 flex items-center justify-center bg-zinc-700 focus:outline-none hover:bg-zinc-600 focus:text-violet-400"
                >
                  {showCopyIcon ? <LuCheck /> : <LuCopy size={14} />}
                </Button>
              )}
            </div>
          </div>
          <div className="min-h-28 border-t border-zinc-700 overflow-hidden">
            {result && (
              <p className="p-5 text-start min-h-20  text-zinc-300">
                {mode ? (
                  <>
                    <span className="uppercase">{currencyValue} </span>
                    <span>({result}).</span>
                  </>
                ) : (
                  <span>{result}</span>
                )}
              </p>
            )}
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
