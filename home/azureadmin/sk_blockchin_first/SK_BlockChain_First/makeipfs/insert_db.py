from random import *
from parse import *
from pymongo import MongoClient
from pymongo.cursor import CursorType
host = "localhost"
port = "27017"
mongo = MongoClient(host,int(port))
print(mongo)
def insert_item_one(mongo, data, db_name=None, collection_name=None):
    result = mongo[db_name][collection_name].insert_one(data).inserted_id
    return result

mydb = mongo["homepage"]
mycol = mydb["tokennfts"]
list = mycol.find()
f = open("hash.txt",'r')
while True:
        line = f.readline()
        if not line: break
        #print(line)
        line = line.replace('\n','')
        result = line.split(" ")
        print("filename : ",result[2],"\n",end='')
        print("hash : ",result[1],"\n",end='')
        flag=0
        #list = mycol.find()
        for x in list:
#               print(x['hash'], "--")
#               print(result[1])
                if x['hash'] == result[1]:
                        flag=1
                        break
#       print("flag ==  ",flag)
        tok = randint(10000,99999)
        tokenid = str(tok)
        if flag==0:
                insert_item_one(mongo, {"tokenId": tokenid, "grade":"AAA", "date":"2020.06.25","org":"SKI","publishedFlag":False,"__v":0,"filename": result[2],"hash" : result[1]}, "homepage", "tokennfts")
f.close()
