Rails.application.routes.draw do
  devise_for :users
  #root to: redirect(Setting.find_by_key('theme').value)
  root to: redirect('/general')
  mount Ckeditor::Engine => '/ckeditor'
 # binding pry

  resources :categories, only: [:show]
  resources :pages, only: [:show]
  resources :products, only: [:show]

  namespace :admin do
    resources :types, except: [:show]
    resources :menus, except: [:show]
    resources :pages # /admin/pages
    resources :categories
    resources :products
    get 'settings', to: 'settings#index'
    put 'settings', to: 'settings#update'
  end

  # Page.where.not("slug", nil).all.each do |page|
  #   get "/#{page.slug}", controller: "pages", action: "show", id: page.id
  # end
  # binding pry
  Page.where("slug <> ''").all.each do |page|
     get "/#{page.slug}", controller: "pages", action: "show", id: page.id
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  #root to: redirect(Setting.where(key: "homepage").first.value)

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end