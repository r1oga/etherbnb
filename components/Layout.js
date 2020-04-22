import Header from './Header'

export default props => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  )
}
