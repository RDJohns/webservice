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
cursor = connexion.cursor()
Data = pd.read_sql('select * from dim.activite', con=connexion)
connexion.close()
Data.to_html(r'C:\Users\an.ranaivoson\Desktop\Test_html\html\activites.html')
print('OK')