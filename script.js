window.onload = function() {
  var mesCoursLink = document.getElementById('mes-cours');
  var bulletinLink = document.getElementById('bulletin');
  var emploiDuTempsLink = document.getElementById('emploi-du-temps');
  var deconnexionLink = document.getElementById('deconnexion');
  var contenuSection = document.getElementById('contenu');

  mesCoursLink.addEventListener('click', function(event) {
    event.preventDefault();
    afficherFormulaireSemestre();
  });

  bulletinLink.addEventListener('click', function(event) {
    event.preventDefault();
    afficherFormulaireSemestreBulletin();
  });

  emploiDuTempsLink.addEventListener('click', function(event) {
    event.preventDefault();
    contenuSection.innerHTML = '<h2>Mon emploi du temps</h2><p>Votre emploi du temps sera affiché ici.</p>';
  });

  deconnexionLink.addEventListener('click', function(event) {
    event.preventDefault();
    alert('Vous avez été déconnecté.');
    // Ajoutez ici le code de déconnexion
  });

  function afficherFormulaireSemestre() {
    contenuSection.innerHTML = `
      <h2>Choix du semestre</h2>
      <label for="semestre">Sélectionnez le semestre :</label>
      <select id="semestre">
        <option value="Semestre 1">Semestre 1</option>
        <option value="Semestre 2">Semestre 2</option>
      </select>
      <button id="valider">Valider</button>
    `;

    var validerBtn = document.getElementById('valider');
    validerBtn.addEventListener('click', function() {
      var semestreSelect = document.getElementById('semestre');
      var selectedSemestre = semestreSelect.value;

      afficherCours(selectedSemestre);
    });
  }

  function afficherCours(semestre) {
    // Faites ici l'appel à votre backend pour récupérer la liste des matières associées au semestre sélectionné
    // En supposant que vous recevez les données sous forme d'un tableau d'objets, vous pouvez les afficher dans une liste

    var matieresData = [
      { nom: 'Mathématiques', fichier: 'mathematiques.pdf' },
      { nom: 'Physique', fichier: 'physique.pdf' },
      { nom: 'Français', fichier: 'francais.pdf' },
      // Ajoutez les autres matières et leurs fichiers PDF ici
    ];

    var listeMatieres = `<h2>Mes cours - ${semestre}</h2><ul>`;

    matieresData.forEach(function(item) {
      listeMatieres += `
        <li>
          <a href="${item.fichier}" download>${item.nom}</a>
        </li>
      `;
    });

    listeMatieres += '</ul>';

    contenuSection.innerHTML = listeMatieres;
  }

  function afficherFormulaireSemestreBulletin() {
    contenuSection.innerHTML = `
      <h2>Choix du semestre</h2>
      <label for="semestre">Sélectionnez le semestre :</label>
      <select id="semestre">
        <option value="Semestre 1">Semestre 1</option>
        <option value="Semestre 2">Semestre 2</option>
      </select>
      <button id="valider">Valider</button>
    `;

    var validerBtn = document.getElementById('valider');
    validerBtn.addEventListener('click', function() {
      var semestreSelect = document.getElementById('semestre');
      var selectedSemestre = semestreSelect.value;

      afficherBulletin(selectedSemestre);
    });
  }

  function afficherBulletin(semestre) {
    // Faites ici l'appel à votre backend pour récupérer les données du bulletin pour le semestre sélectionné
    // En supposant que vous recevez les données sous forme d'un tableau d'objets, vous pouvez les afficher dans un tableau HTML

    var bulletinData = [
      { matiere: 'Mathématiques', coefficient: 3, note: 14 },
      { matiere: 'Physique', coefficient: 4, note: 16 },
      { matiere: 'Français', coefficient: 2, note: 12 },
      // Ajoutez les autres matières et leurs notes ici
    ];

    var bulletinTable = `
      <h2>Bulletin - ${semestre}</h2>
      <table>
        <thead>
          <tr>
            <th>Matière</th>
            <th>Coefficient</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
    `;

    bulletinData.forEach(function(item) {
      bulletinTable += `
        <tr>
          <td>${item.matiere}</td>
          <td>${item.coefficient}</td>
          <td>${item.note}</td>
        </tr>
      `;
    });

    bulletinTable += `
        </tbody>
      </table>
    `;

    contenuSection.innerHTML = bulletinTable;
  }
};
