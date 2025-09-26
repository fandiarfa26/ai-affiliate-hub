from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# load summarization model
summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6"
)

# load text generation model
generator = pipeline(
    "text-generation",
    model="gpt2"
)


@app.route("/", methods=["GET"])
def home():
    return {"message": "Flask AI API is running!"}


@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    text = data.get("text")
    if not text:
        return jsonify({"error": "Field 'text' is required!"}), 400

    try:
        result = summarizer(text, max_length=60,
                            min_length=20, do_sample=False)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt")
    if not prompt:
        return jsonify({"error": "Field 'prompt' is required!"}), 400

    try:
        result = generator(
            prompt,
            max_new_tokens=60,
            temperature=0.7,
            top_p=0.9,
            repetition_penalty=1.2
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
