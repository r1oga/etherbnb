const { use, expect } = require('chai')
const { solidity, MockProvider, getWallets, deployContract } = require('ethereum-waffle')
const Test = require('../build/Test.json')

use(solidity)

describe('Test smart contract', () => {
  const provider = new MockProvider()
  const [wallet] = provider.getWallets()

  const deploy = async () => deployContract(wallet, Test)

  it('has a integer storage value of 2', async () => {
    const test = await deploy()
    expect(await test.integer()).to.equal(2)
  })
})
