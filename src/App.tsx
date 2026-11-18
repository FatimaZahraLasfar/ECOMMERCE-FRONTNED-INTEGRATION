import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { UserProvider } from './context/UserContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { Discover } from './pages/Discover';
import { ExperimentDashboard } from './pages/ExperimentDashboard';
import { Home } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';
import { NotFound } from './pages/NotFound';
import { Profile } from './pages/Profile';
import { Watchlist } from './pages/Watchlist';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <WatchlistProvider>
          <div className="flex min-h-screen flex-col bg-[#09090B] text-[#F4F4F5]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/movies/:itemId" element={<MovieDetails />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/experiment" element={<ExperimentDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </WatchlistProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
