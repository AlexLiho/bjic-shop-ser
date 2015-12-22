module PagesHelper
	def print_multiline(field)
  		field.gsub("\r\n","\n").html_safe
	end
end
