from rest_framework.views import exception_handler
from rest_framework.response import Response


def dgrocery_exception_handler(exc, context):
    """
    Custom exception handler for the Dgrocery app.
    """
    response = exception_handler(exc, context)

    if response is None:
        response = Response({
            'error': {
                'message': 'An unexpected error occurred.',
                'details': str(exc),
            }
        }, status=500)  

    if response.status_code == 404:
        response.data = {
            'error': {
                'message': 'The requested resource was not found.',
            }
        }
    elif response.status_code == 400:
        response.data = {
            'error': {
                'message': 'Bad request.',
                'details': response.data,
            }
        }

    return response
