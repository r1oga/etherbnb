const { use, expect, assert } = require('chai')
const { solidity, MockProvider, getWallets, deployContract } = require('ethereum-waffle')
const { utils } = require('ethers')
const Etherbnb = require('../build/Etherbnb.json')
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

  let factory
  beforeEach(async () => {
    factory = await deployContract(wallet, Etherbnb)
  })

  it('is owned by the address which deployed it', async () => {
    return expect(await factory.owner()).to.equal(wallet.address)
  })

  it('can add a flat to the flat mapping', async () => {
    const node = await IPFS.create()
    const asyncIterable = await node.add(flat)
    const { value: { path } } = await asyncIterable.next()
    expect(path).to.exist
    assert.isString(path)

    const tx = await factory.addFlat(path)
    const receipt = await tx.wait(1)
    const { args: { hash, flat: flatAddress } } = receipt.events.pop()

    expect(hash).to.equal(path)
    expect(await factory.getFlatAddress(path)).to.equal(flatAddress)
  })
})
