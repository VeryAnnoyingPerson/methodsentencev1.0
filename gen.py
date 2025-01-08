from flask import Flask, render_template
import random

app = Flask(__name__)

# Function to generate the random message
def generate_message():
    foods = ["pizza", "burger", "pasta", "sushi", "sandwich", "salad", "fries", "steak"]
    unedible_adjectives = ["spoiled", "burnt", "cold", "overcooked", "undercooked", "stale"]
    feelings = ["disappointed", "angry", "sad", "frustrated", "annoyed"]
    times = ["12:15 PM", "12:45 PM", "1:30 PM", "2:00 PM", "3:15 PM", "4:20 PM", "4:50 PM"]

    food1 = random.choice(foods)
    food2 = random.choice(foods)
    while food2 == food1:  # Ensure food2 is different from food1
        food2 = random.choice(foods)

    unedible_adjective = random.choice(unedible_adjectives)
    feeling = random.choice(feelings)
    time = random.choice(times)

    message = (
        f"I brought {food1} and {food2} and a drink, and when they came they were {unedible_adjective}. "
        f"I felt {feeling}. I had to throw them away.\n\n"
        f"This all happened yesterday at {time}.\n\n"
        f"I paid by cash and the printer for the receipt wasn't working."
    )
    return message

# Route for the homepage
@app.route("/")
def home():
    message = generate_message()
    return render_template("index.html", message=message)

if __name__ == "__main__":
    app.run(debug=True)
