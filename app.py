# app.py

def respond_to_voice_input(audio_file_path):
    return f"Processing audio from: {audio_file_path}"

if __name__ == "__main__":
    print(respond_to_voice_input("samples/input1.wav"))
