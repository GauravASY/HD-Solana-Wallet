import React from 'react'

function Wallet(props) {
  console.log(props);

  return (
    <div className="bg-gray-700  p-3 w-full rounded-lg text-white flex items-center">
      <img src="https://www.reshot.com/preview-assets/icons/N2G3SWJ9X7/wallet-N2G3SWJ9X7.svg" 
      alt="Wallet icon" 
      className='h-14 w-14 object-cover mr-4'/>
      <div className='flex flex-col  gap-1 text-white'>
        <div className='w-full'>
            Public Key : {props.wallet.pKey};
        </div>
        <div className='blur-sm w-full overflow-hidden hover:blur-none'>
            Secret key : {props.wallet.sKey};
        </div>
      </div>
    </div>
  )
}

export default Wallet