class ContentController < ApplicationController
	before_filter :set_theme
	before_filter :retrieve_menus

	def set_theme
		theme = Setting.find_by_key('theme').value
		prepend_view_path "app/themes/#{theme}"
		self.class.layout "../../themes/#{theme}/layout"
	end

	def retrieve_menus
		@menu = Menu.all
	end
end