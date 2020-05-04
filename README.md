# Rbnb
Replica of Airbnb on web3.
# [Check Live](https://etherbnb.herokuapp.com) (work in progress development version)
## To dos
- [x] web2 version
- [x] Local Postgres backend
- [x] Deploy online
- [ ] Store static assets (flat picture on) outside heroku dyno (e.g AWS S3)
- [x] Server Side Rendered front end with nextjs
- [x] Authentication with username and password (passport.js)
- [x] Session stored in cookie
- [ ] web 2 -> web3
- [ ] write Ethereum smart contracts
- [ ] modify models: e.g user to include public address
- [ ] modify authentication: with metamask?
- [ ] modify backend/data persistence: IPFS ?

## Getting started
1. Download/clone repository
2. Create `.env` in project root folder and define `SESSION_SECRET` and `BASE_URL` envrionment variables
3. Deploy locally: `yarn dev`
4. Access application on [localhost:3000](http://localhost:3000/)


## Built with
- [Next](https://nextjs.org/)
- [Rimble UI](https://rimble.consensys.design/)
- [Express](https://expressjs.com/)

## Credit
[Flavio Copes](https://flaviocopes.com/) [Next.js course](https://nextjscourse.com/)
