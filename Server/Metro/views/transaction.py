from flask import Flask, jsonify, request, Blueprint, session
import requests


bp = Blueprint("transaction", __name__, url_prefix="/transaction")


@bp.route("/")
def transaction():
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer vqb8lnr1ZI4J8c1X3SlhZiGY5AYP",
    }

    payload = {
        "Initiator": "testapi",
        "SecurityCredential": "XoE1pzHYijWpLK+EyPayqjnT5crK9faL5yv7YZmbg2RissqvOV+01TTvkFUDBgklZILJ7dz8SrsZf0QnWdhusG59Du06oKKVTBy7gdxGh0+yU2DuoFbYYi4c3WA/K1mqjDnn55jrsnqwvTIQyN98daymPN13dn9vAuazKWbMbQ+R+i6WHL+5V0D+CBTLHkUfDZSSH1ACvotxdUlpfH76T27+N+1K9/t2B5I+3GnCxrGQtYeP+MPxSCtJQ0hZYTRPKyzqpjRldK9fg6Zko+lWmjcb/s/5JDQyhf5vf78YXRcmnawJg/liHgwVFp7O5mh86R9y1ssha8hohZIsk+r3cQ==",
        "CommandID": "BusinessBuyGoods",
        "SenderIdentifierType": 4,
        "RecieverIdentifierType": 4,
        "Amount": 1,
        "PartyA": 600998,
        "PartyB": 000000,
        "AccountReference": 353353,
        "Requester": 254700000000,
        "Remarks": "ok",
        "QueueTimeOutURL": "https://cce2-102-219-208-66.ngrok-free.app/transaction/",
        "ResultURL": "https://cce2-102-219-208-66.ngrok-free.app/transaction/",
    }

    response = requests.request(
        "POST",
        "https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest",
        headers=headers,
        data=payload,
    )

    print(response.text.encode("utf8"))
    return (
        jsonify(
            {
                "status": "success",
                "message": "Transaction successful",
                "response": response.text,
            }
        ),
        200,
    )
