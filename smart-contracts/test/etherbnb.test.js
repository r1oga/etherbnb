const { use, expect, assert } = require('chai')
const { solidity, MockProvider, getWallets, deployContract } = require('ethereum-waffle')
const { utils } = require('ethers')
const Test = require('../build/Etherbnb.json')
const flats = require('../../front-end/pages/flats.json')
const crypto = require('crypto')
const IPFS = require('ipfs')
const all = require('it-all')

const hash = crypto.createHash('sha256')
const flat = JSON.stringify(flats[0])

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
    const node = await IPFS.create()
    const asyncIterable = await node.add(flat)
    const { value: { path } } = await asyncIterable.next()
    expect(path).to.exist
    assert.isString(path)

    const test = await deploy()
    await test.addFlat(path)
    const flatOwner = await test.getOwner(path)
    expect(flatOwner).to.equal(wallet.address)
    node.stop()
  })
})
