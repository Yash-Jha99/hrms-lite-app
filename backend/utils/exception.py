from rest_framework.views import exception_handler


def format_errors(data):
    formatted_errors = []

    if isinstance(data, dict):
        for field, errors in data.items():
            if isinstance(errors, list):
                for error in errors:
                    formatted_errors.append(f"{field}: {str(error)}")
            else:
                formatted_errors.append(f"{field}: {str(errors)}")

    return formatted_errors


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        formatted_errors = []

        if isinstance(response.data, list):
            for item in response.data:
                formatted_errors.extend(format_errors(item))
        else:
            formatted_errors.extend(format_errors(response.data))

        response.data = {"success": False, "errors": formatted_errors}

    return response
