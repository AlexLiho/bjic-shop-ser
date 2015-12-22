module ApplicationHelper
	def url_for_page page
		root_path + if page.slug.present?
			page.slug
		else
			"pages/#{page.id}"
		end
	end

	def url_for_menu_item menu_item
		if menu_item.url.match /:\/\// #Http://, ftp://, ect..
			menu_item.url
		else
			root_path + menu_item.url
		end
	end
end
