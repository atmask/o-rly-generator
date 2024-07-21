import random

from flask import Flask, request, send_file

from models import generate_image

app = Flask(__name__)


@app.route("/generate", methods=['GET', 'POST'])
def generate():
    if request.method == 'POST':
        data = request.form
    else:
        data = request.args

    title = data.get('title', 'Sample Title')
    top_text = data.get('topText', 'Sample Top Text')
    author = data.get('author', 'Author Name')
    image_code = data.get('image_code', str(random.randrange(1, 41)))
    theme = data.get('theme', str(random.randrange(0, 17)))
    guide_text_placement = data.get('guide_text_placement', 'bottom_right')
    guide_text = data.get('guide_text', 'The Definitive Guide')

    final_path = generate_image(title, top_text, author, image_code, theme, guide_text_placement, guide_text)
    print(f"Image generated: {final_path}")
    return send_file(final_path, mimetype='image/png')


if __name__ == "__main__":
    app.run(debug=True)
