from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user, login_required
from flask_session import Session
import hashlib
import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@endpoint:port/dbname'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:maintech123@maintech.cisfmvvxx4l7.us-east-1.rds.amazonaws.com:5432/main_tech_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class Flower(db.Model):
    fid = db.Column(db.String(10), primary_key=True)
    name = db.Column(db.String(50))
    color = db.Column(db.String(20))
    price = db.Column(db.Float)
    description = db.Column(db.String(255))
    shelf_life = db.Column(db.String(20))
    availability = db.Column(db.String(3))
    min_order_quantity = db.Column(db.Integer)
    stock = db.Column(db.Integer)

class Customer(db.Model):
    cid = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))

class Purchase(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    cid = db.Column(db.Integer, db.ForeignKey('customer.cid'))
    fid = db.Column(db.String(10), db.ForeignKey('flower.fid'))
    purchase_date = db.Column(db.Date)
    purchase_quantity = db.Column(db.Integer)
    total_price = db.Column(db.Float)
    customer = db.relationship('Customer', backref='purchases')
    flower = db.relationship('Flower', backref='purchases')

class Employee(db.Model):
    eid = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    hire_date = db.Column(db.Date)
    job_title = db.Column(db.String(50))
    salary = db.Column(db.Float)
    password = db.Column(db.String(50))

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(50))
    email = db.Column(db.String(100))
    message = db.Column(db.String(255))
    created_at = db.Column(db.Date)

@app.route('/api/flowers', methods=['GET'])
def get_flowers():
    flowers = Flower.query.all()
    response = []
    for flower in flowers:
        response.append({
            'fid': flower.fid,
            'name': flower.name,
            'color': flower.color,
            'price': flower.price,
            'description': flower.description,
            'shelf_life': flower.shelf_life,
            'availability': flower.availability,
            'min_order_quantity': flower.min_order_quantity,
            'stock': flower.stock
        })
    return jsonify(response)

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    # Check if all required fields are present
    if not all(key in data for key in ('first_name', 'last_name', 'email', 'phone', 'address', 'username', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400
    # Check if username already exists
    if Customer.query.filter_by(username=data['username']).first() is not None:
        return jsonify({'error': 'Username already exists'}), 400
    # Check if password meets requirements (at least 8 characters)
    if len(data['password']) < 8:
        return jsonify({'error': 'Password must be at least 8 characters long'}), 400
    # Create a new Customer object with the data from the request
    customer = Customer(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone=data['phone'],
        address=data['address'],
        username=data['username'],
        password=hashlib.sha256(data['password'].encode('utf-8')).hexdigest()  # hash the password
    )
    # Add the new customer to the database and commit the transaction
    db.session.add(customer)
    db.session.commit()
    return jsonify({'message': 'Customer created successfully'}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    # Check if all required fields are present
    if not all(key in data for key in ('username', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400
    # Retrieve the customer object with the entered username
    customer = Customer.query.filter_by(username=data['username']).first()
    # Check if the customer exists and if the entered password matches the hashed password in the database
    if customer and customer.password == hashlib.sha256(data['password'].encode('utf-8')).hexdigest():
        return jsonify({'message': 'Login successful', 'cid': customer.cid}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

def get_customer_id(username):
    customer = Customer.query.filter_by(username=username).first()
    if customer:
        return customer.cid
    else:
        return None

@app.route('/api/purchase', methods=['GET', 'POST'])
def purchase():
    if request.method == 'GET':
        return get_purchase_history()
    elif request.method == 'POST':
        return create_purchase()


def get_purchase_history():
    cid = request.args.get('cid')
    if not cid:
        return jsonify({'error': 'Missing customer ID'}), 400

    purchases = Purchase.query.filter_by(cid=cid).all()

    response = []
    for purchase in purchases:
        response.append({
            'pid': purchase.pid,
            'cid': purchase.cid,
            'fid': purchase.fid,
            'purchase_date': purchase.purchase_date.isoformat(),
            'purchase_quantity': purchase.purchase_quantity,
            'total_price': purchase.total_price
        })

    return jsonify(response)


def create_purchase():
    data = request.json
    if not all(key in data for key in ('cid', 'fid', 'purchase_quantity')):
        return jsonify({'error': 'Missing required fields'}), 400

    customer = Customer.query.get(data['cid'])
    flower = Flower.query.get(data['fid'])

    if not customer or not flower:
        return jsonify({'error': 'Invalid customer or flower ID'}), 400

    if flower.availability == 'No':
        return jsonify({'error': f'The flower requested is not available'}), 400

    if int(data['purchase_quantity']) < flower.min_order_quantity:
        return jsonify({'error': f'Minimum order quantity for this flower is {flower.min_order_quantity}'}), 400

    if int(data['purchase_quantity']) > flower.stock:
        return jsonify({'error': f'The current stock for this flower is less than {data["purchase_quantity"]}'}), 400

    flower.stock = flower.stock - int(data['purchase_quantity'])
    if flower.stock < flower.min_order_quantity:
            flower.availability = 'No'
    
    purchase = Purchase(
        cid=data['cid'],
        fid=data['fid'],
        purchase_date=datetime.date.today(),
        purchase_quantity=data['purchase_quantity'],
        total_price=float(data['purchase_quantity']) * flower.price
    )

    db.session.add(purchase)
    db.session.commit()

    return jsonify({'message': 'Purchase successful!'}), 201

@app.route('/api/employee_register', methods=['POST'])
def employee_register():
    data = request.json
    # Check if all required fields are present
    if not all(key in data for key in ('first_name', 'last_name', 'email', 'phone', 'address', 'job_title', 'salary', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400
    # Check if email already exists
    if Employee.query.filter_by(email=data['email']).first() is not None:
        return jsonify({'error': 'Email already exists'}), 400
    # Check if password meets requirements (at least 8 characters)
    if len(data['password']) < 8:
        return jsonify({'error': 'Password must be at least 8 characters long'}), 400
    # Create a new Employee object with the data from the request
    employee = Employee(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone=data['phone'],
        address=data['address'],
        hire_date=datetime.date.today(),
        job_title=data['job_title'],
        salary=data['salary'],
        password=hashlib.sha256(data['password'].encode('utf-8')).hexdigest()  # hash the password
    )
    # Add the new employee to the database and commit the transaction
    db.session.add(employee)
    db.session.commit()
    return jsonify({'message': 'Employee created successfully'}), 201

@app.route('/api/employee_login', methods=['POST'])
def employee_login():
    data = request.json
    # Check if all required fields are present
    if not all(key in data for key in ('email', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400
    # Retrieve the employee object with the entered email
    employee = Employee.query.filter_by(email=data['email']).first()
    # Check if the employee exists and if the entered password matches the hashed password in the database
    if employee and employee.password == hashlib.sha256(data['password'].encode('utf-8')).hexdigest():
        return jsonify({'message': 'Login successful', 'eid': employee.eid}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

def get_employee_id(email):
    employee = Employee.query.filter_by(email=email).first()
    if employee:
        return employee.eid
    else:
        return None

@app.route('/api/adjust_price', methods=['PUT'])
def adjust_price():
    data = request.json
    # Check if all required fields are present
    if not all(key in data for key in ('eid', 'fid', 'new_price')):
        return jsonify({'error': 'Missing required fields'}), 400
    # Get the flower from the database
    flower = Flower.query.get(data['fid'])
    if flower is None:
        return jsonify({'error': 'Flower not found'}), 404
    # Get the employee from the database
    employee = Employee.query.get(data['eid'])
    if employee is None:
        return jsonify({'error': 'Employee not found'}), 404
    # Check if user has permission to adjust price
    if not employee.job_title == "Cute Staff":
        return jsonify({'error': 'Unauthorized'}), 401
    # Update the price of the flower
    flower.price = data['new_price']
    db.session.commit()
    return jsonify({'message': 'Price adjusted successfully', 'fid': flower.fid, 'flower_name': flower.name, 'new_price': flower.price}), 200

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    # Check if all required fields are present
    if not all(key in data for key in ('name', 'email', 'message')):
        return jsonify({'error': 'Missing required fields'}), 400
    # Create a new Feedback object with the data from the request
    feedback = Feedback(
        name=data['name'],
        email=data['email'],
        message=data['message'],
        created_at=datetime.datetime.utcnow()
    )
    # Add the new feedback to the database and commit the transaction
    db.session.add(feedback)
    db.session.commit()
    return jsonify({'message': 'Feedback submitted successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)



