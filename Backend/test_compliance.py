import requests
import json
import os

BASE_URL = "http://127.0.0.1:8000/api"

def run_tests():
    # Helper to get tokens
    def get_token(email, password, role="Customer"):
        # Try register
        requests.post(f"{BASE_URL}/accounts/register/", json={
            "email": email, "password": password, "role": role
        })
        # Login
        r = requests.post(f"{BASE_URL}/accounts/login/", json={
            "email": email, "password": password
        })
        return r.json().get('access') if r.status_code == 200 else None

    print("--- 1. Setup Users & Roles ---")
    admin_token = get_token("admin_test@example.com", "pass123", "Admin")
    auth_token = get_token("auth_test@example.com", "pass123", "Authority")
    cust_token = get_token("cust_test@example.com", "pass123", "Customer")
    
    admin_headers = {"Authorization": f"Bearer {admin_token}"}
    auth_headers = {"Authorization": f"Bearer {auth_token}"}
    cust_headers = {"Authorization": f"Bearer {cust_token}"}
    
    print("\n--- 2. Setup Product ---")
    r = requests.post(f"{BASE_URL}/products/", json={
        "name": "Compliance Product", "description": "Test product description", "category": "Test", "price": "10.00", "stock": 5
    }, headers=admin_headers)
    product_id = r.json().get('id')
    print(f"Product Created Output: {r.status_code} | {r.text}")
    
    if not product_id:
        print("Failed to create product, aborting.")
        return

    print("\n--- 3. Test File Upload (Customer) ---")
    # Create a dummy file
    with open("dummy.pdf", "w", encoding='utf-8') as f:
        f.write("This is a dummy PDF for compliance testing.")
        
    with open("dummy.pdf", "rb") as f:
        r = requests.post(
            f"{BASE_URL}/compliance/upload/", 
            data={'product': str(product_id)},
            files={'document_file': f},
            headers=cust_headers
        )
        
    print(f"Upload Status: {r.status_code}")
    if r.status_code != 201:
        print(f"Error Details: {r.text}")
    
    comp_id = r.json().get('id') if r.status_code == 201 else None
    
    # Cleanup dummy file
    try:
        os.remove("dummy.pdf")
    except:
        pass
    
    if not comp_id:
        print("Upload Failed.")
        return

    print("\n--- 4. Test Customer Access Pending (Expect 403) ---")
    r = requests.get(f"{BASE_URL}/compliance/pending/", headers=cust_headers)
    print(f"Status: {r.status_code} | Should be 403")

    print("\n--- 5. Test Authority Access Pending (Expect 200) ---")
    r = requests.get(f"{BASE_URL}/compliance/pending/", headers=auth_headers)
    print(f"Status: {r.status_code} | Found entries: {len(r.json().get('results', []))}")

    print("\n--- 6. Test Authority Approving Document (Expect 200) ---")
    r = requests.put(f"{BASE_URL}/compliance/{comp_id}/approve/", 
                     json={"approval_status": "Approved"}, 
                     headers=auth_headers)
    print(f"Approve Status: {r.status_code} | Res: {r.text[:150]}")

    print("\n--- 7. Test Authority Deleting Document (Expect 403) ---")
    r = requests.delete(f"{BASE_URL}/compliance/{comp_id}/", headers=auth_headers)
    print(f"Status: {r.status_code} | Should be 403")

    print("\n--- 8. Test Admin Deleting Document (Expect 204) ---")
    r = requests.delete(f"{BASE_URL}/compliance/{comp_id}/", headers=admin_headers)
    print(f"Delete Status: {r.status_code}")

if __name__ == "__main__":
    run_tests()
