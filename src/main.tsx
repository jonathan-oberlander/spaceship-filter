import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import { SpaceshipList } from './components/SpaceshipList.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MantineProvider>
        <App />
      </MantineProvider>
    ),
    children: [
      {
        path: 'spaceships',
        element: <SpaceshipList />,
      },
    ],
  },
])

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
