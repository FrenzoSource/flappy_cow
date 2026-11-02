import http.server
import socketserver
import threading
import webbrowser
import os

# Chemin vers le dossier src
dossier_jeu = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "src"
)

os.chdir(dossier_jeu)

class Serveur(socketserver.TCPServer):
    allow_reuse_address = True

serveur = Serveur(
    ("127.0.0.1", 0),
    http.server.SimpleHTTPRequestHandler
)

port = serveur.server_address[1]

thread = threading.Thread(target=serveur.serve_forever)
thread.daemon = True
thread.start()

adresse = f"http://127.0.0.1:{port}/flappy.html"

webbrowser.open(adresse)

print("Flappy Cow est lancé !")
print("Appuie sur Entrée pour arrêter le serveur.")

try:
    input()
except KeyboardInterrupt:
    pass
finally:
    serveur.shutdown()
    serveur.server_close()
    print("Serveur arrêté.")
