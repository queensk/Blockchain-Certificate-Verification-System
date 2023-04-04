import requests
import PyPDF2
from app.api.v1.views import app_views
from flask import jsonify, request, abort

@app_views.route('/pdf-data', methods=['POST'], strict_slashes=False)
def pdf_data():
    """
    Retrieve data from a PDF document.
    """
    data = request.get_json()
    pdf_url = data.get("pdfURL")
    response = requests.get(pdf_url)
    if response.status_code != 200:
        return jsonify({'error': f'Failed to download PDF from {pdf_url}'}, 400)

    with open('pdf_file.pdf', 'wb') as f:
        f.write(response.content)
    # Parse PDF data
    try:
        with open('pdf_file.pdf', 'rb') as f:
            pdf_reader = PyPDF2.PdfFileReader(f)
            page = pdf_reader.getPage(0)
            text = page.extractText()
            lines = text.split('\n')
            data = {}
            for line in lines:
                if line.startswith('Name:'):
                    data['name'] = line[6:].strip()
                elif line.startswith('Email:'):
                    data['email'] = line[7:].strip()
                elif line.startswith('School id:'):
                    data['school_id'] = line[10:].strip()
                elif line.startswith('School :'):
                    data['school'] = line[8:].strip()
                elif line.startswith('School major:'):
                    data['school_major'] = line[14:].strip()
                elif line.startswith('School department:'):
                    data['school_department'] = line[18:].strip()
                elif line.startswith('School location:'):
                    data['school_location'] = line[16:].strip()
    except Exception as e:
        return jsonify({'error': str(e)})

    return jsonify(data)
