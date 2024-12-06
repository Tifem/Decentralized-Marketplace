import { ethers } from "ethers";
import abi from "./abi.json";

const contractAddress = "0xFA7202FE4096ABFb517f23ff894d0D303AA16267";
const contractABI = abi;

export default async function main() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const getContract = () => {
    return new ethers.Contract(contractAddress, contractABI, signer);
  };

  const addProduct = async (name, description, price, imageUrl) => {
    const contract = getContract();
    const product_price = ethers.parseEther(price);
    console.log(product_price);
    const tx = await contract.listProduct(
      name,
      product_price,
      description,
      imageUrl
    );
    await tx.wait();
    console.log("Product listed");
  };

  const listProducts = async () => {
    const contract = getContract();
    const count = await contract.productCounter();
    const products = [];
    for (let i = 1; i <= count; i++) {
      const product = await contract.getProduct(i);
      products.push(product);
    }
    return products;
  };

  const buyProduct = async (id, price) => {
    const contract = getContract();
    const value = ethers.parseEther(price);
    const tx = await contract.buyProduct(id, { value });
    await tx.wait();
    console.log("Product bought");
  };

  const getTransactions = async () => {
    const contract = getContract();
    const txHistory = await contract.getAllTransactions();
    return txHistory;
  };
  return {getTransactions, buyProduct, listProducts, addProduct}
}
