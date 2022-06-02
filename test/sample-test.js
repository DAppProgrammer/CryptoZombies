const { expect } = require("chai");
const { ethers } = require("hardhat");

let ZombieFactory;
let zombieFactory;
const zombieName = "Param";
const dnaDigitSize = 16;

beforeEach(async () => {
  ZombieFactory = await ethers.getContractFactory("ZombieFactory");
  zombieFactory = await ZombieFactory.deploy();
  await zombieFactory.deployed();
  await zombieFactory.createRandomZombie(zombieName);
});

describe("ZombieFactory - Create new zombie", function () {
  let arr;

  beforeEach(async () => {
    await zombieFactory.createRandomZombie(zombieName);
    arr = await zombieFactory.zombies(0);
  });

  it("Should create the new Zombie with correct name", async function () {
    expect(arr[0]).to.equal(zombieName);
  });

  it("Should create the new Zombie with correct number of dna digits", async function () {
    expect(arr[1].toString()).to.have.lengthOf(dnaDigitSize);
  });
});
