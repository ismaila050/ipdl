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

// Fonction d'authentification
function authenticate($email, $password) {
    global $conn;
    
    // Échapper les valeurs pour éviter les injections SQL
    $email = $conn->real_escape_string($email);
    $password = $conn->real_escape_string($password);
    
    // Requête pour récupérer les informations du compte
    $query = "SELECT p.id, p.prenom, p.nom
              FROM Personne p
              INNER JOIN Compte c ON p.id = c.personne_id
              WHERE c.email = '$email' AND c.motDePasse = '$password'";
    $result = $conn->query($query);
    
    // Vérifier si le compte existe et correspond aux informations fournies
    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        return $row;
    } else {
        // Échec de l'authentification
        return false;
    }
}

// Vérification si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des valeurs du formulaire
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Authentification
    $authenticatedUser = authenticate($email, $password);

    // Vérification de l'authentification
    if ($authenticatedUser) {
        // Redirection vers la page d'accueil ou autre page
        // Vous pouvez utiliser les informations de l'utilisateur pour personnaliser l'expérience
        // Par exemple, $authenticatedUser['prenom'] pour afficher le prénom de l'utilisateur
        header("Location: index.html");
        exit();
    } else {
        // Échec de l'authentification
        echo "Échec de l'authentification. Veuillez vérifier vos informations de connexion.";
    }
}

// Fermer la connexion à la base de données
$conn->close();
?>

