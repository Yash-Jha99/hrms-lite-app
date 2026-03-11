from rest_framework.pagination import PageNumberPagination


class PageNumberPagination(PageNumberPagination):
    page_size = 10  # Default items
    page_size_query_param = "page_size"  # Client-defined size
    max_page_size = 100  # Max size
    page_query_param = "page"  # Param name
