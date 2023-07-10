<?php
// Connexion à la base de données
$servername = "localhost";
$username = "iso";
$password = "passer";
$dbname = "ipdl";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données : " . $conn->connect_error);
}

// Vérification si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des valeurs du formulaire
    $prenom = $_POST['prenom'];
    $nom = $_POST['nom'];
    $dateNaissance = $_POST['date_naiss'];
    $email = $_POST['email'];
    $motDePasse = $_POST['motDePasse'];

    // Vérification de la date de naissance
    if (empty($dateNaissance)) {
        echo "Veuillez sélectionner une date de naissance.";
        exit();
    }

    // Échapper les valeurs pour éviter les injections SQL
    $prenom = $conn->real_escape_string($prenom);
    $nom = $conn->real_escape_string($nom);
    $dateNaissance = $conn->real_escape_string($dateNaissance);
    $email = $conn->real_escape_string($email);
    $motDePasse = $conn->real_escape_string($motDePasse);

    // Requête d'insertion pour la table Personne
    $insertPersonneQuery = "INSERT INTO Personne (prenom, nom, email, date_naiss)
                            VALUES ('$prenom', '$nom', '$email', '$dateNaissance')";

    // Exécution de la requête d'insertion pour la table Personne
    if ($conn->query($insertPersonneQuery) === TRUE) {
        // Récupérer l'ID de la personne nouvellement insérée
        $idPersonne = $conn->insert_id;

        // Requête d'insertion pour la table Compte
        $insertCompteQuery = "INSERT INTO Compte (email, motDePasse, personne_id)
                              VALUES ('$email', '$motDePasse', $idPersonne)";

        // Exécution de la requête d'insertion pour la table Compte
        if ($conn->query($insertCompteQuery) === TRUE) {
            // Redirection vers la page de connexion
            header("Location: debut.html");
            exit();
        } else {
            echo "Erreur lors de l'insertion du compte : " . $conn->error;
        }
    } else {
        echo "Erreur lors de l'insertion de la personne : " . $conn->error;
    }
}

// Fermer la connexion à la base de données
$conn->close();
?>

