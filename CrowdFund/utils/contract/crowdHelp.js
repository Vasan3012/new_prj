import web3 from "../web3";
import CrowdHelp from "../../artifacts/contracts/CrowdHelp.sol/CrowdHelp.json";

const crowdHelpContractAddress = "0xc347579AD4ACd69522D5F0dDB311cA8AE33EC801";
const crowdHelp = new web3.eth.Contract(
  CrowdHelp.abi,
  crowdHelpContractAddress
);

export default crowdHelp;
