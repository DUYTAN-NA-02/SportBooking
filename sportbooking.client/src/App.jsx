import { publicRoutes, privateRoutes } from './routes/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = route.layout || React.Fragment;
                    let Page = route.page;
                    return <Route
                        key={index}
                        path={route.path}
                        element={
                        <Layout>
                            <Page />
                        </Layout>}
                    />
                })}
            </Routes>
        </BrowserRouter>
    )
}

export default App;