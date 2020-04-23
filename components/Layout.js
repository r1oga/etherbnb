import Header from './Header'
import Footer from './Footer'

export default props => {
  return (
    <>
      <Header />
      <main style={{ marginTop: '2%', marginBottom: '2%' }}>{props.children}</main>
      <Footer mt={3} />
    </>
  )
}
