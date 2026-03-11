from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    print(response.data)
    if response is not None:
        formatted_errors = ["Validation failed"]

        if isinstance(response.data, dict):
            for field, errors in response.data.items():
                if isinstance(errors, list):
                    for error in errors:
                        formatted_errors.append(f"{field}: {str(error)}")
                else:
                    formatted_errors.append(f"{field}: {str(errors)}")

        response.data = {"success": False, "errors": formatted_errors}

    return response
