import { useState } from "react";
import { LuCaseLower, LuCaseUpper, LuCopy } from "react-icons/lu";
import { GoNumber } from "react-icons/go";
import { TbCurrencyReal } from "react-icons/tb";
import { Button } from "../@/components/ui/button";
import { toast } from "sonner";
import copy from "copy-to-clipboard";
import extenso from "extenso";

function App() {
  const [valueInput, setValueInput] = useState();
  const [result, setResult] = useState();
  const [textChange, setTextChange] = useState(true);
  const [mode, setMode] = useState("currency");

  function AddNewValue() {
    if (valueInput !== "") {
      const newValue = extenso(valueInput, { mode: "currency" });
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

  function handleCopy(e) {
    let copiedText = result;

    // Verifica a formatação desejada (maiúsculas ou minúsculas)
    if (textChange) {
      copiedText = copiedText.toUpperCase();
    } else {
      copiedText = copiedText.toLowerCase();
    }

    copy(copiedText);
    toast("Seu texto foi copiado com sucesso!", {
      description: `${copiedText}`,
      action: {
        label: "Fechar",
        onClick: () => console.log("Fechar"),
      },
    });
  }

  return (
    <div className=" bg-zinc-900 h-screen min-w-full m-0 p-0 max-sm:p-2 text-zinc-100 flex items-center justify-center flex-col">
      <div className="flex flex-col gap-3">
        <div className="h-10 max-sm:h-auto flex items-center justify-center max-sm:w-full max-sm:flex-col max-sm:gap-2 w-96">
          <input
            value={valueInput}
            type="text"
            onKeyDown={handleEnterKey}
            onChange={(e) => setValueInput(e.target.value)}
            className="h-full pl-3 bg-zinc-700 rounded-none w-full text-sm rounded-l-md outline-none max-sm:rounded max-sm:py-3"
            placeholder="Digite um número"
          />
          <Button
            className="h-10 px-5 py-0 text-sm rounded-none rounded-r-md bg-indigo-600 hover:bg-indigo-500 transition-all max-sm:rounded max-sm:py-3 max-sm:w-full"
            onClick={AddNewValue}
          >
            Converter
          </Button>
        </div>
        <div
          className={`p-5  bg-zinc-800 border border-zinc-700 mt-3 max-sm:w-full w-96 rounded-md ${
            textChange ? "uppercase" : "lowercase"
          } text-sm `}
        >
          <div className="flex items-center justify-between h-8">
            <div className="gap-2 border border-zinc-700 hover:border-indigo-400 transition-all rounded-md overflow-hidden">
              <Button
                onClick={() => setTextChange(false)}
                value={textChange}
                className="bg-transparent px-3 py-2 h-auto rounded-none focus:text-indigo-400 focus:bg-zinc-600 outline-0 focus:outline-none border-none transition-all hover:bg-zinc-700"
              >
                <LuCaseLower className="w-4 h-4 m-0 p-0" />
              </Button>

              <Button
                onClick={() => setTextChange(true)}
                className="bg-transparent px-3 py-2 h-auto rounded-none focus:text-indigo-400 hover:border-indigo-400 focus:bg-zinc-600 outline-0 focus:outline-none border-none transition-all hover:bg-zinc-700"
              >
                <LuCaseUpper className="w-4 h-4 m-0 p-0" />
              </Button>
            </div>

            <div>
              <Button
                onClick={(e) => handleCopy(e)}
                className="px-2 py-2 h-auto bg-zinc-700 focus:outline-none hover:bg-zinc-600 focus:text-indigo-400"
              >
                <LuCopy className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <p className="py-3 text-start  mt-3 min-h-10 border-t border-zinc-700 text-zinc-300">
            {result}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
