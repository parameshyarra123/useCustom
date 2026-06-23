import { DataTable } from './components/DataTable';
import { DataCards } from './components/DataCards';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <header className="navbar">
        <div className="brand">Whiteboard Architecture Demo</div>
        <div className="status-banner">Custom Hook Data Pipelines Operational</div>
      </header>
      
      <main>
        <DataTable />
        <DataCards />
      </main>
    </div>
  );
}