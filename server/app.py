from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import bcrypt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
application = app
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///mindcare.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configure session settings
app.config['SESSION_COOKIE_NAME'] = 'mindcare_session'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production with HTTPS
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)

# Initialize extensions
db = SQLAlchemy(app)

# Configure CORS - updated with more permissive settings
CORS(app, 
     supports_credentials=True, 
     origins=[ "https://mindcare-ashen.vercel.app/"],
     allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     expose_headers=["Set-Cookie"])

# Configure logging
logging.basicConfig(level=logging.INFO)

# Database Models
# Add Booking model
class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    expert_id = db.Column(db.Integer, nullable=False)
    expert_name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_name = db.Column(db.String(100), nullable=False)
    session_type = db.Column(db.String(20), nullable=False)  # online or physical
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String(10), nullable=False)
    location = db.Column(db.String(200), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    emergency_contact = db.Column(db.String(20), nullable=True)
    preferred_communication = db.Column(db.String(20), nullable=True)  # video, audio, chat
    status = db.Column(db.String(20), default='pending')  # pending, confirmed, cancelled, completed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('bookings', lazy=True))
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_premium = db.Column(db.Boolean, default=False)
    subscription_plan = db.Column(db.String(50), nullable=True)
    subscription_end = db.Column(db.DateTime, nullable=True)
    
    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_premium': self.is_premium,
            'subscription_plan': self.subscription_plan,
            'created_at': self.created_at.isoformat(),
            'subscription_end': self.subscription_end.isoformat() if self.subscription_end else None
        }

class Transaction(db.Model):
    __tablename__ = 'transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    plan = db.Column(db.String(50), nullable=False)
    billing_cycle = db.Column(db.String(20), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    invoice_id = db.Column(db.String(100), nullable=False)
    checkout_request_id = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('transactions', lazy=True))


# Routes
@app.route('/api/test', methods=['GET'])
def test_route():
    """Test route to verify server is working"""
    response = jsonify({'message': 'Flask server is working!'})
    return response

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or 'email' not in data or 'password' not in data or 'username' not in data:
            return jsonify({'message': 'Email, username and password are required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'User with this email already exists'}), 409
        
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'message': 'Username already taken'}), 409
        
        # Create new user
        user = User(
            username=data['username'],
            email=data['email']
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Set user session
        session['user_id'] = user.id
        
        response = jsonify({
            'message': 'User created successfully',
            'user': user.to_dict()
        })
        return response, 201
        
    except Exception as e:
        logging.error(f"Registration error: {str(e)}")
        return jsonify({'message': 'Internal server error'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login a user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({'message': 'Email and password are required'}), 400
        
        # Find user
        user = User.query.filter_by(email=data['email']).first()
        if not user or not user.check_password(data['password']):
            return jsonify({'message': 'Invalid credentials'}), 401
        
        # Set user session
        session['user_id'] = user.id
        
        response = jsonify({
            'message': 'Login successful',
            'user': user.to_dict()
        })
        return response, 200
        
    except Exception as e:
        logging.error(f"Login error: {str(e)}")
        return jsonify({'message': 'Internal server error'}), 500

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    """Logout a user"""
    session.pop('user_id', None)
    response = jsonify({'message': 'Logged out successfully'})
    return response, 200

@app.route('/api/auth/check', methods=['GET'])
def check_auth():
    """Check if user is authenticated"""
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        if user:
            return jsonify({'authenticated': True, 'user': user.to_dict()}), 200
    
    return jsonify({'authenticated': False}), 200


    # bookign
# Add booking routes
@app.route('/api/bookings', methods=['POST'])
def create_booking():
    """Create a new booking"""
    try:
        # Check if user is authenticated
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'success': False, 'message': 'Not authenticated'}), 401
            
        user = User.query.get(user_id)
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        data = request.get_json()
        
        # Validate required fields
        if not data or 'expertId' not in data or 'date' not in data or 'time' not in data:
            return jsonify({'success': False, 'message': 'Missing required fields'}), 400
        
        # Create booking
        booking = Booking(
            expert_id=data['expertId'],
            expert_name=data['expertName'],
            user_id=user_id,
            user_name=data['userName'],
            session_type=data.get('sessionType', 'online'),
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            time=data['time'],
            location=data.get('location', ''),
            notes=data.get('notes', ''),
            emergency_contact=data.get('emergencyContact', ''),
            preferred_communication=data.get('preferredCommunication', 'video'),
            status=data.get('status', 'pending')
        )
        
        db.session.add(booking)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Booking created successfully',
            'booking': {
                'id': booking.id,
                'expert_name': booking.expert_name,
                'date': booking.date.isoformat(),
                'time': booking.time,
                'session_type': booking.session_type,
                'status': booking.status
            }
        }), 201
        
    except Exception as e:
        logging.error(f"Booking creation error: {str(e)}")
        return jsonify({'success': False, 'message': 'Internal server error'}), 500

@app.route('/api/bookings', methods=['GET'])
def get_user_bookings():
    """Get all bookings for the authenticated user"""
    try:
        # Check if user is authenticated
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'success': False, 'message': 'Not authenticated'}), 401
            
        user = User.query.get(user_id)
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        # Get bookings for user
        bookings = Booking.query.filter_by(user_id=user_id).order_by(Booking.date.desc(), Booking.time.desc()).all()
        
        bookings_data = []
        for booking in bookings:
            bookings_data.append({
                'id': booking.id,
                'expert_name': booking.expert_name,
                'date': booking.date.isoformat(),
                'time': booking.time,
                'session_type': booking.session_type,
                'location': booking.location,
                'status': booking.status,
                'created_at': booking.created_at.isoformat()
            })
        
        return jsonify({
            'success': True,
            'bookings': bookings_data
        }), 200
        
    except Exception as e:
        logging.error(f"Get bookings error: {str(e)}")
        return jsonify({'success': False, 'message': 'Internal server error'}), 500

@app.route('/api/bookings/<int:booking_id>', methods=['PUT'])
def update_booking(booking_id):
    """Update a booking"""
    try:
        # Check if user is authenticated
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'success': False, 'message': 'Not authenticated'}), 401
        
        # Find booking
        booking = Booking.query.filter_by(id=booking_id, user_id=user_id).first()
        if not booking:
            return jsonify({'success': False, 'message': 'Booking not found'}), 404
        
        data = request.get_json()
        
        # Update fields if provided
        if 'date' in data:
            booking.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        if 'time' in data:
            booking.time = data['time']
        if 'session_type' in data:
            booking.session_type = data['session_type']
        if 'location' in data:
            booking.location = data['location']
        if 'notes' in data:
            booking.notes = data['notes']
        if 'emergency_contact' in data:
            booking.emergency_contact = data['emergency_contact']
        if 'preferred_communication' in data:
            booking.preferred_communication = data['preferred_communication']
        if 'status' in data:
            booking.status = data['status']
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Booking updated successfully'
        }), 200
        
    except Exception as e:
        logging.error(f"Update booking error: {str(e)}")
        return jsonify({'success': False, 'message': 'Internal server error'}), 500

@app.route('/api/bookings/<int:booking_id>', methods=['DELETE'])
def cancel_booking(booking_id):
    """Cancel a booking"""
    try:
        # Check if user is authenticated
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'success': False, 'message': 'Not authenticated'}), 401
        
        # Find booking
        booking = Booking.query.filter_by(id=booking_id, user_id=user_id).first()
        if not booking:
            return jsonify({'success': False, 'message': 'Booking not found'}), 404
        
        # Update status to cancelled
        booking.status = 'cancelled'
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Booking cancelled successfully'
        }), 200
        
    except Exception as e:
        logging.error(f"Cancel booking error: {str(e)}")
        return jsonify({'success': False, 'message': 'Internal server error'}), 500

# Initialize database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)