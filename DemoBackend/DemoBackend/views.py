from django.http import HttpResponse, JsonResponse
def hello(request):
    return JsonResponse({'foo': 'bar'},status=200)