import React , { useState, useEffect }from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Chart from 'chart.js/auto';
const AdminDashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';
  console.log('First Name:', firstName);
  console.log('Last Name:', lastName);
  const [newDemandsCount, setNewDemandsCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalDemandsCount, setTotalDemandsCount] = useState(0);
  const [chartData, setChartData] = useState({
    newDemandsCount: 0,
    inProgressCount: 0,
    completedCount: 0,
    totalDemandsCount: 0,
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    fetch('https://localhost:7214/api/Demands')
      .then((response) => response.json())
      .then((data) => {
        // Supposons que vous ayez un tableau d'objets comme dans les données de l'API
        // Vous pouvez maintenant utiliser les noms de propriétés corrects
        const newDemands = data.filter((demand) => demand.statut === 'Nouvelle demande');
        const inProgressDemands = data.filter((demand) => demand.statut === 'En cours');
        const completedDemands = data.filter((demand) => demand.statut === 'Demande achevée');
  
        setNewDemandsCount(newDemands.length);
        setInProgressCount(inProgressDemands.length);
        setCompletedCount(completedDemands.length);
        setTotalDemandsCount(data.length);
        setChartData({
          newDemandsCount: newDemands.length,
          inProgressCount: inProgressDemands.length,
          completedCount: completedDemands.length,
          totalDemandsCount: data.length,
        });
        // Marquez les données comme chargées
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []);
  useEffect(() => {
    if (isDataLoaded) {
      generateCharts(); // Générez les graphiques lorsque les données sont prêtes
    }
  }, [isDataLoaded]);
 
  const generateCharts = () => {
    const ctx = document.getElementById('dashboard-chart').getContext('2d');
    
    // Détruire le graphique existant s'il y en a un
    if (window.dashboardChart) {
      window.dashboardChart.destroy();
    }
    
    window.dashboardChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Nouvelles demandes', 'En cours', 'Demandes traitées', 'Total'],
        datasets: [
          {
            label: 'Nombre de demandes',
            data: [
              chartData.newDemandsCount,
              chartData.inProgressCount,
              chartData.completedCount,
              chartData.totalDemandsCount,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  

  useEffect(() => {
    generateCharts(); // Générez les graphiques lorsque les données sont prêtes
  }, [chartData]);
  
  
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Admin Info */}
        <div className="admin-info">
        <h3>{`${firstName} ${lastName}`}</h3>
        </div>
        
        <ul className="menu">
          <li className="active">Tableau de bord</li>
          <li><Link to="/clientListPage">Clients</Link></li>
          <li><Link to="/newDemands">Nouveaux demandes </Link></li>
          <li>< Link to ="/demandesEnCours">Demandes en cours</Link></li>
          <li>< Link to ="/finishedDemands">Demandes traitées</Link></li>
          
          <li><Link to= "/login">Déconnexion</Link></li>
        </ul>
      </div>

      {/* Content */}
      <div className="content">
        <header className="header">
        
          <div className="logo">
            <img src="src\components\AdminDashBoard\SanlamLogo.png" alt="Sanlam Logo" />
          </div>
          
          
        </header>
        <div className="chart-container">
        <canvas id="dashboard-chart" width="400" height="200"></canvas>
      </div>
        <div className="summary-container">
          <div className="summary-item">
            <div className="icon demandes-icon"></div>
            <div className="summary-text">
              <p>Demandes non traitées</p>
              <p>{newDemandsCount}</p>
            </div>
          </div>
          <div className="summary-item">
            <div className="icon en-cours-icon"></div>
            <div className="summary-text">
              <p>En cours de traitement</p>
              <p>{inProgressCount}</p>
            </div>
          </div>
          <div className="summary-item">
            <div className="icon traites-icon"></div>
            <div className="summary-text">
              <p>Demandes traitées</p>
              <p>{completedCount}</p>
            </div>
          </div>
          <div className="summary-item">
            <div className="icon total-icon"></div>
            <div className="summary-text">
              <p>Total des demandes</p>
              <p>{totalDemandsCount}</p>
            </div>
          </div>
        </div>
        <div className="chart-container">
          {/* Insérez ici vos graphiques */}
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
