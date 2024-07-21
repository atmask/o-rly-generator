import datetime
import os
import random
import re
from urllib.parse import unquote_plus

from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont


def parse_text_into_params(text):
    text = unquote_plus(text).strip()
    text = text[:-1] if text[-1] == ";" else text
    params = text.split(";")

    title = params.pop(0).strip() if params else "Default Title"
    subtitle = params.pop(0).strip() if params else "Default Subtitle"
    author = params.pop(0).strip() if params else "Default Author"
    image_code = params.pop(0).strip() if params else str(random.randrange(1, 41))
    theme = params.pop(0).strip() if params else str(random.randrange(0, 17))

    return title, subtitle, author, image_code, theme


def generate_image(title, top_text, author, image_code, theme, guide_text_placement='bottom_right',
                   guide_text='The Definitive Guide'):
    # Define the color themes
    theme_colors = {
        "0": (85, 19, 93, 255), "1": (113, 112, 110, 255), "2": (128, 27, 42, 255), "3": (184, 7, 33, 255),
        "4": (101, 22, 28, 255), "5": (80, 61, 189, 255), "6": (225, 17, 5, 255), "7": (6, 123, 176, 255),
        "8": (247, 181, 0, 255), "9": (0, 15, 118, 255), "10": (168, 0, 155, 255), "11": (0, 132, 69, 255),
        "12": (0, 153, 157, 255), "13": (1, 66, 132, 255), "14": (177, 0, 52, 255), "15": (55, 142, 25, 255),
        "16": (133, 152, 0, 255)
    }
    theme_color = theme_colors.get(theme, (255, 255, 255, 255))

    # Create an image canvas
    width, height = 500, 700
    im = Image.new('RGBA', (width, height), "white")

    # Font paths
    base_dir = os.path.dirname(os.path.realpath(__file__))
    font_path = os.path.join(base_dir, 'fonts', 'Garamond Light.ttf')
    font_path_helv = os.path.join(base_dir, 'fonts', 'HelveticaNeue-Medium.otf')
    font_path_helv_bold = os.path.join(base_dir, 'fonts', 'Helvetica Bold.ttf')
    font_path_italic = os.path.join(base_dir, 'fonts', 'Garamond LightItalic.ttf')

    # Load fonts
    top_font = ImageFont.truetype(font_path_italic, 20)
    subtitle_font = ImageFont.truetype(font_path_italic, 34)
    author_font = ImageFont.truetype(font_path_italic, 24)
    title_font = ImageFont.truetype(font_path, 62)
    orielly_font = ImageFont.truetype(font_path_helv, 28)
    question_mark_font = ImageFont.truetype(font_path_helv_bold, 16)

    # Draw
    draw = ImageDraw.Draw(im)
    draw.rectangle(((20, 0), (width - 20, 10)), fill=theme_color)

    # Draw text
    top_text = sanitize_unicode(top_text, font_path_italic)
    textWidth, textHeight = textsize(top_text, top_font)
    textPositionX = (width / 2) - (textWidth / 2)

    draw.text((textPositionX, 10), top_text, fill='black', font=top_font)

    author = sanitize_unicode(author, font_path_italic)
    textWidth, textHeight = textsize(author, author_font)
    textPositionX = width - textWidth - 20
    textPositionY = height - textHeight - 20

    draw.text((textPositionX, textPositionY), author, fill='black', font=author_font)

    oreillyText = "O RLY"

    textWidth, textHeight = textsize(oreillyText, orielly_font)
    textPositionX = 20
    textPositionY = height - textHeight - 20

    draw.text((textPositionX, textPositionY), oreillyText, fill='black', font=orielly_font)

    oreillyText = "?"

    textPositionX = textPositionX + textWidth

    draw.text((textPositionX, textPositionY - 1), oreillyText, fill=theme_color, font=question_mark_font)

    title_font, newTitle = clamp_title_text(sanitize_unicode(title, font_path), width - 80)
    if newTitle == None:
        raise ValueError('Title too long')

    textWidth, textHeight = draw.multiline_textsize(newTitle, title_font)
    draw.rectangle([(20, 400), (width - 20, 400 + textHeight + 40)], fill=theme_color)

    subtitle = sanitize_unicode(guide_text, font_path_italic)

    if guide_text_placement == 'top_left':
        textWidth, textHeight = textsize(subtitle, subtitle_font)
        textPositionX = 20
        textPositionY = 400 - textHeight - 2
    elif guide_text_placement == 'top_right':
        textWidth, textHeight = textsize(subtitle, subtitle_font)
        textPositionX = width - 20 - textWidth
        textPositionY = 400 - textHeight - 2
    elif guide_text_placement == 'bottom_left':
        textPositionY = 400 + textHeight + 40
        textWidth, textHeight = textsize(subtitle, subtitle_font)
        textPositionX = 20
    else:  # bottom_right is default
        textPositionY = 400 + textHeight + 40
        textWidth, textHeight = textsize(subtitle, subtitle_font)
        textPositionX = width - 20 - textWidth

    draw.text((textPositionX, textPositionY), subtitle, fill='black', font=subtitle_font)

    draw.multiline_text((40, 420), newTitle, fill='white', font=title_font)

    # Load and place the animal image
    animal_image_path = os.path.join(base_dir, 'images', f'{image_code}.png')
    animal_image = Image.open(animal_image_path).convert('RGBA')
    im.paste(animal_image, (80, 40), animal_image)

    # Save the final image
    final_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ('%s.png' % datetime.datetime.now())))
    im.save(final_path)
    im.close()

    return final_path


def sanitize_unicode(string, font_file_path):
    sanitized_string = ''
    font = TTFont(font_file_path)
    cmap = font['cmap'].getcmap(3, 1).cmap
    for char in string:
        if ord(char) in cmap:
            sanitized_string += char
    return sanitized_string


def clamp_title_text(title, width):
    im = Image.new('RGBA', (500, 500), "white")
    dr = ImageDraw.Draw(im)

    font_path_italic = os.path.abspath(os.path.join(os.path.dirname(__file__), 'fonts', 'Garamond Light.ttf'))
    # try and fit title on one line
    font = None

    startFontSize = 80
    endFontSize = 61

    for fontSize in range(startFontSize, endFontSize, -1):
        font = ImageFont.truetype(font_path_italic, fontSize)
        w, h = textsize(title, font)

        if w < width:
            return font, title

    # try and fit title on two lines
    startFontSize = 80
    endFontSize = 34

    for fontSize in range(startFontSize, endFontSize, -1):
        font = ImageFont.truetype(font_path_italic, fontSize)

        for match in list(re.finditer('\s', title, re.UNICODE)):
            newTitle = u''.join((title[:match.start()], u'\n', title[(match.start() + 1):]))
            substringWidth, h = dr.multiline_textsize(newTitle, font)

            if substringWidth < width:
                return font, newTitle

    im.close()

    return None, None


def textsize(text, font):
    im = Image.new(mode="P", size=(0, 0))
    draw = ImageDraw.Draw(im)
    _, _, width, height = draw.textbbox((0, 0), text=text, font=font)
    return width, height
