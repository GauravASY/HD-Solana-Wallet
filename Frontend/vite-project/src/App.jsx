import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [toCreate, settoCreate] = useState(0);
  const [phrase, setPhrase] = useState("");
  const [mnemonic, setMnemonic] = useState("");

  function handlePhrase(e) {
    setPhrase(e.target.value);
  }

  async function handleGenerate(e) {
    if (e.target.innerHTML == "Create Wallet") {
      settoCreate(1);
      let response = await fetch("http://localhost:3000/nemo", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mnemonic: 1,
        }),
      });
      response = await response.json();
      setMnemonic(response.mnemonic);
    } else {
      settoCreate(2);
    }
  }

  function handleGenerateWallet() {
    navigate(`/wallet`, {state :{mnemonic : mnemonic, choice : "create"}} );
  }

  function handleImportWallet(){
    navigate('/wallet', {state :{mnemonic : phrase, choice : "import"}});
  }

  return (
    <>
      {toCreate == 0 ? (
        <div className="min-h-screen min-w-screen bg-gray-900 flex flex-col items-center">
          <div className=" flex flex-col justify-center items-center mt-60 gap-8">
            <span className="text-center text-5xl font-mono font-bold text-white">
              Welcome to CashPin!
            </span>
            <button
              className="bg-orange-500 w-64 rounded-xl px-2 py-3.5 font-mono font-bold text-lg flex flex-row justify-center items-center transition ease-in-out delay-150 hover:cursor-pointer duration-300 hover:text-white "
              onClick={handleGenerate}
            >
              Create Wallet
            </button>
            <button
              className="bg-orange-500 w-64 rounded-xl px-2 py-3.5 font-mono font-bold text-lg flex flex-row justify-center items-center transition ease-in-out delay-150 hover:cursor-pointer duration-300 hover:text-white "
              onClick={handleGenerate}
            >
              Import Wallets
            </button>
          </div>
        </div>
      ) : (
        <>
          {mnemonic ? (
            <div className="min-h-screen min-w-screen bg-gray-900 flex flex-col justify-center items-center gap-6">
              <div className="p-3 flex flex-wrap w-1/3 text-white text-4xl justify-center">
                Here is your <span className="text-orange-500 italic ml-2"> Mnemonic!</span>
                Copy it and keep it safe.
              </div>
              <div className="bg-gray-700 p-3 flex flex-wrap w-1/3 rounded-lg">
                <span className="text-white blur-sm hover:blur-none text-xl font-mono italic">
                  {mnemonic}
                </span>
              </div>
              <button className="bg-orange-500 w-44 rounded-xl px-2 py-3.5 font-mono font-bold text-xl flex flex-row justify-center items-center transition ease-in-out delay-150 hover:cursor-pointer duration-300 hover:text-white "
              onClick={handleGenerateWallet}>
                Next
              </button>
            </div>
          ) : (
            <div className="min-h-screen min-w-screen bg-gray-900 flex flex-col justify-center items-center gap-6">
              <div className="p-3 flex flex-wrap w-1/3 text-white text-4xl justify-center">
                Enter your Mnemonic 
              </div>
              <input type="text" placeholder="Enter Mnemonic" 
              className="bg-gray-700 p-3 w-1/3 rounded-lg text-white"
              onChange={handlePhrase}/>
              <button className="bg-orange-500 w-44 rounded-xl px-2 py-3.5 font-mono font-bold text-xl flex flex-row justify-center items-center transition ease-in-out delay-150 hover:cursor-pointer duration-300 hover:text-white "
              onClick={handleImportWallet}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
