from django.http import HttpResponse, JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
 
status='ON';
@csrf_exempt
def test(request):
    if request.method == 'GET':
        return JsonResponse({'a':'b'},status=400)
        
@csrf_exempt
def login(request):
    if request.method == 'POST':
        login_data = request.POST.dict()
        pw=login_data.get('passphrase')
        if (pw=='Kunio'):
            return JsonResponse({'token':12345,'success':True},status=200)
        else:
            return JsonResponse({'token':12345,'success':False},status=403)
            
@csrf_exempt
def logout(request):
    if request.method == 'GET':
        return JsonResponse({'success':True,'txt':request.headers['Authorization']},status=200)
        
@csrf_exempt
def factoryReset(request):
    if request.method == 'GET':
        return JsonResponse({'success':True,'txt':request.headers['Authorization']},status=200)
        
@csrf_exempt
def resetError(request):
    if request.method == 'GET':
        return JsonResponse({'success':True,'txt':request.headers['Authorization']},status=200)
        
@csrf_exempt
def pause(request):
    if request.method == 'GET':
        if status=='ON':
            status='OFF'
        else:
            status='ON';
        return JsonResponse({'success':True,'run':status},status=200)
    return JsonResponse({},status=400)
      
@csrf_exempt
def run(request):
    if request.method == 'GET':
        if status=='ON':
            status='OFF'
        else:
            status='ON';
        return JsonResponse({'success':True,'run':status},status=200)
    return JsonResponse({},status=400)
    
@csrf_exempt
def modeAuto(request):
    if request.method == 'GET':
        return JsonResponse({'success':True,'mode':'AUTO'},status=200)
    return JsonResponse({},status=400)
        
@csrf_exempt
def modeTimer(request):
    if request.method == 'GET':
        return JsonResponse({'success':True,'mode':'TIMER'},status=200)
    return JsonResponse({},status=400)
    
@csrf_exempt
def passphrase(request):
    if request.method == 'GET':
        return JsonResponse({'success':True,'passphrase':'Kunio'},status=200)
    elif request.method == 'POST':
        return JsonResponse({'success':True,'passphrase':'Kunio1'},status=200)
    return JsonResponse({},status=400)

@csrf_exempt
def sensor(request):
    if request.method == 'GET':
        return JsonResponse({'success':True,'sensors':[{'name':'High level','id':1},{'name':'Low level','id':2},{'name':'Temperature','id':3}]},status=200)
    return JsonResponse({},status=400)
    
@csrf_exempt
def wifiScan(request):
    if request.method == 'GET':
        return JsonResponse({'success':True,'ssids':['TPLink','ToToLink']},status=200)
    return JsonResponse({},status=400)
    
@csrf_exempt
def wifiConnect(request):
    if request.method == 'POST':
        return JsonResponse({'success':True},status=200)
    return JsonResponse({},status=400)
    
@csrf_exempt
def config(request):
    if request.method == 'POST':
        return JsonResponse({'success':True,'ON':100,'OFF':100},status=200)
    elif request.method == 'GET':
        return JsonResponse({'success':True,'ON':100,'OFF':100,'mode':'AUTO','run':'ON',
            'counter': {'duration': 1200,'last_exec': 1626517088.696891,'remain': 1097.568349,'state': 'OFF'},
            "sensors": [
            {
            "id": 13,
            "name": "High level",
            "unit": "",
            "value": "ON"
            },
            {
            "id": 11,
            "name": "Low level",
            "unit": "",
            "value": "ON"
            },
            {
            "id": 22,
            "name": "Temperature",
            "unit": "degree Celsius",
            "value": 392.0
            }
            ],
            },status=200)
    return JsonResponse({},status=400)
    
@csrf_exempt
def getEvents(request):
    if request.method == 'GET':
        return JsonResponse({'success':true,'events': [
        {
            "description": "Water temperature is in unsuitable condition [20-27oC/68-80.6oF]",
            "id": 20,
            "level": "Warning",
            "title": "Water temperature out of range"
        }]},status=200)
    return JsonResponse({},status=400)
    
@csrf_exempt
def getData(request):
    if request.method == 'GET':
        return JsonResponse({'success':true,'data': {
        '11': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0.52,0.5,0.47],
        "13": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0.5,0.5,0.49]
    },
    "names": {
        "11": "Low level",
        "13": "High level"
    },
    "stamps": [
        "16/07/2020, 17:20:06",
        "31/07/2020, 23:20:06",
        "16/08/2020, 05:20:06",
        "31/08/2020, 11:20:06",
        "15/09/2020, 17:20:06",
        "30/09/2020, 23:20:06",
        "16/10/2020, 05:20:06",
        "31/10/2020, 11:20:06",
        "15/11/2020, 17:20:06",
        "30/11/2020, 23:20:06",
        "16/12/2020, 05:20:06",
        "31/12/2020, 11:20:06",
        "15/01/2021, 17:20:06",
        "30/01/2021, 23:20:06",
        "15/02/2021, 05:20:06",
        "02/03/2021, 11:20:06",
        "17/03/2021, 17:20:06",
        "01/04/2021, 23:20:06",
        "17/04/2021, 05:20:06",
        "02/05/2021, 11:20:06",
        "17/05/2021, 17:20:06",
        "01/06/2021, 23:20:06",
        "17/06/2021, 05:20:06",
        "02/07/2021, 11:20:06"
    ],
    "success": true},status=200)
    return JsonResponse({},status=400)