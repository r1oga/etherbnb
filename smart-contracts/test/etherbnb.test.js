const { use, expect } = require('chai')
const { solidity, MockProvider, getWallets, deployContract } = require('ethereum-waffle')
const { utils } = require('ethers')
const Test = require('../build/Etherbnb.json')
const flats = require('../../front-end/pages/flats.json')
const crypto = require('crypto')

const hash = crypto.createHash('sha256')
const flatString = JSON.stringify(flats[0])

use(solidity)

describe('Test Etherbnb factory contract', () => {
  const provider = new MockProvider()
  const [wallet] = provider.getWallets()

  const deploy = async () => deployContract(wallet, Test)

  it('is owned by the address which deployed it', async () => {
    const test = await deploy()
    expect(await test.owner()).to.equal(wallet.address)
  })

  it('can add a flat to the flat mapping', async () => {
    const test = await deploy()
    hash.update(flatString)
    const flatHash = hash.digest('hex')
    await test.addFlat(flatHash)
    const flatOwner = await test.getOwner(flatHash)
    expect(flatOwner).to.equal(wallet.address)
  })
})
