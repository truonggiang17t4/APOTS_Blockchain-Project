→ Setup: 
    NodeJS, NVM, Visual Studio Code, Ganache, Infura, MongoDB 

→ Install dependencies:
    npm install

- The browser must first have the Metamask and MetaMask Legacy Web3 extensions installed.
- After installing Metamask, create an account on the Rinkeby Test Network.
- Get ETH to test at the link https://faucets.chain.link/rinkeby or follow the instructions at https://faucet.rinkeby.io/ to get free ETH.
- Create a smart contract in Solidity language in Remix- Ethereum IDE (https://remix.ethereum.org/) by copying the content of the Product_storage.sol file in the contracts folder of the source code and pasting it on the file to be created in Remix
- On the Remix-Ethereum IDE, click Compile, then Deploy to create a Smart Contract. 
- After successful creation, copy the newly created contract address and paste it into the "//Địa chỉ SmartContract" section on the 114th line of the process.js file in the public directory of the source code.
- Then go back to the Compile section on Remix and copy the ABI and paste it into the "//Kết nối SmartContract" section on the 4th line in the process.js file in the public folder of the source code.

→ Run the server:
    npm start 
    or node server 
→ Point a web browser at the demo:
    http://localhost:3000