import { Container, Flex, Group, Title } from '@mantine/core'
import { IconRocket, IconSatellite, IconUfo } from '@tabler/icons-react'
import { Link, Outlet } from 'react-router-dom'
import { FilterForm } from './components/FiltersForm'

function App() {
  return (
    <>
      <Flex p="md" justify="space-between">
        <Title>Spaceships</Title>
        <Group>
          <Link to="spaceships?colors=&min_speed=50&max_speed=200&pulse_laser=both">
            <IconRocket stroke={2} width="32" height="32" />
          </Link>
          <Link to="spaceships?colors=purple&min_speed=60&max_speed=200&pulse_laser=with&flip=true">
            <IconUfo stroke={2} width="32" height="32" />
          </Link>
          <Link to="spaceships?colors=&min_speed=150&max_speed=200&pulse_laser=both">
            <IconSatellite stroke={2} width="32" height="32" />
          </Link>
        </Group>
      </Flex>
      <Container size="xl" p="md">
        <FilterForm />
        <Outlet />
      </Container>
    </>
  )
}

export default App
