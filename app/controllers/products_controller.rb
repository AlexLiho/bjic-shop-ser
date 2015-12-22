class ProductsController < ContentController
  def show
    @product = Product.find(params[:id])
#    respond_with @product
  end
end
