-- Table Personne
CREATE TABLE Personne (
  id INT PRIMARY KEY AUTO_INCREMENT,
  prenom VARCHAR(50),
  nom VARCHAR(50),
  email VARCHAR(50),
  date_naissance DATE
);

-- Table Enseignant (spécialisation de Personne)
CREATE TABLE Enseignant (
  id INT PRIMARY KEY,
  matricule VARCHAR(50),
  FOREIGN KEY (id) REFERENCES Personne(id)
);

-- Table Etudiant (spécialisation de Personne)
CREATE TABLE Etudiant (
  id INT PRIMARY KEY,
  numeroEtu VARCHAR(50),
  FOREIGN KEY (id) REFERENCES Personne(id)
);

-- Table Compte
CREATE TABLE Compte (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(50),
  password VARCHAR(50),
  personne_id INT,
  UNIQUE (personne_id),
  FOREIGN KEY (personne_id) REFERENCES Personne(id)
);

-- Table Matiere
CREATE TABLE Matiere (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nomMatiere VARCHAR(50)
);

-- Table Note (classe d'association)
CREATE TABLE Note (
  id INT PRIMARY KEY AUTO_INCREMENT,
  etudiant_id INT,
  matiere_id INT,
  noteCC FLOAT,
  noteDS FLOAT,
  FOREIGN KEY (etudiant_id) REFERENCES Etudiant(id),
  FOREIGN KEY (matiere_id) REFERENCES Matiere(id)
);

