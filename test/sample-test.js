const { expect } = require("chai");
const { ethers } = require("hardhat");

let ZombieFeeding;
let zombieFeeding;
const zombieName = "Param";
const dnaDigitSize = 16;
let arr;
let kittyContractAddress;

beforeEach(async () => {
  const CryptoKitties = await ethers.getContractFactory("CryptoKitties");
  const cryptoKitties = await CryptoKitties.deploy();
  await cryptoKitties.deployed();
  kittyContractAddress = cryptoKitties.address;

  ZombieFeeding = await ethers.getContractFactory("ZombieFeeding");
  zombieFeeding = await ZombieFeeding.deploy();
  await zombieFeeding.deployed();
  await zombieFeeding.createRandomZombie(zombieName);
  arr = await zombieFeeding.zombies(0);
});

describe("ZombieFactory - Create new zombie", function () {
  it("Should create the new Zombie with correct name", async function () {
    expect(arr[0]).to.equal(zombieName);
  });

  it("Should create the new Zombie with correct number of dna digits", async function () {
    expect(arr[1].toString()).to.have.lengthOf(dnaDigitSize);
  });

  it("Should assign new zombie to current user", async () => {
    const [owner] = await ethers.getSigners();
    const zombieOwner = await zombieFeeding.zombieToOwner(0);
    expect(owner.address.toString()).to.equal(zombieOwner);
  });
});

describe("ZombieFeeding - Creates new zombie", () => {
  beforeEach(async () => {
    await zombieFeeding.setKittyContractAddress(kittyContractAddress);
  });

  it("Should create a new Zombie after feeding it kitty", async () => {
    const [owner] = await ethers.getSigners();
    let count = await zombieFeeding.ownerZombieCount(owner.address);
    await zombieFeeding.feedOnKitty(count - 1, 0);
    count = await zombieFeeding.ownerZombieCount(owner.address);
  });
});
