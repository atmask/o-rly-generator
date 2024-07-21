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
    topText = data.get('topText', 'Sample Top Text')
    author = data.get('author', 'Author Name')
    image_code = data.get('image_code', '1')
    theme = data.get('theme', '0')

    final_path = generate_image(title, topText, author, image_code, theme)
    print(f"Image generated: {final_path}")
    return send_file(final_path, mimetype='image/png')


if __name__ == "__main__":
    app.run(debug=True)
