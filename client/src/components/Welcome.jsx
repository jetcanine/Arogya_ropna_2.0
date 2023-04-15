import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Web3Storage } from "web3.storage";




import { TransactionContext } from "../context/TransactionContext";
// import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";


const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message, symptom2, symptom3, symptom4, symptom5, symptom6 } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message || !symptom2 || !symptom3 || !symptom4 || !symptom5 || !symptom6) return;

    sendTransaction();
  };
  const form = document.querySelector("#upload-form");
  const filepicker = document.querySelector("#filepicker");
  const tokenInput = document.querySelector("#token");
  const output = document.querySelector("#output");

  console.log("> ⁂ waiting for form submission...");

  const handleUpload =async(e) =>  {
    console.log("Button Clicked");
    // "submit",
    // async function (event) {
      // don't reload the page!
      event.preventDefault();

      // showMessage("> 📦 creating web3.storage client");
      const token = tokenInput.value;
      const client = new Web3Storage({ token });

      // showMessage(
      //   "> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID"
      // );
      const files = filepicker.files;
      const cid = await client.put(files, {
        // onRootCidReady: (localCid) => {
        //   showMessage(`> 🔑 locally calculated Content ID: ${localCid} `);
        //   showMessage("> 📡 sending files to web3.storage ");
        // },
        onStoredChunk: (bytes) =>
          console.log(
            `> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`
          ),
      });
      // showMessage(`> ✅ web3.storage now hosting ${cid}`);
      console.log(`https://dweb.link/ipfs/${cid}`);

      // showMessage("> 📡 fetching the list of all unique uploads on this account");
      let totalBytes = 0;
      for await (const upload of client.list()) {
        // showMessage(`> 📄 ${upload.cid}  ${upload.name}`);
        totalBytes += upload.dagSize || 0;
      }
      // showMessage(`> ⁂ ${totalBytes.toLocaleString()} bytes stored!`);
    false
  };

  function showMessage(text) {
    const node = document.createElement("div");
    node.innerText = text;
    output.appendChild(node);
  }

  function showLink(url) {
    const node = document.createElement("a");
    node.href = url;
    node.innerText = `> 🔗 ${url}`;
    output.appendChild(node);
  }
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          {!currentAccount && (
            <button // Connect wallet To MetaMask Account 
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}


        </div>
        <div className="ml-10 mt-10">
          <div className="p-2 pl-10 pr-10 pt-10 pb-20 sm:w-96 w-fullflex flex-col justify-start items-center blue-glassmorphism ">

            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Patient ID" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Symptom 1" name="message" type="text" handleChange={handleChange} />
            <Input placeholder="Symptom 2" name="symptom2" type="text" handleChange={handleChange} />
            <Input placeholder="Symptom 3" name="symptom3" type="text" handleChange={handleChange} />
            <Input placeholder="Symptom 4" name="symptom4" type="text" handleChange={handleChange} />
            <Input placeholder="Symptom 5" name="symptom5" type="text" handleChange={handleChange} /> 
            <Input placeholder="Description" name="symptom6" type="text" handleChange={handleChange} />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            <form id="upload-form">
              <label for="token">Paste your web3.storage API token here</label>
              <input type="password" id="token" required />
              <label>Pick files to store</label>
              <input
                type="file"
                id="filepicker"
                name="fileList"
                multiple
                required
              />
                <button
                  type="button"
                  onClick={handleUpload}
                >
                  Send now
                </button>
            </form>
            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
