#!/bin/sh
cd /home/azureadmin/sk_blockchin_first/SK_BlockChain_First/makeipfs
ipfs add ../uploads/* > hash.txt
sleep 1

python insert_db.py
