from flask import Flask, request, jsonify
import os
import face_recognition

app = Flask(__name__)

image_directory = "./saved_images"
new_image_directory = "./images"

@app.route('/verify', methods=['POST'])
def verify_images():
    try: 
        data = request.get_json()
        username = data['username']

        image_path1 = os.path.join(image_directory, f"{username}.png")
        image_path2 = os.path.join(new_image_directory, f"{username}.png")

        image_1 = face_recognition.load_image_file(image_path1)
        image_2 = face_recognition.load_image_file(image_path2)

        face_encoding_1 = face_recognition.face_encodings(image_1)[0]
        face_encoding_2 = face_recognition.face_encodings(image_2)[0]

        results = face_recognition.compare_faces([face_encoding_1], face_encoding_2)

        if results[0]:
            verification_status = "verified"
        else:
            verification_status = "not verified"

        return jsonify({"status": verification_status})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)