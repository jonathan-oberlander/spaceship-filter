import { Badge, Card, Flex, Stack, Text, Title } from '@mantine/core'
import { IconRocket, IconTank } from '@tabler/icons-react'
import type { PropsWithChildren } from 'react'
import type { TestData } from '../types'

import classes from './spaceship.module.css'

export const SpaceshipCard = (props: PropsWithChildren<TestData>) => {
  return (
    <Card
      component="li"
      className={classes.spaceship_card}
      radius="sm"
      shadow="sm"
      tabIndex={0}
    >
      <Stack>
        <Title order={5}>{props.name}</Title>
        <Flex gap="xs">
          {props.colors.map(color => (
            <Badge
              key={color}
              color={color}
              style={theme => ({ 'box-shadow': theme.shadows.xs })}
            />
          ))}
        </Flex>
        {props.pulse_laser ? <IconTank /> : <IconRocket />}
        <Text>{props.max_speed}</Text>
      </Stack>
    </Card>
  )
}
