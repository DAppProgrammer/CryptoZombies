const { expect } = require("chai");
const { ethers } = require("hardhat");

let ZombieFactory;
let zombieFactory;
const zombieName = "Param";

beforeEach(async () => {
  ZombieFactory = await ethers.getContractFactory("ZombieFactory");
  zombieFactory = await ZombieFactory.deploy();
  await zombieFactory.deployed();
  await zombieFactory.createRandomZombie(zombieName);
});

describe("ZombieFactory", function () {
  let arr;

  beforeEach(async () => {
    await zombieFactory.createRandomZombie(zombieName);
    arr = await zombieFactory.zombies(0);
  });

  it("Should create the new Zombie with correct name", async function () {
    expect(arr[0]).to.equal(zombieName);
  });

  it("Should create the new Zombie with correct size of dna", async function () {
    expect(arr[1].toString()).to.have.lengthOf(16);
  });
});
