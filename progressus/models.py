from django.db import models

# Create your models here.

from django.shortcuts import render, HttpResponse
from django.db import connections
import pandas as pd
# Create your views here.

cursor1= connections['default'].cursor()
#cursor2 = connections['secondary'].cursor()
class Personnel(models.Model):
    def getData(where):
        #if request.method == 'GET':
        query = """ select 
                        matricule,
                        nom,
                        prenom,
                        date_connexion,
                        heure_connexion,
                        heure_deconnexion from dim.agent
                    inner join fact.systeme_externe 
                    on dim.agent.log_= fact.systeme_externe.log_ WHERE 1=1 {}; """.format(where)
        #with cursor1 as cursor:
        #print(query)
        cursor1.execute(query)
        result = cursor1.fetchall()
        if len(result) !=0 :
            #df2 = pd.DataFrame(result)
            #df2 = df2.transpose()
            columns = cursor1.description
            #cursor1.close()
            column = ['Matricule','Nom','Prenoms','Date_Con','Connexion','Deconnexion']
            df = pd.DataFrame(result,columns=column)
            #result_df = HttpResponse(df.to_html(index = None))
            result_df = (df.to_html(index = None))
            #result_df = (df.to_json())
            #print(result_df)
            Data2 = df.groupby(["Matricule", 'Nom']).apply(sum)
            Data2 = pd.DataFrame(Data2)
            #Data2.columns = ['state']
            result_df_autre = (Data2.to_html(table_id="personnel_groupe"))
            Data2_mat = df['Matricule']
            df.to_string(index=False)
        else :
            result_df = ""
            result_df_autre = ""
            df=""
            df2 = ""
        #print(Data2_mat)
        #Data2.to_html(r'Group.html')
        return result_df,result_df_autre,df
    
    
 
