/* eslint-disable no-param-reassign, operator-assignment */

class ProductList extends React.Component {
  //state to hold the products
  state = {
    products: [],
  };

  componentDidMount() {
    //when component mounts feed the states with seed_file
    this.setState({ products: Seed.products });
  }
//function to handle upvote which is passed down as props to child component
  handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      //not mutating the state
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: nextProducts,
    });
  }

  render() {
    //taking products from the states ,sort them and then render them 
    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
    ));
    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
    return (
      <div className='ui unstackable items'>
      {/* productcomponents have a products array which is rendered */}
        {productComponents}
      </div>
    );
  }
}

class Product extends React.Component {
  handleUpVote = () => (
    this.props.onVote(this.props.id)
  );

  render() {
    // normal html to render according to props
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>
              {this.props.description}
            </p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}
//mounting
ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
