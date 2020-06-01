const { use, expect, assert } = require('chai')
const { solidity, MockProvider, getWallets, deployContract } = require('ethereum-waffle')
const ethers = require('ethers')
const Etherbnb = require('../build/Etherbnb.json')
const Flat = require('../build/Flat.json')
const flats = require('../../front-end/pages/flats.json')
const crypto = require('crypto')
const IPFS = require('ipfs')
const all = require('it-all')

const hash = crypto.createHash('sha256')
const flat = JSON.stringify(flats[0])

use(solidity)
const provider = new MockProvider()
const [wallet] = provider.getWallets()
let node
let factory

describe('Test Etherbnb factory contract', () => {
  before(async () => {
    node = await IPFS.create()
    factory = await deployContract(wallet, Etherbnb)
  })

  it('is owned by the address which deployed it', async () => {
    return expect(await factory.owner()).to.equal(wallet.address)
  })

  it('addFlat(): adds flat to mapping', async () => {
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

  it('addFLat(): instantiates a Flat contract with its IPFS CID as id', async () => {
    const asyncIterable = await node.add('test')
    const { value: { path } } = await asyncIterable.next()

    await factory.addFlat(path)
    const address = await factory.getFlatAddress(path)

    const flatContract = new ethers.Contract(address, Flat.abi, provider)

    // state var id is instantiated to CID of flat added to IPFS
    expect(await flatContract.id()).to.equal(path)

    // owner of the Flat contract is the account which called addFlat()
    expect(await flatContract.owner()).to.equal(wallet.address)
  })
})

describe('Test Flat contract', () => {
  after(() => {
    node.stop()
  })

  it('Can generate the hash key of a Stay', async () => {
    // Instantiate Flat Contract using its CID path
    const asyncIterable = await node.add('test2')
    const { value: { path } } = await asyncIterable.next()
    await factory.addFlat(path)
    const address = await factory.getFlatAddress(path)
    const flatContract = new ethers.Contract(address, Flat.abi, provider)
    const now = Date.now()
    const hash = await flatContract.getStayKey(wallet.address, now)
    expect(hash).to.be.string
  })
})
