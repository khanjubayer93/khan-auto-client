import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './Routers/Route';

function App() {
  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
        <Toaster />
    </div>
  );
}

export default App;
