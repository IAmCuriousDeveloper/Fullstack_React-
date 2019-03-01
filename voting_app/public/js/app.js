class ProductList extends React.Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.setState({ products: Seed.products });
  }
  handleProductUPVote = productId => {
    const updatedProducts = this.state.products.map(product => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1
        });
      } else {
        return product;
      }
    });
    this.setState({ products: updatedProducts });
  };
  render() {
    const products = this.state.products.sort((a, b) => {
      return b.votes - a.votes;
    });
    const productComponents = products.map(product => (
      <Product
        key={`product - ${product.id}`}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUPVote}
      />
    ));

    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

class Product extends React.Component {
  handleUpVote = () => this.props.onVote(this.props.id);

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} alt="image of aqua" />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span> submitted by :</span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
              alt="author name"
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
