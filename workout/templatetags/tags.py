from markdownx.utils import markdownify
from django import template
from django.utils.safestring import mark_safe
import re

register = template.Library()

@register.filter()
def markdown(value): 
    markdown = markdownify(value)
    markdown = re.sub(r'<h(\d)', r'<h\1 class="flow-text" ', markdown)
    
    return mark_safe(markdown)

@register.filter()
def ul_to_collection(value): 
    value = value.replace('<a', '<a target="_blank" ')
    value = value.replace('<ul', '<ul class="collection" ')
    value = value.replace('<li', '<li class="collection-item" ')
    return mark_safe(value)

@register.simple_tag(takes_context = True)
def cookie(context, cookie_name):
    request = context['request']
    result = request.COOKIES.get(cookie_name,'')

    return result

@register.filter
def parseInt(value):
    return int(value)

@register.filter
def addstr(value, arg):
    return str(value) + str(arg)