import { useState } from "react";
import extenso from "extenso";
import copy from "copy-to-clipboard";
import { LuCaseLower, LuCaseUpper, LuCopy } from "react-icons/lu";
import "./App.css";

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
      alert("Digite algo para continuar");
    }
  }

  function handleCopy(e) {
    copy(result);
    alert(`seu texto foi copiado! "${result}"`);
  }

  return (
    <>
      <div className="h-10 flex items-center justify-center w-full max-w-80">
        <input
          value={valueInput}
          type="text"
          onChange={(e) => setValueInput(e.target.value)}
          className="h-full pl-3 bg-zinc-700 rounded-none w-full text-sm rounded-l-md outline-none"
          placeholder="Digite um número"
        />
        <button
          className="h-10 px-5 py-0 text-sm rounded-none rounded-r-md bg-indigo-600 hover:bg-opacity-70"
          onClick={AddNewValue}
        >
          Converter
        </button>
      </div>
      <div
        className={`p-5  bg-zinc-800 border border-zinc-700 mt-3 max-w-80 rounded-md ${
          textChange ? "uppercase" : "lowercase"
        } text-sm `}
      >
        <div className="flex items-center justify-between h-8">
          <div className="gap-2 border border-zinc-700  transition-all rounded-md overflow-hidden">
            <button
              onClick={() => setTextChange(false)}
              className="bg-transparent px-3 py-2 rounded-none focus:text-indigo-400 focus:bg-zinc-600 outline-0 focus:outline-none border-none transition-all hover:bg-zinc-00"
            >
              <LuCaseLower className="w-4 h-4 m-0 p-0" />
            </button>

            <button
              onClick={() => setTextChange(true)}
              className="bg-transparent px-3 py-2 rounded-none focus:text-indigo-400 focus:bg-zinc-600 outline-0 focus:outline-none border-none transition-all hover:bg-zinc-00"
            >
              <LuCaseUpper className="w-4 h-4 m-0 p-0" />
            </button>
          </div>
          <div>
            <button
              onClick={(e) => handleCopy(e)}
              className="px-2 py-2 bg-zinc-700 focus:outline-none focus:text-indigo-400"
            >
              <LuCopy className="w-3 h-3" />
            </button>
          </div>
        </div>
        <p className="py-3 text-start border-t border-zinc-700 mt-3 min-h-10">
          {result}
        </p>
      </div>
    </>
  );
}

export default App;
