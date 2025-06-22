from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# === AGENT 1: Validator ===
def agent_validate(data):
    if not data.get('name') or not data.get('email') or not data.get('issue') or not data.get('age') or not data.get('order'):
        return False, "All fields are required."
    return True, "Validated"

# === AGENT 2: Classifier ===
def agent_classify(issue_text):
    # Define department categories and their associated keywords
    department_keywords = {
        "Delivery Department": [
            "delivery", "shipment", "shipping", "package", "tracking",
            "courier", "dispatch", "arrival", "late delivery", "undelivered",
            "lost package", "missing item", "postage", "logistics", "freight"
        ],
        "Billing Department": [
            "payment", "invoice", "charge", "billing", "refund",
            "price", "cost", "fee", "overcharge", "transaction",
            "credit card", "debit", "payment method", "receipt", "subscription"
        ],
        "Technical Support": [
            "technical", "bug", "error", "crash", "login",
            "password", "account", "software", "hardware", "install",
            "update", "performance", "connection", "server", "website"
        ],
        "Customer Service": [
            "return", "exchange", "complaint", "feedback", "service",
            "quality", "defective", "damaged", "warranty", "replace",
            "cancel", "order status", "help", "assistance", "question"
        ]
    }
    
    # Convert issue text to lowercase for case-insensitive matching
    issue_text_lower = issue_text.lower()
    
    # Count matches for each department
    department_scores = {}
    for department, keywords in department_keywords.items():
        department_scores[department] = sum(
            keyword in issue_text_lower for keyword in keywords
        )
    
    # Get department with highest score
    best_match = max(department_scores.items(), key=lambda x: x[1])
    
    # Only return the department if it has at least one match, otherwise General Support
    return best_match[0] if best_match[1] > 0 else "General Support"

# === AGENT 3: Notifier ===
def agent_notify(name, department):
    print(f"[Notification Agent] Hello {name}, your issue has been forwarded to {department}.")
    return f"Hi {name}, your ticket has been sent to the {department}."

# === MCP ENDPOINT ===
@app.route('/submit', methods=['POST'])
def submit_ticket():
    data = request.get_json()

    # Agent 1: Validation
    valid, msg = agent_validate(data)
    if not valid:
        return jsonify({"message": msg}), 400

    # Agent 2: Classification
    department = agent_classify(data['issue'])

    # Agent 3: Notification
    user_msg = agent_notify(data['name'], department)

    return jsonify({"message": user_msg}), 200

if __name__ == '__main__':
    app.run(debug=True)
