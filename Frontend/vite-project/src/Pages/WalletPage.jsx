import React, { useEffect, useState } from "react";
import Wallet from "../Components/Wallet";
import { useLocation } from "react-router-dom";

function WalletPage() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const[choice, setChoice] = useState(location.state.choice);
  const [wallets, setWallets] = useState([]);

  useEffect(()=>{
    fetchKeys();
  }, [])

  async function fetchKeys(){
    if (choice == "create") {
          const response = await fetch("http://localhost:3000/api", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mnemonic: location.state.mnemonic,
              choice: choice,
              count: count,
            }),
          });
  
          const data = await response.json();
          if (wallets.length == 0) {
            const arr = [];
            arr.push(data);
            setWallets(arr);
          } else {
            setWallets([...wallets, data]);
          }
          setCount(data.i);
      } 
      else 
      {
        const response = await fetch("http://localhost:3000/api", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mnemonic: location.state.mnemonic,
              choice: choice,
              count: count,
            }),
          });
          const data = await response.json();
          if (wallets.length == 0) {
            setWallets([...data]);
          } else {
            setWallets([...wallets, ...data]);
          }
          setCount(data[data.length -1].j + 1 );
          setChoice("create");
      }
  }

  return (
    <div className="min-h-screen min-w-screen bg-gray-900 flex flex-col items-center gap-3">
      <button className="bg-orange-500 w-44 mt-8 rounded-xl px-2 py-3.5 font-mono font-bold text-xl flex flex-row justify-center items-center transition ease-in-out delay-150 hover:cursor-pointer duration-300 hover:text-white "
      onClick={fetchKeys}>
        Add Wallet
      </button>
      {wallets.length !== 0 ? (
        <div className="flex flex-col gap-3 ">
          {wallets.map((wallet, index) => (
            <Wallet key={index} wallet={wallet}/>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default WalletPage;
