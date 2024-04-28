import { SimpleGrid, Stack } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import data from '../assets/testData.json'
import { SpaceshipCard } from './SpaceshipCard'

const formatFormFilter = (form: {
  [k: string]: string
}) => ({
  colors: form.colors?.length ? form.colors?.split(',') : [],
  min_speed: Number.parseInt(form.min_speed),
  max_speed: Number.parseInt(form.max_speed),
  pulse_laser: form.pulse_laser,
  flip: form.flip === 'true',
})

export const SpaceshipList = () => {
  const [search] = useSearchParams()

  const formFiltersJSON = Object.fromEntries(search)
  const formData = formatFormFilter(formFiltersJSON)

  const filteredData = data
    .sort((a, b) => a.max_speed - b.max_speed)
    .filter(spaceship => {
      if (formData.colors.length === 0) {
        return true
      }

      if (formData.flip) {
        return spaceship.colors.every(color => !formData.colors.includes(color))
      }

      return spaceship.colors.some(color => formData.colors.includes(color))
    })
    .filter(
      spaceship =>
        spaceship.max_speed >= formData.min_speed &&
        spaceship.max_speed <= formData.max_speed,
    )
    .filter(spaceship => {
      if (formData.pulse_laser === 'both') {
        return true
      }
      return formData.pulse_laser === 'with'
        ? spaceship.pulse_laser === true
        : spaceship.pulse_laser === false
    })

  return (
    <Stack>
      <SimpleGrid component="ul" cols={4} p="xs">
        {filteredData.map(spaceship => (
          <SpaceshipCard key={spaceship.name} {...spaceship} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
