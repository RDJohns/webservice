from django.shortcuts import get_object_or_404,render
from django.template import loader
from django.conf import settings
from django.views.decorators.csrf import csrf_protect,csrf_exempt
import json
from django.http import JsonResponse


# Create your views here.
from django.http import HttpResponse
#from .models import Question
from .models import Personnel

#def index(request):
#    return HttpResponse("Hello, world. You're at the polls index.")
def index(request):
    data,autre,tous = Personnel.getData("")
    #print(data)
    #print(str(settings.ROOT_URLCONF)+'/progressus/')
    # <!--{% autoescape off %}{{ data }}{% endautoescape %} -->
    #latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'data': data,"autre":autre,'tous':tous.itertuples(index=False),}
    return render(request, 'views/index-2.html',context)

def getPers(request):
    liste,autre,tous = Personnel.getData("")
    data = {'liste': liste}
    return render(request, 'views/personnel.html',data)

def getPersGroup(request):
    liste,autre,tous = Personnel.getData("")
    data = {'liste': autre}
    return render(request, 'views/personnel2.html',data) 
#@csrf_protect
def recherche(request):
    matricule = request.GET.get('matricule')
    date = request.GET.get('date')
    #date = request.POST['date']
    where = ""
    if (matricule):
        matricule = json.loads(matricule)
        matricule = "','".join(matricule)
        if len(matricule)>0:
            where += " AND matricule in ('"+matricule+"')"
    if (date):
        where += " AND date_connexion::date = '"+date+"'"
    print(where)
    liste,autre,tous = Personnel.getData(where)
    data = []
    if len(tous)>0:
        d = tous.to_json(orient="records")
        data = json.loads(d)
    json_object = {
        "draw"            : 1,
        #"recordsTotal"    : 1, 
        #"recordsFiltered" : 1, {% autoescape off %}{{ autre }}{% endautoescape %}
        #{% autoescape off %}{{ liste }}{% endautoescape %}
        'data': data,
        'autre':autre,
        }
    return JsonResponse(json_object)