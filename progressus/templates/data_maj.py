#!/usr/bin/env python
# coding: utf-8

# In[43]:


import sys
import os
import pandas as pd
import psycopg2
connexion = psycopg2.connect(database="SystemeExterne",
                              user="adminse",
                              host="10.216.15.118",
                              port=5432,
                              password="se2021*"
                              )

cursor = connexion.cursor()
request = '''
select 
     matricule,
     nom,
     prenom,
     date_connexion,
     heure_connexion,
     heure_deconnexion from dim.agent
inner join fact.systeme_externe 
on dim.agent.log_= fact.systeme_externe.log_;
'''
Data = pd.read_sql(request, con=connexion)
connexion.close()

#Data.to_html(r'C:\wamp64\www\progressus\System.html', index = None)
Data.to_html(r'System.html', index = None)


print('Tratement')
Data2 = pd.DataFrame(Data.groupby(["matricule", 'nom']).apply(sum))
Data2.columns = ['state']
#Data2.to_html(r'C:\wamp64\www\progressus\Group.html')
Data2.to_html(r'Group.html')

