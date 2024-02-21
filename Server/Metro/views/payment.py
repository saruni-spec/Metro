from intasend import APIService

INTASEND_PUBLIC_KEY = "ISPubKey_test_68461029-1e28-4e8a-9ac2-cd54ca0ba108"
INTASEND_PRIVATE_KEY = "ISSecretKey_test_7ea7b47c-cce8-4679-9d63-22beffe9d9d4"

service = APIService(
    publishable_key=INTASEND_PUBLIC_KEY, token=INTASEND_PRIVATE_KEY, test=True
)


def payment(phone_number, email, amount, narrative, service=service):
    response = service.collect.mpesa_stk_push(
        phone_number=phone_number, email=email, amount=amount, narrative=narrative
    )
    return response


def payment_status(invoice_id, service=service):
    response = service.collect.status(invoice_id)
    return response
